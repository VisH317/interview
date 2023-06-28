import { SlatePlugin } from 'slate-vue'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(SlatePlugin as unknown as any)
})