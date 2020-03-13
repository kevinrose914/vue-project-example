<template>
  <div class="home">
    <Menu :menus="menus" />
    <button @click="logout">退出登录</button>
    <router-view/>
  </div>
</template>
<script>
import Menu from '@/components/menu.vue';
import { getMenus } from './menus.js';

export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.menus = getMenus(this.$store.state.user.token.role);
  },
  mounted() {
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', () => {
        this.$router.replace('/login');
      })
    }
  },
  beforeDestroy() {
  },
  components: { Menu }
};
</script>
<style lang="less" scoped>
@import "~styles/variable.less";
.home {
  height: 100%;
}
</style>
