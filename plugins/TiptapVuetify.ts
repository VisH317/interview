import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(TiptapVuetifyPlugin, {
        vuetify: app.vuetify,
        iconsGroup: 'mdi'
    })
})