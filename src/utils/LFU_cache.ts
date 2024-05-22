export class LFUCache<K, VF> {
    private limit: number;
    private cache: Map<K, { value: VF; freq: number }>;
    private freqMap: Map<number, K[]>;
    private size: number;
    private minFreq: number;
  
    constructor(limit: number) {
      this.limit = limit;
      this.size = 0;
      this.cache = new Map();
      this.minFreq = 0;
      this.freqMap = new Map();
    }
  
    get(key: K): VF | null {
      if (!this.cache.has(key)) return null;
      const { value, freq } = this.cache.get(key)!;
      this.updateFreq(key, value, freq);
      return value;
    }
  
    private updateFreq(key: K, value: VF, freq: number): void {
      const ImageSet = this.freqMap.get(freq) || ([] as K[]);
      const newArraySet = ImageSet.filter((str: K) => str !== key);
      if (newArraySet.length > 0) {
        this.freqMap.set(freq, newArraySet);
      } else {
        this.freqMap.delete(freq);
      }
  
      // Increment frequency and update freqMap
      const newFreq = freq + 1;
      const newFreqSet = this.freqMap.get(newFreq) || [];
      newFreqSet.push(key);
      this.freqMap.set(newFreq, newFreqSet);
  
      // Update cache with new frequency
      this.cache.set(key, { value, freq: newFreq });
  
      // If the old frequency was the minimum frequency and now has no keys, increment minFreq
      if (this.minFreq === freq && this.freqMap.get(freq)?.length === 0) {
        this.minFreq++;
      }
    }
  
    put(key: K, value: VF): void {
      if (this.limit === 0) return;
  
      if (this.cache.has(key)) {
        // Update existing key
        const { freq } = this.cache.get(key)!;
        this.updateFreq(key, value, freq);
      } else {
        if (this.size === this.limit) {
          // Evict the least frequently used key
          const keysWithMinFreq = this.freqMap.get(this.minFreq) || [];
          const keyToRemove = keysWithMinFreq.shift();
          if (keyToRemove !== undefined) {
            this.cache.delete(keyToRemove);
            if (keysWithMinFreq.length > 0) {
              this.freqMap.set(this.minFreq, keysWithMinFreq);
            } else {
              this.freqMap.delete(this.minFreq);
            }
          }
          this.size--;
        }
  
        // Insert the new key
        this.cache.set(key, { value, freq: 1 });
        const newFreqSet = this.freqMap.get(1) || [];
        newFreqSet.push(key);
        this.freqMap.set(1, newFreqSet);
        this.minFreq = 1;
        this.size++;
      }
    }
  }
  