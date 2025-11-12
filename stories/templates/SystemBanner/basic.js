import { html } from "lit-html";

export const Template = args => html`<sgds-system-banner dismissible show>
    <sgds-system-banner-item>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <div slot="title">Title 1</div>
        <div>Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncus Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncu</div>
            <a href="#" slot="action">Action</a>
    </sgds-system-banner-item>
    <sgds-system-banner-item>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <div slot="title">Title 1</div>
        <div>Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncus </div>
            <a href="#" slot="action">Action</a>
    </sgds-system-banner-item>
    <sgds-system-banner-item>
        <sgds-icon slot="icon" name="placeholder"></sgds-icon>
        <div slot="title">Title 2</div>
        <div>Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncus </div>
            <a href="#" slot="action">Action</a>
    </sgds-system-banner-item>
</sgds-system-banner>`;

export const args = {};

export const parameters = {};
