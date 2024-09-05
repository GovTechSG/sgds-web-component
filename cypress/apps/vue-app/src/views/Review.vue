<template>
  <div class="sections">
    <section>
        <h3>Review Detail</h3>
        <div>
          <sgds-drag-drop-file-upload id="my-fileupload" multiple accept="image/png">
              <svg
                  slot="icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
              >
                  <path
                  fill="currentColor"
                  d="M20 7.36842H20.75C20.75 7.17241 20.6733 6.98418 20.5362 6.84404L20 7.36842ZM14.75 2L15.2862 1.47562C15.1451 1.33133 14.9518 1.25 14.75 1.25V2ZM5.25 3V18H6.75V3H5.25ZM7 19.75H19V18.25H7V19.75ZM20.75 18V7.36842H19.25V18H20.75ZM20.5362 6.84404L15.2862 1.47562L14.2138 2.52438L19.4638 7.8928L20.5362 6.84404ZM14.75 1.25H7V2.75H14.75V1.25ZM14 2V6.36842H15.5V2H14ZM15.75 8.11842H20V6.61842H15.75V8.11842ZM19 19.75C19.9665 19.75 20.75 18.9665 20.75 18H19.25C19.25 18.1381 19.1381 18.25 19 18.25V19.75ZM5.25 18C5.25 18.9665 6.0335 19.75 7 19.75V18.25C6.86193 18.25 6.75 18.1381 6.75 18H5.25ZM14 6.36842C14 7.33492 14.7835 8.11842 15.75 8.11842V6.61842C15.6119 6.61842 15.5 6.50649 15.5 6.36842H14ZM6.75 3C6.75 2.86193 6.86193 2.75 7 2.75V1.25C6.0335 1.25 5.25 2.0335 5.25 3H6.75Z"
                  ></path>
                  <path
                  fill="currentColor"
                  d="M2.25 6V21H3.75V6H2.25ZM4 22.75H16V21.25H4V22.75ZM6 4.25H4V5.75H6V4.25ZM17.75 21V19H16.25V21H17.75ZM16 22.75C16.9665 22.75 17.75 21.9665 17.75 21H16.25C16.25 21.1381 16.1381 21.25 16 21.25V22.75ZM2.25 21C2.25 21.9665 3.0335 22.75 4 22.75V21.25C3.86193 21.25 3.75 21.1381 3.75 21H2.25ZM3.75 6C3.75 5.86193 3.86193 5.75 4 5.75V4.25C3.0335 4.25 2.25 5.0335 2.25 6H3.75Z"
                  ></path>
                  <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1.5"
                  stroke="currentColor"
                  d="M13 14.5V9.5M13 9.5L11 11.547M13 9.5L15 11.547"
                  ></path>
              </svg>
              Drag and drop your files here, or click to select files
          </sgds-drag-drop-file-upload>
        </div>
      </section>
      <section>
        <h3>Declaration</h3>
        <div>
          <div>
            <label>Declaration text:</label>
            <ul>
              <li>Declaration item 1</li>
              <li>Declaration item 2</li>
              <li>Declaration item 3</li>
            </ul>
            <sgds-checkbox value="declaration" arialabel="checkbox">I hereby agree to the above declaration.</sgds-checkbox>
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

  li {
    line-height: 2;
  }
</style>