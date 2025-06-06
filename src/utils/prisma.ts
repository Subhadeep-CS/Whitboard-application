import { PrismaClient } from "@/generated/prisma";

const globalPrismaObject = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalPrismaObject.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalPrismaObject.prisma = prisma;
}
