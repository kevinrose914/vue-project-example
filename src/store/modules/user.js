import storage from 'common/storage';
import TokenClass from 'common/token';
/* eslint-disable */
import Router from '../../router/index';
import { object2String } from 'common/utils';

const USER = 'User';

const user = {
  state: {
    token: TokenClass.getToken() || {}, // 用户信息
    isLoggedIn: TokenClass.isLoggedIn(), // 用户是否登录
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      storage.set(USER, token, token.expires_in * 24 * 60 * 60 * 1000);
      state.token = token;
    },
    REMOVE_TOKEN: (state) => {
      storage.remove(USER);
      state.token = null;
    },
    SET_LOGGENIN: (state, bool) => {
      state.isLoggedIn = bool;
    },
  },
  actions: {
    login({ commit }, data, mask) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', res);
        commit('SET_LOGGENIN', true);
        if (baseData.rememberMe) {
          storage.foreverSet('Username', baseData.username);
        }
        resolve(res);
      });
    },
    logout({ commit }, callback) {
      commit('REMOVE_TOKEN', null);
      commit('SET_LOGGENIN', false);
      if (callback) {
        callback();
      }
    },
  },
};

export default user;
