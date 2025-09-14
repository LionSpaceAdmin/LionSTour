"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlannerOverlay() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = () => {
    const v = q.trim();
    if (!v) return;
    router.push(`/plan?prompt=${encodeURIComponent(v)}`);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-20 flex justify-center px-4">
      <div className="pointer-events-auto glass-dark w-full max-w-3xl rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Describe your journey — e.g., Healing nature in the Galilee for a week"
            className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={submit}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

