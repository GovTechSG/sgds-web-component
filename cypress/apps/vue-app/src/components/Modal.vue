<script setup lang="ts">
const showModal = () => {
  const modal = document.querySelector("sgds-modal");
  modal?.show();
};
const closeModal = () => {
  const modal = document.querySelector("sgds-modal");
  modal?.hide();
};
</script>

<template>
    <sgds-button @click="showModal">Open Modal</sgds-button>
    <sgds-modal title="hello" titleicon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; class=&quot;bi bi-amd&quot; viewBox=&quot;0 0 16 16&quot;>
      <path d=&quot;m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0H.334ZM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2V9.72Z&quot;/>
    </svg>">
        This is a Modal
        <sgds-button @click="closeModal" slot="footer" variant="link" class="close-modal">Close</sgds-button>
        <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-modal>
</template>
