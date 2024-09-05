<template>
  <div class="sections">
    <section>
        <h3>Section header 1</h3>
        <div>
          <div>
            <sgds-input label="First Name" v-model="details.firstName" placeholder="First Name" />
          </div>
          <div>
            <sgds-input label="Last Name" v-model="details.lastName" placeholder="Last Name" />
          </div>
          <div>
            <sgds-radio-group>
              <span slot="label">
                Label
                <sgds-tooltip content="This is a tooltip" trigger="hover focus" placement="top">
                    <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path
                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z">
                        </path>
                    </svg>
                </sgds-tooltip>
              </span>
              <sgds-radio value="radio option 1">Option 1</sgds-radio>
              <sgds-radio value="radio option 2">Option 2</sgds-radio>
              <sgds-radio value="radio option 3">Option 3</sgds-radio>
            </sgds-radio-group>
          </div>
          <div>
            <sgds-textarea 
              label="Description"
              rows="4"
              placeholder="Add description"
              minlength="undefined"
              maxlength="100"
              resize="vertical"
            />
          </div>
        </div>
      </section>
      <section>
        <h3>Section header 2</h3>
        <div>
          <div>
            <label>Label</label>
            <sgds-checkbox value="option 1" arialabel="checkbox">Option 1</sgds-checkbox>
            <sgds-checkbox value="option 2" arialabel="checkbox">Option 2</sgds-checkbox>
            <sgds-checkbox value="option 3" arialabel="checkbox">Option 3</sgds-checkbox>
            <sgds-checkbox value="option 4" arialabel="checkbox">Option 4</sgds-checkbox>
            <sgds-checkbox value="option 5" arialabel="checkbox">Option 5</sgds-checkbox>
          </div>
          <div>
            <sgds-textarea 
              label="Description"
              rows="4"
              placeholder="Describe about your work experience"
              minlength="undefined"
              maxlength="100"
              resize="vertical"
            />
          </div>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
  label {
    color: var(--sgds-form-label-color);
    font-weight: var(--sgds-form-label-font-weight);
    margin-bottom: 0;
  }

  .sections {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  section {
    border-radius: 0.3125rem;
    padding: 1rem 2rem;
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, .1), 0 1px 4px rgba(0, 0, 0, .12);
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, .1), 0 1px 4px rgba(0, 0, 0, .12);
    box-shadow: 0 0 2px rgba(0, 0, 0, .1), 0 1px 4px rgba(0, 0, 0, .12);
  }
</style>