import { cookies } from "next/headers";
import { cache } from "react";

export const validateRequest = cache(async () => {
  const sessionId = cookies().get("auth-session")?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await fetch(`${process.env.API_SERVER_URL}`, {
    headers: {
      cookie: sessionId,
    },
  });

  if (!result.ok) {
    return {
      user: null,
      session: null,
    };
  }

  const data = await result.json();
  return data;
});
