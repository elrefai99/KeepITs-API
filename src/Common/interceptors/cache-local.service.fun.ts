import nodeCache from "node-cache";

export class cache_service {
     private cache: nodeCache = new nodeCache();
     constructor() {
          this.cache = new nodeCache({ stdTTL: 300, checkperiod: 60 });
     }
     public async getData<T>(key: any): Promise<T | any> {
          const json = JSON.stringify(key);
          const data = this.cache.get<string>(json);
          return data ? JSON.parse(data) : null;
     }

     public async setExData<T>(key: any, value: any, expire?: number): Promise<T | any> {
          const json = JSON.stringify(key);
          const body = JSON.stringify(value);
          if (expire !== undefined) {
               this.cache.set(json, body, expire);
          } else {
               this.cache.set(json, body);
          }
     }

     public async setData<T>(key: any, value: any): Promise<T | any> {
          const json = JSON.stringify(key);
          const body = JSON.stringify(value);
          this.cache.set(json, body);
     }

     public async deleteData<T>(key: any): Promise<T | any> {
          const json = JSON.stringify(key);
          this.cache.del(json);
     }

     public async deleteByPattern(pattern: string): Promise<number> {
          const allKeys = this.cache.keys();
          const regexStr = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
          const regex = new RegExp(`^${regexStr}$`);

          let deletedCount = 0;
          const keysToDelete = allKeys.filter(k => regex.test(k));

          if (keysToDelete.length > 0) {
               deletedCount = this.cache.del(keysToDelete);
          }

          return deletedCount;
     }
}
