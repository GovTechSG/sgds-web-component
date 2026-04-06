'use client';

import { useState } from "react";

export const Modal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <sgds-button onClick={() => setOpen(true)} suppressHydrationWarning>Open Modal</sgds-button>
      <sgds-modal open={open ? "" : undefined} suppressHydrationWarning>
        <h2 slot="title">Modal title</h2>
        <p slot="description">Modal description</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum est vitae erat molestie blandit.
          Pellentesque at nunc at mi auctor imperdiet eu at leo. Integer aliquam, turpis vel ultricies ornare, sem massa
          commodo velit, pretium dictum quam nibh et ex. Suspendisse eu dignissim libero. Donec aliquam, lacus eu
          pellentesque interdum, arcu nisl blandit turpis, at tincidunt purus orci ut dolor.
        </p>
        <sgds-button slot="footer" variant="link" className="close-modal" onClick={() => setOpen(false)} suppressHydrationWarning>
          Close
        </sgds-button>
        <sgds-button slot="footer" variant="primary" type="submit" form="formA" suppressHydrationWarning>
          Submit
        </sgds-button>
      </sgds-modal>
    </>
  );
};
