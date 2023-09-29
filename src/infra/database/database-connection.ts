import { PrismaClient } from "@prisma/client";

export interface DatabaseConnection {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  query: () => PrismaClient;
}
