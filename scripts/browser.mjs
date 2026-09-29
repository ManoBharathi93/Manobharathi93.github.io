import { existsSync } from "node:fs";
import { chromium } from "playwright";

// Use Playwright's installed Chromium or an existing local browser. For a fresh
// machine, run `npx playwright install chromium` before rendering or testing.
export async function launchBrowser() {
  const executablePath = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    chromium.executablePath(),
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((candidate) => candidate && existsSync(candidate));

  if (!executablePath) {
    throw new Error("Install Chromium with `npx playwright install chromium` or set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH.");
  }

  return chromium.launch({ executablePath, headless: true });
}
