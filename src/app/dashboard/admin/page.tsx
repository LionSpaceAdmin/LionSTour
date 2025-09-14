import { GuidesManagement } from "@/components/admin/guide-table";
import { ExperiencesManagement } from "@/components/admin/experience-table";
import { BookingsManagement } from "@/components/admin/booking-table";
import { ModerationTools } from "@/components/admin/moderation-tools";
import { toggleExperienceActive, toggleGuideActive } from "./actions";
import { getSupabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  // Supabase-auth-based admin gating
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || profile.role !== "admin") redirect("/");
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">לוח ניהול</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <GuidesManagement />
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <ExperiencesManagement />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <BookingsManagement />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <ModerationTools onToggleExperience={toggleExperienceActive} onToggleGuide={toggleGuideActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
