/**
 * Local-first ELO store for the arena benchmark.
 *
 * Everything lives in localStorage under `ps_arena_v1`. Must only be called
 * from client contexts (useEffect, event handlers). No server, no sync.
 *
 * ELO details:
 * - Every protocol starts at ratingStart.
 * - K = 32, which is aggressive enough for a small voter base to move ratings
 *   visibly, which is the point of the local preview.
 * - Draws are not supported; users can skip a pair instead.
 */

const STORAGE_KEY = "ps_arena_v1";
const RATING_START = 1500;
const K = 32;

export interface ArenaRecord {
  rating: number;
  wins: number;
  losses: number;
}

export interface ArenaState {
  version: 1;
  byGoal: Record<string, Record<string, ArenaRecord>>;
  voteCount: number;
  firstVoteAt?: string;
  lastVoteAt?: string;
}

const EMPTY_STATE: ArenaState = {
  version: 1,
  byGoal: {},
  voteCount: 0,
};

export function loadArenaState(): ArenaState {
  if (typeof window === "undefined") return { ...EMPTY_STATE };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STATE };
    const parsed = JSON.parse(raw) as ArenaState;
    if (parsed.version !== 1) return { ...EMPTY_STATE };
    return parsed;
  } catch {
    return { ...EMPTY_STATE };
  }
}

function persist(state: ArenaState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full / disabled; silently ignore
  }
}

function ensureRecord(state: ArenaState, goal: string, slug: string): ArenaRecord {
  const bucket = state.byGoal[goal] ?? (state.byGoal[goal] = {});
  const existing = bucket[slug];
  if (existing) return existing;
  const created: ArenaRecord = { rating: RATING_START, wins: 0, losses: 0 };
  bucket[slug] = created;
  return created;
}

export function getRating(state: ArenaState, goal: string, slug: string): ArenaRecord {
  return state.byGoal[goal]?.[slug] ?? { rating: RATING_START, wins: 0, losses: 0 };
}

export function recordVote(goal: string, winnerSlug: string, loserSlug: string): ArenaState {
  const state = loadArenaState();
  const winner = ensureRecord(state, goal, winnerSlug);
  const loser = ensureRecord(state, goal, loserSlug);

  const expectedWin = 1 / (1 + Math.pow(10, (loser.rating - winner.rating) / 400));
  const expectedLose = 1 - expectedWin;
  winner.rating = Math.round(winner.rating + K * (1 - expectedWin));
  loser.rating = Math.round(loser.rating + K * (0 - expectedLose));
  winner.wins += 1;
  loser.losses += 1;

  const now = new Date().toISOString();
  state.voteCount += 1;
  if (!state.firstVoteAt) state.firstVoteAt = now;
  state.lastVoteAt = now;

  persist(state);
  return state;
}

export function resetArena(): ArenaState {
  const fresh: ArenaState = { ...EMPTY_STATE, byGoal: {} };
  persist(fresh);
  return fresh;
}

export function pickPair<T extends { slug: string }>(
  protocols: T[],
  avoidPair?: readonly [string, string]
): [T, T] | null {
  if (protocols.length < 2) return null;
  // Shuffle-and-take gives deterministic uniform sampling in a small pool.
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const a = protocols[Math.floor(Math.random() * protocols.length)];
    let b = protocols[Math.floor(Math.random() * protocols.length)];
    let guard = 0;
    while (b.slug === a.slug && guard < 5) {
      b = protocols[Math.floor(Math.random() * protocols.length)];
      guard += 1;
    }
    if (b.slug === a.slug) continue;
    if (
      avoidPair &&
      ((avoidPair[0] === a.slug && avoidPair[1] === b.slug) ||
        (avoidPair[0] === b.slug && avoidPair[1] === a.slug))
    ) {
      continue;
    }
    return [a, b];
  }
  // Fallback — deterministic pair
  return [protocols[0], protocols[1]];
}
