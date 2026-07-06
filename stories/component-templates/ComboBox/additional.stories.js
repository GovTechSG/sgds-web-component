import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../mocks/comboBoxMultiAsync";
import "../../mocks/comboBoxSingleAsync";

export const ComboBoxMultiSelect = {
  render: Template.bind({}),
  name: "MultiSelect",
  args: { ...args, multiSelect: true, id: "multiselect-combobox-example" },
  parameters: {}
};

const DefaultFilter = () => {
  return html`<div style="display:flex;flex-direction:column;gap:3rem;">
    <sgds-combo-box placeholder="Single select combo box with default filter" id="default-filter-combobox-example">
      <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
      <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
      <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
    </sgds-combo-box>
    <sgds-combo-box
      multiSelect
      placeholder="Multi select combo box with default filter"
      id="default-filter-multiselect-combobox-example"
    >
      <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
      <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
      <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
    </sgds-combo-box>
  </div> `;
};

export const ComboBoxDefaultFilter = {
  render: DefaultFilter.bind({}),
  name: "ComboBox with default filter",
  args: {},
  parameters: {}
};

const CustomFilter = () => {
  return html`
    <div style="display:flex;flex-direction:column;gap:3rem;">
      <sgds-combo-box
        placeholder="Single select combo box with custom filter"
        id="custom-filter-single-select-combobox-example"
      >
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
        <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
        <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
      </sgds-combo-box>
      <sgds-combo-box
        multiSelect
        placeholder="Multi select combobox with custom filter"
        id="custom-filter-multi-select-combobox-example"
      >
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
        <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
        <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
      </sgds-combo-box>
    </div>
    <script>
      const customFilterComboBox = document.querySelector("#custom-filter-single-select-combobox-example");
      const customFilterMultiSelectComboBox = document.querySelector("#custom-filter-multi-select-combobox-example");

      customFilterComboBox.filterFunction = customFilterMultiSelectComboBox.filterFunction = (inputValue, menuItem) =>
        menuItem.label.toLowerCase().includes(inputValue);
    </script>
  `;
};

export const ComboBoxCustomFilter = {
  render: CustomFilter.bind({}),
  name: "ComboBox with custom filter",
  args: {},
  parameters: {}
};

export const ComboBoxDefaultSlot = {
  render: Template.bind({}),
  name: "Populating menu list with default slot",
  args: { ...args, thirdOptionDisabled: true },
  parameters: {}
};

const ComboBoxMenuListProp = () => {
  return html`
    <sgds-combo-box id="menulist-prop-combobox-example" label="Items" placeholder="ComboBox"> </sgds-combo-box>
    <script>
      const comboBox = document.querySelector("#menulist-prop-combobox-example");
      comboBox.menuList = [
        { label: "Afghanistan", value: "1" },
        { label: "Albania", value: "2" },
        { label: "Algeria", value: "3" },
        { label: "Andorra", value: "4" },
        { label: "Angola", value: "5" },
        { label: "Anguilla", value: "6" },
        { label: "Antigua & Barbuda", value: "7" },
        { label: "Argentina", value: "8" },
        { label: "Armenia", value: "9" },
        { label: "Aruba", value: "10" },
        { label: "Australia", value: "11" },
        { label: "Austria", value: "12" },
        { label: "Azerbaijan", value: "13" },
        { label: "Bahamas", value: "14" },
        { label: "Bahrain", value: "15" },
        { label: "Bangladesh", value: "16" },
        { label: "Barbados", value: "17" },
        { label: "Belarus", value: "18" },
        { label: "Belgium", value: "19" },
        { label: "Belize", value: "20" },
        { label: "Benin", value: "21" },
        { label: "Bermuda", value: "22" },
        { label: "Bhutan", value: "23" },
        { label: "Bolivia", value: "24" },
        { label: "Bosnia & Herzegovina", value: "25" },
        { label: "Botswana", value: "26" },
        { label: "Brazil", value: "27" },
        { label: "British Virgin Islands", value: "28" },
        { label: "Brunei", value: "29" },
        { label: "Bulgaria", value: "30" },
        { label: "Burkina Faso", value: "31" },
        { label: "Burundi", value: "32" },
        { label: "Cambodia", value: "33" },
        { label: "Cameroon", value: "34" },
        { label: "Cape Verde", value: "35" },
        { label: "Cayman Islands", value: "36" },
        { label: "Chad", value: "37" },
        { label: "Chile", value: "38" },
        { label: "China", value: "39" },
        { label: "Colombia", value: "40" },
        { label: "Congo", value: "41" },
        { label: "Cook Islands", value: "42" },
        { label: "Costa Rica", value: "43" },
        { label: "Cote D Ivoire", value: "44" },
        { label: "Croatia", value: "45" },
        { label: "Cruise Ship", value: "46" },
        { label: "Cuba", value: "47" },
        { label: "Cyprus", value: "48" },
        { label: "Czech Republic", value: "49" },
        { label: "Denmark", value: "50" },
        { label: "Djibouti", value: "51" },
        { label: "Dominica", value: "52" },
        { label: "Dominican Republic", value: "53" },
        { label: "Ecuador", value: "54" },
        { label: "Egypt", value: "55" },
        { label: "El Salvador", value: "56" },
        { label: "Equatorial Guinea", value: "57" },
        { label: "Estonia", value: "58" },
        { label: "Ethiopia", value: "59" },
        { label: "Falkland Islands", value: "60" },
        { label: "Faroe Islands", value: "61" },
        { label: "Fiji", value: "62" },
        { label: "Finland", value: "63" },
        { label: "France", value: "64" },
        { label: "French Polynesia", value: "65" },
        { label: "French West Indies", value: "66" },
        { label: "Gabon", value: "67" },
        { label: "Gambia", value: "68" },
        { label: "Georgia", value: "69" },
        { label: "Germany", value: "70" },
        { label: "Ghana", value: "71" },
        { label: "Gibraltar", value: "72" },
        { label: "Greece", value: "73" },
        { label: "Greenland", value: "74" },
        { label: "Grenada", value: "75" },
        { label: "Guam", value: "76" },
        { label: "Guatemala", value: "77" },
        { label: "Guernsey", value: "78" },
        { label: "Guinea", value: "79" },
        { label: "Guinea Bissau", value: "80" },
        { label: "Guyana", value: "81" },
        { label: "Haiti", value: "82" },
        { label: "Honduras", value: "83" },
        { label: "Hong Kong", value: "84" },
        { label: "Hungary", value: "85" },
        { label: "Iceland", value: "86" },
        { label: "India", value: "87" },
        { label: "Indonesia", value: "88" },
        { label: "Iran", value: "89" },
        { label: "Iraq", value: "90" },
        { label: "Ireland", value: "91" },
        { label: "Isle of Man", value: "92" },
        { label: "Israel", value: "93" },
        { label: "Italy", value: "94" },
        { label: "Jamaica", value: "95" },
        { label: "Japan", value: "96" },
        { label: "Jersey", value: "97" },
        { label: "Jordan", value: "98" },
        { label: "Kazakhstan", value: "99" },
        { label: "Kenya", value: "100" },
        { label: "Kuwait", value: "101" },
        { label: "Kyrgyz Republic", value: "102" },
        { label: "Laos", value: "103" },
        { label: "Latvia", value: "104" },
        { label: "Lebanon", value: "105" },
        { label: "Lesotho", value: "106" },
        { label: "Liberia", value: "107" },
        { label: "Libya", value: "108" },
        { label: "Liechtenstein", value: "109" },
        { label: "Lithuania", value: "110" },
        { label: "Luxembourg", value: "111" },
        { label: "Macau", value: "112" },
        { label: "Macedonia", value: "113" },
        { label: "Madagascar", value: "114" },
        { label: "Malawi", value: "115" },
        { label: "Malaysia", value: "116" },
        { label: "Maldives", value: "117" },
        { label: "Mali", value: "118" },
        { label: "Malta", value: "119" },
        { label: "Mauritania", value: "120" },
        { label: "Mauritius", value: "121" },
        { label: "Mexico", value: "122" },
        { label: "Moldova", value: "123" },
        { label: "Monaco", value: "124" },
        { label: "Mongolia", value: "125" },
        { label: "Montenegro", value: "126" },
        { label: "Montserrat", value: "127" },
        { label: "Morocco", value: "128" },
        { label: "Mozambique", value: "129" },
        { label: "Namibia", value: "130" },
        { label: "Nepal", value: "131" },
        { label: "Netherlands", value: "132" },
        { label: "Netherlands Antilles", value: "133" },
        { label: "New Caledonia", value: "134" },
        { label: "New Zealand", value: "135" },
        { label: "Nicaragua", value: "136" },
        { label: "Niger", value: "137" },
        { label: "Nigeria", value: "138" },
        { label: "Norway", value: "139" },
        { label: "Oman", value: "140" },
        { label: "Pakistan", value: "141" },
        { label: "Palestine", value: "142" },
        { label: "Panama", value: "143" },
        { label: "Papua New Guinea", value: "144" },
        { label: "Paraguay", value: "145" },
        { label: "Peru", value: "146" },
        { label: "Philippines", value: "147" },
        { label: "Poland", value: "148" },
        { label: "Portugal", value: "149" },
        { label: "Puerto Rico", value: "150" },
        { label: "Qatar", value: "151" },
        { label: "Reunion", value: "152" },
        { label: "Romania", value: "153" },
        { label: "Russia", value: "154" },
        { label: "Rwanda", value: "155" },
        { label: "Saint Pierre & Miquelon", value: "156" },
        { label: "Samoa", value: "157" },
        { label: "San Marino", value: "158" },
        { label: "Satellite", value: "159" },
        { label: "Saudi Arabia", value: "160" },
        { label: "Senegal", value: "161" },
        { label: "Serbia", value: "162" },
        { label: "Seychelles", value: "163" },
        { label: "Sierra Leone", value: "164" },
        { label: "Singapore", value: "165" },
        { label: "Slovakia", value: "166" },
        { label: "Slovenia", value: "167" },
        { label: "South Africa", value: "168" },
        { label: "South Korea", value: "169" },
        { label: "Spain", value: "170" },
        { label: "Sri Lanka", value: "171" },
        { label: "St Kitts & Nevis", value: "172" },
        { label: "St Lucia", value: "173" },
        { label: "St Vincent", value: "174" },
        { label: "St. Lucia", value: "175" },
        { label: "Sudan", value: "176" },
        { label: "Suriname", value: "177" },
        { label: "Swaziland", value: "178" },
        { label: "Sweden", value: "179" },
        { label: "Switzerland", value: "180" },
        { label: "Syria", value: "181" },
        { label: "Taiwan", value: "182" },
        { label: "Tajikistan", value: "183" },
        { label: "Tanzania", value: "184" },
        { label: "Thailand", value: "185" },
        { label: "Timor L'Este", value: "186" },
        { label: "Togo", value: "187" },
        { label: "Tonga", value: "188" },
        { label: "Trinidad & Tobago", value: "189" },
        { label: "Tunisia", value: "190" },
        { label: "Turkey", value: "191" },
        { label: "Turkmenistan", value: "192" },
        { label: "Turks & Caicos", value: "193" },
        { label: "Uganda", value: "194" },
        { label: "Ukraine", value: "195" },
        { label: "United Arab Emirates", value: "196" },
        { label: "United Kingdom", value: "197" },
        { label: "Uruguay", value: "198" },
        { label: "Uzbekistan", value: "199" },
        { label: "Venezuela", value: "200" },
        { label: "Vietnam", value: "201" },
        { label: "Virgin Islands (US)", value: "202" },
        { label: "Yemen", value: "203" },
        { label: "Zambia", value: "204" },
        { label: "Zimbabwe", value: "205" }
      ];
    </script>
  `;
};

export const ComboBoxMenuList = {
  render: ComboBoxMenuListProp.bind({}),
  name: "Populating menu list with property",
  args: {},
  parameters: {}
};

const ComboBoxMenuListClearableProp = () => {
  return html` <sgds-combo-box
    label="Items"
    id="menulist-clearable-prop-combobox-example"
    clearable
    multiSelect
    placeholder="ComboBox"
  >
    <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
    <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
    <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
    <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
    <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
  </sgds-combo-box>`;
};

export const ComboBoxMenuListClearable = {
  render: ComboBoxMenuListClearableProp.bind({}),
  name: "Populating menu list with clearable property",
  args: {},
  parameters: {}
};

const AccessDisplayValueTemplate = () => {
  return html`
    <sgds-combo-box
      placeholder="Accessing display value via @sgds-input custom event"
      id="access-display-value-combobox-example"
    >
      <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
      <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
      <sgds-combo-box-option value="carrot">Carrot</sgds-combo-box-option>
      <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      <sgds-combo-box-option value="eggplant">Eggplant</sgds-combo-box-option>
    </sgds-combo-box>
    <script>
      const combobox = document.querySelector("#access-display-value-combobox-example");
      combobox.addEventListener("sgds-input", e => {
        const displayValue = e.detail.displayValue;
        console.log(displayValue);
      });
    </script>
  `;
};

export const AccessDisplayValue = {
  render: AccessDisplayValueTemplate.bind({}),
  name: "Accessing display value of ComboBox's input",
  args: {},
  parameters: {}
};

export const Loading = {
  render: Template.bind({}),
  name: "Loading state",
  args: { ...args, loading: true, id: "loading-combobox-example" },
  parameters: {}
};

const AsyncComboboxTemplate = () => {
  return html`
    <div style="display:flex;flex-direction:column;gap:3rem;">
      <mock-async-single-combo-box></mock-async-single-combo-box>
      <mock-async-multi-combo-box></mock-async-multi-combo-box>
    </div>
  `;
};

export const AsyncCombobox = {
  render: AsyncComboboxTemplate.bind({}),
  name: "Asynchronous ComboBox",
  args: {},
  parameters: {}
};

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-combo-box
        class="sgds:mb-layout-sm"
        name="comboBoxValidationExample"
        required
        hasFeedback
        label="Country"
        hintText="Required field"
        placeholder="Select a country"
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      >
        <sgds-combo-box-option value="singapore">Singapore</sgds-combo-box-option>
        <sgds-combo-box-option value="malaysia">Malaysia</sgds-combo-box-option>
        <sgds-combo-box-option value="thailand">Thailand</sgds-combo-box-option>
        <sgds-combo-box-option value="japan">Japan</sgds-combo-box-option>
      </sgds-combo-box>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

export const Validation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {}
};

export const OverrideInvalidFeedback = {
  render: ValidationTemplate.bind({}),
  name: "Override default invalid feedback",
  args: { invalidFeedback: "Custom error message" },
  parameters: {}
};

const NoValidateTemplate = () => {
  return html`
    <form id="novalidate-combobox-story-form">
      <sgds-combo-box
        class="sgds:mb-layout-sm"
        noValidate
        required
        hasFeedback
        label="Fruit"
        hintText="Custom validation: must select a fruit starting with 'A'"
        id="novalidate-combobox-story"
        placeholder="Select a fruit"
      >
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="apricot">Apricot</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      </sgds-combo-box>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
    <script>
      const noValidateCombo = document.querySelector("#novalidate-combobox-story");
      const noValidateFormStory = document.querySelector("#novalidate-combobox-story-form");

      noValidateCombo.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Select an option";
        } else if (!e.target.value.startsWith("a")) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Selection must start with 'A'";
        } else {
          e.target.setInvalid(false);
        }
      });

      noValidateFormStory.addEventListener("submit", e => {
        e.preventDefault();
        if (noValidateCombo.invalid) {
          return;
        }
        alert("Submitted");
      });
    </script>
  `;
};

export const NoValidate = {
  render: NoValidateTemplate.bind({}),
  name: "Custom Validation with noValidate",
  args: {},
  parameters: {}
};

const AutocompleteTemplate = () =>
  html`
    <div style="display:flex;flex-direction:column;gap:2rem;">
      <div>
        <p><strong>autocomplete="on"</strong> (default) — browser may suggest previously entered values</p>
        <sgds-combo-box
          name="name"
          autocomplete="on"
          label="Name"
          placeholder="Select a user"
          hintText="Browser autocomplete enabled"
        >
          <sgds-combo-box-option value="adamn">Adamn</sgds-combo-box-option>
          <sgds-combo-box-option value="judy">Judy</sgds-combo-box-option>
          <sgds-combo-box-option value="benedict">Benedict</sgds-combo-box-option>
          <sgds-combo-box-option value="kelvin">Kelvin</sgds-combo-box-option>
        </sgds-combo-box>
      </div>
      <div>
        <p><strong>autocomplete="off"</strong> — browser autocomplete suppressed</p>
        <sgds-combo-box
          name="name"
          autocomplete="off"
          label="Name"
          placeholder="Select a user"
          hintText="Browser autocomplete disabled"
        >
          <sgds-combo-box-option value="adamn">Adamn</sgds-combo-box-option>
          <sgds-combo-box-option value="judy">Judy</sgds-combo-box-option>
          <sgds-combo-box-option value="benedict">Benedict</sgds-combo-box-option>
          <sgds-combo-box-option value="kelvin">Kelvin</sgds-combo-box-option>
        </sgds-combo-box>
      </div>
    </div>
  `;

export const Autocomplete = {
  render: AutocompleteTemplate.bind({}),
  name: "Autocomplete prop",
  args: {},
  parameters: {}
};

const ScrollEndTemplate = () => {
  return html`
    <div style="display:flex;flex-direction:column;gap:2rem;margin-bottom:3rem">
      <div>
        <p><strong>Scroll to bottom (sgds-scroll-end)</strong>: <span id="scroll-end-output"></span></p>

        <sgds-combo-box
          id="scroll-end-combobox-example"
          label="Countries"
          placeholder="Scroll to the bottom"
          scrollBottomOffset="50"
        >
          <sgds-combo-box-option value="afghanistan">Afghanistan</sgds-combo-box-option>
          <sgds-combo-box-option value="albania">Albania</sgds-combo-box-option>
          <sgds-combo-box-option value="algeria">Algeria</sgds-combo-box-option>
          <sgds-combo-box-option value="andorra">Andorra</sgds-combo-box-option>
          <sgds-combo-box-option value="angola">Angola</sgds-combo-box-option>
          <sgds-combo-box-option value="argentina">Argentina</sgds-combo-box-option>
          <sgds-combo-box-option value="armenia">Armenia</sgds-combo-box-option>
          <sgds-combo-box-option value="australia">Australia</sgds-combo-box-option>
          <sgds-combo-box-option value="austria">Austria</sgds-combo-box-option>
          <sgds-combo-box-option value="azerbaijan">Azerbaijan</sgds-combo-box-option>
          <sgds-combo-box-option value="bahamas">Bahamas</sgds-combo-box-option>
          <sgds-combo-box-option value="bahrain">Bahrain</sgds-combo-box-option>
          <sgds-combo-box-option value="bangladesh">Bangladesh</sgds-combo-box-option>
          <sgds-combo-box-option value="belgium">Belgium</sgds-combo-box-option>
          <sgds-combo-box-option value="brazil">Brazil</sgds-combo-box-option>
          <sgds-combo-box-option value="canada">Canada</sgds-combo-box-option>
          <sgds-combo-box-option value="chile">Chile</sgds-combo-box-option>
          <sgds-combo-box-option value="china">China</sgds-combo-box-option>
          <sgds-combo-box-option value="colombia">Colombia</sgds-combo-box-option>
          <sgds-combo-box-option value="denmark">Denmark</sgds-combo-box-option>
        </sgds-combo-box>

        <script>
          const scrollEndCombo = document.querySelector("#scroll-end-combobox-example");
          const scrollEndOutput = document.querySelector("#scroll-end-output");
          let scrollEndCount = 0;
          scrollEndCombo.addEventListener("sgds-scroll-end", () => {
            scrollEndCount++;
            scrollEndOutput.textContent = "sgds-scroll-end fired — bottom of menu reached (x" + scrollEndCount + ")";
          });
        </script>
      </div>
    </div>
  `;
};

export const ScrollEnd = {
  render: ScrollEndTemplate.bind({}),
  name: "Scroll to bottom (sgds-scroll-end)",
  args: {},
  parameters: {}
};
