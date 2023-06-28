<template>
  <div class="step-1">
    <a-form ref="formRef" :model="form" size="medium" auto-label-width>
      <a-form-item field="tiebaName" label="贴吧名" :rules="rules.tiebaName">

        <a-select v-model="form.tiebaName" allow-create placeholder="请选择贴吧">
          <a-option v-for="item in list">{{item}}</a-option>
        </a-select>
        
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="Step1">
import { reactive, ref, nextTick } from 'vue'
import type { Form } from '@arco-design/web-vue'
import type { StepForm1 } from './type'
import { getBar } from '@/apis'

const emit = defineEmits(['next'])
const list = ref( []as Array<String> )

const form: StepForm1 = reactive({
  tiebaName: '',
})


const getTableData = async () => {
  const { success, data } = await getBar()
  if (success) {
    list.value = data.list
  }
}

const formRef = ref<InstanceType<typeof Form>>()

const rules = {
  tiebaName: [{ required: true, message: '请输入吧名' }]
}

// 下一步
const next = () => {
  nextTick(async () => {
    const res = await formRef.value?.validate()
    if (!res) {
      emit('next', form)
    }
  })
}

getTableData()

</script>

<style lang="scss" scoped>
.step-1 {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
