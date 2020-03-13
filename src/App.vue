<template>
  <div id="app">
    <div class="app-container">
      <div class="main-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isHome: false, // 用来显示首页图片在头部下边
    };
  },
  watch: {
    $route(to) {
      if (to.name === 'home') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '~styles/variable.less';
#app{
  background-color: #ffffff;
  .app-container{
    .main-container{
      position: relative;
      height: 100vh;
    }
  }
}
</style>
