import router from '../router/index';
import store from '../store/index';

const nextFunc = (next, path) => {
  next({
    path,
  });
};

// 判断页面是否有权进入
const entryAuthVarify = (to, next) => {
  const { role } = to.meta;
  const { token } = store.state.user;
  if (token.role < role) {
    router.go(-1)
  } else {
    next()
  }
};

// 已经登陆
const loggedInBranch = {
  init(to, next) {
    if (to.path === '/login') {
      next('/');
    } else {
      entryAuthVarify(to, next);
    }
  },
};
// 未登录
const notLoggedInBranch = {
  init(to, next) {
    if (to.matched.some(record => record.meta.auth) && to.path !== '/login') {
      nextFunc(next, '/login');
    } else {
      next();
    }
  },
};

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = store.state.user;
  if (!isLoggedIn) {
    notLoggedInBranch.init(to, next);
  } else {
    loggedInBranch.init(to, next);
  }
});
