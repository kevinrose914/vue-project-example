<template>
  <transition name="dialog">
    <div class="message-box" v-show="visible">
      <div class="content">{{text}}</div>
      <div class="confirm" @click="comfirm">确定</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'message-box',
  props: {
    closeCallback: {
      type: Function,
      default: null
    },
    text: {
      type: String,
      default: '请输入提示语'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
  },
  methods: {
    comfirm() {
      this.close();
      // if (this.closeCallback) {
      //   this.closeCallback();
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(48, 65, 86);
  min-height: 140px;
  min-width: 300px;
  border-radius: 5px;
  color: #fff;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .confirm {
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #fff;
    line-height: 60px;
  }
}
.dialog-enter, .dialog-leave-to {
  opacity: 0;
}
.dialog-enter-active, .dialog-leave-active {
  transition: opacity .5s;
}
</style>
