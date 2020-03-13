class Storage {
  constructor() {
    this.prefix = '_VUE_EXAMPLE_';
    this.expiry = 86400000; // 24h
    this.storage = window.localStorage;
  }

  set(key, value, expiry) {
    const tempExpiry = +expiry || this.expiry;
    const cacheObject = JSON.stringify({
      expiry: +new Date() + tempExpiry,
      data: value,
    });
    this.storage.setItem(this.prefix + key, cacheObject);
    return value;
  }

  foreverSet(key, value) {
    const cacheObject = JSON.stringify({
      data: value,
    });
    this.storage.setItem(this.prefix + key, cacheObject);
    return value;
  }

  get(key, nullCallback) {
    const tempKey = this.prefix + key;
    const cache = this.storage.getItem(tempKey);
    if (cache) {
      const object = JSON.parse(cache);
      const dataNow = new Date().getTime();
      if (object.expiry && object.expiry < dataNow) {
        return this.storage.removeItem(tempKey);
      }
      return object.data;
    }
    if (typeof nullCallback === 'function') {
      return nullCallback(tempKey);
    }
    return null;
  }

  foreverGet(key, nullCallback) {
    const tempKey = this.prefix + key;
    const cache = this.storage.getItem(tempKey);
    if (cache) {
      const object = JSON.parse(cache);
      return object.data;
    }
    if (typeof nullCallback === 'function') {
      return nullCallback(tempKey);
    }
    return null;
  }

  remove(key) {
    this.storage.removeItem(this.prefix + key);
  }
}

export default new Storage();
