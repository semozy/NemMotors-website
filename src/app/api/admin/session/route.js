import { NextResponse } from "next/server";
import { adminCookieName, adminSessionMaxAge, clearFailedLogins, getAuthorizedAdmin, getLoginAttemptKey, isLoginBlocked, recordFailedLogin } from "@/lib/admin-auth";
import { createPublicSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request) {
  let email;
  let password;
  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
    password = String(body.password || "");
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }
  if (!email || !password) return NextResponse.json({ error: "E-mailadres en wachtwoord zijn verplicht." }, { status: 400 });

  const attemptKey = getLoginAttemptKey(request, email);
  if (await isLoginBlocked(attemptKey)) return NextResponse.json({ error: "Te veel mislukte pogingen. Probeer over 15 minuten opnieuw." }, { status: 429 });

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  const accessToken = data.session?.access_token;
  const admin = accessToken ? await getAuthorizedAdmin(accessToken) : null;
  if (error || !admin) {
    await recordFailedLogin(attemptKey);
    return NextResponse.json({ error: "Onjuiste inloggegevens of geen beheerrechten." }, { status: 401 });
  }

  await clearFailedLogins(attemptKey);
  const response = NextResponse.json({ ok: true, admin });
  response.cookies.set(adminCookieName, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: Math.min(data.session.expires_in || adminSessionMaxAge, adminSessionMaxAge),
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
