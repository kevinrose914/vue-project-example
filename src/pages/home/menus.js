const menus = [
  {
    text: '首页',
    path: '/',
    role: 1,
  },
  {
    text: '权限',
    path: '/auth',
    role: 1,
  },
  {
    text: '高级管理',
    path: '/admin',
    role: 2,
  }
];

export function getMenus(role) {
  return menus.filter(menu => menu.role <= role);
}