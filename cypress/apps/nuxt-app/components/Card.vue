<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Card/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/Link/index.js";
</script>

<template>
  <div class="sgds-container">
    <div class="sgds-grid">
      <sgds-card class="sgds-col-4 sgds-col-sm-4 sgds-col-md-4 sgds-col-lg-4">
        <img slot="image" alt="img alternate text goes here" width="467" height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80">
        <span slot="subtitle">SUBTITLE</span>
        <span slot="title">Vertical Image Card</span>
        <span slot="description">default vertical card default vertical card default vertical card default vertical card default vertical card</span>
        <sgds-link slot="link">
          <a href="#">SM light dom anchor <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card class="sgds-col-3 sgds-col-sm-4 sgds-col-md-4 sgds-col-lg-4">
        <img slot="image" alt="img alternate text goes here" width="467" height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80">
        <span slot="subtitle">SUBTITLE</span>
        <span slot="title">Vertical Image Card</span>
        <span slot="description">default vertical card</span>
        <sgds-link slot="link">
          <a href="#">SM light dom anchor <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card class="sgds-col-2 sgds-col-sm-4 sgds-col-md-4 sgds-col-lg-4">
        <img slot="image" alt="img alternate text goes here" width="467" height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80">
        <span slot="subtitle">SUBTITLE</span>
        <span slot="title">Vertical Image Card</span>
        <span slot="description">default vertical card</span>
        <sgds-link slot="link">
          <a href="#">SM light dom anchor <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card class="sgds-col-2 sgds-col-sm-4 sgds-col-md-4 sgds-col-lg-4">
        <img slot="image" alt="img alternate text goes here" width="467" height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80">
        <span slot="subtitle">SUBTITLE</span>
        <span slot="title">Vertical Image Card</span>
        <span slot="description">default vertical card</span>
        <sgds-link slot="link">
          <a href="#">SM light dom anchor <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  </div>
</template>
