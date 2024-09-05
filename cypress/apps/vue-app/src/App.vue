<script setup lang="ts">
import "@govtechsg/sgds-web-component/themes/day.css"
import "@webcomponents/scoped-custom-element-registry"
import "@govtechsg/sgds-web-component"
import "./components/file-upload/index.umd.js"
import Footer from './components/Footer.vue'
import Mainnav from './components/Mainnav.vue'
import Masthead from './components/Masthead.vue'
import Stepper from './components/Stepper.vue'
import Breadcrumb from './components/Breadcrumb.vue'
</script>

<template>
  <Masthead />
  <Mainnav />

  <div class="container">
    <sgds-template-grid>
      <sgds-content-area>
        <sgds-content-body>
          <Breadcrumb />
          <h2>Name of e-Service</h2>
          <Stepper />
        </sgds-content-body>
      </sgds-content-area>
    </sgds-template-grid>
  </div>
  <Footer />
</template>

<style scoped>
div.container {
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 2rem;
  max-width: 70rem;
}

@media (min-width: 48rem) {
  div.container {
    max-width: 73rem;
  }
}
</style>
