import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db.js";

export const userService = {
  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username: username },
    });
  },

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userId: true,
          },
        },
      },
    });
  },

  async getUsers(isEmployed: boolean) {
    const whereClause = isEmployed ? {} : { employee: null };

    return await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        username: true,
      },
    });
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
