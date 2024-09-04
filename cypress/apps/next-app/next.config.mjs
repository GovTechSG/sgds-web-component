/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
      },
      // webpack: (config, options) => {
      //   const originalEntry = config.entry
      //   config.entry = async () => {
      //     const entries = await originalEntry()
      //     console.log(entries)
      //     if (entries['main.js']) {
      //       // Load polyfills only in the client.
      //       if (!options.isServer && !entries['main.js'].includes('./src/polyfills.ts')) {
      //         entries['main.js'].unshift('./src/polyfills.ts')
      //       }
      //     }
    
      //     return entries
      //   }
    
      //   return config
      // }
};

export default nextConfig;
