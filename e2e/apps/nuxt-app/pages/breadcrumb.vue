<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Breadcrumb/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Breadcrumb
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-breadcrumb aria-label="breadcrumb">
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item active><a href="#">Contacts</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    </div>
  </div>
</template>
