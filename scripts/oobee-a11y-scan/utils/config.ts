export const OOBEE_CONFIG = {
  // Strict on critical issues (0 tolerance), lenient on advisory to start
  thresholds: { mustFix: 0, goodToFix: 20 } as Thresholds,
  viewportSettings: { width: 1920, height: 1040 } as ViewportSettings,
  includeScreenshots: true,
  scanAboutMetadata: { browser: "Chrome (Desktop)" }
};

export interface Thresholds {
  mustFix: number;
  goodToFix: number;
}
export const VITE_BASE_URL = `http://localhost:${VITE_PORT}`;

export const VITE_PORT = 5199;

// Use non-default port to avoid conflicts with dev server

export interface ViewportSettings {
  width: number;
  height: number;
}
