import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as userLogin, logout as userLogout } from '@/apis'
import type { LoginParams, UserInfo } from '@/apis'
import { setToken, clearToken } from '@/utils/auth'
import { Message } from '@arco-design/web-vue'

const storeSetup = () => {
  const userInfo = ref<UserInfo>({
    name: '',
    avatar: ''
  })
  const userName = computed(() => userInfo.value.name)
  const avatar = computed(() => userInfo.value.avatar)
  // 登录
  const login = async (params: LoginParams) => {
    const res = await userLogin(params)
    console.log(res.code)
    if (res.code == -1){
      Message.error("账户和密码不匹配")
      return -1
    }
    setToken(res.data.token)
    userInfo.value = res.data.userInfo
    return 0
  }
  // 退出
  const logout = async () => {
    await userLogout()
    clearToken()
  }
  return { userInfo, userName, avatar, login, logout }
}

export const useUserStore = defineStore('user', storeSetup, { persist: true })
