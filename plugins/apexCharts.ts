import VueApexCharts from "vue-apexcharts"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueApexCharts)
    nuxtApp.vueApp.component("apexchart", VueApexCharts)
})
