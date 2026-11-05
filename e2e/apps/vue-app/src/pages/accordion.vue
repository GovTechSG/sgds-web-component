<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Accordion
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-accordion>
        <sgds-accordion-item aria-label="Accordion title #1">
          <div slot="header">Accordion title #1</div>
          <div slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </sgds-accordion-item>
        <sgds-accordion-item aria-label="Accordion title #2">
          <div slot="header">Accordion title #2</div>
          <div slot="content">Maiores soluta eaque fugit fuga distinctio.</div>
        </sgds-accordion-item>
      </sgds-accordion>
    </div>
  </div>
</template>
