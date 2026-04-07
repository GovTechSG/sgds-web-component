'use client';

export const DescriptionList = () => {
  return (
    <sgds-description-list-group suppressHydrationWarning>
      <span slot="description">Description</span>
      <sgds-description-list suppressHydrationWarning>
        Label 1<span slot="data">Data Text Description List 1</span>
      </sgds-description-list>
      <sgds-description-list suppressHydrationWarning>
        Label 2<span slot="data">Data Text Description List 2</span>
      </sgds-description-list>
    </sgds-description-list-group>
  );
};
