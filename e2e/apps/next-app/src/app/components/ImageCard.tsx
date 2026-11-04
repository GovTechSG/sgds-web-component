'use client';

import { SgdsImageCard, SgdsBadge, SgdsIconButton, SgdsLink, SgdsIconList } from '@govtechsg/sgds-web-component/react';

export const ImageCard = () => {
  return (
    <>
      <SgdsImageCard>
        <img slot="image" src="https://placehold.co/600x300" alt="Placeholder" />
        <SgdsBadge slot="image-badge">New</SgdsBadge>
        <SgdsIconButton slot="image-action" name="heart" ariaLabel="Favourite" variant="ghost"></SgdsIconButton>
        <SgdsBadge slot="upper">Category</SgdsBadge>
        <span slot="subtitle">Subtitle text</span>
        <span slot="title">Image Card Title</span>
        <SgdsIconList icon="check-circle-fill">Default slot content</SgdsIconList>
        <span slot="description">Description of the image card with more details.</span>
        <SgdsBadge slot="lower">Tag</SgdsBadge>
        <SgdsLink slot="footer"><a href="#">Read more</a></SgdsLink>
      </SgdsImageCard>
    </>
  );
};
