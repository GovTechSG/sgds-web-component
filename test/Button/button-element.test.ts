import { ButtonElement } from '../../src/Button/button-element'
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('button-element', () => {
    test('is defined', () => {
        const el = document.createElement('button-element');
        assert.instanceOf(el, ButtonElement)
    })
})