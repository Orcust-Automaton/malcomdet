import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './modules/app'
export * from './modules/navtab'
export * from './modules/user'
export * from './modules/menu'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
