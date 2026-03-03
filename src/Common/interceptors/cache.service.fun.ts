import nodeCache from "node-cache";

export class cache_service {
     private cache: nodeCache = new nodeCache();
     constructor() {
          this.cache = new nodeCache({ stdTTL: 300, checkperiod: 60 });
     }
     public async getData<T>(key: any): Promise<T | any> {
          const json = JSON.stringify(key)
          const data = await this.cache.get(json)
          return data ? JSON.parse(data) : null
     }

     public async setExData<T>(key: any, value: any, expire?: number): Promise<T | any> {
          const json = JSON.stringify(key)
          const body = JSON.stringify(value)
          await this.cache.set(json, body, expire)
     }

     public async setData<T>(key: any, value: any): Promise<T | any> {
          const Keys = JSON.stringify(key)
          const body = JSON.stringify(value)
          await redis.set(Keys, body)
     }

     public async deleteData<T>(key: any,): Promise<T | any> {
          const json = JSON.stringify(key)
          await redis.del(json)
     }

     public async deleteByPattern(pattern: string): Promise<number> {
          let cursor = '0';
          let deletedCount = 0;

          do {
               const result = await redis.scan(cursor, {
                    MATCH: pattern,
                    COUNT: 100
               });

               cursor = result.cursor.toString();
               const keys = result.keys;

               if (keys.length > 0) {
                    await redis.del(keys);
                    deletedCount += keys.length;
               }
          } while (cursor !== '0');

          return deletedCount;
     }
}
