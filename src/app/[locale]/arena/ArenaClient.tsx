"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ARENA_GOALS,
  type ArenaGoal,
  type ArenaProtocol,
  getProtocolsForGoal,
} from "@/data/arena-protocols";
import {
  type ArenaState,
  getRating,
  loadArenaState,
  pickPair,
  recordVote,
  resetArena,
} from "@/lib/arena-store";
import {
  trackArenaGoalChange,
  trackArenaSkip,
  trackArenaVote,
} from "@/lib/analytics";

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  sage: "#4F6F5A",
  paper: "#FAFBFC",
  border: "#D0D7E2",
  surface: "#FFFFFF",
  inkMuted: "#5A6577",
} as const;

export default function ArenaClient() {
  const [goal, setGoal] = useState<ArenaGoal>(ARENA_GOALS[0].slug);
  const [state, setState] = useState<ArenaState | null>(null);
  const [pair, setPair] = useState<[ArenaProtocol, ArenaProtocol] | null>(null);

  const protocols = useMemo(() => getProtocolsForGoal(goal), [goal]);

  const nextPair = useCallback(
    (currentPair?: [ArenaProtocol, ArenaProtocol] | null) => {
      const avoid = currentPair
        ? ([currentPair[0].slug, currentPair[1].slug] as [string, string])
        : undefined;
      setPair(pickPair(protocols, avoid));
    },
    [protocols]
  );

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setState(loadArenaState());
    nextPair();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [nextPair]);

  const handleGoalChange = useCallback(
    (next: ArenaGoal) => {
      setGoal(next);
      trackArenaGoalChange(next);
      // Reshuffle with the new goal's pool on the next tick (protocols memo updates synchronously)
      setPair(pickPair(getProtocolsForGoal(next)));
    },
    []
  );

  const handleVote = useCallback(
    (winner: ArenaProtocol, loser: ArenaProtocol) => {
      const next = recordVote(goal, winner.slug, loser.slug);
      setState(next);
      trackArenaVote(goal, winner.slug, loser.slug);
      nextPair(pair);
    },
    [goal, pair, nextPair]
  );

  const handleSkip = useCallback(() => {
    if (!pair) return;
    trackArenaSkip(goal, pair[0].slug, pair[1].slug);
    nextPair(pair);
  }, [goal, pair, nextPair]);

  const handleReset = useCallback(() => {
    const fresh = resetArena();
    setState(fresh);
    nextPair(pair);
  }, [pair, nextPair]);

  const leaderboard = useMemo(() => {
    if (!state) return [];
    return protocols
      .map((p) => ({ protocol: p, record: getRating(state, goal, p.slug) }))
      .sort((a, b) => b.record.rating - a.record.rating);
  }, [state, protocols, goal]);

  return (
    <div className="space-y-8">
      {/* Goal selector */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-[0.18em] mb-3"
          style={{ color: C.teal }}
        >
          Choose a goal
        </label>
        <div className="flex flex-wrap gap-2">
          {ARENA_GOALS.map((g) => {
            const active = g.slug === goal;
            return (
              <button
                key={g.slug}
                type="button"
                onClick={() => handleGoalChange(g.slug)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: active ? C.navy : C.surface,
                  color: active ? "#FFFFFF" : C.navy,
                  border: `1px solid ${active ? C.navy : C.border}`,
                }}
              >
                {g.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm mt-3" style={{ color: C.inkMuted }}>
          {ARENA_GOALS.find((g) => g.slug === goal)?.blurb}
        </p>
      </div>

      {/* Voting card */}
      {pair ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[pair[0], pair[1]].map((p, idx) => (
            <div
              key={p.slug}
              className="rounded-2xl p-5 flex flex-col"
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-[0.16em] mb-2"
                style={{ color: C.teal }}
              >
                Option {String.fromCharCode(65 + idx)} &middot; {p.compound}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: C.navy }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#1C2028" }}>
                {p.summary}
              </p>
              <p className="text-sm italic leading-relaxed mb-4" style={{ color: C.sage }}>
                {p.frameSentence}
              </p>
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline mb-4"
                style={{ color: C.inkMuted }}
              >
                Source: {p.sourceTitle}
              </a>
              <button
                type="button"
                onClick={() => handleVote(p, pair[1 - idx])}
                className="mt-auto rounded-lg px-4 py-3 text-sm font-semibold"
                style={{ backgroundColor: C.sage, color: "#FFFFFF" }}
              >
                Prefer this protocol
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl p-6 text-sm"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.inkMuted }}
        >
          {protocols.length < 2
            ? "Not enough protocols seeded for this goal yet. Try another goal."
            : "Loading next pair..."}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleSkip}
          className="text-sm underline"
          style={{ color: C.inkMuted }}
        >
          Skip this pair
        </button>
        <span className="text-xs" style={{ color: C.inkMuted }}>
          {state?.voteCount ?? 0} votes cast (local only)
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="ml-auto text-xs underline"
          style={{ color: C.inkMuted }}
        >
          Reset local ratings
        </button>
      </div>

      {/* Leaderboard */}
      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: C.navy }}>
          Your local leaderboard &mdash; {ARENA_GOALS.find((g) => g.slug === goal)?.label}
        </h2>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}
        >
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: C.paper }}>
              <tr>
                <th className="text-left px-4 py-3" style={{ color: C.teal }}>#</th>
                <th className="text-left px-4 py-3" style={{ color: C.teal }}>Protocol</th>
                <th className="text-right px-4 py-3" style={{ color: C.teal }}>Rating</th>
                <th className="text-right px-4 py-3" style={{ color: C.teal }}>W / L</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row, idx) => (
                <tr key={row.protocol.slug} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td className="px-4 py-3 tabular-nums" style={{ color: C.inkMuted }}>{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold" style={{ color: C.navy }}>{row.protocol.title}</div>
                    <div className="text-xs" style={{ color: C.inkMuted }}>{row.protocol.compound}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: C.navy }}>
                    {row.record.rating}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: C.inkMuted }}>
                    {row.record.wins} / {row.record.losses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: C.inkMuted }}>
          Ratings live in your browser only. A server-side benchmark with
          multi-user aggregation is the next step.
        </p>
      </div>

      <div
        className="rounded-xl p-4 text-xs leading-relaxed"
        style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D", color: "#92400E" }}
      >
        <strong>Not medical advice.</strong> These are framings to help you think
        about trade-offs, not prescriptions. For anything you act on, talk to a
        licensed clinician. See our{" "}
        <Link href="/disclaimer" className="underline">
          full disclaimer
        </Link>
        .
      </div>
    </div>
  );
}
