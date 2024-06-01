import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
  async getUsers(req: Request, res: Response) {
    req.query.employed === "false"
      ? res.json(await userService.getUsers(false))
      : res.json(await userService.getUsers(true));
  },

  async getUserById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  },

  async createUser(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.json(user);
  },

  async updateUser(req: Request, res: Response) {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  },

  async deleteUser(req: Request, res: Response) {
    const user = await userService.deleteUser(req.params.id);
    res.json(user);
  },
};
