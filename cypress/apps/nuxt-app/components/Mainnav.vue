<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(async () => {
  await import("@govtechsg/sgds-web-component/components/Mainnav/index.js");
});
import "@govtechsg/sgds-web-component/components/Dropdown/index.js";  
</script>

<template>
  <sgds-mainnav expand="lg">
    <img width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand">
    <sgds-mainnav-item active>
        <a href="#">Home</a>
    </sgds-mainnav-item>
    <sgds-mainnav-item disabled><a href="#">About</a></sgds-mainnav-item>
    <sgds-mainnav-item slot="end" class="test test2"><a href="#">Info</a></sgds-mainnav-item>
    <sgds-mainnav-item slot="end" id="night-theme"><a href="#"><sgds-icon name="lightbulb"></sgds-icon></a></sgds-mainnav-item>
    <sgds-mainnav-dropdown>
        <span slot="toggler">Dropdown</span>
        <sgds-dropdown-item disabled><a href="https://www.google.com/">Item 1</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="https://www.google.com/">Item 2</a></sgds-dropdown-item>
        <sgds-dropdown-item active><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
    </sgds-mainnav-dropdown>
    <sgds-mainnav-dropdown>
        <span slot="toggler">Dropdown</span>
        <sgds-dropdown-item>Item 1</sgds-dropdown-item>
        <sgds-dropdown-item>Item 2</sgds-dropdown-item>
        <sgds-dropdown-item>Item 3</sgds-dropdown-item>
    </sgds-mainnav-dropdown>
    <sgds-button slot="end">Login</sgds-button>
    <!-- <dev-console-widget slot="non-collapsible" iconColor="black" iconWidth="28px" iconHeight="28px">
    </dev-console-widget> -->
  </sgds-mainnav>
</template>
