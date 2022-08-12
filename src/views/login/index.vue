<template>
  <n-el>
    <div class="flex login-container">
      <div class="left">
        <img :src="getAssetsFile('img_login_bg.png')" />
        <div class="content-wrapper">
          <div class="logo-wrapper">
            <img :src="getAssetsFile('logo.png')" />
          </div>
          <div class="title">{{ $t('login.title') }}</div>
          <div class="sub-title">{{ $t('login.subtitle') }}</div>
          <div class="flex-1 flex justify-center items-center ttppii">{{ $t('login.poetry') }}</div>
          <div class="bottom-wrapper">{{ $t('all.footer') }}</div>
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
  userStore.setPermissions(['good', 'simple'])
  // message.info('进入首页')
  router.replace('/')
}
</script>
<route lang="yaml">
meta:
  layout: false
  breadcrumb: page.login
  icon: gift
  sort: 100
  hidden: true
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
  width: 100%;
  height: 100vh;

  .left {
    position: relative;
    display: block;
    width: 450px;
    min-width: 450px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgb(0 0 0 / 60%);
      content: '';
    }

    .content-wrapper {
      position: absolute;
      z-index: 9;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .logo-wrapper {
        width: 80px;
        margin-top: 30%;

        img {
          width: 80px;
        }
      }

      .title {
        margin-top: 10px;
        color: #fff;
        font-size: 24px;
        font-weight: bold;
      }

      .sub-title {
        margin-top: 10px;
        color: #f5f5f5;
        font-size: 16px;
      }

      .ttppii {
        // text-shadow: 1px 1px 2px #f5f5f5;
        animation: left-to-right 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #fff;
        font-size: 30px;
        font-weight: 500;
        text-align: center;
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
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, var(--primary-color));

    .form-wrapper {
      width: 50%;
      max-width: 500px;
      padding: 20px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      box-shadow: 0 0 7px #ddd;

      .form-title {
        margin-bottom: 20px;
        font-size: 26px;
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
  overflow: hidden;
  height: 100vh;
  max-height: 100vh;
  background: linear-gradient(#7a9ad7, #3b5a94, #133064);

  // background-image: url(../../assets/img_login_mobile_bg_01.jpg);

  .header {
    display: flex;
    height: 25vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .the-p {
      display: flex;
      width: 100px;
      height: 100px;
      align-items: center;
      justify-content: center;
      border: 1px solid #f5f5f5;
      background: rgb(255 255 255 / 20%);
      border-radius: 50%;
      font-size: 56px;
      font-weight: bold;
    }
  }

  .top-line {
    height: 1px;
    background-color: #fff;
    background-image: linear-gradient(
      to right,
      rgb(117 117 117 / 90%) 25%,
      rgb(255 255 255 / 30%) 50%,
      rgb(117 117 117 / 90%) 75%
    );
  }

  .content {
    height: 40vh;
    margin: 5% 10%;
    border-radius: 10px;

    :deep(.n-input) {
      background-color: rgb(183 183 183 / 0%);
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
    right: 10%;
    bottom: 10%;
    left: 10%;

    :deep(.n-divider .n-divider__title) {
      color: #c3c3c3;
      font-size: 14px;
    }

    :deep(.n-divider:not(.n-divider--dashed) .n-divider__line) {
      background-color: rgb(117 117 117);
    }
  }
}
</style>
