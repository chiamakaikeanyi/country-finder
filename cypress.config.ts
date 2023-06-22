import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
