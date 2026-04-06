export const Card = () => {
  return (
    <sgds-thumbnail-card stretchedlink="" orientation="vertical" suppressHydrationWarning>
      <img slot="thumbnail" alt="img alternate text goes here" width="48" height="48" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" />
      <span slot="subtitle">EXPLORE THE FEATURES</span>
      <span slot="title">Innovative Solutions for You</span>
      <span slot="description">
        Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
        and user-friendly design, we empower you to achieve more.
      </span>
      <div slot="lower"></div>
      <a href="#" slot="link">Register now</a>
    </sgds-thumbnail-card>
  );
};
