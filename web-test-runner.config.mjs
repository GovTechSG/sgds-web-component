import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from '@web/test-runner-playwright';


const browsers = {
  // Local browser testing via playwright
  // ===========
  chromium: playwrightLauncher({product: 'chromium'}),
  firefox: playwrightLauncher({product: 'firefox'}),
  // webkit: playwrightLauncher({product: 'webkit'}),

  // Uncomment example launchers for running on Sauce Labs
  // ===========
  // chromium: sauceLabsLauncher({browserName: 'chrome', browserVersion: 'latest', platformName: 'Windows 10'}),
  // firefox: sauceLabsLauncher({browserName: 'firefox', browserVersion: 'latest', platformName: 'Windows 10'}),
  // edge: sauceLabsLauncher({browserName: 'MicrosoftEdge', browserVersion: 'latest', platformName: 'Windows 10'}),
  // ie11: sauceLabsLauncher({browserName: 'internet explorer', browserVersion: '11.0', platformName: 'Windows 10'}),
  // safari: sauceLabsLauncher({browserName: 'safari', browserVersion: 'latest', platformName: 'macOS 10.15'}),

  // Uncomment example launchers for running on Sauce Labs
  // ===========
  // chromium: browserstackLauncher({browserName: 'Chrome', os: 'Windows', os_version: '10'}),
  // firefox: browserstackLauncher({browserName: 'Firefox', os: 'Windows', os_version: '10'}),
  // edge: browserstackLauncher({browserName: 'MicrosoftEdge', os: 'Windows', os_version: '10'}),
  // ie11: browserstackLauncher({browserName: 'IE', browser_version: '11.0', os: 'Windows', os_version: '10'}),
  // safari: browserstackLauncher({browserName: 'Safari', browser_version: '14.0', os: 'OS X', os_version: 'Big Sur'}),
};
export default {
  files: "test-outdir/**/*.test.js",
  nodeResolve: true,
  browsers: Object.values(browsers),
  plugins: [
    esbuildPlugin({
      ts: true,  // compile ts files
      // loaders: { ".scss": "text" }, // ignoring .scss files during unit testing
    }),
    // postcss({
    //   minimize: false,
    //   inject: false
    // }),
    // litcss()
  ], 
};
