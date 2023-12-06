<script setup lang="ts">
const steps = [
    {
        stepHeader: "Personal Details",
        component: "1 test"
    },
    {
        stepHeader: "Address and Contact Information",
        component: "2 test"
    },
    {
        stepHeader: "Review",
        component: "3 test"
    }
]
</script>

<template>
    <sgds-stepper .steps="steps" .activeStep="1"></sgds-stepper>
</template>
