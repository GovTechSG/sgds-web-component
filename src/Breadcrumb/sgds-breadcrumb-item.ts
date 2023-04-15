import { customElement, property} from "lit/decorators.js";
import { html} from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import SgdsElement from "../base/sgds-element";
import styles from "./sgds-breadcrumb.scss";

@customElement("sgds-breadcrumb-item")
export class SgdsBreadcrumbItem extends SgdsElement {
    static styles = styles;

    @property({ type: String, reflect: true}) currentPage;

    @property({type: String }) href;

    @property() target?: '_blank' | '_parent' | '_self' | '_top';

    @property() rel = 'noreferrer noopener';
    

    render(){
        const isLink = this.href ? true : false;

        return html`
            <div 
                part="base"
                class=${classMap({
                    'breadcrumb-item' : true
                })}
            >${isLink ? html`
                <a 
                    part="label"
                    href="${this.href}"
                    rel=${ifDefined(this.target ? this.rel : undefined )}
                    target=${ifDefined(this.target)}
                ><slot></slot></a>
            ` 
            : html`<span part="label"><slot></slot></span>`
            }
                <slot name="separator" part="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
            </div>
        `

    }
}

export default SgdsBreadcrumbItem;