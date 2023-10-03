import { container } from "tsyringe";

import { CacheProvider } from "~/application/providers/cache-provider";
import { RedisCacheProvider } from "./redis-cache-provider";

container.register<CacheProvider>("CacheProvider", RedisCacheProvider);
