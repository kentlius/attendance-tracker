import type { Request, Response } from "express";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { lucia } from "../../lib/auth.js";
import { userService } from "../services/user.service.js";
import { Prisma } from "@prisma/client";

export const authController = {
  async user(_: Request, res: Response) {
    if (!res.locals.user) {
      return res.status(401).end();
    }

    return res.status(200).send(res.locals);
  },

  async login(req: Request, res: Response) {
    const username: string | null = req.body.username ?? null;
    if (
      !username ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9._-]+$/.test(username)
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

    const existingUser = await userService.getUserByUsername(username);
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
  },

  async signup(req: Request, res: Response) {
    const username: string | null = req.body.username ?? null;
    if (
      !username ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9._-]+$/.test(username)
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
      await userService.createUser({
        id: userId,
        username: username,
        password: hashedPassword,
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
  },

  async logout(_: Request, res: Response) {
    if (!res.locals.session) {
      return res.status(401).end();
    }

    await lucia.invalidateSession(res.locals.session.id);

    return res
      .setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize())
      .status(200)
      .end();
  },
};
