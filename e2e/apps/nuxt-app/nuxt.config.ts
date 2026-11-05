import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [["nuxt-ssr-lit", { litElementPrefix: ["sgds-"] }]],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [/lit/, /@lit/, /parse5/, /@parse5/]
    }
  },
  nitro: {
    moduleSideEffects: ["@govtechsg/sgds-web-component"],
    externals: {
      inline: [/lit/, /@lit/, /parse5/, /@parse5/]
    }
  },
  alias: {
    tslib: "tslib/tslib.es6.js"
  }
});
