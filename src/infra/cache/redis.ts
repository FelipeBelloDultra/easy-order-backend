import { createClient } from "redis";

export const redisClient = createClient();

export async function connect() {
  await redisClient.connect();
}

export async function disconnect() {
  await redisClient.disconnect();
}
