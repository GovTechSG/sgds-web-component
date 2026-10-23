import { html } from "lit";

export default {
  title: "Form/Working with FormData",
  parameters: { layout: "fullscreen" }
};

const FormDataTemplate = args => {
  return html`
    <div class="sgds-container sgds:py-layout-md">
      <div class="sgds-grid sgds:gap-layout-md">
        <form
          id="validation-form_getting-data"
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <h5
                class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
              >
                Get Values Through FormData
              </h5>
              <div>
                <sgds-input
                  label="First Name"
                  hinttext="type Sarah"
                  name="firstName"
                  required
                  hasFeedback="both"
                  placeholder="Placeholder"
                  pattern="Sarah"
                >
                </sgds-input>
              </div>
              <div>
                <sgds-quantity-toggle
                  label="Number of dependents"
                  name="dependentCount"
                  min="1"
                  max="10"
                  hinttext="Input number 1 to 10 only"
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div>
                <sgds-datepicker
                  required
                  hasFeedback="both"
                  name="appointmentDate"
                  label="Appointment date"
                ></sgds-datepicker>
              </div>
              <div>
                <sgds-select
                  required
                  hasFeedback="both"
                  name="favouriteAnimal"
                  label="Favourite animal"
                  menuList='[
                    { "label": "Aligator", "value": "1" },
                    { "label": "Bear", "value": "2" },
                    { "label": "Cat", "value": "3" },
                    { "label": "Dog", "value": "4" },
                    { "label": "Elephant", "value": "5" },
                    { "label": "Frog", "value": "6" },
                    { "label": "Goose", "value": "7" },
                    { "label": "Hen", "value": "8" }
                  ]'
                ></sgds-select>
              </div>
              <div>
                <sgds-combo-box
                  required
                  hasFeedback="both"
                  name="countryOfBirth"
                  label="Country of birth"
                  menuList='[
                    { "label": "Singapore", "value": "1" },
                    { "label": "Thailand", "value": "2" },
                    { "label": "Malaysia", "value": "3" },
                    { "label": "Philippines", "value": "4" },
                    { "label": "Japan", "value": "5" },
                    { "label": "Laos", "value": "6" },
                    { "label": "Vietnam", "value": "7" },
                    { "label": "China", "value": "8" }
                  ]'
                  placeholder="Choose a country"
                ></sgds-combo-box>
              </div>
              <div>
                <sgds-checkbox-group
                  hasFeedback="both"
                  hintText="Check at least one option"
                  required
                  label="Food preference"
                  name="food"
                >
                  <sgds-checkbox value="vegetarian">vegetarian</sgds-checkbox>
                  <sgds-checkbox value="halal">halal</sgds-checkbox>
                  <sgds-checkbox value="na">no preference</sgds-checkbox>
                </sgds-checkbox-group>
              </div>
              <div>
                <sgds-radio-group hasFeedback="both" name="gender" required label="Gender">
                  <sgds-radio value="female">Female</sgds-radio>
                  <sgds-radio value="male">Male</sgds-radio>
                </sgds-radio-group>
              </div>
              <div>
                <sgds-textarea
                  name="comments"
                  minlength="3"
                  required
                  hasFeedback="both"
                  resize="auto"
                  label="Comments"
                  hintText="Required to fill with minimum length of 3"
                ></sgds-textarea>
              </div>
              <div>
                <sgds-file-upload
                  id="file-upload-form-data"
                  required
                  label="Supporting documents"
                  multiple
                  name="documents"
                  hasFeedback="both"
                  >File upload</sgds-file-upload
                >
              </div>
              <div>
                <sgds-checkbox name="consentA" value="consentA" required hasFeedback="both"
                  >I consent to ...</sgds-checkbox
                >
              </div>
            </div>
            <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
              <sgds-button type="reset" variant="ghost">Reset</sgds-button>
              <sgds-button type="submit">Submit</sgds-button>
            </div>
          </div>
        </form>
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
        >
          <h6
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-layout-sm"
          >
            FormData Output
          </h6>
          <pre
            id="formdata-submit-output"
            class="sgds:p-layout-sm sgds:bg-surface-overlay sgds:rounded-md sgds:text-body-sm"
            style="white-space: pre-wrap;"
          >
Submit the form to see FormData values here.</pre
          >
        </div>
      </div>
    </div>

    <script>
      const form = document.querySelector("#validation-form_getting-data");

      form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = {};
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            if (!entries[key]) entries[key] = [];
            entries[key].push(value.name);
          } else if (entries[key]) {
            if (!Array.isArray(entries[key])) entries[key] = [entries[key]];
            entries[key].push(value);
          } else {
            entries[key] = value;
          }
        }
        const output = document.querySelector("#formdata-submit-output");
        if (output) output.textContent = JSON.stringify(entries, null, 2);
      });

      form.addEventListener("reset", () => {
        const output = document.querySelector("#formdata-submit-output");
        if (output) output.textContent = "Submit the form to see FormData values here.";
      });
    </script>
  `;
};

export const FormData = {
  render: FormDataTemplate.bind({}),
  name: "Get values through FormData",
  args: {},
  tags: ["!dev"]
};

const FormDataPrefillTemplate = args => {
  return html`
    <div class="sgds-container sgds:py-layout-md">
      <div class="sgds-grid sgds:gap-layout-md">
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <h5
                class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
              >
                FormData After Programmatic Prefill
              </h5>
              <p class="sgds:text-body-md sgds:text-body-default sgds:mb-0">
                All form components below start empty. After first render, values are set programmatically via
                <code>element.value = ...</code> (simulating an API prefill or draft restore). The table shows what each
                field displays vs what FormData actually holds.
              </p>
            </div>
            <form id="formdata-prefill-form">
              <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
                <div>
                  <sgds-input label="First Name" name="firstName" placeholder="Placeholder"></sgds-input>
                </div>
                <div>
                  <sgds-datepicker name="appointmentDate" label="Appointment date"></sgds-datepicker>
                </div>
                <div>
                  <sgds-select
                    name="favouriteAnimal"
                    label="Favourite animal"
                    menuList='[
                      { "label": "Aligator", "value": "1" },
                      { "label": "Bear", "value": "2" },
                      { "label": "Cat", "value": "3" },
                      { "label": "Dog", "value": "4" },
                      { "label": "Elephant", "value": "5" }
                    ]'
                  ></sgds-select>
                </div>
                <div>
                  <sgds-combo-box
                    name="countryOfBirth"
                    label="Country of birth"
                    menuList='[
                      { "label": "Singapore", "value": "1" },
                      { "label": "Thailand", "value": "2" },
                      { "label": "Malaysia", "value": "3" }
                    ]'
                    placeholder="Choose a country"
                  ></sgds-combo-box>
                </div>
                <div>
                  <sgds-quantity-toggle
                    label="Number of dependents"
                    name="dependentCount"
                    min="1"
                    max="10"
                  ></sgds-quantity-toggle>
                </div>
                <div>
                  <sgds-checkbox-group label="Food preference" name="food">
                    <sgds-checkbox value="vegetarian">vegetarian</sgds-checkbox>
                    <sgds-checkbox value="halal">halal</sgds-checkbox>
                    <sgds-checkbox value="na">no preference</sgds-checkbox>
                  </sgds-checkbox-group>
                </div>
                <div>
                  <sgds-radio-group name="gender" label="Gender">
                    <sgds-radio value="female">Female</sgds-radio>
                    <sgds-radio value="male">Male</sgds-radio>
                  </sgds-radio-group>
                </div>
                <div>
                  <sgds-textarea name="comments" resize="auto" label="Comments"></sgds-textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-10 sgds-col-lg-center-10 sgds-col-xl-center-10 sgds-col-2-xl-center-10"
        >
          <sgds-table id="formdata-prefill-table" tableBorder headerBackground>
            <sgds-table-row>
              <sgds-table-head>Component</sgds-table-head>
              <sgds-table-head>Assigned</sgds-table-head>
              <sgds-table-head>Displays</sgds-table-head>
              <sgds-table-head>FormData value</sgds-table-head>
              <sgds-table-head>Result</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row id="formdata-prefill-placeholder">
              <sgds-table-cell>Waiting for prefill...</sgds-table-cell>
              <sgds-table-cell></sgds-table-cell>
              <sgds-table-cell></sgds-table-cell>
              <sgds-table-cell></sgds-table-cell>
              <sgds-table-cell></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </div>
      </div>
    </div>

    <script>
      (function () {
        const PREFILL = {
          firstName: "Sarah",
          appointmentDate: "23/03/2020",
          favouriteAnimal: "3",
          countryOfBirth: "1",
          dependentCount: 5,
          food: "vegetarian",
          gender: "female",
          comments: "Hello world"
        };

        const COMPONENT_LABELS = {
          firstName: "sgds-input",
          appointmentDate: "sgds-datepicker",
          favouriteAnimal: "sgds-select",
          countryOfBirth: "sgds-combo-box",
          dependentCount: "sgds-quantity-toggle",
          food: "sgds-checkbox-group",
          gender: "sgds-radio-group",
          comments: "sgds-textarea"
        };

        // Wait for first render, then assign values programmatically
        setTimeout(async () => {
          const form = document.querySelector("#formdata-prefill-form");
          if (!form) return;

          // Wait for all components to finish their first update
          const hosts = Object.keys(PREFILL).map(name => form.querySelector("[name='" + name + "']"));
          await Promise.all(hosts.map(h => h && h.updateComplete));

          // Assign values programmatically — the scenario that triggers the bug
          for (const [name, value] of Object.entries(PREFILL)) {
            const el = form.querySelector("[name='" + name + "']");
            if (el) el.value = value;
          }

          // Wait for all updates to settle
          await Promise.all(hosts.map(h => h && h.updateComplete));

          // Read FormData and build the results table
          const formData = new window.FormData(form);
          const table = document.querySelector("#formdata-prefill-table");
          const placeholder = document.querySelector("#formdata-prefill-placeholder");
          if (!table) return;
          if (placeholder) placeholder.remove();

          for (const [name, assigned] of Object.entries(PREFILL)) {
            const el = form.querySelector("[name='" + name + "']");
            const displayed = el ? String(el.value) : "(not found)";
            const wireValue = formData.get(name);
            const onTheWire = wireValue === null ? "(absent)" : String(wireValue);
            const expected = String(assigned);
            const ok = onTheWire === expected;
            const colorClass = ok ? "sgds:text-success-default" : "sgds:text-danger-default";

            const row = document.createElement("sgds-table-row");
            const cells = [
              COMPONENT_LABELS[name],
              expected,
              displayed || "(empty)",
              onTheWire || "(empty)",
              ok ? "✓ matches" : "✗ MISMATCH"
            ];
            cells.forEach(function (text, i) {
              const cell = document.createElement("sgds-table-cell");
              cell.textContent = text;
              if (i >= 3) cell.classList.add(colorClass, "sgds:font-semibold");
              row.appendChild(cell);
            });
            table.appendChild(row);
          }
        }, 150);
      })();
    </script>
  `;
};

export const FormDataPrefill = {
  render: FormDataPrefillTemplate.bind({}),
  name: "FormData after programmatic prefill",
  args: {},
  tags: ["!dev"]
};
