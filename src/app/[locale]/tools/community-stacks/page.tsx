"use client";

import { useState, useEffect } from "react";

const C = {
  navy: "#1A3A5C",
  teal: "#3B7A9E",
  accent: "#D4553A",
  success: "#2B8A5E",
  warning: "#D4912A",
  bg: "#FAFBFC",
  surface: "#FFFFFF",
  border: "#D0D7E2",
  muted: "#5A6577",
} as const;

interface UserStack {
  id: string;
  name: string;
  peptides: string;
  goal: string;
  dosage: string;
  duration: string;
  effects: string;
  sideEffects: string;
  rating: number;
  date: string;
  votes: number;
}

function getInitialStacks(): UserStack[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("peptide_user_stacks");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return [];
}

export default function UserStacksPage() {
  const [stacks, setStacks] = useState<UserStack[]>(getInitialStacks);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    peptides: "",
    goal: "",
    dosage: "",
    duration: "",
    effects: "",
    sideEffects: "",
    rating: 3,
  });

  // State is initialized lazily from localStorage via getInitialStacks
  // We keep useEffect to sync when localStorage changes from other tabs
  useEffect(() => {
    function handleStorage() {
      const stored = localStorage.getItem("peptide_user_stacks");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as UserStack[];
          setStacks(parsed);
        } catch {}
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function saveStacks(updated: UserStack[]) {
    setStacks(updated);
    localStorage.setItem("peptide_user_stacks", JSON.stringify(updated));
  }

  function submitStack(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.peptides.trim()) return;
    const newStack: UserStack = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString(),
      votes: 0,
    };
    saveStacks([newStack, ...stacks]);
    setFormData({ name: "", peptides: "", goal: "", dosage: "", duration: "", effects: "", sideEffects: "", rating: 3 });
    setShowForm(false);
  }

  function vote(id: string, delta: number) {
    const updated = stacks.map((s) => (s.id === id ? { ...s, votes: s.votes + delta } : s));
    saveStacks(updated);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4" style={{ backgroundColor: "#F8FAFC", borderColor: C.border, color: C.navy }}>
          <span>Community</span>
          <span style={{ color: C.accent }}>Experimental</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.navy }}>
          Community Stack Reports
        </h1>
        <p className="text-base leading-relaxed max-w-3xl" style={{ color: C.muted }}>
          User-submitted reports of peptide stacks, dosages, and experiences. 
          <strong> These are unverified anecdotes, not clinical data.</strong> No report has been medically reviewed.
        </p>
      </div>

      {/* Heavy disclaimer */}
      <div className="rounded-xl p-4 mb-8 text-sm leading-relaxed" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>
        <strong>Critical Warning:</strong> All reports below are user-submitted anecdotes with no medical verification. 
        They do not constitute medical advice, clinical evidence, or safety data. Self-administration of peptides 
        can be dangerous and is often illegal without a prescription. We publish these for research transparency 
        only — not as recommendations. Always consult a qualified healthcare provider.
      </div>

      {/* Submit button */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: C.teal }}
        >
          {showForm ? "Cancel" : "+ Share Your Stack Report"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={submitStack} className="rounded-xl p-5 mb-8" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <h3 className="text-base font-bold mb-4" style={{ color: C.navy }}>Submit Stack Report</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Stack Name *</label>
              <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border p-2 text-sm" style={{ borderColor: C.border }} placeholder="e.g., My Healing Stack" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Peptides Used *</label>
              <input required value={formData.peptides} onChange={(e) => setFormData({ ...formData, peptides: e.target.value })} className="w-full rounded-lg border p-2 text-sm" style={{ borderColor: C.border }} placeholder="e.g., BPC-157, TB-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Goal</label>
              <input value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} className="w-full rounded-lg border p-2 text-sm" style={{ borderColor: C.border }} placeholder="e.g., Injury recovery" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Duration</label>
              <input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full rounded-lg border p-2 text-sm" style={{ borderColor: C.border }} placeholder="e.g., 8 weeks" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Dosage Protocol</label>
            <input value={formData.dosage} onChange={(e) => setFormData({ ...formData, dosage: e.target.value })} className="w-full rounded-lg border p-2 text-sm" style={{ borderColor: C.border }} placeholder="e.g., BPC-157 250mcg daily, TB-500 2mg twice weekly" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Reported Effects</label>
              <textarea value={formData.effects} onChange={(e) => setFormData({ ...formData, effects: e.target.value })} className="w-full rounded-lg border p-2 text-sm min-h-[80px]" style={{ borderColor: C.border }} placeholder="What effects did you notice?" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Side Effects</label>
              <textarea value={formData.sideEffects} onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })} className="w-full rounded-lg border p-2 text-sm min-h-[80px]" style={{ borderColor: C.border }} placeholder="Any negative effects?" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1" style={{ color: C.navy }}>Overall Rating: {formData.rating}/5</label>
            <input type="range" min={1} max={5} value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="w-full" />
          </div>
          <div className="rounded-lg p-3 mb-4 text-xs" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>
            By submitting, you acknowledge this is an unverified anecdote for research purposes only. 
            You are not providing medical advice. False claims may be removed.
          </div>
          <button type="submit" className="rounded-lg px-5 py-2 text-sm font-semibold text-white" style={{ backgroundColor: C.success }}>
            Submit Report
          </button>
        </form>
      )}

      {/* Stack list */}
      <div className="space-y-4">
        {stacks.length === 0 ? (
          <div className="rounded-xl p-8 text-center" style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}>
            <p className="text-sm" style={{ color: C.muted }}>No community reports yet. Be the first to share your experience (for research transparency only).</p>
          </div>
        ) : (
          stacks.map((stack) => (
            <div key={stack.id} className="rounded-xl p-5" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold" style={{ color: C.navy }}>{stack.name}</h3>
                  <p className="text-xs" style={{ color: C.muted }}>Shared on {stack.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => vote(stack.id, 1)} className="rounded p-1 hover:bg-gray-100 text-xs" style={{ color: C.success }}>▲</button>
                  <span className="text-sm font-bold" style={{ color: C.navy }}>{stack.votes}</span>
                  <button onClick={() => vote(stack.id, -1)} className="rounded p-1 hover:bg-gray-100 text-xs" style={{ color: C.accent }}>▼</button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3 mb-3 text-sm">
                <div><span className="font-semibold" style={{ color: C.navy }}>Peptides:</span> <span style={{ color: C.muted }}>{stack.peptides}</span></div>
                <div><span className="font-semibold" style={{ color: C.navy }}>Goal:</span> <span style={{ color: C.muted }}>{stack.goal || "Not specified"}</span></div>
                <div><span className="font-semibold" style={{ color: C.navy }}>Duration:</span> <span style={{ color: C.muted }}>{stack.duration || "Not specified"}</span></div>
                <div><span className="font-semibold" style={{ color: C.navy }}>Rating:</span> <span style={{ color: C.warning }}>{"★".repeat(stack.rating)}{"☆".repeat(5 - stack.rating)}</span></div>
              </div>
              {stack.dosage && (
                <div className="mb-2 text-sm"><span className="font-semibold" style={{ color: C.navy }}>Dosage:</span> <span style={{ color: C.muted }}>{stack.dosage}</span></div>
              )}
              <div className="grid md:grid-cols-2 gap-3">
                {stack.effects && (
                  <div className="rounded-lg p-2 text-sm" style={{ backgroundColor: "#F0FDF4" }}>
                    <span className="font-semibold" style={{ color: C.success }}>Effects:</span> <span style={{ color: C.navy }}>{stack.effects}</span>
                  </div>
                )}
                {stack.sideEffects && (
                  <div className="rounded-lg p-2 text-sm" style={{ backgroundColor: "#FEF2F2" }}>
                    <span className="font-semibold" style={{ color: C.accent }}>Side Effects:</span> <span style={{ color: C.navy }}>{stack.sideEffects}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 text-xs" style={{ color: C.muted }}>
                ⚠ This is an unverified user report. Not medically reviewed. Not a recommendation.
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-xl p-4 mt-8 text-sm leading-relaxed" style={{ backgroundColor: "#FFF7ED", border: "1px solid #FDBA74", color: "#9A3412" }}>
        <strong>Transparency note:</strong> Community reports are stored locally in your browser (localStorage) 
        and are not transmitted to our servers. This means reports are only visible on your device. 
        We are exploring a moderated community feature with medical review for a future release.
      </div>
    </div>
  );
}
