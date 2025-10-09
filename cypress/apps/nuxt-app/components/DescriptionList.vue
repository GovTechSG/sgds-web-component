<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/DescriptionList/index.js"
</script>

<template>
  <sgds-description-list-group stacked bordered hasTitleSlot hasDescriptionSlot>
    <span slot="title"> Title Border</span>
    <span slot="description">Description</span>

    <sgds-description-list>
      Label Stacked 1
      <span slot="data">Data Text Description List 1</span>
    </sgds-description-list>

    <sgds-description-list>
      Label Stacked 2
      <span slot="data">Data Text Description List 2</span>
    </sgds-description-list>
  </sgds-description-list-group>
  <sgds-description-list-group stacked hasTitleSlot hasDescriptionSlot>
    <span slot="title"> Title</span>
    <span slot="description">Description</span>

    <sgds-description-list>
      Label Stacked 1
      <span slot="data">Data Text Description List 1</span>
    </sgds-description-list>

    <sgds-description-list>
      Label Stacked 2
      <span slot="data">Data Text Description List 2</span>
    </sgds-description-list>
  </sgds-description-list-group>
</template>