<template>
  <div class="user-center">
    <RightBox></RightBox>
  </div>
</template>

<script setup lang="ts" name="UserCenter">
import RightBox from './RightBox.vue'

</script>

<style lang="scss" scoped>
.user-center {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  margin: $margin;
  padding: $padding;
  box-sizing: border-box;
  background: var(--color-bg-1);
  border-radius: 2px;
}

</style>
