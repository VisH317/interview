import VueTippy, { directive } from "vue-tippy"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueTippy)
    // nuxtApp.vueApp.directive("tippy", directive)
})