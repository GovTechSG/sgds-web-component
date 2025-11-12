const VariantTemplate = args => {
  const variants = [
    { variant: "Info", icon: "info-circle-fill" },
    { variant: "Danger", icon: "exclamation-circle-fill" },
    { variant: "Warning", icon: "exclamation-triangle-fill" },
    { variant: "Neutral", icon: "info-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
        <sgds-system-banner variant=${v.variant.toLowerCase()} show>
         <sgds-system-banner-item>
            <sgds-icon slot="icon" name="placeholder"></sgds-icon>
            <div>
            <bold>Etiam suscipit nisi eget porta cursus.</bold> Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
            facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
            congue sapien eu, rhoncus
            </div>
            <a href="#" slot="action">Action</a>
        </sgds-system-banner-item>
        </sgds-system-banner>
    </div>    
        `
      )}
    </div>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Dimissible = {
  render: Template.bind({}),
  name: "Dismissible",
  args: {
    dismissible: true,
    show: true
  },
  parameters: {},
  tags: ["!dev"]
};
