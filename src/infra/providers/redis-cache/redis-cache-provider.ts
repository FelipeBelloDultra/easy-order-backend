import { CacheProvider } from "~/application/providers/cache-provider";
import { redisClient } from "../../cache/redis";

export class RedisCacheProvider implements CacheProvider {
  public async save<T>(key: string, value: T): Promise<void> {
    await redisClient.set(key, JSON.stringify(value));
  }

  public async getByKey<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
