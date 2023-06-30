// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/image', '@nuxtjs/supabase'],
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
  },
  components: [
    { path: "~/components", extensions: ['vue'] },
    { path: "~/components/auth", extensions: ['vue'] },
    { path: "~/components/utils", extensions: ['vue'] },
  ],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vuetify/lib/styles/main.sass'
  ],
  build: {
    transpile: ['vuetify', 'tiptap-vuetify']
  },
  plugins: [
    { src: '~/plugins/TiptapVuetify', mode: 'client' }
  ]
})
