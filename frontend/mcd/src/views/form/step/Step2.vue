<template>
  <div class="step-2">
    <a-descriptions :column="1" size="medium">
      <a-descriptions-item label="贴吧名">{{ form.tiebaName }}</a-descriptions-item>
    </a-descriptions>
    <a-list :loading="loading1" :max-height="200" :hoverable="true" size="small">
      <a-list-item v-for="item in list">{{item.name}}</a-list-item>
    </a-list>

    <a-divider style="border-bottom-style: dashed" />

    <a-form ref="formRef" size="medium" :model="step2Form" auto-label-width>
      <a-form-item  field="tid" label="帖子名" >
        <a-select v-model="step2Form.tid" :style="{width:'320px'}"  placeholder="请选择帖子" :options="list" :field-names="fieldNames" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" :loading="loading" @click="next">下一步</a-button>
          <a-button @click="prev">上一步</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="Step2">
import { nextTick, reactive, ref } from 'vue'
import { Notification, type Form } from '@arco-design/web-vue'
import type { StepForm1 } from './type'
import { getThread } from '@/apis'
import type { TiebaThread } from '@/apis'

const emit = defineEmits(['next', 'prev'])
const list = ref( []as Array<TiebaThread> )
const fieldNames = {value: 'tid', label: 'name'}

interface Props {
  form: Readonly<StepForm1>
}

const prop = withDefaults(defineProps<Props>(), {
  form: () => ({
    tiebaName: '',
  })
})


const step2Form = reactive({
  tid: NaN
})

const loading = ref(false)
const loading1 = ref(true)
const formRef = ref<InstanceType<typeof Form>>()

const getTableData = async (name:string) => {
  const { success, data } = await getThread({
    "name" : name,
    "num":20
  })
  if (success) {
    list.value = data.list
    loading1.value = !loading1.value
  }
}

getTableData(prop.form.tiebaName)

// 下一步|提交
const next = () => {
  if(!step2Form.tid){
    Notification.warning("请选择帖子")
    return
  }
  nextTick(async () => {
    try {
      loading.value = true
      const res = await formRef.value?.validate()
      if (!res) {
        setTimeout(() => {
          emit('next' , step2Form)
          loading.value = false
        }, 1000)
      } else {
        loading.value = false
      }
    } catch (error) {
      return error
    }
  })
}

// 上一步
const prev = () => {
  emit('prev')
}
</script>

<style lang="scss" scoped>
.step-2 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
