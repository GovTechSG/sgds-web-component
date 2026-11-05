<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Sidenav
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-sidenav>
        <sgds-sidenav-item aria-label="SidenavItem">
          <span slot="title">SidenavItem</span>
          <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
          SidenavItem content
        </sgds-sidenav-item>
        <sgds-sidenav-link>
          SidenavLink content
        </sgds-sidenav-link>
      </sgds-sidenav>
    </div>
  </div>
</template>
