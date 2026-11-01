export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [["nuxt-ssr-lit", { litElementPrefix: ["sgds-"] }]],
  css: ["~/assets/css/main.css"],
  nitro: {
    moduleSideEffects: ["@govtechsg/sgds-web-component"]
  },
  alias: {
    tslib: "tslib/tslib.es6.js"
  }
});
