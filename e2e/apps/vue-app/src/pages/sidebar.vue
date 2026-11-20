<script setup lang="ts">
import "@govtechsg/sgds-web-component";
</script>

<template>
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">
      Sidebar
    </h1>
    <div class="sgds:mt-gap-text-md">
      <sgds-sidebar active="meetings" variant="collapsible" aria-label="Sidebar navigation">
        <div slot="upper">SGDS Sidebar</div>
        <sgds-sidebar-section title="Main" name="main">
          <sgds-sidebar-group title="Dashboard" name="dashboard">
            <sgds-icon name="house" slot="icon" size="md"></sgds-icon>
            <sgds-sidebar-item title="Meetings" name="meetings">
              <sgds-icon name="calendar" slot="icon" size="md"></sgds-icon>
              <a href="#"></a>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Gallery" name="gallery">
              <sgds-icon name="camera" slot="icon" size="md"></sgds-icon>
              <a href="#"></a>
            </sgds-sidebar-item>
          </sgds-sidebar-group>
          <sgds-sidebar-item title="Settings" name="settings">
            <sgds-icon name="gear" slot="icon" size="md"></sgds-icon>
          </sgds-sidebar-item>
        </sgds-sidebar-section>
      </sgds-sidebar>
    </div>
  </div>
</template>
