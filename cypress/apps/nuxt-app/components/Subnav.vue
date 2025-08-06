<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Subnav/index.js"
</script>

<template>
  <sgds-subnav>
    <h5 slot="header">STACKx Cybersecurity</h5>
    <sgds-subnav-item active><a href="#">Overview</a></sgds-subnav-item>
    <sgds-subnav-item><a href="#">On-site Activites</a></sgds-subnav-item>
    <sgds-subnav-item><a href="#">Programme</a></sgds-subnav-item>
    <sgds-subnav-item><a href="#">Speakers</a></sgds-subnav-item>
    <sgds-subnav-item><a href="#">Partners</a></sgds-subnav-item>
    <sgds-subnav-item><a href="#">Recordings</a></sgds-subnav-item>
    <sgds-subnav-item><a href="#">FAQ</a></sgds-subnav-item>
    <sgds-button slot="actions" size="sm" fullWidth>Register</sgds-button>
    <sgds-button slot="actions" size="sm" fullWidth>Exhibit</sgds-button>
    <sgds-button slot="actions" size="sm" fullWidth>Exhibit</sgds-button>
  </sgds-subnav>
</template>
