
<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/ThumbnailCard/index.js";
import "@govtechsg/sgds-web-component/components/Badge/index.js";
import "@govtechsg/sgds-web-component/components/IconList/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/Link/index.js";


</script>
<template>
     <sgds-thumbnail-card orientation="vertical">
        <img slot="thumbnail" alt="img alternate text goes here" width="48" height="48" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg">
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">EXPLORE THE FEATURES</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description">Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span>
        <div slot="lower">
          <sgds-badge variant="neutral" outlined="">Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-thumbnail-card>
</template>