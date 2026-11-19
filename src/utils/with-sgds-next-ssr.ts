const PKG = "@govtechsg/sgds-web-component";

/**
 * Next.js config plugin that enables SSR with Declarative Shadow DOM
 * for SGDS web components. Supports both webpack and Turbopack.
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
  const aliasEntries: Record<string, string> = {
    [`${PKG}/react`]: `${PKG}/react-ssr`,
  };

  return {
    ...nextConfig,

    // Turbopack: resolveAlias redirects react/ → react-ssr/
    turbopack: {
      ...(nextConfig.turbopack ?? {}),
      resolveAlias: {
        ...(nextConfig.turbopack?.resolveAlias ?? {}),
        ...aliasEntries,
      },
    },

    // Webpack: resolve.alias with $ suffix for exact matching.
    // Without $, webpack does prefix matching and "react/ssr" would be
    // caught by the "react" rule, resolving to "react-ssr/ssr" (broken).
    // The $ suffix ensures only the exact barrel import is aliased.
    // The react-ssr barrel imports _ssr-init (which patches React globally),
    // so all component imports get SSR regardless of their import path.
    webpack(config: any, options: any) {
      config.resolve.alias = {
        ...config.resolve.alias,
        [`${PKG}/react$`]: `${PKG}/react-ssr`,
      };

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
}
