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
        <sgds-sidenav-item aria-label="Reports">
          <span slot="title">Reports</span>
          <sgds-sidenav-link><a href="#">Sales Report</a></sgds-sidenav-link>
          <sgds-sidenav-link><a href="#">Inventory Report</a></sgds-sidenav-link>
          <sgds-sidenav-item aria-label="Custom Reports">
            <span slot="title">Custom Reports</span>
            <sgds-sidenav-link><a href="#">Custom 1</a></sgds-sidenav-link>
            <sgds-sidenav-link><a href="#">Custom 2</a></sgds-sidenav-link>
          </sgds-sidenav-item>
        </sgds-sidenav-item>
        <sgds-sidenav-item aria-label="Settings">
          <a href="#">Settings</a>
        </sgds-sidenav-item>
      </sgds-sidenav>
    </div>
  </div>
</template>
