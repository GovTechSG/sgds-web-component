<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Footer
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-footer
        contact-href="https://form.gov.sg/"
        feedback-href="https://form.gov.sg/"
        privacy-href="/privacy"
        terms-of-use-href="/terms"
      ></sgds-footer>
    </div>
  </div>
</template>
