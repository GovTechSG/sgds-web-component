<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Subnav
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-subnav>
        <div slot="header">Header text</div>
        <sgds-subnav-item>
          SubnavItem content
        </sgds-subnav-item>
      </sgds-subnav>
    </div>
  </div>
</template>
