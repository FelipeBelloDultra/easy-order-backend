import { PrismaClient } from "@prisma/client";
import { DatabaseConnection } from "./database-connection";

export class PrismaAdapter implements DatabaseConnection {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  public query() {
    return this.prisma;
  }
}
