import { assert, elementUpdated, expect, fixture, html } from '@open-wc/testing';
import '../src/Button';
import { SgdsButton } from '../src/Button/sgds-button';
import '../src/Stepper';
import { SgdsStepper } from '../src/Stepper/sgds-stepper';

describe('sgds-stepper', () => {
  it('is defined', () => {
    const el = document.createElement('sgds-stepper');
    assert.instanceOf(el, SgdsStepper);
  });
  it('by default should render 3 steps within component', async () => {
    const el = await fixture(html` <sgds-stepper></sgds-stepper> `);
    const stepperItems = el.shadowRoot?.querySelectorAll('.stepper-item');
    expect(stepperItems?.length).to.equal(3);
  });
  it('should render the correct number of steps when passed in steps prop', async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='[{"title": 1, "stepHeader": "Marker title 1"},{"title": 2, "stepHeader": "Marker title 2"},{"title": 3, "stepHeader": "Marker title 3"},{"title": 4, "stepHeader": "Marker title 4"}]'
      ></sgds-stepper>
    `);
    const stepperItems = el.shadowRoot?.querySelectorAll('.stepper-item');
    expect(stepperItems?.length).to.equal(4);
  });

  it('should have the is-active class on step 1 when activeStep set to 0', async () => {
    const el = await fixture(html` <sgds-stepper activeStep="0"></sgds-stepper> `);

    expect(el.shadowRoot?.children[0].querySelector('.stepper-item')?.classList.value).to.contain('is-active');
  });

  it('when activeStep set to 2, should update the `is-active` to the previous step when clicked', async () => {
    const el = await fixture(html` <sgds-stepper activeStep="2"></sgds-stepper> `);

    const stepperItemTwo = el.shadowRoot?.querySelectorAll('.stepper-item')[1] as SgdsStepper;
    const stepperItemThree = el.shadowRoot?.querySelectorAll('.stepper-item')[2] as SgdsStepper;

    stepperItemTwo.click();
    await elementUpdated(el);
    expect(stepperItemTwo.classList.contains('is-active')).to.be.true;
    expect(stepperItemThree.classList.contains('is-active')).to.be.false;
  });
});

describe('sgds-stepper, sgds-button interactions', () => {
  it('should increment the active step when the incrementStep() method is called', async () => {
    const el = await fixture(html`
      <sgds-stepper id="myStepper" activeStep="0"></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="increment" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>('sgds-stepper');
    const button = el.querySelector<SgdsButton>('sgds-button');

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-active');
      button.shadowRoot?.querySelector('button')?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).not.to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).to.have.class('is-active');
    }
  });

  it('should increment the active step when the incrementStep() method is called, showing the previous step 1 to have is-clickable, is-completed props', async () => {
    const el = await fixture(html`
      <sgds-stepper id="myStepper" activeStep="0"></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="increment" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>('sgds-stepper');
    const button = el.querySelector<SgdsButton>('sgds-button');

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-active');
      button.shadowRoot?.querySelector('button')?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-completed');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-clickable');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).not.to.have.class('is-active');
    }
  });

  it('should decrement the active step when the decrementStep() method is called', async () => {
    const el = await fixture(html`
      <sgds-stepper id="myStepper" activeStep="1"></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="decrement" variant="primary">Back</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>('sgds-stepper');
    const button = el.querySelector<SgdsButton>('sgds-button');

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).to.have.class('is-active');
      button.shadowRoot?.querySelector('button')?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).not.to.have.class('is-active');
    }
  });

  it('should decrement the active step when the decrementStep() method is called, showing the previous step 2 to not have is-clickable, is-completed props', async () => {
    const el = await fixture(html`
      <sgds-stepper id="myStepper" activeStep="1"></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="decrement" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>('sgds-stepper');
    const button = el.querySelector<SgdsButton>('sgds-button');

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).to.have.class('is-active');
      button.shadowRoot?.querySelector('button')?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).not.to.have.class('is-completed');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).not.to.have.class('is-clickable');
    }
  });

  it('should set the active step to the last step when the lastStep() method is called', async () => {
    const el = await fixture(html`
      <sgds-stepper id="myStepper" activeStep="0"></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="last" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>('sgds-stepper');
    const button = el.querySelector<SgdsButton>('sgds-button');

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-active');
      button.shadowRoot?.querySelector('button')?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).not.to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).not.to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[2]).to.have.class('is-active');
    }
  });

  it('should set the active step to the first step when the firstStep() method is called', async () => {
    const el = await fixture(html`
      <sgds-stepper id="myStepper" activeStep="2"></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="first" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>('sgds-stepper');
    const button = el.querySelector<SgdsButton>('sgds-button');

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[2]).to.have.class('is-active');
      button.shadowRoot?.querySelector('button')?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[2]).not.to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[1]).not.to.have.class('is-active');
      expect(stepper?.shadowRoot?.querySelectorAll('.stepper-item')[0]).to.have.class('is-active');
    }
  });
});
