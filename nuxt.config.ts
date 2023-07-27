import vuetify from "vite-plugin-vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@nuxt/image",
        "@nuxtjs/supabase",
        // async (options, nuxt) => {
        //   nuxt.hooks.hook("vite:extendConfig", (config) =>
        //     // @ts-ignore
        //     config.plugins.push(vuetify())
        //   );
        // }
    ],
    devtools: { enabled: true },
    app: {
        head: {
            link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
        },
    },
    googleFonts: {
        preconnect: true,
        families: {
            Inter: true,
        },
    },
    components: [
        { path: "~/components", extensions: ["vue"] },
        { path: "~/components/auth", extensions: ["vue"] },
        { path: "~/components/utils", extensions: ["vue"] },
        { path: "~/components/tools", extensions: ["vue"] },
        { path: "~/components/sidebar", extensions: ["vue"] },
        { path: "~/components/note", extensions: ["vue"] },
        { path: "~/components/quiz", extensions: ["vue"] },
        { path: "~/components/website", extensions: ["vue"] },
    ],
    css: [
        "@fortawesome/fontawesome-svg-core/styles.css",
        "@/assets/css/global.css",
    ],
    runtimeConfig: {
        openaiKey: process.env.OPENAI_KEY,
    },
    plugins: [
        "~/plugins/fontawesome.ts",
        { src: "~/plugins/apexCharts.ts", mode: "client" },
    ]
})
