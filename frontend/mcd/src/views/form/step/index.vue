<template>
  <div class="step-form">
    <section class="form-box">
      <a-steps :current="current">
        <a-step >选择贴吧</a-step>
        <a-step >选择帖子</a-step>
        <a-step >查看评论</a-step>
      </a-steps>

      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive>
          <component :is="ComponentMap[current]" :form="form" @next="next" @prev="prev" @again="current = 1" />
        </keep-alive>
      </transition>
    </section>
  </div>
</template>

<script setup lang="ts" name="StepForm">
import { ref } from 'vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import type { StepForm } from './type'

type T_ComponentMap = { [key: string]: typeof Step1 | typeof Step2 | typeof Step3 }
const ComponentMap: T_ComponentMap = {
  1: Step1,
  2: Step2,
  3: Step3
}

const current = ref(1)
const form = ref<StepForm>({
  payAccount: '',
  recAccount: '',
  payType: 1,
  recName: '',
  amount: ''
})

const next = (formData: StepForm) => {
  current.value++
  if (formData) {
    form.value = formData
  }
}

const prev = () => {
  current.value--
}
</script>

<style lang="scss" scoped>
.step-form {
  flex: 1;
  margin: $margin;
  padding: $padding;
  background: var(--color-bg-1);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .form-box {
    width: 80%;
    min-width: 500px;
    margin-top: 30px;
    flex-shrink: 0;
  }
}
</style>
