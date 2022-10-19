import { SgdsTextArea } from '../src/TextArea/sgds-textarea';
import '../src/Textarea';
// import '../src/Button';
import { assert, fixture, html } from '@open-wc/testing';

// import sinon from 'sinon';
// import { sendKeys } from '@web/test-runner-commands';

describe('sgds-textarea', () => {
  it('is defined', () => {
      const el = document.createElement('sgds-textarea');
      assert.instanceOf(el, SgdsTextArea)
  })
  it('renders with default values', async () => {
    const el = await fixture(html`<sgds-textarea id="test-id"></sgds-textarea>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="sgds form-group mt-4">
        <div class="d-flex justify-content-between">
          <div class="form-label" for="test-id">label</div>
          <div class="form-text">0/10</div>
        </div>
        <textarea class="form-control" id="test-id" rows="4" placeholder="Placeholder" aria-invalid="false" spellcheck="false"></textarea>
        <div class="invalid-feedback" id="test-id-invalid">please key in something</div>
      </div>
    `
    );
  })
});
