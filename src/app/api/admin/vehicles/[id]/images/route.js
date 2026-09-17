import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { sanitizeFileName } from "@/lib/vehicle-admin";
import { optimizeVehicleImage, vehicleImageSettings } from "@/lib/vehicle-image";

export const runtime = "nodejs";
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maximumImagesPerVehicle = 15;

export async function POST(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });
  const { id } = await params;
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Afbeelding ontbreekt." }, { status: 400 });
  if (!allowedTypes.has(file.type) || file.size > vehicleImageSettings.maximumInputBytes) return NextResponse.json({ error: "Gebruik JPEG, PNG, WebP of AVIF tot 10 MB." }, { status: 400 });

  const supabase = createAdminSupabaseClient();
  const { data: vehicle } = await supabase.from("vehicles").select("id").eq("id", id).maybeSingle();
  if (!vehicle) return NextResponse.json({ error: "Wagen niet gevonden." }, { status: 404 });
  const { count: imageCount, error: countError } = await supabase
    .from("vehicle_images")
    .select("id", { count: "exact", head: true })
    .eq("vehicle_id", id);
  if (countError) return NextResponse.json({ error: countError.message }, { status: 500 });
  if ((imageCount || 0) >= maximumImagesPerVehicle) {
    return NextResponse.json({ error: `Een wagen kan maximaal ${maximumImagesPerVehicle} foto's hebben.` }, { status: 409 });
  }

  let optimized;
  try {
    optimized = await optimizeVehicleImage(Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    return NextResponse.json({ error: error.message || "De afbeelding kon niet worden verwerkt." }, { status: 400 });
  }

  const baseName = sanitizeFileName(file.name).replace(/\.[^.]+$/, "") || "wagen";
  const path = `${id}/${randomUUID()}-${baseName}.webp`;
  const { error: uploadError } = await supabase.storage.from("vehicle-images").upload(path, optimized.data, { contentType: "image/webp", upsert: false });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
  const { data: publicData } = supabase.storage.from("vehicle-images").getPublicUrl(path);
  const position = Number(formData.get("position") || 0);
  const { data, error } = await supabase.from("vehicle_images").insert({
    vehicle_id: id,
    storage_path: path,
    public_url: publicData.publicUrl,
    alt_text: String(formData.get("altText") || ""),
    position: Number.isInteger(position) && position >= 0 ? position : 0,
  }).select().single();
  if (error) {
    await supabase.storage.from("vehicle-images").remove([path]);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({
    image: data,
    optimization: {
      originalBytes: optimized.originalBytes,
      optimizedBytes: optimized.optimizedBytes,
      format: "webp",
    },
  }, { status: 201 });
}
