import { Before, After, Status, setDefaultTimeout, ITestCaseHookParameter, BeforeAll } from "@cucumber/cucumber";
import type { CustomWorld } from "./world";
import fs from "fs";
import path from "path";

// -------- timeouts --------
setDefaultTimeout(Number(process.env.CUCUMBER_TIMEOUT ?? 60_000));

// -------- artifact dirs --------
const RESULTS_DIR = path.join(process.cwd(), "results");
const SHOTS_DIR   = path.join(RESULTS_DIR, "screenshots");
const TRACES_DIR  = path.join(RESULTS_DIR, "traces");

function ensureDirs() {
  [RESULTS_DIR, SHOTS_DIR, TRACES_DIR].forEach((d) => fs.mkdirSync(d, { recursive: true }));
}

BeforeAll(() => ensureDirs());

// -------- lifecycle --------
Before(async function (this: CustomWorld, pickle: ITestCaseHookParameter) {
  // Name to use in file artifacts
  this.scenarioName = pickle.pickle.name.replace(/[^\w.-]+/g, "_");

  await this.launch();

  // Start Playwright tracing for each scenario
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  // Navigate to base URL if you want to start every scenario at home
  const base = process.env.BASE_URL ?? "https://automationexercise.com";
  await this.page.goto(base, { waitUntil: "domcontentloaded" });
});

After(async function (this: CustomWorld, { result }) {
  const failed = result?.status === Status.FAILED;

  // Screenshot on failure (attach to Cucumber + save file)
  if (failed) {
    const shotPath = path.join(SHOTS_DIR, `${this.scenarioName}-${Date.now()}.png`);
    const buffer = await this.page.screenshot({ path: shotPath, fullPage: true });
    await this.attach(buffer, "image/png");
  }

  // Stop tracing; keep trace only on failure (or change logic as you like)
  const tracePath = path.join(TRACES_DIR, `${this.scenarioName}-${Date.now()}.zip`);
  await this.context.tracing.stop({ path: tracePath });

  await this.close();
});
