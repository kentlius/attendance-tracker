import express from "express";

export const mainRouter = express.Router();

mainRouter.get("/", async (_, res) => {
  if (!res.locals.user) {
    return res.status(401).end();
  }

  return res.status(200).send(res.locals);
});
