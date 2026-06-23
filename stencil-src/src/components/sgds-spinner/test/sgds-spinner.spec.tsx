import { newSpecPage } from '@stencil/core/testing';
import { SgdsSpinner } from '../sgds-spinner';

describe('sgds-spinner', () => {
  it('should have default class of spinner-md if no size attribute defined', async () => {
    const page = await newSpecPage({
      components: [SgdsSpinner],
      html: `<sgds-spinner></sgds-spinner>`,
    });
    const base = page.root!.shadowRoot!.querySelector('[role="status"]');
    expect(base).not.toBeNull();
    expect(base!.classList.contains('spinner-md')).toBe(true);
  });

  it("should have class of 'spinner-sm' if size='sm'", async () => {
    const page = await newSpecPage({
      components: [SgdsSpinner],
      html: `<sgds-spinner size="sm"></sgds-spinner>`,
    });
    const base = page.root!.shadowRoot!.querySelector('[role="status"]');
    expect(base!.classList.contains('spinner-sm')).toBe(true);
  });

  it("should have class of 'spinner-lg' if size='lg'", async () => {
    const page = await newSpecPage({
      components: [SgdsSpinner],
      html: `<sgds-spinner size="lg"></sgds-spinner>`,
    });
    const base = page.root!.shadowRoot!.querySelector('[role="status"]');
    expect(base!.classList.contains('spinner-lg')).toBe(true);
  });

  it('span.sr-only should exist when there is no label', async () => {
    const page = await newSpecPage({
      components: [SgdsSpinner],
      html: `<sgds-spinner></sgds-spinner>`,
    });
    const screenReaderOnly = page.root!.shadowRoot!.querySelector('span.sr-only');
    expect(screenReaderOnly).not.toBeNull();
    expect(screenReaderOnly!.textContent).toBe('Loading...');

    const spinnerLabel = page.root!.shadowRoot!.querySelector('.spinner-label');
    expect(spinnerLabel).toBeNull();
  });

  it('span.sr-only should NOT exist when there is a label', async () => {
    const page = await newSpecPage({
      components: [SgdsSpinner],
      html: `<sgds-spinner label="Loading"></sgds-spinner>`,
    });
    const screenReaderOnly = page.root!.shadowRoot!.querySelector('span.sr-only');
    expect(screenReaderOnly).toBeNull();

    const spinnerLabel = page.root!.shadowRoot!.querySelector('.spinner-label');
    expect(spinnerLabel).not.toBeNull();
    expect(spinnerLabel!.textContent).toBe('Loading');
  });

  it("when orientation='horizontal', should render class 'horizontal'", async () => {
    const page = await newSpecPage({
      components: [SgdsSpinner],
      html: `<sgds-spinner label="Loading" orientation="horizontal"></sgds-spinner>`,
    });
    const wrapper = page.root!.shadowRoot!.querySelector('.spinner-wrapper');
    expect(wrapper!.classList.contains('horizontal')).toBe(true);
  });
});
