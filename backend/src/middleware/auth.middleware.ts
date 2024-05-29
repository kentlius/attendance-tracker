import type { Request, Response, NextFunction } from "express";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "../../lib/auth.js";

export const authMiddleware = {
  async verifyRequest(req: Request, res: Response, next: NextFunction) {
    if (req.method === "GET") {
      return next();
    }
    const originHeader = req.headers.origin ?? null;
    const hostHeader = req.headers.host ?? null;
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      // return res.status(403).end();
    }
    return next();
  },

  async validateRequest(req: Request, res: Response, next: NextFunction) {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (!sessionId) {
      res.locals.user = null;
      res.locals.session = null;
      return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      res.appendHeader(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );
    }
    if (!session) {
      res.appendHeader(
        "Set-Cookie",
        lucia.createBlankSessionCookie().serialize()
      );
    }
    res.locals.session = session;
    res.locals.user = user;
    return next();
  },
};
