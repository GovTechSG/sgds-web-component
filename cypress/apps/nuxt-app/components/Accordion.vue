<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Accordion/index.js"

const open = false;
</script>

<template>
  <sgds-accordion :open>
    <sgds-accordion-item>
      <div slot="header">Accordion 1</div>
      <sgds-icon slot="caret" name="arrow-bar-down"></sgds-icon>
      <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        soluta eaque fugit fuga distinctio? Eum.</span>
    </sgds-accordion-item>
    <sgds-accordion-item disabled>
      <div slot="header">Accordion 2</div>
      <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        soluta eaque fugit fuga distinctio? Eum.</span>
    </sgds-accordion-item>
    <sgds-accordion-item open>
      <div slot="header">Accordion 3</div>
      <span slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
        soluta eaque fugit fuga distinctio? Eum.</span>
    </sgds-accordion-item>
  </sgds-accordion>
</template>
