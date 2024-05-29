import { cookies } from "next/headers";

export async function logout() {
  const sessionId = cookies().get("auth-session")?.value ?? null;
  if (!sessionId) {
    return null;
  }

  const res = await fetch(`${process.env.API_SERVER_URL}/logout`, {
    method: "POST",
    headers: {
      cookie: sessionId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to log out");
  }

  return res;
}
