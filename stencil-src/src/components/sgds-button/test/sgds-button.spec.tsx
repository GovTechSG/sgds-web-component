import { newSpecPage } from '@stencil/core/testing';
import { SgdsButton } from '../sgds-button';
import { SgdsSpinner } from '../../sgds-spinner/sgds-spinner';

describe('sgds-button', () => {
  it('renders with default values', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button></sgds-button>`,
    });
    const btn = page.root!.shadowRoot!.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn!.classList.contains('btn')).toBe(true);
    expect(btn!.classList.contains('no-icon')).toBe(true);
    expect(btn!.getAttribute('type')).toBe('button');
    expect(btn!.getAttribute('aria-disabled')).toBe('false');
    expect(btn!.getAttribute('tabindex')).toBe('0');

    const slots = page.root!.shadowRoot!.querySelectorAll('slot');
    expect(slots.length).toBe(3);
  });

  it('should convert from button tag to anchor tag if href is defined', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button href="#"></sgds-button>`,
    });
    const anchorTag = page.root!.shadowRoot!.querySelector('a');
    expect(anchorTag).not.toBeNull();
    expect(anchorTag!.getAttribute('href')).toBe('#');
    expect(anchorTag!.getAttribute('role')).toBe('button');
    expect(anchorTag!.getAttribute('type')).toBeNull();

    const buttonTag = page.root!.shadowRoot!.querySelector('button');
    expect(buttonTag).toBeNull();
  });

  it('should convert to anchor tag if download and href attributes are defined', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button download="logo.svg" href="folder/subfolder/logo.svg"></sgds-button>`,
    });
    const anchorTag = page.root!.shadowRoot!.querySelector('a');
    expect(anchorTag).not.toBeNull();
    expect(anchorTag!.getAttribute('download')).toBe('logo.svg');

    const buttonTag = page.root!.shadowRoot!.querySelector('button');
    expect(buttonTag).toBeNull();
  });

  it('anchor tag should contain rel="noreferrer noopener" if href and target="_blank" are defined', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button href="#" target="_blank"></sgds-button>`,
    });
    const anchorTag = page.root!.shadowRoot!.querySelector('a');
    expect(anchorTag).not.toBeNull();
    expect(anchorTag!.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('should contain disabled class if is an anchor tag and disabled attributes are defined', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button href="#" disabled></sgds-button>`,
    });
    const anchorTag = page.root!.shadowRoot!.querySelector('a');
    expect(anchorTag!.classList.contains('disabled')).toBe(true);
    expect(anchorTag!.getAttribute('aria-disabled')).toBe('true');
    expect(anchorTag!.getAttribute('tabindex')).toBe('-1');
    expect(anchorTag!.hasAttribute('disabled')).toBe(false);
  });

  it('should emit a click event when calling click()', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button></sgds-button>`,
    });
    const clickHandler = jest.fn();
    page.root!.addEventListener('click', clickHandler);
    page.root!.click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

describe('when submitting a form', () => {
  it('should submit when the button is inside the form', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `
        <form action="" method="post">
          <sgds-button type="submit"></sgds-button>
        </form>
      `,
    });
    const form = page.body.querySelector('form')!;
    const button = form.querySelector('sgds-button') as HTMLElement;
    const handleSubmit = jest.fn((e: Event) => e.preventDefault());

    form.addEventListener('submit', handleSubmit);
    button.click();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should submit when the button is outside the form and has a form attribute', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `
        <div>
          <form id="a" action="" method="post"></form>
          <sgds-button type="submit" form="a">Submit</sgds-button>
        </div>
      `,
    });
    const form = page.body.querySelector('form')!;
    const button = page.body.querySelector('sgds-button') as HTMLElement;
    const handleSubmit = jest.fn((e: Event) => e.preventDefault());

    form.addEventListener('submit', handleSubmit);
    button.click();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('when using methods', () => {
  it('should emit sgds-focus and sgds-blur events', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button>Button</sgds-button>`,
    });
    const focusHandler = jest.fn();
    const blurHandler = jest.fn();

    page.root!.addEventListener('sgds-focus', focusHandler);
    page.root!.addEventListener('sgds-blur', blurHandler);

    const btn = page.root!.shadowRoot!.querySelector('button')!;
    btn.dispatchEvent(new Event('focus'));
    expect(focusHandler).toHaveBeenCalledTimes(1);

    btn.dispatchEvent(new Event('blur'));
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  it('loading is true, spinner replaces the icon', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner).not.toBeNull();

    const defaultSlot = page.root!.shadowRoot!.querySelector('slot:not([name])');
    expect(defaultSlot).toBeNull();
  });

  it('loading is true, aria-label set to Loading, aria-disabled is true, .loading class is set', async () => {
    const page = await newSpecPage({
      components: [SgdsButton],
      html: `<sgds-button loading>hello</sgds-button>`,
    });
    const btn = page.root!.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Loading');
    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn.classList.contains('loading')).toBe(true);
  });

  it('should assign spinner tone=fixed-dark when button tone=fixed-light and variant=primary', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button variant="primary" tone="fixed-light" loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner!.getAttribute('tone')).toBe('fixed-dark');
  });

  it('should assign spinner tone=inverse when button tone=neutral and variant=primary', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button variant="primary" tone="neutral" loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner!.getAttribute('tone')).toBe('inverse');
  });

  it('should assign spinner tone=fixed-light when button variant=primary and tone=brand', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button variant="primary" tone="brand" loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner!.getAttribute('tone')).toBe('fixed-light');
  });

  it('should assign spinner tone=neutral when button tone=neutral and variant=ghost', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button variant="ghost" tone="neutral" loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner!.getAttribute('tone')).toBe('neutral');
  });

  it('should assign spinner tone=brand when variant=outline tone=brand', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button variant="outline" tone="brand" loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner!.getAttribute('tone')).toBe('brand');
  });

  it('should assign spinner tone=fixed-light by default (variant=primary, tone=brand)', async () => {
    const page = await newSpecPage({
      components: [SgdsButton, SgdsSpinner],
      html: `<sgds-button loading>hello</sgds-button>`,
    });
    const spinner = page.root!.shadowRoot!.querySelector('sgds-spinner');
    expect(spinner!.getAttribute('tone')).toBe('fixed-light');
  });
});
