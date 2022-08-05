<template>
  <n-el>
    <div class="flex login-container">
      <div class="left">
        <img :src="getAssetsFile('img_login_bg.png')" />
        <div class="content-wrapper">
          <div class="logo-wrapper">
            <img :src="getAssetsFile('logo.png')" />
          </div>
          <div class="title">{{ $t('title') }}</div>
          <div class="sub-title">{{ $t('description') }}</div>
          <div class="flex-1 flex justify-center items-center ttppii">{{ $t('description') }}</div>
          <div class="bottom-wrapper">{{ $t('description') }}</div>
        </div>
      </div>
      <div class="right">
        <n-button @click="hasLogin">模拟跳转</n-button>
      </div>
    </div>
  </n-el>
</template>

<script setup lang="ts" name="login">
import { createDiscreteApi } from 'naive-ui'
import getAssetsFile from '@/plugins/assets-kit'
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'
const userStore = useUserStore()

const router = useRouter()
const { message } = createDiscreteApi(['message'])
// https://segmentfault.com/a/1190000024541398   Reflect API

function hasLogin() {
  message.loading('转圈圈...')
  userStore.setToken('ashdyjdgfjjfhkgjfkjhdjfh')
  // message.info('进入首页')
  router.replace('/')
}
</script>
<route lang="yaml">
meta:
  layout: false
  breadcrumb: login
  icon: color
  sort: 100
  hidden: true
  alwaysShow: false
</route>
<style lang="scss" scoped>
@keyframes left-to-right {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.login-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;

  .left {
    display: block;
    position: relative;
    min-width: 450px;
    width: 450px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 2;
    }

    .content-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .logo-wrapper {
        width: 80px;
        margin-top: 30%;

        img {
          width: 80px;
        }
      }

      .title {
        margin-top: 10px;
        color: #ffffff;
        font-weight: bold;
        font-size: 24px;
      }

      .sub-title {
        margin-top: 10px;
        color: #f5f5f5;
        font-size: 16px;
      }

      .ttppii {
        color: #ffffff;
        font-weight: 500;
        font-size: 30px;
        // text-shadow: 1px 1px 2px #f5f5f5;
        animation: left-to-right 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-shadow: 0 0 5px var(--primary-color), 0 0 15px var(--primary-color), 0 0 50px var(--primary-color),
          0 0 150px var(--primary-color);
      }

      .bottom-wrapper {
        margin-bottom: 5%;
        color: #c0c0c0;
        font-size: 16px;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to bottom, var(--primary-color));

    .form-wrapper {
      width: 50%;
      max-width: 500px;
      border-radius: 5px;
      border: 1px solid #f0f0f0;
      padding: 20px;
      box-shadow: 0px 0px 7px #dddddd;

      .form-title {
        font-size: 26px;
        margin-bottom: 20px;
        font-weight: bold;
      }

      .item-wrapper {
        width: 100%;
      }

      .login {
        width: 100%;
      }
    }

    .third-login {
      width: 50%;
    }
  }
}

.m-login-container {
  position: relative;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background: linear-gradient(#7a9ad7, #3b5a94, #133064);

  // background-image: url(../../assets/img_login_mobile_bg_01.jpg);
  .header {
    height: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .the-p {
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid #f5f5f5;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 56px;
      font-weight: bold;
    }
  }

  .top-line {
    background-image: linear-gradient(
      to right,
      rgba(117, 117, 117, 0.9) 25%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(117, 117, 117, 0.9) 75%
    );
    height: 1px;
    background-color: #ffffff;
  }

  .content {
    height: 40vh;
    margin: 5% 10%;
    border-radius: 10px;

    :deep(.n-input) {
      background-color: rgba(183, 183, 183, 0);
    }

    :deep(.n-input .n-input__input-el, .n-input .n-input__textarea-el) {
      color: #fff;
    }

    :deep(.n-checkbox .n-checkbox__label) {
      color: #fff;
    }
  }

  .footer {
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: 10%;

    :deep(.n-divider .n-divider__title) {
      color: #c3c3c3;
      font-size: 14px;
    }

    :deep(.n-divider:not(.n-divider--dashed) .n-divider__line) {
      background-color: rgba(117, 117, 117);
    }
  }
}
</style>
