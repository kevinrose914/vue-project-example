// 用户鉴权
import StorageService from './storage';

class Token {
  constructor() {
    this.prefix = 'User';
    this.user = this.getLocalUser();
  }

  isLoggedIn() {
    const user = this.getLocalUser();
    return (!!user && !!user.username);
  }

  getToken() {
    const user = this.getLocalUser();
    return user;
  }

  getProfile() {
    this.user = this.getLocalUser();
    return this.user || {};
  }

  getLocalUser() {
    return StorageService.get(this.prefix);
  }
}

export default new Token();
