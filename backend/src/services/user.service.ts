import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db.js";

export const userService = {
  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username: username },
    });
  },

  async getUsers() {
    return await prisma.user.findMany();
  },

  async createUser(user: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: user,
    });
  },

  async updateUser(id: string, user: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id: id },
      data: user,
    });
  },

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id: id },
    });
  },
};
