<template>
  <a-card title="项目技术栈" :bordered="false" size="medium">
    <a-comment
      v-for="(item, index) in list"
      :key="item.name"
      :author="item.name"
      :content="item.text"
      align="right"
      :class="'animated-fade-up-' + index"
      style="overflow: hidden"
    >
    </a-comment>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  {
    name: 'Vue3',
    text: '渐进式 JavaScript 框架'
  },
  {
    name: 'Vite2',
    text: '下一代的前端工具链'
  },
  {
    name: 'TypeScript',
    text: 'JavaScript的超集，意味着它能做JavaScript所做的一切'
  },
  {
    name: 'ArcoPro',
    text: '完善的设计开发资源'
  },
  {
    name: 'Axios',
    text: '基于 promise 的网络请求库'
  },
  {
    name: 'Fastapi',
    text: 'Python下一种现代，快速，高性能的网络框架'
  },
  {
    name: 'scikit-learn',
    text: '针对Python 编程语言的免费软件机器学习库'
  },
  {
    name: 'NLTK',
    text: '自然语言处理工具包'
  },
  {
    name: 'jieba',
    text: '强大的Python 中文分词库'
  },

]
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}
:deep(.arco-comment) {
  border-bottom: 1px solid var(--color-border-1);
  padding-bottom: 10px;
}
:deep(.arco-comment-content) {
  font-size: 12px;
  color: var(--color-text-3);
}
</style>
