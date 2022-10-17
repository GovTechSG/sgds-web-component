import { SgdsInput } from '../src/Input/sgds-input';
import '../src/Input';
import '../src/Button';
import { expect, fixture, html, oneEvent, waitUntil, assert,elementUpdated, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';

describe('sgds-input', () => {
  it('is defined', () => {
      const el = document.createElement('sgds-input');
      assert.instanceOf(el, SgdsInput)
  })
  it('renders with default values', async () => {
    const el = await fixture(html`<sgds-input id="test-id"></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="sgds form-group ">
        <label class="form-label" for="test-id">label</label>
        <input type="text" class="form-control " id="test-id" placeholder="Placeholder" aria-invalid="false">
        <div class="invalid-feedback" id="test-id-invalid">default feedback</div>
      </div>
    `
    );
  })

  // Labels
  it('should replace label value the if updated', async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el.setAttribute('label','Enter your name');
    await elementUpdated(el);
    const labelText = el.shadowRoot?.querySelector(".form-label");
    expect(labelText?.textContent).to.contain('Enter your name');
  })

  // Hint Text
  it('should render hint text element if hintText attribute is defined', async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el.setAttribute('hintText', 'hint');
    await elementUpdated(el);
    const hintText = el.shadowRoot?.querySelector(".form-text");
    expect(hintText?.textContent).to.equal("hint");
    expect(hintText).to.exist;
  })

  // Icon
  it('should render with fom-control-group if iconName attribute is defined', async () => {
    const el = await fixture(html`<sgds-input iconName='search' id="defaultID"></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="sgds form-group ">
        <label class="form-label" for="defaultID">label</label>
        <div class="sgds form-control-group">
          <span class="form-control-icon">
            <sl-icon name="search"></sl-icon> 
          </span>
          
          <input type="text" class="form-control " id="defaultID" placeholder="Placeholder" aria-invalid="false">
          <div class="invalid-feedback" id="defaultID-invalid">default feedback</div>
      
        </div>
      </div>
      `
    );
  })

  it("updates the iconName attribute value to 'stack'", async () => {
    const el = await fixture(html`<sgds-input iconName='search'></sgds-input>`);
    const iconElement = el.shadowRoot?.querySelector("sl-icon");
    iconElement?.setAttribute('name','stack');
    await elementUpdated(el);
    expect( iconElement?.getAttribute('name')).to.equal("stack");
  })

  //Name
  it("updates the name attribute value to 'Hello'", async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el?.setAttribute('name','Hello');
    await elementUpdated(el);
    const name = el.shadowRoot?.querySelector('.form-control')
    expect( name?.getAttribute('name')).to.equal("Hello");
  })

  //Placeholder
  it("updates the default placeholder value to 'Hello'", async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el?.setAttribute('placeholder','Hello');
    await elementUpdated(el);
    const placeHolder = el.shadowRoot?.querySelector('.form-control')
    expect( placeHolder?.getAttribute('placeholder')).to.equal("Hello");
  })

  it('should focus the input when clicking on the label', async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input label="Name"></sgds-input> `);
    const label = el.shadowRoot?.querySelector('label')!;
    const submitHandler = sinon.spy();

    el.addEventListener('sgds-focus', submitHandler);
    (label as HTMLElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  it('should be invalid when the pattern does not match', async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input pattern="^test" value="fail"></sgds-input> `);
    expect(el.invalid).to.be.true;
    expect(el.reportValidity()).to.be.false;
  });

});

describe('when calling HTMLFormElement.reportValidity()', () => {
  it('should be invalid when the input is empty and form.reportValidity() is called', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input required value=""></sgds-input>
        <sgds-button type="submit">Submit</sgds-button>
      </form>
    `);

    expect(form.reportValidity()).to.be.false;
  });

  it('should be valid when the input is empty, reportValidity() is called, and the form has novalidate', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-input required value=""></sgds-input>
        <sgds-button type="submit">Submit</sgds-button>
      </form>
    `);

    expect(form.reportValidity()).to.be.true;
  });

  
  it('fires sgds-input event when value is entered', async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input></sgds-input> `);
    const inputHandler = sinon.spy();
    const label = el.shadowRoot?.querySelector('label')!;
    (label as HTMLElement).click();
    el.addEventListener('sgds-input', inputHandler);
    await sendKeys({ press: 'A' });
    waitUntil(()=> inputHandler.calledOnce)
    expect(inputHandler).to.have.been.calledOnce;
  });

  // it('should reset the element to its initial value', async () => {
  //   const form = await fixture<HTMLFormElement>(html`
  //     <form>
  //       <sgds-input name="a" value="test"></sgds-input>
  //       <sgds-button type="reset">Reset</sgds-button>
  //     </form>
  //   `);
  //   const button = form.querySelector('sgds-button');
  //   const input = form.querySelector('sgds-input');

  //   (button as HTMLElement).click();
    
  //   await aTimeout(3000);

  //   expect((input as HTMLInputElement).value).to.equal('');
  // });

});
