<template>
  <a-layout-sider collapsible breakpoint="xl" :width="232" class="asider">
    <a-menu
      :selected-keys="[activeKey]"
      :default-open-keys="['Workplace']"
      :auto-open-selected="true"
      :style="{ width: '100%', height: '100%' }"
    >
      <LoopMenuItem
        v-for="item in menuStore.menuTree"
        :key="item.name"
        :data="item"
        @click="handleClickItem"
      ></LoopMenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts" name="Asider">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoopMenuItem from './MenuItem.vue'
import { useMenuStore } from '@/store'

const route = useRoute()
const router = useRouter()

const menuStore = useMenuStore()

const getMenuKeys = (params: MenuItem[]) => {
  const data: string[] = []
  function forTree(arr: MenuItem[]) {
    arr.forEach((item: MenuItem) => {
      if (item.path) {
        data.push(item.path)
      }
      if (item.children?.length) {
        forTree(item.children)
      }
    })
  }
  forTree(params)
  return data
}

const activeKey = ref('Workplace')
const menuKeyList = getMenuKeys(menuStore.menuTree)

watch(
  () => route.path,
  () => {
    if (menuKeyList.includes(route.path)) {
      activeKey.value = route.path
    }
  },
  { immediate: true }
)

const handleClickItem = (item: MenuItem) => {
  if (!item.path) return
  if (item.path === '/file') {
    router.push({ path: item.path, query: { fileType: 0 } })
  } else {
    router.push({ path: item.path })
  }
  if (menuKeyList.includes(item.path)) {
    activeKey.value = item.path
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  .arco-menu-title {
    display: none;
  }
}

.asider {
  z-index: 1000;
}
</style>
