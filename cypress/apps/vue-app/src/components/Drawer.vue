<script setup lang="ts">
const showDrawer = () => {
    const drawer = document.querySelector("sgds-drawer");
    drawer?.show();
};
const closeDrawer = () => {
    const drawer = document.querySelector("sgds-drawer");
    drawer?.hide();
};
</script>

<template>
    <sgds-button @click="showDrawer">Open end Drawer</sgds-button>
    <sgds-drawer label="" placement="end">
        This is a Drawer
        <sgds-button @click="closeDrawer" slot="footer" variant="link" class="close-drawer">Close</sgds-button>
        <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-drawer>
</template>
