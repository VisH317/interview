// plugins/vuetify.js
import createVuetify from "vuetify"
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = new createVuetify({
    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
