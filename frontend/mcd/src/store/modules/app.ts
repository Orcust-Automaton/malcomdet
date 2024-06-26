import { defineStore } from 'pinia'
import { reactive, computed, toRefs } from 'vue'
import { generate, getRgbStr } from '@arco-design/color'
import defaultSettings from '@/config/setting.json'
import type { TabModeType, animateModeType } from '@/config/option'

interface ThemeState {
  theme: 'light' | 'dark'
  themeColor: string
  header: boolean
  footer: boolean
  menu: boolean
  hideMenu: boolean
  menuWidth: number
  menuCollapse: boolean
  tab: boolean
  tabMode: TabModeType
  animate: boolean
  animateMode: animateModeType
}

const storeSetup = () => {
  // App配置
  const settingConfig: any = reactive({ ...defaultSettings })
  // 页面切换动画类名
  const transitionName = computed(() => {
    return settingConfig.animate ? settingConfig.animateMode : ''
  })

  // 切换主题  暗黑模式|简白模式
  const toggleTheme = (dark: boolean) => {
    if (dark) {
      settingConfig.theme = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      settingConfig.theme = 'light'
      document.body.removeAttribute('arco-theme')
    }
    setThemeColor(settingConfig.themeColor)
  }
  // 设置主题色
  const setThemeColor = (color: string) => {
    if (!color) return
    settingConfig.themeColor = color
    const list = generate(settingConfig.themeColor, { list: true, dark: settingConfig.theme === 'dark' })
    list.forEach((color: string, index: number) => {
      const rgbStr = getRgbStr(color)
      document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
    })
  }
  // 设置页签可见
  const setTabVisible = (visible: boolean) => {
    settingConfig.tab = visible
  }
  // 设置页签的样式类型
  const setTabMode = (mode: TabModeType) => {
    settingConfig.tabMode = mode
  }
  // 设置是否使用过渡动画
  const setAnimateVisible = (visible: boolean) => {
    settingConfig.animate = visible
  }
  // 设置页面过渡动画类型
  const setAnimateMode = (mode: animateModeType) => {
    settingConfig.animateMode = mode
  }

  return {
    ...toRefs<ThemeState>(settingConfig),
    transitionName,
    toggleTheme,
    setThemeColor,
    setTabVisible,
    setTabMode,
    setAnimateVisible,
    setAnimateMode
  }
}

export const useAppStore = defineStore('app', storeSetup, { persist: true })
