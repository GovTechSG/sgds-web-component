import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  buildDir: process.env.NUXT_BUILD_DIR || ".nuxt",
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [["nuxt-ssr-lit", { litElementPrefix: ["sgds-"] }]],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()]
  },
  nitro: {
    moduleSideEffects: ["@govtechsg/sgds-web-component"],
    externals: {
      inline: [
        "@lit-labs/ssr",
        "@lit-labs/ssr-client",
        "@lit-labs/ssr-dom-shim",
        "lit",
        "lit-element",
        "lit-html",
        "@lit/reactive-element",
        "parse5",
        "entities"
      ]
    }
  },
  alias: {
    tslib: "tslib/tslib.es6.js"
  }
});
