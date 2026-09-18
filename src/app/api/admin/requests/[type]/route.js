import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

const validTypes = {
  contact: "contact_requests",
  test_drive: "test_drive_requests",
  sell: "sell_requests"
};

export async function GET(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });
  }

  const { type } = await params;
  const table = validTypes[type];
  if (!table) return NextResponse.json({ error: "Ongeldig type" }, { status: 400 });

  const supabase = createAdminSupabaseClient();
  let query = supabase.from(table).select("*").order("created_at", { ascending: false });
  
  if (type === "sell") {
    query = supabase.from(table).select("*, sell_request_images(*)").order("created_at", { ascending: false });
  } else if (type === "test_drive") {
    query = supabase.from(table).select("*, vehicles(brand, model, trim)").order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

