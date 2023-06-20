// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/image'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{rel: "icon", type: "image/png", href: "/logo.png"}],
    }
  },
  googleFonts: {
    preconnect: true,
    families: {
      Inter: true
    }
  }
})
