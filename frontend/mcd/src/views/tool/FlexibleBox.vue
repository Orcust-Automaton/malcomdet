<template>
  <div class="shrink-box">
    <section class="left">
      <a-alert type="info">
        请输入需要检测的文本
      </a-alert>
      <div class="editor">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor
          style="height: 340px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          @onCreated="handleCreated"
        />
      </div>
      <section class="btn">
        <a-button type="outline" @click="check">点击此处开始检测</a-button>
      </section>
    </section>
    
    <GiFlexibleBox v-model="visible">
      <a-card title="检测结果" :bordered="false" class="right">
        <template #extra>
          <a-space>
            <a-button type="primary"  @click="insertComent">入库</a-button>
          </a-space>
        </template>
        <div class="content">
          <a-descriptions :column="1" size="medium">
            <a-descriptions-item label="类型">{{attack}}</a-descriptions-item>
            <a-descriptions-item label=" "></a-descriptions-item>
            <a-descriptions-item label="文本内容">{{text}}</a-descriptions-item>
            <a-descriptions-item label=" "></a-descriptions-item>
            <a-descriptions-item label="特征词语" >

                <a-space  wrap >
                  <a-tag v-for="item in list">{{item}}</a-tag>
                </a-space>
              
            </a-descriptions-item>

            
          </a-descriptions>
        </div>
      </a-card>
    </GiFlexibleBox>

  </div>
</template>

<script setup lang="ts">
import GiFlexibleBox from '@/components/GiFlexibleBox/index.vue'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { checkText , updateComment } from '@/apis'
import axios from 'axios';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Notification } from '@arco-design/web-vue';

const visible = ref(false)
const editorRef = shallowRef()
const text = ref("")
const feature = ref("")
const attack = ref("")
const attackInt = ref(0)

// 内容 HTML
const valueHtml = ref('最爱东山晴后雪，软红光里涌银山。 -- 杨万里')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const list = ref( []as Array<String> )

var config = {
  method: 'get',
  url: 'https://v1.hitokoto.cn/',
};

axios(config)
.then(function (response) {
  let data = response.data;
  valueHtml.value = data.hitokoto
})
.catch(function (error) {
  console.log(error);
});


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const check = async () => {
  visible.value = !visible.value
  text.value = valueHtml.value.replace(/<[^>]+>/g , '')
  const { success,data} = await checkText({
    "text":text.value,
    "length":text.value.length
  })
  if (success){
    feature.value = data.feature
    list.value = feature.value.split(" ")
    attackInt.value = parseInt (data.attack)
    if (data.attack == "0" ){
      attack.value = "非恶意"
    }else{
      attack.value = "恶意"
    }
  }
}

const insertComent = async() =>{
  const { success,data} = await updateComment({
    "type":1,
    "text":text.value,
    "attack":attackInt.value
  })
  if (success){
    Notification.success('添加成功!')
  }
}

</script>

<style lang="scss" scoped>
.shrink-box {
  flex: 1;
  height: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid $color-border;
  box-sizing: border-box;
  .left {
    flex: 1;
    padding: $padding;
    overflow-y: auto;
    background: var(--color-bg-2);
  }
  .right {
    width: 300px;
    height: 100%;
    border-left: 1px solid $color-border;
    .content {
      padding: 20px;
      box-sizing: border-box;
      .card {
        width: 150px;
        height: 150px;
        background-color: rgb(var(--gray-2));
        border-radius: 6px;
      }
    }
  }
}

.editor {
  border: 1px solid var(--color-border-3);
  &.w-e-full-screen-container {
    z-index: 9999;
  }
}

.btn {
  flex: 1;
  padding: $padding;
  text-align: center;
}

</style>
