import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to database");
  } catch (err) {
    console.error("Failed to connect to database:", err);
    throw err;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export default prisma;
