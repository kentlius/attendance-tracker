import express from "express";
import { prisma } from "../lib/db.js";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { Prisma } from "@prisma/client";

export const signupRouter = express.Router();

signupRouter.post("/signup", async (req, res) => {
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

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await prisma.user.create({
      data: {
        id: userId,
        username: username,
        password: hashedPassword,
      },
    });

    return res.status(200).send({
      message: "User created",
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return res.status(400).send({
        error: "Username already taken",
      });
    }
    return res.status(500).send({
      error: "Internal server error",
    });
  }
});
