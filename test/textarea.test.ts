import { SgdsTextArea } from '../src/Textarea/sgds-textarea';
import '../src/Textarea';
import { SgdsButton } from '../src/Button/sgds-button';
import '../src/Button';
import { assert, fixture, html, expect, waitUntil, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';

describe('sgds-textarea', () => {
  it('is defined', () => {
    const el = document.createElement('sgds-textarea');
    assert.instanceOf(el, SgdsTextArea);
  });
  it('renders with default values', async () => {
    const el = await fixture(
      html`<sgds-textarea
        textareaId="test"
        required
        invalidFeedback="Do not leave blank"
        maxlength="10"
      ></sgds-textarea>`
    );
    assert.shadowDom.equal(
      el,
      `
      <div class="text-area-label-wrapper d-flex justify-content-between">
        <label class="form-label" for="test">label</label>
        <div class="form-text">0/10</div>
      </div>
      <textarea class=" form-control textarea-resize-vertical " id="test" rows="4" placeholder="Placeholder" maxlength="10" aria-invalid="false" spellcheck="false" required=""></textarea>
      <div class="invalid-feedback" id="test-invalid">Do not leave blank</div>
    `
    );
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea disabled></sgds-textarea> `);
    const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');

    expect(textarea?.disabled).to.be.true;
  });

  it('should focus the textarea when clicking on the label', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea label="Name"></sgds-textarea> `);
    const label = el.shadowRoot?.querySelector('.form-label');
    const submitHandler = sinon.spy();

    el.addEventListener('sgds-focus', submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });
});

describe('when using constraint validation', () => {
  it('should be valid by default', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea></sgds-textarea> `);
    expect(el.invalid).to.be.false;
  });

  it('should be valid when required and empty by default', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea required></sgds-textarea> `);

    expect(el.invalid).to.be.false;
  });

  it('should be invalid when required and after removing disabled ', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea disabled required></sgds-textarea> `);

    el.disabled = false;
    await el.updateComplete;

    expect(el.invalid).to.be.true;
  });

  it('should be invalid when required and disabled is removed', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea disabled required></sgds-textarea> `);
    el.disabled = false;
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });
});

describe('when resetting a form', () => {
  it('should reset the element to its initial value', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-textarea name="a" value="test"></sgds-textarea>
        <sgds-button type="reset">Reset</sgds-button>
      </form>
    `);
    const button = form.querySelector<SgdsButton>('sgds-button');
    const textarea = form.querySelector<SgdsTextArea>('sgds-textarea');
    if (textarea) textarea.value = '1234'

    await textarea?.updateComplete;

    setTimeout(() => button?.click());
    await oneEvent(form, 'reset');
    await textarea?.updateComplete;

    expect(textarea?.value).to.equal('test');

    if (textarea) textarea.defaultValue = ''

    setTimeout(() => button?.click());
    await oneEvent(form, 'reset');
    await textarea?.updateComplete;

    expect(textarea?.value).to.equal('');
  });
});

describe('when maxlength is declared', () => {
  it('form text should exist', async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea required maxlength="250"></sgds-textarea> `);
    const formtext = el.shadowRoot?.querySelector('.form-text');

    expect(formtext).to.exist;
    expect(formtext?.textContent).to.contain('0/250');

    el.setAttribute('maxlength', '300');
    await el.updateComplete;

    expect(formtext).to.exist;
    expect(formtext?.textContent).to.contain('0/300');
  });
});
