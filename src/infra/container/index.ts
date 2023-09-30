import { container } from "tsyringe";

import { CacheProvider } from "~/application/providers/cache-provider";
import { RedisCacheProvider } from "../providers/redis-cache-provider";

import "~/modules/user/infra/container";
import "~/modules/product/infra/container";
import "~/modules/client/infra/container";
import "~/modules/order/infra/container";

container.register<CacheProvider>("CacheProvider", RedisCacheProvider);
