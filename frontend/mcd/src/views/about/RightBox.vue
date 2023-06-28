<template>
  <div class="right-box">
    <section class="head-box">
      <a href="http://niyah.cn" target="_blank"><a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
        <img :src="userStore.userInfo.avatar" />
      </a-avatar></a>
      <section class="user-name">{{ userStore.userName }}</section>
      <section class="label-list">
        <div><icon-user /><span>安全技术研究员</span></div>
        <div><icon-safe /><span>安全</span></div>
        <div><icon-location /><span>杭州</span></div>
      </section>
      <a-space :size="5">
        <a-tag>Pwn</a-tag>
        <a-tag>IoV</a-tag>
        <a-tag>Vue</a-tag>
        <a-tag>No Game No Life</a-tag>
      </a-space>
    </section>

    <a-tabs hide-content default-active-key="1">
      <a-tab-pane key="1">
        <template #title>文章</template>
      </a-tab-pane>
    </a-tabs>

    <section class="comment-box">
      <a-comment
        v-for="(item, index) in list"
        :key="index"
        :author="item.name"
        datetime="2022-11-04"
        align="right"
        class="comment-item"
      >

        <template #content>
          <div class="text">{{ item.text }}</div>
        </template>
      </a-comment>
    </section>
  </div>

</template>

<script setup lang="ts" name="UserCenter">
import { useUserStore } from '@/store'
const userStore = useUserStore()

const list = [
  {
    name: '学习',
    text: '教你学内核-d3kheap'
  },
  {
    name: '学习',
    text: '教你学内核-tty,seq结构体利用'
  },
  {
    name: '学习',
    text: '教你学内核-linux kernel ROP 下的保护绕过'
  },
  {
    name: '学习',
    text: '教你学内核-sudrv'
  },

]
</script>

<style lang="scss" scoped>
.edit-btn {
  color: #fff;
  border-color: #fff;
  background: transparent;
  &:hover {
    background: rgb(var(--primary-5));
    border-color: rgb(var(--primary-5));
  }
}

.right-box {
  flex: 1;
  margin: $margin;
  margin-left: 0;
  background-color: var(--color-bg-1);
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
}

.head-box {
  min-height: 204px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  background-color: rgb(var(--primary-6));
  .user-name {
    font-size: 16px;
    font-weight: 500;
    margin: 10px 0;
  }
  .label-list {
    display: flex;
    margin-bottom: 10px;
    > div {
      margin-right: 15px;
      span {
        margin-left: 2px;
      }
    }
  }
}

.comment-box {
  flex: 1;
  padding: 20px 30px;
  padding-left: 16px;
  overflow: auto;
  .comment-item {
    margin-bottom: 15px;
    .text {
      color: $color-text-2;
    }
  }
}
</style>
