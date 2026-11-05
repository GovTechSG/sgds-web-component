<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Dropdown/index.js";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Dropdown
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-dropdown drop="down" close="default">
        <sgds-dropdown-item aria-label="DropdownItem">
          DropdownItem content
        </sgds-dropdown-item>
      </sgds-dropdown>
    </div>
  </div>
</template>
