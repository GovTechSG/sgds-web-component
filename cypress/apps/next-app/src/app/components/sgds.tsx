'use client';

import { useEffect } from 'react';

const SgdsLibraryLoader = () => {
  useEffect(() => {
    (async () => {
      try {
        const sgdsLibrary = await import('@govtechsg/sgds-web-component');
        console.log('Library loaded and initialized:', sgdsLibrary);
      } catch (error) {
        console.error('Failed to load library:', error);
      }
    })();
  }, []); // The empty array ensures this runs once on mount

  return null; // This component doesn't render anything itself
};

export default SgdsLibraryLoader;