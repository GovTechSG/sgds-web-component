import { html } from "lit-html";

const DefaultFilter = () => {
  return html`<div style="height:100px;">
    <sgds-combo-box
      placeholder="ComboBox with default filter"
      menuList='[
                "Afghanistan",
                "Albania",
                "Algeria",
                "Andorra",
                "Angola",
                "Anguilla",
                "Antigua & Barbuda",
                "Argentina",
                "Armenia",
                "Aruba",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bermuda",
                "Bhutan",
                "Bolivia",
                "Bosnia & Herzegovina",
                "Botswana",
                "Brazil",
                "British Virgin Islands",
                "Brunei",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cambodia",
                "Cameroon",
                "Cape Verde",
                "Cayman Islands",
                "Chad",
                "Chile",
                "China",
                "Colombia",
                "Congo",
                "Cook Islands",
                "Costa Rica",
                "Cote D Ivoire",
                "Croatia",
                "Cruise Ship",
                "Cuba",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Estonia",
                "Ethiopia",
                "Falkland Islands",
                "Faroe Islands",
                "Fiji",
                "Finland",
                "France",
                "French Polynesia",
                "French West Indies",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Gibraltar",
                "Greece",
                "Greenland",
                "Grenada",
                "Guam",
                "Guatemala",
                "Guernsey",
                "Guinea",
                "Guinea Bissau",
                "Guyana",
                "Haiti",
                "Honduras",
                "Hong Kong",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran",
                "Iraq",
                "Ireland",
                "Isle of Man",
                "Israel",
                "Italy",
                "Jamaica",
                "Japan",
                "Jersey",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kuwait",
                "Kyrgyz Republic",
                "Laos",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Macau",
                "Macedonia",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Mauritania",
                "Mauritius",
                "Mexico",
                "Moldova",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Montserrat",
                "Morocco",
                "Mozambique",
                "Namibia",
                "Nepal",
                "Netherlands",
                "Netherlands Antilles",
                "New Caledonia",
                "New Zealand",
                "Nicaragua",
                "Niger",
                "Nigeria",
                "Norway",
                "Oman",
                "Pakistan",
                "Palestine",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines",
                "Poland",
                "Portugal",
                "Puerto Rico",
                "Qatar",
                "Reunion",
                "Romania",
                "Russia",
                "Rwanda",
                "Saint Pierre & Miquelon",
                "Samoa",
                "San Marino",
                "Satellite",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "South Africa",
                "South Korea",
                "Spain",
                "Sri Lanka",
                "St Kitts & Nevis",
                "St Lucia",
                "St Vincent",
                "St. Lucia",
                "Sudan",
                "Suriname",
                "Swaziland",
                "Sweden",
                "Switzerland",
                "Syria",
                "Taiwan",
                "Tajikistan",
                "Tanzania",
                "Thailand",
                "Timor Leste",
                "Togo",
                "Tonga",
                "Trinidad & Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Turks & Caicos",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "Uruguay",
                "Uzbekistan",
                "Venezuela",
                "Vietnam",
                "Virgin Islands (US)",
                "Yemen",
                "Zambia",
                "Zimbabwe"
            ]'
    >
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </sgds-combo-box>
  </div> `;
};

export const ComboBoxDefaultFilter = {
  render: DefaultFilter.bind({}),
  name: "ComboBox with default filter",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const CustomFilter = () => {
  return html`
    <div style="height:100px;">
      <sgds-combo-box
        .filterFunction=${(inputValue, menuItem) => menuItem.includes(inputValue)}
        placeholder="ComboBox with custom filter"
        menuList='[
            "Afghanistan",
            "Albania",
            "Algeria",
            "Andorra",
            "Angola",
            "Anguilla",
            "Antigua & Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bermuda",
            "Bhutan",
            "Bolivia",
            "Bosnia & Herzegovina",
            "Botswana",
            "Brazil",
            "British Virgin Islands",
            "Brunei",
            "Bulgaria",
            "Burkina Faso",
            "Burundi",
            "Cambodia",
            "Cameroon",
            "Cape Verde",
            "Cayman Islands",
            "Chad",
            "Chile",
            "China",
            "Colombia",
            "Congo",
            "Cook Islands",
            "Costa Rica",
            "Cote D Ivoire",
            "Croatia",
            "Cruise Ship",
            "Cuba",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Estonia",
            "Ethiopia",
            "Falkland Islands",
            "Faroe Islands",
            "Fiji",
            "Finland",
            "France",
            "French Polynesia",
            "French West Indies",
            "Gabon",
            "Gambia",
            "Georgia",
            "Germany",
            "Ghana",
            "Gibraltar",
            "Greece",
            "Greenland",
            "Grenada",
            "Guam",
            "Guatemala",
            "Guernsey",
            "Guinea",
            "Guinea Bissau",
            "Guyana",
            "Haiti",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran",
            "Iraq",
            "Ireland",
            "Isle of Man",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jersey",
            "Jordan",
            "Kazakhstan",
            "Kenya",
            "Kuwait",
            "Kyrgyz Republic",
            "Laos",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macau",
            "Macedonia",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Mauritania",
            "Mauritius",
            "Mexico",
            "Moldova",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Montserrat",
            "Morocco",
            "Mozambique",
            "Namibia",
            "Nepal",
            "Netherlands",
            "Netherlands Antilles",
            "New Caledonia",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "Norway",
            "Oman",
            "Pakistan",
            "Palestine",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Poland",
            "Portugal",
            "Puerto Rico",
            "Qatar",
            "Reunion",
            "Romania",
            "Russia",
            "Rwanda",
            "Saint Pierre & Miquelon",
            "Samoa",
            "San Marino",
            "Satellite",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Slovakia",
            "Slovenia",
            "South Africa",
            "South Korea",
            "Spain",
            "Sri Lanka",
            "St Kitts & Nevis",
            "St Lucia",
            "St Vincent",
            "St. Lucia",
            "Sudan",
            "Suriname",
            "Swaziland",
            "Sweden",
            "Switzerland",
            "Syria",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Timor Leste",
            "Togo",
            "Tonga",
            "Trinidad & Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Turks & Caicos",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "Uruguay",
            "Uzbekistan",
            "Venezuela",
            "Vietnam",
            "Virgin Islands (US)",
            "Yemen",
            "Zambia",
            "Zimbabwe"
        ]'
      >
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </sgds-combo-box>
    </div>
  `;
};

export const ComboBoxCustomFilter = {
  render: CustomFilter.bind({}),
  name: "ComboBox with custom filter",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ComboBoxPlayground = {
  render: () => html`
    <playground-ide editable-file-system line-numbers resizable>
      <script type="sample/html" filename="index.html">
        <!doctype html>
        <html lang="en">
        <head>
          <link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@2.0.0/themes/day.css' rel='stylesheet' type='text/css' />
          <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component">&lt;/script>
          <script src="./events.js">&lt;/script>
        </head>
        <body>
        <sgds-combo-box id = "combo-box"label="Items"
          placeholder="ComboBox">
        </sgds-combo-box>
        </body>
        </html>
      </script>

      <script type="sample/js" filename="events.js">
        document.addEventListener('DOMContentLoaded', () => {
          const combo = document.getElementById('combo-box');

          if (combo ) {
            combo.addEventListener('sgds-input', () => {
              console.log('User input value changed');
            });

          } else {
            console.error('Combo Box not found');
          }
        });
      </script>
    </playground-ide>
    <div style="margin-top: 40px; padding: 20px; border-top: 1px solid #ddd;">
      <h3>1. Modify Event Handling</h3>
      <p>
        You can customize how the ComboBox responds to events by editing <strong>events.js</strong>. For instance, you
        can change the action triggered by the <code>sgds-input</code> event:
      </p>
      <pre><code>
          combo.addEventListener('sgds-input', () => {
            console.log('custom message');
          });
        </code></pre>
      <p>In this example, the message will appear in browser console when the user input value changes.</p>

      <h3>2. Change ComboBox Attributes</h3>
      <p>
        You can modify the ComboBox's attributes directly within the HTML to change its appearance or behavior. Refer to
        the documentation below. For instance, try changing the placeholder inside <strong>index.html</strong>:
      </p>
      <pre><code>
           placeholder="custom"
        </code></pre>
      <p>
        Changing the <code>placeholder</code> attribute to <code>"custom"</code> will change the placeholder
        accordingly.
      </p>
    </div>
  `,
  name: "Playground",
  args: {},
  parameters: {}
};
