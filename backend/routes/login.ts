import express from "express";
import { Argon2id } from "oslo/password";

import { prisma } from "../lib/db.js";
import { lucia } from "../lib/auth.js";

export const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
  const username: string | null = req.body.username ?? null;
  if (
    !username ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return res.status(400).send({
      error: "Invalid username",
    });
  }

  const password: string | null = req.body.password ?? null;
  if (!password || password.length < 6 || password.length > 255) {
    return res.status(400).send({
      error: "Invalid password",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!existingUser) {
    return res.status(400).send({
      error: "Incorrect username or password",
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    return res.status(400).send({
      error: "Incorrect username or password",
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  res
    .appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    .appendHeader("Location", "/")
    .status(200)
    .send({
      message: "Logged in",
    });
});
