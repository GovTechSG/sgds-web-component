<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Accordion/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Accordion
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-accordion variant="default" density="default">
        <sgds-accordion-item aria-label="AccordionItem">
          <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
          <div slot="header">Header text</div>
          <div slot="content">Content goes here.</div>
        </sgds-accordion-item>
      </sgds-accordion>
    </div>
  </div>
</template>
