// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  timeout: 60_000,
  expect: { timeout: 10_000 },

  // Parallel + retries
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 2 : 0,

  // Artifacts / reporting
  reporter: [["html", { outputFolder: "results/playwright-report", open: "never" }]],
  outputDir: "results/test-results",

  use: {
    baseURL: process.env.BASE_URL || "https://automationexercise.com",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: { width: 1366, height: 768 }
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox",  use: { ...devices["Desktop Firefox"] } }
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
