import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { normalizeVehicleInput } from "@/lib/vehicle-admin";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });
}

export async function PATCH(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) return unauthorized();
  try {
    const { id } = await params;
    const values = normalizeVehicleInput(await request.json(), { partial: true });
    if (!Object.keys(values).length) return NextResponse.json({ error: "Geen wijzigingen ontvangen." }, { status: 400 });
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase.from("vehicles").update(values).eq("id", id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ vehicle: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) return unauthorized();
  const { id } = await params;
  const supabase = createAdminSupabaseClient();
  const { data: images, error: imageError } = await supabase.from("vehicle_images").select("storage_path").eq("vehicle_id", id);
  if (imageError) return NextResponse.json({ error: imageError.message }, { status: 500 });
  const paths = (images || []).map((image) => image.storage_path);
  if (paths.length) {
    const { error: storageError } = await supabase.storage.from("vehicle-images").remove(paths);
    if (storageError) return NextResponse.json({ error: storageError.message }, { status: 500 });
  }
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return new NextResponse(null, { status: 204 });
}
