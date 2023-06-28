<template>
  <div class="detail" ref="containerRef">
    <a-affix :target="(containerRef as HTMLElement)">
      <a-page-header title="接口详情" subtitle="API" class="head">
      </a-page-header>
    </a-affix>

    <a-card title="基本接口" :bordered="false" class="item">
      <a-descriptions :column="1">
        <a-descriptions-item label="接口">/api/textcheck/</a-descriptions-item>
        <a-descriptions-item label="请求类型">Post</a-descriptions-item>
        <a-descriptions-item label="说明">给定单个语句判断句子的恶意性。</a-descriptions-item>
        <a-descriptions-item label="请求样例"><JsonEditorVue class="editor" v-model="jsonData1" /></a-descriptions-item>
        <a-descriptions-item label="返回样例"><JsonEditorVue class="editor" v-model="jsonData3" /></a-descriptions-item>

      </a-descriptions>
    </a-card>

    <a-card title="基本接口" :bordered="false" class="item">
      <a-descriptions :column="1">
        <a-descriptions-item label="接口">/api/textscheck/</a-descriptions-item>
        <a-descriptions-item label="请求类型">Post</a-descriptions-item>
        <a-descriptions-item label="说明">给定多个语句判断句子的恶意性。</a-descriptions-item>
        <a-descriptions-item label="请求样例"><JsonEditorVue class="editor" v-model="jsonData2" /></a-descriptions-item>
        <a-descriptions-item label="返回样例"><JsonEditorVue class="editor" v-model="jsonData4" /></a-descriptions-item>
      </a-descriptions>
    </a-card>

  </div>
</template>

<script setup lang="ts" name="BaseDetail">
import { ref } from 'vue'
import JsonEditorVue from 'json-editor-vue3'

const containerRef = ref<HTMLElement | null>()

const jsonData1 = ref(
  {
  text: "最爱东山晴后雪，软红光里涌银山。" , 
  length: 16
}
)

const jsonData2 = ref(
{
  texts: [
    "最爱东山晴后雪，软红光里涌银山。",
    "运伟大之思者，必行伟大之迷途。"
  ] , 
}
)

const jsonData3 = ref(
{
  code:0 , 
  data:{
    attack:0,
    feature :"最 爱 里"
  },
  message: '请求成功',
  success: true
}
)

const jsonData4 = ref(
{
  code:0 , 
  data:{
    totol:2,
    list :[
      {
        attack:0,
        feature :"最 爱 里"
      },
      {
        attack:0,
        feature :"伟大 之"
      }
    ]
  },
  message: '请求成功',
  success: true
}
)

</script>



<style lang="scss" scoped>
.detail {
  overflow: auto;
  .head {
    background: var(--color-bg-1);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  }
  .item {
    margin: $margin;
    background: var(--color-bg-1);
    border-radius: 2px;
    box-sizing: border-box;
  }
}
</style>
