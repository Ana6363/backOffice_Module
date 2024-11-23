import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '6o3nzc',
  e2e: {
    baseUrl: "http://localhost:3000", // Default base URL for all tests
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.ts", // Support file
    video: true, // Record video of test runs
    viewportWidth: 1280, // Default viewport width
    viewportHeight: 720, // Default viewport height
    chromeWebSecurity: false, // Disable Chrome's strict security for cross-origin requests
    retries: {
      runMode: 2, // Retry failed tests in cypress run mode
      openMode: 0, // No retries in cypress open mode
    },
    env: {
      API_URL: "http://localhost:5184/api/v1", // Example environment variable
    },
    setupNodeEvents(on, config) {
      // Example: Handle custom environment setup
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Return the updated configuration object
      return config;
    },
  },
});
