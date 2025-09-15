import { loadImpactReport } from "@/lib/impact";
import { ImpactDashboard } from "@/components/impact/ImpactDashboard";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export const dynamic = "force-dynamic"; // ensure fresh data in dev; can be tuned later

export default async function ImpactPage() {
  const report = await loadImpactReport();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="relative py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <ImpactDashboard report={report} />
        </div>
      </div>
    </div>
  );
}

