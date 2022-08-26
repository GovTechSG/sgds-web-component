import { ButtonElement } from './button-element'
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

describe('button-element', () => {
    test('is defined', () => {
        const el = document.createElement('button-element');
        assert.instanceOf(el, ButtonElement)
    })
})