<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/DescriptionList/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      DescriptionList
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-description-list>
        <sgds-description-list-group>
          <span slot="title">DescriptionListGroup</span>
          <span slot="description">Description of the descriptionlistgroup.</span>
          DescriptionListGroup content
        </sgds-description-list-group>
      </sgds-description-list>
    </div>
  </div>
</template>
