'use client';

export const TableOfContents = () => {
  return (
    <sgds-table-of-contents suppressHydrationWarning>
      <h2>Header</h2>
      <li slot="contents">
        <sgds-link suppressHydrationWarning><a href="#">Link</a></sgds-link>
      </li>
      <li slot="contents">
        <sgds-link suppressHydrationWarning><a href="#">Link</a></sgds-link>
      </li>
      <li slot="contents">
        <sgds-link suppressHydrationWarning><a href="#">Link</a></sgds-link>
      </li>
      <li slot="contents">
        <sgds-link suppressHydrationWarning><a href="#">Link</a></sgds-link>
      </li>
    </sgds-table-of-contents>
  );
};
