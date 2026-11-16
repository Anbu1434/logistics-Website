import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const EDGE_PATH =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 3458;
const URL = `http://localhost:${PORT}`;
const ARTIFACT_DIR =
  "C:\\Users\\anbu\\.gemini\\antigravity\\brain\\89ec29ea-2614-4eeb-8d7e-c2f85d4825b5";

async function waitReady(url, maxRetries = 40) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("Server timed out");
}

async function run() {
  console.log("Starting Next.js dev server on port", PORT);
  const server = spawn("cmd.exe", ["/c", "npx", "next", "dev", "-p", String(PORT)], {
    stdio: "pipe",
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    console.log("Waiting for server...");
    await waitReady(URL);
    console.log("Server is ready!");

    const browser = await puppeteer.launch({
      executablePath: EDGE_PATH,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--headless=new",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // 1. Mobile 375px Services Section
    console.log("Setting viewport 375px...");
    await page.setViewport({ width: 375, height: 1200, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for the services section
    await page.waitForFunction(() => {
      const h2s = Array.from(document.querySelectorAll("h2"));
      return h2s.some((h) => h.textContent.includes("Logistics solutions"));
    });

    // Hide fixed elements
    await page.evaluate(() => {
      const floaters = document.querySelectorAll("header, aside, a[href*='wa.me']");
      floaters.forEach((el) => {
        el.style.display = "none";
      });
    });

    // Scroll to the services section
    const servicesHandle = await page.evaluateHandle(() => {
      const h2s = Array.from(document.querySelectorAll("h2"));
      const h2 = h2s.find((h) => h.textContent.includes("Logistics solutions"));
      return h2?.closest("section");
    });

    await page.evaluate((el) => el?.scrollIntoView({ behavior: "instant" }), servicesHandle);
    await new Promise((r) => setTimeout(r, 1500));

    const out375 = path.join(process.cwd(), "public", "images", "services-375.png");
    await servicesHandle.screenshot({ path: out375 });
    console.log("Saved 375px screenshot to", out375);

    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(out375, path.join(ARTIFACT_DIR, "services-375.png"));
    }

    // 2. Desktop 1440px Services Section
    console.log("Setting viewport 1440px...");
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.evaluate((el) => el?.scrollIntoView({ behavior: "instant" }), servicesHandle);
    await new Promise((r) => setTimeout(r, 1500));

    const out1440 = path.join(process.cwd(), "public", "images", "services-1440.png");
    await servicesHandle.screenshot({ path: out1440 });
    console.log("Saved 1440px screenshot to", out1440);

    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(out1440, path.join(ARTIFACT_DIR, "services-1440.png"));
    }

    await browser.close();
    console.log("Services screenshots captured successfully!");
  } finally {
    console.log("Stopping dev server...");
    spawn("cmd.exe", ["/c", "taskkill", "/PID", String(server.pid), "/T", "/F"]);
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

