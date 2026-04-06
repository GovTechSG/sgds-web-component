'use client';

import { useEffect } from 'react';

const SgdsLibraryLoader = ({ nonce }: { nonce?: string }) => {
  useEffect(() => {
    (async () => {
      await import('@govtechsg/sgds-web-component');
    })();
  }, []);

  return null;
};

export default SgdsLibraryLoader;
