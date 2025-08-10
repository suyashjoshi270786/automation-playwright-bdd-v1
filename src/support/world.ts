import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { chromium, firefox, webkit, type Browser, type BrowserContext, type Page, devices } from "playwright";
// import your page objects here, e.g.:
// import { HomePage } from "../pages/home.page";

function pickBrowser(name?: string) {
  const n = (name ?? process.env.BROWSER ?? "chromium").toLowerCase();
  if (n.startsWith("fire")) return firefox;
  if (n.startsWith("web")) return webkit;
  return chromium; // default chromium
}

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  apiResponse?: import("@playwright/test").APIResponse;

  // Example POM instances (add yours)
  // home!: HomePage;

  // handy for naming artifacts
  scenarioName = "";

  constructor(opts: IWorldOptions) {
    super(opts);
  }

  async launch() {
    const browserType = pickBrowser(this.parameters?.browser as string);
    const headed = process.env.HEADED === "true";
    this.browser = await browserType.launch({ headless: !headed });

    // Optional: device emulation via env, e.g. DEVICE="Desktop Chrome"
    const device = process.env.DEVICE && devices[process.env.DEVICE];
    this.context = await this.browser.newContext({
      ...(device ?? {}),
      baseURL: process.env.BASE_URL ?? "https://automationexercise.com",
      viewport: device ? undefined : { width: 1366, height: 768 }
    });

    this.page = await this.context.newPage();

    // Initialize page objects here once page is ready
    // this.home = new HomePage(this.page);
  }

  async close() {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);

