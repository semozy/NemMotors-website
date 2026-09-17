import { createHash } from "node:crypto";
import { createAdminSupabaseClient } from "@/lib/supabase";

export const adminCookieName = "nem_motors_admin_access";
export const adminSessionMaxAge = 60 * 60;
const loginWindowMs = 15 * 60 * 1000;
const maximumLoginAttempts = 5;

function isSameOriginMutation(request) {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return true;
  const origin = request.headers.get("origin");
  return Boolean(origin) && origin === new URL(request.url).origin;
}

export function getLoginAttemptKey(request, email) {
  const address = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  return createHash("sha256").update(`${address}|${String(email || "").trim().toLowerCase()}`).digest("hex");
}

export async function isLoginBlocked(keyHash) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("admin_login_attempts").select("blocked_until").eq("key_hash", keyHash).maybeSingle();
  if (error) throw error;
  return Boolean(data?.blocked_until && new Date(data.blocked_until).getTime() > Date.now());
}

export async function recordFailedLogin(keyHash) {
  const supabase = createAdminSupabaseClient();
  const now = Date.now();
  const { data } = await supabase.from("admin_login_attempts").select("attempt_count, window_started_at").eq("key_hash", keyHash).maybeSingle();
  const currentWindow = data && now - new Date(data.window_started_at).getTime() < loginWindowMs;
  const attemptCount = currentWindow ? data.attempt_count + 1 : 1;
  const { error } = await supabase.from("admin_login_attempts").upsert({
    key_hash: keyHash,
    attempt_count: attemptCount,
    window_started_at: currentWindow ? data.window_started_at : new Date(now).toISOString(),
    blocked_until: attemptCount >= maximumLoginAttempts ? new Date(now + loginWindowMs).toISOString() : null,
    updated_at: new Date(now).toISOString(),
  });
  if (error) throw error;
}

export async function clearFailedLogins(keyHash) {
  const supabase = createAdminSupabaseClient();
  await supabase.from("admin_login_attempts").delete().eq("key_hash", keyHash);
}

export async function getAuthorizedAdmin(accessToken) {
  if (!accessToken) return null;
  const supabase = createAdminSupabaseClient();
  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);
  const user = userData?.user;
  if (userError || !user?.email) return null;

  const email = user.email.trim().toLowerCase();
  const { data: admin, error } = await supabase.from("admin_users").select("id, user_id, email").eq("email", email).eq("active", true).maybeSingle();
  if (error || !admin) return null;
  if (admin.user_id && admin.user_id !== user.id) return null;
  if (!admin.user_id) {
    const { error: linkError } = await supabase.from("admin_users").update({ user_id: user.id, updated_at: new Date().toISOString() }).eq("id", admin.id).is("user_id", null);
    if (linkError) return null;
  }
  return { id: user.id, email };
}

export async function isValidAdminSessionToken(token) {
  return Boolean(await getAuthorizedAdmin(token));
}

export async function isAuthorizedAdminRequest(request) {
  if (!isSameOriginMutation(request)) return false;
  return Boolean(await getAuthorizedAdmin(request.cookies?.get(adminCookieName)?.value));
}
