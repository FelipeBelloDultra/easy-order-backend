import { connect } from "./infra/database/prisma";
import { HttpApp } from "./infra/http/app";

async function main() {
  await connect();

  HttpApp.init();
}

main();
