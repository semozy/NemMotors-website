import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

const validTypes = {
  contact: "contact_requests",
  test_drive: "test_drive_requests",
  sell: "sell_requests"
};

export async function PATCH(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });

  const { type, id } = await params;
  const table = validTypes[type];
  if (!table) return NextResponse.json({ error: "Ongeldig type" }, { status: 400 });

  const { status } = await request.json();
  
  const allowedStatuses = ["nieuw", "afgehandeld", "bevestigd", "geannuleerd"];
  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Ongeldige status" }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from(table).update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  if (!(await isAuthorizedAdminRequest(request))) return NextResponse.json({ error: "Niet gemachtigd." }, { status: 401 });

  const { type, id } = await params;
  const table = validTypes[type];
  if (!table) return NextResponse.json({ error: "Ongeldig type" }, { status: 400 });

  const supabase = createAdminSupabaseClient();
  
  if (type === "sell") {
    const { data: images } = await supabase.from("sell_request_images").select("storage_path").eq("sell_request_id", id);
    const paths = (images || []).map(img => img.storage_path);
    if (paths.length > 0) {
      await supabase.storage.from("sell-images").remove(paths);
    }
  }

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return new NextResponse(null, { status: 204 });
}

