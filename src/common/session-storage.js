class Session {
  constructor() {
    this.prefix = '_VUE_EXAMPLE_';
    this.storage = window.sessionStorage;
  }

  get(key) {
    return JSON.parse(this.storage.getItem(this.prefix + key));
  }

  set(key, value) {
    this.storage.setItem(this.prefix + key, JSON.stringify(value));
  }

  remove(key) {
    this.storage.removeItem(this.prefix + key);
  }
}

export default new Session();
