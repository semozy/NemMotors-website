import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest, getAuthorizedAdmin, adminCookieName } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request) {
  const token = request.cookies.get(adminCookieName)?.value;
  if (!(await isAuthorizedAdminRequest(request)) || !token) {
    return NextResponse.json({ error: "Geen toegang" }, { status: 401 });
  }

  const admin = await getAuthorizedAdmin(token);
  if (!admin) {
    return NextResponse.json({ error: "Onbevoegde actie" }, { status: 401 });
  }

  let newPassword;
  try {
    const body = await request.json();
    newPassword = body.newPassword;
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (!newPassword || newPassword.length < 12) {
    return NextResponse.json({ error: "Wachtwoord moet minimaal 12 tekens bevatten." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.auth.admin.updateUserById(admin.id, {
    password: newPassword,
  });

  if (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Er ging iets mis bij het updaten van het wachtwoord." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

