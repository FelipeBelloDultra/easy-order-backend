import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export async function connect() {
  await redisClient.connect();
}

export async function disconnect() {
  await redisClient.disconnect();
}
