/* eslint-disable sort-exports/sort-exports */
export interface Thresholds {
  mustFix: number;
  goodToFix: number;
}

export interface ViewportSettings {
  width: number;
  height: number;
}

// Use non-default port to avoid conflicts with dev server
export const VITE_PORT = 5199;

export const VITE_BASE_URL = `http://localhost:${VITE_PORT}`;

export const OOBEE_CONFIG = {
  // Strict on critical issues (0 tolerance), lenient on advisory to start
  thresholds: { mustFix: 0, goodToFix: 20 } as Thresholds,
  viewportSettings: { width: 1920, height: 1040 } as ViewportSettings,
  includeScreenshots: true,
  scanAboutMetadata: { browser: "Chrome (Desktop)" }
};
