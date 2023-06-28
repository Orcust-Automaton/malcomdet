<template>
  <div class="test">
    <FlexibleBox></FlexibleBox>
  </div>
</template>

<script lang="ts" setup name="Test">
import FlexibleBox from './FlexibleBox.vue'
</script>

<style lang="scss" scoped>

.test {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
}
</style>
