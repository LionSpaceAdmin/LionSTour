import { errorJson, okJson } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";
import { loadImpactReport } from "@/lib/impact";

export async function GET() {
  const rl = rateLimit("impact:get", 30, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);

  try {
    const report = await loadImpactReport();
    return okJson(report);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load impact report";
    return errorJson(message, 500);
  }
}
