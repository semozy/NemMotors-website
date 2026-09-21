import { NextResponse } from "next/server";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function GET(request) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ error: "Geen toegang" }, { status: 401 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, active, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Fout bij ophalen accounts" }, { status: 500 });
  }

  return NextResponse.json({ accounts: data });
}

export async function POST(request) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ error: "Geen toegang" }, { status: 401 });
  }

  let email;
  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "E-mailadres is verplicht." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  
  // Controleer of de gebruiker al in admin_users staat
  const { data: existingAdmin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingAdmin) {
    return NextResponse.json({ error: "Dit account bestaat al in het systeem." }, { status: 400 });
  }

  // Generate a random temporary password
  const tempPassword = randomBytes(8).toString("hex") + "A1!";

  // Create user directly bypassing email rate limits
  const { data: createData, error: createError } = await supabase.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });

  if (createError && createError.code !== "user_already_exists") {
    console.error("Create user error:", createError);
    return NextResponse.json({ error: "Fout bij aanmaken gebruiker in Supabase." }, { status: 500 });
  }

  // Voeg toe aan admin_users tabel
  const { error: insertError } = await supabase
    .from("admin_users")
    .insert({ email, active: true });

  if (insertError) {
    return NextResponse.json({ error: "Fout bij opslaan account in database." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, tempPassword });
}

