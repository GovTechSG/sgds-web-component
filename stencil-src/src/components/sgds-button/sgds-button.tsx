import { Component, Prop, State, Element, Event, EventEmitter, Method, h, Host } from '@stencil/core';
import { getAssociatedForm, submitForm, resetForm } from '../../utils/form-submit';
import { SpinnerTone } from '../sgds-spinner/sgds-spinner';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonTone = 'brand' | 'danger' | 'fixed-light' | 'neutral';

@Component({
  tag: 'sgds-button',
  shadow: true,
  styleUrls: [
    '../../base/sgds-element.css',
    '../../base/button.css',
    'button.css',
  ],
})
export class SgdsButton {
  @Element() el!: HTMLElement;

  // --- Props from ButtonElement base ---

  /** Sets the visual variants such as: `primary`, `outline`, `ghost`. `danger` is @deprecated since v3.5.6 */
  @Prop({ reflect: true }) variant: ButtonVariant = 'primary';

  /** Sets the visual colour of the button: `brand`, `danger`, `fixed-light`, `neutral` */
  @Prop({ reflect: true }) tone: ButtonTone = 'brand';

  /** Specifies a small, medium or large button, the size is medium by default. */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  /** Manually set the visual state of the button to `:active` */
  @Prop({ reflect: true }) active: boolean = false;

  /** The disabled state of the button */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @Prop({ reflect: true }) href: string;

  /** Where to display the linked URL */
  @Prop({ reflect: true }) target: '_blank' | '_parent' | '_self' | '_top' = '_self';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @Prop({ reflect: true }) download: string;

  /** The aria-label attribute to passed to button element when necessary */
  @Prop({ attribute: 'aria-label' }) ariaLabel: string;

  /** When true, shows a loading spinner */
  @Prop() loading: boolean = false;

  // --- Props specific to SgdsButton ---

  /** The behavior of the button with default as `type='button'`, `reset` resets all the controls to their initial values and `submit` submits the form data to the server */
  @Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /** The "form owner" to associate the button with. The value must be an id of a form in the same document or shadow root. */
  @Prop({ reflect: true }) form: string;

  /** Used to override the form owner's `action` attribute. */
  @Prop({ reflect: true, attribute: 'formaction' }) formAction: string;

  /** Used to override the form owner's `method` attribute. */
  @Prop({ reflect: true, attribute: 'formmethod' }) formMethod: 'post' | 'get';

  /** Used to override the form owner's `novalidate` attribute. */
  @Prop({ reflect: true, attribute: 'formnovalidate' }) formNoValidate: boolean;

  /** Used to override the form owner's `target` attribute. */
  @Prop({ reflect: true, attribute: 'formtarget' }) formTarget: '_self' | '_blank' | '_parent' | '_top' | string;

  /** When set, the button will be in full width. */
  @Prop({ reflect: true }) fullWidth: boolean = false;

  /** Used only for SSR to indicate the presence of the `leftIcon` slot. */
  @Prop({ mutable: true }) hasLeftIconSlot: boolean = false;

  /** Used only for SSR to indicate the presence of the `rightIcon` slot. */
  @Prop({ mutable: true }) hasRightIconSlot: boolean = false;

  // --- Internal state ---

  @State() private associatedForm: HTMLFormElement | null = null;

  // --- Events ---

  /** Emitted when the button is blurred. */
  @Event({ eventName: 'sgds-blur', bubbles: true, composed: true }) sgdsBlur!: EventEmitter<void>;

  /** Emitted when the button is focused. */
  @Event({ eventName: 'sgds-focus', bubbles: true, composed: true }) sgdsFocus!: EventEmitter<void>;

  // --- Lifecycle ---

  connectedCallback() {
    this.associatedForm = getAssociatedForm(this.el, this.form);
  }

  disconnectedCallback() {
    this.associatedForm = null;
  }

  componentDidLoad() {
    this.checkSlots();
  }

  // --- Public methods ---

  /** Sets focus on the button. */
  @Method()
  async setFocus(options?: FocusOptions) {
    this.getInnerElement()?.focus(options);
  }

  /** Removes focus from the button. */
  @Method()
  async setBlur() {
    this.getInnerElement()?.blur();
  }

  // --- Private methods ---

  private getInnerElement(): HTMLElement | null {
    return this.el.shadowRoot?.querySelector('.btn') ?? null;
  }

  private checkSlots() {
    // Use children iteration instead of :scope selector (not supported in mock-doc for testing)
    const children = Array.from(this.el.children);
    this.hasLeftIconSlot = children.some(child => child.getAttribute('slot') === 'leftIcon');
    this.hasRightIconSlot = children.some(child => child.getAttribute('slot') === 'rightIcon');
  }

  private handleSlotChange = () => {
    this.checkSlots();
  };

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.type === 'submit') {
      const form = this.associatedForm || getAssociatedForm(this.el, this.form);
      if (form) {
        submitForm(form, {
          formAction: this.formAction,
          formMethod: this.formMethod,
          formNoValidate: this.formNoValidate,
          formTarget: this.formTarget,
        });
      }
    }

    if (this.type === 'reset') {
      const form = this.associatedForm || getAssociatedForm(this.el, this.form);
      if (form) {
        resetForm(form);
      }
    }
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  };

  private handleFocus = () => {
    this.sgdsFocus.emit();
  };

  private handleBlur = () => {
    this.sgdsBlur.emit();
  };

  private assignSpinnerSize(buttonSize: 'xs' | 'sm' | 'md' | 'lg'): 'xs' | 'sm' {
    if (buttonSize === 'xs' || buttonSize === 'sm') return 'xs';
    return 'sm';
  }

  private assignSpinnerTone(buttonTone: ButtonTone, buttonVariant: ButtonVariant): SpinnerTone {
    if (buttonTone === 'fixed-light' && buttonVariant === 'primary') return 'fixed-dark';
    if (buttonTone === 'neutral' && buttonVariant === 'primary') return 'inverse';
    if (buttonTone === 'fixed-light' || buttonVariant === 'primary') return 'fixed-light';
    if (buttonTone === 'neutral' && (buttonVariant === 'outline' || buttonVariant === 'ghost')) return 'neutral';
    return 'brand';
  }

  // --- Render ---

  render() {
    const isLink = !!this.href;
    const Tag = isLink ? 'a' : 'button';
    const noIcon = !this.hasLeftIconSlot && !this.hasRightIconSlot;

    const classes = {
      'btn': true,
      'disabled': this.disabled,
      'active': this.active,
      'has-left-icon': this.hasLeftIconSlot,
      'has-right-icon': this.hasRightIconSlot,
      'no-icon': noIcon,
      'loading': this.loading,
    };

    const attrs: Record<string, unknown> = {
      class: classes,
      onClick: this.handleClick,
      onKeydown: this.handleKeydown,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      'aria-disabled': String(this.disabled || this.loading),
      tabindex: this.disabled ? '-1' : '0',
      'aria-label': this.loading ? 'Loading' : this.ariaLabel,
    };

    if (isLink) {
      attrs.href = this.href;
      attrs.target = this.target;
      attrs.download = this.download;
      attrs.rel = this.target === '_blank' ? 'noreferrer noopener' : undefined;
      attrs.role = 'button';
    } else {
      attrs.disabled = this.disabled;
      attrs.type = this.type;
    }

    return (
      <Host>
        <Tag {...attrs}>
          {this.loading
            ? (
              <sgds-spinner
                size={this.assignSpinnerSize(this.size)}
                tone={this.assignSpinnerTone(this.tone, this.variant)}
              ></sgds-spinner>
            )
            : ([
              <slot name="leftIcon" onSlotchange={this.handleSlotChange}></slot>,
              <span><slot></slot></span>,
              <slot name="rightIcon" onSlotchange={this.handleSlotChange}></slot>,
            ])
          }
        </Tag>
      </Host>
    );
  }
}
