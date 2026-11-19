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
  // Regex matches all react/ imports EXCEPT react/ssr and react/_ssr and react-ssr
  // e.g. matches: /react, /react/accordion, /react/button/index.js
  // skips: /react/ssr, /react/_ssr, /react-ssr
  const aliasPattern = new RegExp(
    `${PKG.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\/react(?![\\/_-]ssr)(?:\\/|$)`
  );

  return {
    ...nextConfig,

    // Turbopack: resolveAlias for barrel import only.
    // Wildcard patterns (react/*) break Turbopack's React Client Manifest,
    // so only the barrel is aliased. Individual subpath imports are not
    // redirected — the barrel's _ssr-init patches React globally, covering
    // all components regardless of import path.
    turbopack: {
      ...(nextConfig.turbopack ?? {}),
      resolveAlias: {
        ...(nextConfig.turbopack?.resolveAlias ?? {}),
        [`${PKG}/react`]: `${PKG}/react-ssr`,
      },
    },

    // Webpack: NormalModuleReplacementPlugin with negative lookahead
    // to alias all react/ subpaths except react/ssr and react/_ssr.
    webpack(config: any, options: any) {
      const webpack = options.webpack;
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(aliasPattern, (resource: any) => {
          resource.request = resource.request.replace("/react", "/react-ssr");
        })
      );

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
}
