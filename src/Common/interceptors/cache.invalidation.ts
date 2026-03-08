import { cache_service } from "./cache-redis.service.fun";

export async function invalidateSearchCache(): Promise<void> {
     try {
          const cache: cache_service = new cache_service();
          const searchCachePattern = `*site-search*`;
          await cache.deleteByPattern(searchCachePattern);
     } catch (error) {
          console.error('❌ Failed to invalidate search cache:', error);
     }
}
