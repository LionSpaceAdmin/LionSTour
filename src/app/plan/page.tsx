import { Suspense } from "react";
import PlanClient from "./PlanClient";

export default function PlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    }>
      <PlanClient />
    </Suspense>
  );
}
