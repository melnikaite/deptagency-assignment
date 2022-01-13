/*
    Key-value in memory temporary storage
 */

import logger from "loglevel";

class MemoryCache {
  constructor() {
    this.cache = {};
    this.itemsLimit = 10000;
    this.memoryLimit = 100;
    this.timeout = 1000 * 60 * 60; // 1h

    setInterval(() => {
      this.checkValidity();
      this.checkMemory();
      this.checkItemsCount();
    }, this.timeout);
  }

  put(key, data) {
    this.cache[key] = { data, ttl: Date.now() + this.timeout };
  }

  get(key) {
    const isCached = this.cache.hasOwnProperty(key) && this.isValid(key);
    return isCached ? this.cache[key].data : null;
  }

  delete(key) {
    if (this.cache.hasOwnProperty(key)) {
      delete this.cache[key];
    }
  }

  checkValidity() {
    const keys = Object.keys(this.cache);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (this.cache.hasOwnProperty(key) && !this.isValid(key)) {
        this.delete(key);
      }
    }
  }

  checkMemory() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024; // MB
    if (used > this.memoryLimit) {
      logger.warn(
        `Current process use ${used}MB of memory. Server will flush cache.`
      );
      this.cache = {};
    }
  }

  checkItemsCount() {
    const totalKeys = Object.keys(this.cache).length;
    if (totalKeys > this.itemsLimit) {
      logger.warn(
        `Current process use ${totalKeys} cached items. Server will flush cache.`
      );
      this.cache = {};
    }
  }

  isValid(key) {
    return this.cache[key].ttl > Date.now();
  }
}

export default new MemoryCache();
