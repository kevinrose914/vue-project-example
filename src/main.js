import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.less';
import 'common/routerConfig';
// 弹出框
import messageBox from './common/message-box/message-box';

Vue.use(messageBox);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
