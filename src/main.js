import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.less';
import './router/routerConfig';
import mixins from './common/mixins';
// 弹出框
import messageBox from './common/message-box/message-box';

Vue.use(messageBox);
// 自定义指令
import './directives/directives';
// 自定义过滤器
import './filters/filter';
// 全局混淆
Vue.mixin(mixins);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
