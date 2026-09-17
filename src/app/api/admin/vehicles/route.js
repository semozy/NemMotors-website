import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { normalizeVehicleInput } from "@/lib/vehicle-admin";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });
}

export async function GET(request) {
  if (!(await isAuthorizedAdminRequest(request))) return unauthorized();
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("vehicles").select("*, vehicle_images(*)").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ vehicles: data });
}

export async function POST(request) {
  if (!(await isAuthorizedAdminRequest(request))) return unauthorized();
  try {
    const values = normalizeVehicleInput(await request.json());
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase.from("vehicles").insert(values).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ vehicle: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
