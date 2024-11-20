import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // Specify the Node.js test environment
    coverage: {
      reporter: ["text", "json", "html"], // Output coverage reports
      reportsDirectory: "./coverage", // Optional: Specify where to save reports
      include: ["src/**/*.js", "index.js"], // Files to include for coverage
      exclude: ["node_modules", "tests"], // Exclude unnecessary files
    },
  },
});
