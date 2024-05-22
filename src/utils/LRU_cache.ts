// utils/LRUCache.ts
export class LRUCache<K, V> {
    private limit: number;
    private cache: Map<K, V>;

    constructor(limit: number) {
        this.limit = limit;
        this.cache = new Map<K, V>();
    }

    get(key: K): V | null {
        if (!this.cache.has(key)) {
            return null;
        }
        const value = this.cache.get(key)!;
        // Move the accessed item to the end to show that it was recently used
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key: K, value: V): void {
        if (this.cache.size >= this.limit) {
            // Remove the first item from the cache (least recently used)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}
