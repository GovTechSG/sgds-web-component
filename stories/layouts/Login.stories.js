import { html } from "lit";

export default {
  title: "Templates/Login"
};

const Template = () => html`
  <sgds-masthead></sgds-masthead>

  <div
    class="sgds:min-h-screen sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-default sgds:p-layout-sm"
  >
    <div class="sgds:w-full sgds:max-w-sm">
      <!-- App branding -->
      <div class="sgds:text-center sgds:mb-layout-sm">
        <div
          class="sgds:w-12 sgds:h-12 sgds:rounded-xl sgds:bg-primary-default sgds:flex sgds:items-center sgds:justify-center sgds:mx-auto sgds:mb-3"
        >
          <sgds-icon name="shield-fill" size="24" style="color: white;"></sgds-icon>
        </div>
        <h1 class="sgds:text-xl sgds:font-semibold sgds:text-color-default">My Application</h1>
        <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">Singapore Government Digital Services</p>
      </div>

      <!-- Auth card -->
      <div class="sgds:bg-surface-raised sgds:rounded-xl sgds:shadow-card sgds:p-component-xl">
        <!-- Card header -->
        <div class="sgds:mb-layout-sm">
          <h2 class="sgds:text-lg sgds:font-semibold sgds:text-color-default">Welcome back</h2>
          <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">Sign in to your account to continue</p>
        </div>

        <!-- Login form -->
        <form class="sgds:flex sgds:flex-col sgds:gap-component-sm">
          <sgds-input
            label="Email address"
            type="email"
            name="email"
            placeholder="you@agency.gov.sg"
            required
            hasFeedback
          ></sgds-input>

          <div>
            <sgds-input label="Password" type="password" name="password" required hasFeedback></sgds-input>
            <div class="sgds:flex sgds:justify-end sgds:mt-1">
              <a href="#" class="sgds:text-sm sgds:text-primary-default hover:sgds:underline"> Forgot password? </a>
            </div>
          </div>

          <sgds-button type="submit" variant="primary" fullWidth> Sign in </sgds-button>
        </form>

        <!-- Divider -->
        <div class="sgds:flex sgds:items-center sgds:gap-3 sgds:my-component-lg">
          <sgds-divider></sgds-divider>
          <span class="sgds:text-xs sgds:text-color-muted sgds:whitespace-nowrap">or sign in with</span>
          <sgds-divider></sgds-divider>
        </div>

        <!-- SSO option -->
        <sgds-button variant="outline" fullWidth>
          <sgds-icon slot="leftIcon" name="person-badge-fill"></sgds-icon>
          Singpass
        </sgds-button>

        <!-- Footer link -->
        <p class="sgds:text-sm sgds:text-center sgds:text-color-muted sgds:mt-layout-xs">
          Don't have an account?
          <a href="#" class="sgds:text-primary-default hover:sgds:underline">Sign up</a>
        </p>
      </div>
    </div>
  </div>
`;

export const LoginTemplate = {
  render: Template.bind({}),
  name: "Login",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

const TwoColumnTemplate = () => html`
  <div class="sgds:min-h-screen sgds:flex sgds:flex-col lg:sgds:flex-row sgds:bg-surface-default">
    <!-- Left: brand panel (visible only on large screens) -->
    <div
      class="sgds:hidden lg:sgds:flex lg:sgds:w-1/2 sgds:flex-col sgds:justify-between sgds:bg-primary-default sgds:p-layout-lg"
    >
      <div>
        <div class="sgds:flex sgds:items-center sgds:gap-2">
          <sgds-icon name="shield-fill" size="24" style="color: white;"></sgds-icon>
          <span class="sgds:text-white sgds:font-semibold sgds:text-lg">My Application</span>
        </div>
      </div>
      <blockquote class="sgds:text-white">
        <p class="sgds:text-xl sgds:font-medium sgds:leading-relaxed">"Serving citizens with speed and integrity."</p>
        <footer class="sgds:mt-4 sgds:text-sm sgds:opacity-75">— Your Agency Name</footer>
      </blockquote>
    </div>

    <!-- Right: form panel -->
    <div class="sgds:flex sgds:flex-col sgds:w-full lg:sgds:w-1/2">
      <sgds-masthead></sgds-masthead>
      <div class="sgds:flex sgds:flex-1 sgds:items-center sgds:justify-center sgds:p-layout-md">
        <div class="sgds:w-full sgds:max-w-sm">
          <div class="sgds:mb-layout-sm">
            <h2 class="sgds:text-xl sgds:font-semibold sgds:text-color-default">Sign in</h2>
            <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">Enter your credentials to access the portal</p>
          </div>
          <form class="sgds:flex sgds:flex-col sgds:gap-component-sm">
            <sgds-input
              label="Email"
              type="email"
              name="email"
              placeholder="you@agency.gov.sg"
              required
              hasFeedback
            ></sgds-input>
            <div>
              <sgds-input label="Password" type="password" name="password" required hasFeedback></sgds-input>
              <div class="sgds:flex sgds:justify-end sgds:mt-1">
                <a href="#" class="sgds:text-sm sgds:text-primary-default hover:sgds:underline">Forgot password?</a>
              </div>
            </div>
            <sgds-button type="submit" variant="primary" fullWidth>Sign in</sgds-button>
            <sgds-button variant="outline" fullWidth>
              <sgds-icon slot="leftIcon" name="person-badge-fill"></sgds-icon>
              Singpass
            </sgds-button>
          </form>
          <p class="sgds:text-sm sgds:text-center sgds:text-color-muted sgds:mt-layout-xs">
            Don't have an account?
            <a href="#" class="sgds:text-primary-default hover:sgds:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
`;

export const LoginTwoColumn = {
  render: TwoColumnTemplate.bind({}),
  name: "Login — two-column with brand panel",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
