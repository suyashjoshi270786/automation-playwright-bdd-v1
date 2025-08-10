// src/config/env.config.ts
import dotenv from "dotenv";
dotenv.config();

export const Env = {
  env: process.env.ENV ?? "local",
  baseUrl: process.env.BASE_URL ?? "https://automationexercise.com",
  browser: (process.env.BROWSER ?? "chromium").toLowerCase(), // chromium|firefox|webkit
  headed: process.env.HEADED === "true",
  device: process.env.DEVICE, // e.g. "iPhone 13"
  cucumberTimeout: Number(process.env.CUCUMBER_TIMEOUT ?? 60_000),

  // API examples (extend freely)
  apiBaseUrl: process.env.API_BASE_URL,
  apiToken: process.env.API_TOKEN,
};

export const APIClerkURL = {
  // ...
  apiBaseUrl: process.env.API_BASE_URL || "https://clerk.reqres.in",
};
