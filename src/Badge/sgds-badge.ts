import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';
import styles from "./sgds-badge.scss";
import SgdsElement from "../utils/sgds-element";

export type ButtonVariant = 
"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" 

@customElement("sgds-badge")
export class SgdsBadge extends SgdsElement {
    static styles = styles;

    @property({ reflect: true }) variant: ButtonVariant = "primary";
    @property({ reflect: true }) leftIconName
    @property({ reflect: true }) rightIconName
    render() {
        return html`
            <span 
                class="  
                ${classMap({
                    'sgds badge' : true,
                    [`bg-${this.variant}`]: this.variant,
                })}
            ">
                <slot name="leftIcon"></slot>
                <slot></slot>
                <slot name="rightIcon"></slot>
            </span>

        `
    }
}

export default SgdsBadge;