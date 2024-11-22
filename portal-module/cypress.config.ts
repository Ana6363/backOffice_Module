import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
  },
  env: {
    API_BASE_URL: "http://localhost:5184/api/v1",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: "spec",
  reporterOptions: {
    mochaFile: "cypress/results/test-results.xml",
    toConsole: true,
  },
  trashAssetsBeforeRuns: true,
  chromeWebSecurity: false,
});
