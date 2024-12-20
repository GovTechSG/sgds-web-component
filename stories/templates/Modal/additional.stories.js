import { html } from "lit-html";

export const SizeTemplate = args => {
  return html`
    <sgds-modal open=${true} size=${args.size} @sgds-close=${e => e.preventDefault()}>
      <h2 slot="title">Modal title</h2>
      <p slot="description">Modal description</p>
      <p>
        Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in
      </p>
      <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-modal>
  `;
};

export const LongContentTemplate = args => {
  return html`
    <sgds-modal open=${true} @sgds-close=${e => e.preventDefault()}>
      <h2 slot="title">Modal title</h2>
      <p slot="description">Modal description</p>
      <p>
        Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in Etiam
        suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in Etiam
        suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in Etiam
        suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in Etiam
        suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in
      </p>
      <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-modal>
  `;
};
export const noAnimationTemplate = args => {
  return html`
    <sgds-button @click=${showModal} style="margin:30px;">Open Modal</sgds-button>
    <sgds-modal id="no-animation-modal" noAnimation>
      <h2 slot="title">Modal title</h2>
      <p slot="description">Modal description</p>
      <p>
        Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in
      </p>
      <sgds-button @click=${closeModal} slot="footer" variant="link" class="close-modal">Close</sgds-button>
      <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-modal>
  `;
};

const showModal = () => {
  const modal = document.querySelector("#no-animation-modal");
  modal.show();
};
const closeModal = () => {
  const modal = document.querySelector("#no-animation-modal");
  modal.hide();
};
export const SmallSize = {
  render: SizeTemplate.bind({}),
  name: "Small size",
  args: { size: "sm" },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: "700px"
      }
    }
  }
};
export const MediumSize = {
  render: SizeTemplate.bind({}),
  name: "Medium size",
  args: { size: "md" },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: "700px"
      }
    }
  }
};
export const LargeSize = {
  render: SizeTemplate.bind({}),
  name: "Large size",
  args: { size: "lg" },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: "700px"
      }
    }
  }
};
export const FullscreenSize = {
  render: SizeTemplate.bind({}),
  name: "Fullscreen size",
  args: { size: "fullscreen" },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: "700px"
      }
    }
  }
};

export const LongContent = {
  render: LongContentTemplate.bind({}),
  name: "Long content",
  args: { size: "md" },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: "700px"
      }
    }
  }
};

export const noAnimation = {
  render: noAnimationTemplate.bind({}),
  name: "No animation",
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: "700px"
      }
    }
  }
};
