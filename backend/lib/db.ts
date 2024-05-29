import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type DatabaseUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    password: true;
    role: true;
  };
}>;
