import express from "express";

import { PrismaAdapter } from "~/infra/database/prisma-adapter";

async function main() {
  const prismaAdapter = new PrismaAdapter();
  await prismaAdapter.connect();

  const app = express();

  app.get("/", (req, res) => {
    return res.json({ ok: true });
  });

  app.listen(3000);
}

main();
