import { Component, Prop, h } from '@stencil/core';

export type SpinnerTone = 'brand' | 'neutral' | 'inverse' | 'fixed-light' | 'fixed-dark';
export type SpinnerVariant = 'primary' | 'neutral';

@Component({
  tag: 'sgds-spinner',
  shadow: true,
  styleUrls: [
    '../../base/sgds-element.css',
    'spinner.css',
  ],
})
export class SgdsSpinner {
  /** The color tones of spinner, replaces variant prop */
  @Prop({ reflect: true }) tone: SpinnerTone = 'brand';

  /** The variant of spinner. @deprecated Use `tone` instead */
  @Prop({ reflect: true }) variant: SpinnerVariant = 'primary';

  /** Specifies spinner size */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Text label of the spinner */
  @Prop({ reflect: true }) label: string;

  /** Orientation of label relative to the spinner */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  render() {
    return (
      <div
        class={{
          'spinner-wrapper': true,
          'horizontal': this.orientation === 'horizontal',
        }}
      >
        <div
          class={{
            'spinner': true,
            [`spinner-${this.size}`]: !!this.size,
          }}
          role="status"
        >
          {!this.label && <span class="sr-only">Loading...</span>}
        </div>
        {this.label && <span class="spinner-label">{this.label}</span>}
      </div>
    );
  }
}
