import { html } from 'lit';

export default {
  title: 'Utilities/Background Color',
  tags: ['autodocs'],
};

const ColorItem = (token, variable, bgClass, textClass = '') => html`
  <div class="sgds:flex sgds:flex-col sgds:gap-xs">
    <div class="${bgClass} sgds:p-lg sgds:rounded-md sgds:border sgds:border-default sgds:min-h-24 ${textClass}"></div>
    <div class="sgds:text-1 sgds:font-weight-semibold sgds:break-words">${token}</div>
    <div class="sgds:text-0 sgds:text-subtle">${variable}</div>
  </div>
`;

const ColorGrid = (...items) => html`
  <div class="sgds:grid sgds:gap-2-xl sgds:p-2-xl" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
    ${items}
  </div>
`;

export const SurfaceColors = () => ColorGrid(
  ColorItem('sgds:bg-surface-default', '--sgds-surface-default', 'sgds:bg-surface-default'),
  ColorItem('sgds:bg-surface-raised', '--sgds-surface-raised', 'sgds:bg-surface-raised'),
  ColorItem('sgds:bg-surface-inverse', '--sgds-surface-inverse', 'sgds:bg-surface-inverse', 'sgds:text-inverse'),
  ColorItem('sgds:bg-surface-fixed-light', '--sgds-surface-fixed-light', 'sgds:bg-surface-fixed-light', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-surface-fixed-dark', '--sgds-surface-fixed-dark', 'sgds:bg-surface-fixed-dark', 'sgds:text-fixed-light')
);

export const BaseColors = () => ColorGrid(
  ColorItem('sgds:bg-default', '--sgds-bg-default', 'sgds:bg-default'),
  ColorItem('sgds:bg-alternate', '--sgds-bg-alternate', 'sgds:bg-alternate'),
  ColorItem('sgds:bg-fixed-light', '--sgds-bg-fixed-light', 'sgds:bg-fixed-light', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-fixed-dark', '--sgds-bg-fixed-dark', 'sgds:bg-fixed-dark', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-overlay', '--sgds-bg-overlay', 'sgds:bg-overlay', 'sgds:text-inverse'),
  ColorItem('sgds:bg-translucent', '--sgds-bg-translucent', 'sgds:bg-translucent'),
  ColorItem('sgds:bg-translucent-subtle', '--sgds-bg-translucent-subtle', 'sgds:bg-translucent-subtle'),
  ColorItem('sgds:bg-transparent', 'transparent', 'sgds:bg-transparent sgds:border sgds:border-default'),
  ColorItem('sgds:bg-translucent-inverse', '--sgds-bg-translucent-inverse', 'sgds:bg-translucent-inverse'),
  ColorItem('sgds:bg-translucent-fixed-dark', '--sgds-bg-translucent-fixed-dark', 'sgds:bg-translucent-fixed-dark', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-translucent-fixed-light', '--sgds-bg-translucent-fixed-light', 'sgds:bg-translucent-fixed-light', 'sgds:text-fixed-dark')
);

export const PrimaryColors = () => ColorGrid(
  ColorItem('sgds:bg-primary-default', '--sgds-primary-bg-default', 'sgds:bg-primary-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-primary-muted', '--sgds-primary-bg-muted', 'sgds:bg-primary-muted'),
  ColorItem('sgds:bg-primary-translucent', '--sgds-primary-bg-translucent', 'sgds:bg-primary-translucent'),
  ColorItem('sgds:bg-primary-surface-default', '--sgds-primary-surface-default', 'sgds:bg-primary-surface-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-primary-surface-emphasis', '--sgds-primary-surface-emphasis', 'sgds:bg-primary-surface-emphasis', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-primary-surface-muted', '--sgds-primary-surface-muted', 'sgds:bg-primary-surface-muted'),
  ColorItem('sgds:bg-primary-surface-translucent', '--sgds-primary-surface-translucent', 'sgds:bg-primary-surface-translucent')
);

export const AccentColors = () => ColorGrid(
  ColorItem('sgds:bg-accent-default', '--sgds-accent-bg-default', 'sgds:bg-accent-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-accent-muted', '--sgds-accent-bg-muted', 'sgds:bg-accent-muted'),
  ColorItem('sgds:bg-accent-surface-default', '--sgds-accent-surface-default', 'sgds:bg-accent-surface-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-accent-surface-emphasis', '--sgds-accent-surface-emphasis', 'sgds:bg-accent-surface-emphasis', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-accent-surface-muted', '--sgds-accent-surface-muted', 'sgds:bg-accent-surface-muted')
);

export const SuccessColors = () => ColorGrid(
  ColorItem('sgds:bg-success-default', '--sgds-success-bg-default', 'sgds:bg-success-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-success-muted', '--sgds-success-bg-muted', 'sgds:bg-success-muted'),
  ColorItem('sgds:bg-success-surface-default', '--sgds-success-surface-default', 'sgds:bg-success-surface-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-success-surface-emphasis', '--sgds-success-surface-emphasis', 'sgds:bg-success-surface-emphasis', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-success-surface-muted', '--sgds-success-surface-muted', 'sgds:bg-success-surface-muted')
);

export const DangerColors = () => ColorGrid(
  ColorItem('sgds:bg-danger-default', '--sgds-danger-bg-default', 'sgds:bg-danger-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-danger-muted', '--sgds-danger-bg-muted', 'sgds:bg-danger-muted'),
  ColorItem('sgds:bg-danger-surface-default', '--sgds-danger-surface-default', 'sgds:bg-danger-surface-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-danger-surface-emphasis', '--sgds-danger-surface-emphasis', 'sgds:bg-danger-surface-emphasis', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-danger-surface-muted', '--sgds-danger-surface-muted', 'sgds:bg-danger-surface-muted'),
  ColorItem('sgds:bg-danger-surface-translucent', '--sgds-danger-surface-translucent', 'sgds:bg-danger-surface-translucent')
);

export const WarningColors = () => ColorGrid(
  ColorItem('sgds:bg-warning-default', '--sgds-warning-bg-default', 'sgds:bg-warning-default', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-warning-muted', '--sgds-warning-bg-muted', 'sgds:bg-warning-muted', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-warning-surface-default', '--sgds-warning-surface-default', 'sgds:bg-warning-surface-default', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-warning-surface-emphasis', '--sgds-warning-surface-emphasis', 'sgds:bg-warning-surface-emphasis', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-warning-surface-muted', '--sgds-warning-surface-muted', 'sgds:bg-warning-surface-muted', 'sgds:text-fixed-dark')
);

export const PurpleColors = () => ColorGrid(
  ColorItem('sgds:bg-purple-default', '--sgds-purple-bg-default', 'sgds:bg-purple-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-purple-muted', '--sgds-purple-bg-muted', 'sgds:bg-purple-muted', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-purple-surface-default', '--sgds-purple-surface-default', 'sgds:bg-purple-surface-default'),
  ColorItem('sgds:bg-purple-surface-emphasis', '--sgds-purple-surface-emphasis', 'sgds:bg-purple-surface-emphasis'),
  ColorItem('sgds:bg-purple-surface-muted', '--sgds-purple-surface-muted', 'sgds:bg-purple-surface-muted')
);

export const CyanColors = () => ColorGrid(
  ColorItem('sgds:bg-cyan-default', '--sgds-cyan-bg-default', 'sgds:bg-cyan-default', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-cyan-muted', '--sgds-cyan-bg-muted', 'sgds:bg-cyan-muted', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-cyan-surface-default', '--sgds-cyan-surface-default', 'sgds:bg-cyan-surface-default'),
  ColorItem('sgds:bg-cyan-surface-emphasis', '--sgds-cyan-surface-emphasis', 'sgds:bg-cyan-surface-emphasis'),
  ColorItem('sgds:bg-cyan-surface-muted', '--sgds-cyan-surface-muted', 'sgds:bg-cyan-surface-muted')
);

export const NeutralColors = () => ColorGrid(
  ColorItem('sgds:bg-neutral-default', '--sgds-neutral-bg-default', 'sgds:bg-neutral-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-neutral-muted', '--sgds-neutral-bg-muted', 'sgds:bg-neutral-muted'),
  ColorItem('sgds:bg-neutral-surface-default', '--sgds-neutral-surface-default', 'sgds:bg-neutral-surface-default'),
  ColorItem('sgds:bg-neutral-surface-emphasis', '--sgds-neutral-surface-emphasis', 'sgds:bg-neutral-surface-emphasis'),
  ColorItem('sgds:bg-neutral-surface-muted', '--sgds-neutral-surface-muted', 'sgds:bg-neutral-surface-muted')
);

export const FormSurfaceColors = () => ColorGrid(
  ColorItem('sgds:bg-form-surface-default', '--sgds-form-surface-default', 'sgds:bg-form-surface-default'),
  ColorItem('sgds:bg-form-surface-raised', '--sgds-form-surface-raised', 'sgds:bg-form-surface-raised'),
  ColorItem('sgds:bg-form-surface-emphasis', '--sgds-form-surface-emphasis', 'sgds:bg-form-surface-emphasis', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-form-surface-subtle', '--sgds-form-surface-subtle', 'sgds:bg-form-surface-subtle'),
  ColorItem('sgds:bg-form-surface-muted', '--sgds-form-surface-muted', 'sgds:bg-form-surface-muted'),
  ColorItem('sgds:bg-form-surface-inverse', '--sgds-form-surface-inverse', 'sgds:bg-form-surface-inverse', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-form-surface-fixed-light', '--sgds-form-surface-fixed-light', 'sgds:bg-form-surface-fixed-light', 'sgds:text-fixed-dark'),
  ColorItem('sgds:bg-form-surface-fixed-dark', '--sgds-form-surface-fixed-dark', 'sgds:bg-form-surface-fixed-dark', 'sgds:text-fixed-light')
);

export const FormPrimaryColors = () => ColorGrid(
  ColorItem('sgds:bg-form-primary-surface-default', '--sgds-form-primary-surface-default', 'sgds:bg-form-primary-surface-default', 'sgds:text-fixed-light'),
  ColorItem('sgds:bg-form-primary-surface-emphasis', '--sgds-form-primary-surface-emphasis', 'sgds:bg-form-primary-surface-emphasis', 'sgds:text-fixed-light')
);

export const FormSuccessColors = () => ColorGrid(
  ColorItem('sgds:bg-form-success-surface-default', '--sgds-form-success-surface-default', 'sgds:bg-form-success-surface-default', 'sgds:text-fixed-light')
);

export const FormDangerColors = () => ColorGrid(
  ColorItem('sgds:bg-form-danger-surface-default', '--sgds-form-danger-surface-default', 'sgds:bg-form-danger-surface-default', 'sgds:text-fixed-light')
);
