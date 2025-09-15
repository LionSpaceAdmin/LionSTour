"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PASS = "lions2025";

export function AdminTeamPlaceLink() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem("adminKey") === PASS);
    } catch {
      // ignore
    }
  }, []);

  const activate = () => {
    const input = window.prompt("Admin password / סיסמת מנהל:") || "";
    if (input === PASS) {
      try { localStorage.setItem("adminKey", PASS); } catch {}
      setEnabled(true);
    }
  };

  if (enabled) {
    return (
      <Link
        href="/ai-learning-platform/archit"
        className="px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white shadow-md backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all"
        aria-label="Archit Hub"
      >
        Archit Hub
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={activate}
      className="px-3 py-2 rounded-full bg-transparent border-2 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40 transition-all"
      aria-label="Admin Login"
    >
      Admin
    </button>
  );
}
