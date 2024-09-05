<template>
    <div class="container p-5">
    <sgds-stepper ref="stepper" :activeStep="activeStep" :steps="stepMetadata" @sgds-arrived="updateActiveStep"></sgds-stepper>

    <section>
        <component :is="currentComponent" v-bind="componentProps"></component>

        <div class="btn-group">
            <div>
                <sgds-button class="me-3" variant="light" @click="reset">Reset</sgds-button>
                <sgds-button class="me-3" variant="primary" @click="nextStep">Next</sgds-button>
                <sgds-button variant="secondary" @click="prevStep">Back</sgds-button>
            </div>
            <div>
                <sgds-button class="m-2" variant="danger" @click="firstStep">Go to first page</sgds-button>
                <sgds-button class="m-2" variant="warning" @click="lastStep">Go to last page</sgds-button>
            </div>
        </div>
    </section>
    </div>
  </template>
  
<script>
import { defineComponent, markRaw } from 'vue'
import EligibilityCheck from '../views/EligibilityCheck.vue'
import Application from '../views/Application.vue'
import Review from '../views/Review.vue'

export default defineComponent({
    components: {
        EligibilityCheck,
        Application,
        Review
    },
    data() {
        return {
            activeStep: 0,
            stepMetadata: [
                {
                stepHeader: 'Eligibility Check',
                component: markRaw(EligibilityCheck)
                },
                {
                stepHeader: 'Application',
                component: markRaw(Application)
                },
                {
                stepHeader: 'Review',
                component: markRaw(Review)
                }
            ],
            currentComponent: markRaw(EligibilityCheck),
            componentProps: {
                details: {
                    firstName: '',
                    lastName: '',
                    gender: '',
                },
            }
        };
    },
    methods: {
        updateActiveStep() {
            const stepper = this.$refs.stepper;
            this.activeStep = stepper.activeStep;
            this.currentComponent = markRaw(stepper.getComponent(this.activeStep));
        },
        nextStep() {
            const stepper = this.$refs.stepper;
            stepper.nextStep();
            this.updateActiveStep();
        },
        prevStep() {
            const stepper = this.$refs.stepper;
            stepper.previousStep();
            this.updateActiveStep();
        },
        reset() {
            const stepper = this.$refs.stepper;
            stepper.reset();
            this.componentProps = {
                details: {
                    firstName: '',
                    lastName: '',
                    address: ''
                }
            };
            this.updateActiveStep();
        },
        lastStep() {
            const stepper = this.$refs.stepper;
            stepper.lastStep();
            this.updateActiveStep();
        },
        firstStep() {
            const stepper = this.$refs.stepper;
            stepper.firstStep();
            this.updateActiveStep();
        }
    }
});
</script>

<style scoped>
    section {
        padding: 2rem;
    }

    .btn-group {
        display:flex;
        justify-content:space-between;
        margin-top:1rem;
    }
    
    .btn-group > div {
        display: flex;
        gap: 3px;
    }
</style>