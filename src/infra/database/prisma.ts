import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient({
  log: ["query"],
});

export async function disconnect() {
  await prismaClient.$disconnect();
}

export async function connect() {
  await prismaClient.$connect();
}
