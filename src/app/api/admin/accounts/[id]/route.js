import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function PATCH(request, props) {
  const params = await props.params;
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ error: "Geen toegang" }, { status: 401 });
  }

  let active;
  try {
    const body = await request.json();
    if (typeof body.active !== "boolean") throw new Error();
    active = body.active;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("admin_users")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Fout bij bijwerken account." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request, props) {
  const params = await props.params;
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ error: "Geen toegang" }, { status: 401 });
  }

  const supabase = createAdminSupabaseClient();
  
  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("id", params.id)
    .maybeSingle();

  if (admin && admin.user_id) {
    await supabase.auth.admin.deleteUser(admin.user_id);
  }

  const { error } = await supabase
    .from("admin_users")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "Fout bij verwijderen account." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

