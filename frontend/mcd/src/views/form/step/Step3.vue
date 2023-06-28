<template>
  <div class="step-3">
    <a-table :loading="loading" :columns="columns" :data="list" :scroll="{y: 220}" :scrollbar="true" />
    <a-divider style="border-bottom-style: dashed" />
    <a-row justify="center">
      <a-space>
        <a-button type="primary" :disabled="dis1" size="medium" @click="checkAll">评论检测</a-button>
        <a-button size="medium" :disabled="dis2" @click="addAllComents">结果入库</a-button>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts" name="Step3">
import type { StepForm2 } from './type'
import { getConments ,checkTexts ,addComment} from '@/apis'
import type { TiebaComment } from '@/apis'
import { ref } from 'vue';
import { Notification } from '@arco-design/web-vue';

const dis1 = ref(true)
const dis2 = ref(true)
const loading = ref(true)
const emit = defineEmits(['again'])
const list = ref( []as Array<TiebaComment> )
const columns = [
  {
    title: '楼层',
    dataIndex: 'floor',
    width:60
  },
  {
    title: '用户',
    dataIndex: 'user',
    width:120
  },
  {
    title: '内容',
    dataIndex: 'text',
  },
  {
    title: '恶意性',
    dataIndex: 'attack',
    default: '未检测',
    width:80
  },
];

interface Props {
  form: Readonly<StepForm2>
}

const prop = withDefaults(defineProps<Props>(), {
  form: () => ({
    tid: 0,
  })
})


const getTableData = async (tid:number) => {
  const { success, data } = await getConments({
    "tid" : tid,
    "num":20
  })
  if (success) {
    list.value = data.list
    loading.value = false
    dis1.value = false
  }
}

const checkAll = async () => {
  let texts = list.value.map( obj => {return obj.text} )
  const { success, data } = await checkTexts({
    "texts" : texts,
  })
  if(success){
    console.log(data.list[0])
    list.value.forEach(( value , index )=>{
      
      value.attack = data.list[index].attack == "0" ? "否":"是"
      value.feature = data.list[index].feature
    })
    dis2.value = false
  }
}

const addAllComents = async () =>{
  let cmts = list.value.map( obj => {return [obj.text , obj.attack == "否" ? "0":"1" ]} )
  const { success, data } = await addComment({
    "data" : cmts,
    "type":3
  })
  if (success) {
    if(data.res){
      Notification.success("数据入库成功")
    }
  }
}

getTableData(prop.form.tid)


const again = () => {
  emit('again')
}
</script>

<style lang="scss" scoped>
.step-3 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  .info-box {
    padding: 20px 50px;
    margin-bottom: 30px;
    background: var(--color-fill-1);
  }
}
</style>
