import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });
  const { id, imageId } = await params;
  const supabase = createAdminSupabaseClient();
  const { data: image, error: findError } = await supabase.from("vehicle_images").select("storage_path").eq("id", imageId).eq("vehicle_id", id).maybeSingle();
  if (findError) return NextResponse.json({ error: findError.message }, { status: 500 });
  if (!image) return NextResponse.json({ error: "Afbeelding niet gevonden." }, { status: 404 });
  const { error: storageError } = await supabase.storage.from("vehicle-images").remove([image.storage_path]);
  if (storageError) return NextResponse.json({ error: storageError.message }, { status: 500 });
  const { error } = await supabase.from("vehicle_images").delete().eq("id", imageId).eq("vehicle_id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return new NextResponse(null, { status: 204 });
}
