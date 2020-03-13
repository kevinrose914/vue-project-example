<template>
  <div class="menu-wrapper">
    <div
      class="menu"
      v-for="(menu, index) in menus"
      :key="index"
      :class="{'selected': menu.path === $route.path}"
      @click="touchMenu(menu)"
    >{{menu.text}}</div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    touchMenu(menu) {
      this.$router.push(menu.path);
    }
  }
}
</script>

<style lang="less" scoped>
.menu-wrapper {
  float: left;
  width: 210px;
  height: 100%;
  background-color: rgb(48, 65, 86);
  .menu {
    height: 56px;
    padding-left: 30px;
    line-height: 56px;
    color: #fff;
    cursor: pointer;
    &:hover, &.selected {
      background-color: #1f2d3d;
    }
  }
}
</style>
