<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/FileUpload/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      FileUpload
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-file-upload variant="default" aria-label="Choose files" label="FileUpload">
        FileUpload
      </sgds-file-upload>
    </div>
  </div>
</template>
