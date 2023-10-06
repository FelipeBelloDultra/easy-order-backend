import "dotenv/config";

import { HttpApp } from "./infra/http/app";

import { connect as prismaConnect } from "./infra/database/prisma";
import { connect as redisConnect } from "./infra/cache/redis";

import "./infra/container";

async function main() {
  await prismaConnect();
  await redisConnect();

  HttpApp.init();
}

main();
