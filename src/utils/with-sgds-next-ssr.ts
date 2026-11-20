const PKG = "@govtechsg/sgds-web-component";

/**
 * Next.js config plugin that enables SSR with Declarative Shadow DOM
 * for SGDS web components. Supports both webpack and Turbopack.
 *
 * Components must be imported from the barrel (`@govtechsg/sgds-web-component/react`).
 * The plugin aliases the barrel to SSR-aware wrappers that patch React globally
 * for Declarative Shadow DOM rendering.
 *
 * @example
 * ```js
 * // next.config.mjs
 * import { withSgdsNextSSR } from '@govtechsg/sgds-web-component/react/ssr';
 *
 * const nextConfig = { reactStrictMode: true };
 * export default withSgdsNextSSR(nextConfig);
 * ```
 */
export function withSgdsNextSSR(nextConfig: Record<string, any> = {}): Record<string, any> {
  return {
    ...nextConfig,

    // Turbopack: resolveAlias for barrel import.
    turbopack: {
      ...(nextConfig.turbopack ?? {}),
      resolveAlias: {
        ...(nextConfig.turbopack?.resolveAlias ?? {}),
        [`${PKG}/react`]: `${PKG}/react-ssr`
      }
    },

    // Webpack: resolve.alias with $ suffix for exact barrel matching.
    // Without $, webpack does prefix matching and "react/ssr" would be
    // caught by the "react" rule, resolving to "react-ssr/ssr" (broken).
    webpack(config: any, options: any) {
      config.resolve.alias = {
        ...config.resolve.alias,
        [`${PKG}/react$`]: `${PKG}/react-ssr`
      };

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    }
  };
}
