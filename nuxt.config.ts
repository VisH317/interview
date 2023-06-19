// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{"rel": "icon", type: "image/png", href: "/logo.png"}]
    }
  }
})
