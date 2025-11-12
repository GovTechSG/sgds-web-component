<script lang="ts" setup>
import "@govtechsg/sgds-web-component/components/Skeleton/index.js"
import "@govtechsg/sgds-web-component/components/ThumbnailCard/index.js"
</script>

<template>
  <div class="sgds-container">
    <div class="sgds-grid">
      <div class="col-4">
        <sgds-thumbnail-card>
          <!-- skeleton for product card image -->
          <sgds-skeleton
            slot="thumbnail"
            sheen
            width="var(--sgds-dimension-128)"
            height="var(--sgds-dimension-64)"
          />

          <!-- skeleton for product card name -->
          <sgds-skeleton
            slot="title"
            sheen
            width="var(--sgds-dimension-224)"
            height="var(--sgds-dimension-32)"
          />

          <!-- skeleton for product card status -->
          <sgds-skeleton
            sheen
            width="var(--sgds-dimension-96)"
            height="var(--sgds-dimension-24)"
          />

          <sgds-skeleton
            slot="description"
            :rows="3"
            sheen
            width="264px"
            height="76px"
          />

          <div slot="lower">
            <sgds-skeleton
              sheen
              width="var(--sgds-dimension-96)"
              height="var(--sgds-dimension-24)"
            />
          </div>
        </sgds-thumbnail-card>
      </div>
    </div>
  </div>
</template>
