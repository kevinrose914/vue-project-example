<template>
  <div class="login">
    <div class="container">
      <h3>系统登录</h3>
      <div class="form-item user-name transition">
        <i class="icon fl" :class="{'focus': pageUiConfig.isUserNameFocus}"></i>
        <i class="colon fl"></i>
        <input
          type="text"
          class="fl transition"
          v-model="userName"
          placeholder="用户名"
          @focus="focusEvent('username')"
          @blur="pageUiConfig.isUserNameFocus = false"
          @input="inputValueChange"
          autocomplete="new-password"
        />
        <div class="warn inline-middle" v-if="pageUiConfig.isNameError">
          <span>*用户名错误</span>
        </div>
      </div>
      <div class="form-item password transition">
        <i class="icon fl" :class="{'focus': pageUiConfig.isPasswordFocus}"></i>
        <i class="colon fl"></i>
        <input
          type="password"
          class="fl transition"
          v-model="password"
          placeholder="登录密码"
          @focus="focusEvent('password')"
          @blur="pageUiConfig.isPasswordFocus = false"
          @keyup.enter="login"
          @input="inputValueChange"
          autocomplete="new-password"
        />
        <div class="warn inline-middle" v-if="pageUiConfig.isPasswordError">
          <span>*密码错误</span>
        </div>
      </div>
      <div class="bot-bar" :class="{'haveErrorMsg': httpErrorMsg}">
        <div class="fl btn transition" @click="login">
          登录
        </div>
      </div>
      <div class="message">*用户名只能为admin或者user，密码随便填。admin进入页面后，可以在菜单中看到高级管理，user看不到</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: 'admin', // admin, user
      password: '123',
      pageUiConfig: {
        isUserNameFocus: false,
        isPasswordFocus: false,
        isNameError: false,
        isPasswordError: false,
        isLogging: false, // 正在登陆
      },
      httpErrorMsg: '', // 错误提示
    };
  },
  mounted() {
    console.log(this.userName);
  },
  methods: {
    // input聚焦事件
    focusEvent(type) {
      if (type === 'username') {
        this.pageUiConfig.isUserNameFocus = true;
        this.pageUiConfig.isNameError = false;
      } else {
        this.pageUiConfig.isPasswordFocus = true;
        this.pageUiConfig.isPasswordError = false;
      }
    },
    inputValueChange() {
      this.httpErrorMsg = '';
    },
    // 登陆
    login() {
      if (!this.verify()) {
        return;
      }
      const data = {
        username: this.userName,
        password: this.password,
        role: this.userName === 'admin' ? 2 : 1,
      };
      this.httpErrorMsg = '';
      this.$messageBox({
        data: {
          text: '登陆成功！',
        },
        config: {
          closeCallback: () => {
            this.$store.commit('SET_TOKEN', data);
            this.$store.commit('SET_LOGGENIN', true);
            this.$router.replace('/');
          },
        },
      });
    },
    // 登陆时候校验
    verify() {
      let name = this.userName.trim();
      if (!name) {
        this.pageUiConfig.isNameError = true;
      } else {
        if (name !== 'admin' && name !== 'user') {
          this.pageUiConfig.isNameError = true;
          return false;
        }
      }
      this.pageUiConfig.isPasswordError = !this.password.trim();
      return !!name && !!this.password.trim();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
@content_width: 470px;
@content_width_1440: 410px;
.login {
  overflow: hidden;
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all .5s;
    @media screen and (min-width: 1442px) {
      top: 41%;
    }
    @media screen and (min-width: 1920px) {
      top: 120px;
      transform: translate(-50%, 0);
    }
    @media screen and (min-width: 2140px) {
      top: 240px;
      transform: translate(-50%, 0);
    }
  }
  h3 {
    // margin-top: 120px;
    // margin-top: 4%;
    text-align: center;
    font-size: 28px;
    color: @color-regular;
  }
  .form-item {
    height: 48px;
    width: @content_width;
    margin: 40px auto 0;
    border: 1px solid @color-regular;
    border-radius: 4px;
    background: #fff;
    line-height: 48px;
    position: relative;
    @media screen and (max-width: 1440px) {
      height: 40px;
      line-height: 40px;
      width: @content_width_1440;
      margin: 30px auto 0;
    }
    &.user-name {
      .icon {
        background: url('./assets/icon_user@2x.png') no-repeat center;
        background-size: 100%;
        @media screen and ( -webkit-min-device-pixel-ratio : 2 ){
          background: url('./assets/icon_user@3x.png') no-repeat center;
          background-size: 100%;
        }
        &.focus {
          background: url('./assets/icon_user_black@2x.png') no-repeat center;
          @media screen and ( -webkit-min-device-pixel-ratio : 2 ){
            background: url('./assets/icon_user_black@3x.png') no-repeat center;
            background-size: 100%;
          }
        }
      }
    }
    &.password {
      .icon {
        background: url('./assets/icon_lock@2x.png') no-repeat center;
        background-size: 100%;
        @media screen and ( -webkit-min-device-pixel-ratio : 2 ){
          background: url('./assets/icon_lock@3x.png') no-repeat center;
          background-size: 100%;
        }
        &.focus {
          background: url('./assets/icon_lock_black@2x.png') no-repeat center;
          @media screen and ( -webkit-min-device-pixel-ratio : 2 ){
            background: url('./assets/icon_lock_black@3x.png') no-repeat center;
            background-size: 100%;
          }
        }
      }
      margin: 30px auto 0;
      @media screen and (max-width: 1440px) {
        margin: 20px auto 0;
      }
    }
    .icon {
      width: 14px;
      height: 16px;
      margin-top: 16px;
      margin-left: 24px;
      @media screen and (max-width: 1440px) {
        margin-top: 12px;
      }
    }
    .colon {
      height: 16px;
      width: 1px;
      margin: 16px 30px 0 40px;
      background: #bfbfbf;
      @media screen and (max-width: 1440px) {
        margin: 12px 30px 0 40px;
      }
    }
    input {
      height: 100%;
      width: 349px;
      padding: 0 10px;
      border-radius: 0 4px 4px 0;
      font-size: 15px;
      color: @color-regular;
      &::-webkit-input-placeholder {
        font-size: 15px;
        color: @color-low;
      }
      @media screen and (max-width: 1440px) {
        width: 289px;
      }
    }
    .warn {
      position: absolute;
      left: 510px;
      top: 0;
      bottom: 0;
      width: 216px;
      text-align: left;
      font-size: 14px;
      color: @color-warn;
      line-height: 20px;
      @media screen and (max-width: 1440px) {
        left: 450px;
      }
    }
  }

  .options {
    width: @content_width;
    font-size: 15px;
    color: @color-regular;
    margin: 20px auto 0;
    overflow: hidden;
    @media screen and (max-width: 1440px) {
      width: @content_width_1440;
      margin: 14px auto 0;
    }
  }

  .http-error-msg {
    width: @content_width;
    font-size: 14px;
    color: @color-warn;
    margin: 30px auto 0;
    overflow: hidden;
    text-align: left;
    @media screen and (max-width: 1440px) {
      width: @content_width_1440;
    }
  }

  .bot-bar {
    margin: 40px auto 0;
    width: @content_width;
    overflow: hidden;
    font-size: 15px;
    &.haveErrorMsg {
      margin: 30px auto 0;
    }
    @media screen and (max-width: 1440px) {
      width: @content_width_1440;
      margin: 30px auto 0;
    }
    .btn {
      width: 100%;
      height: 48px;
      border-radius: 4px;
      color: #fff;
      line-height: 48px;
      background: #1890ff;
      cursor: pointer;
    }
  }

  .message {
    white-space: nowrap;
    margin-top: 10px;
  }
}
</style>
