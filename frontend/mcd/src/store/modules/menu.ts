import { defineStore } from 'pinia'
import { ref } from 'vue'

interface MenuState {
  menuTree: MenuItem[]
}

const storeSetup = () => {
  const menuTree = ref([
    {
      icon: 'menu-work',
      id: 'YBP',
      name: '首页',
      path: '/dashboard/',
      keepAlive: false,
      hidden: false,
      children: [
        {
          id: 'GZT',
          name: '工作台',
          path: '/dashboard/workplace',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-test',
      id: 'Tool',
      name: '基础功能',
      path: '/tool',
      keepAlive: false,
      hidden: false,
      children: [
        {
          id: 'PLJC',
          name: '评论检测',
          path: '/tool',
          keepAlive: false,
          hidden: false
        }
      ]
    },
    {
      icon: 'menu-result',
      id: 'BDGL',
      name: '评论爬取',
      path: '/form',
      keepAlive: true,
      hidden: false,
      children: [
        {
          id: 'tbPL',
          name: '贴吧评论',
          path: '/form/step',
          keepAlive: false,
          hidden: false
        },
        // {
        //   id: 'wbPL',
        //   name: '微博评论',
        //   path: '/form/base',
        //   keepAlive: false,
        //   hidden: true
        // },
      ]
    },
    {
      icon: 'menu-detail',
      id: 'BGGL',
      name: '日志查看',
      path: '/log',
      keepAlive: true,
      hidden: false,
    },
    {
      icon: 'menu-system',
      id: 'JKCK',
      name: '接口查看',
      keepAlive: false,
      hidden: false,
      path: '/interface',
    },
    {
      icon: 'menu-about',
      id: 'ABOUT',
      name: '关于我',
      path: '/about',
      keepAlive: false,
      hidden: false
    }
  ])
  return { menuTree }
}

export const useMenuStore = defineStore('menu', storeSetup, { persist: false })
