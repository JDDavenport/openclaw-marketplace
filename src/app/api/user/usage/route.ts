import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

/** GET /api/user/usage — Get usage/cost data for current user */
export async function GET() {
  const result = await requireAuth();
  if ("error" in result) return result.error;

  // costTracking table not yet in schema — return empty usage for now
  return NextResponse.json({ usage: [], period: new Date().toISOString().slice(0, 7) + "-01" });
}
