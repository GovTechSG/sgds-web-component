import { SgdsInput } from '../src/Input/sgds-input'
import '../src/Input/sgds-input';
import {
  fixture,
  assert,
  expect,
  elementUpdated,
  oneEvent
} from '@open-wc/testing';
import {html} from 'lit';

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

  // TODO: Events
  it("should emit sgds-input event when value is entered", async () => {
    
  });
});