import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const EDGE_PATH =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 3457;
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

  server.stdout.on("data", (d) => process.stdout.write(d.toString()));
  server.stderr.on("data", (d) => process.stderr.write(d.toString()));

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

    // 1. Desktop 1440px
    console.log("Setting viewport 1440px...");
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("footer", { timeout: 15000 });
    await page.evaluate(() => {
      const floaters = document.querySelectorAll("header, aside, a[href*='wa.me']");
      floaters.forEach((el) => {
        el.style.display = "none";
      });
      document.querySelector("footer")?.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1500));

    console.log("Capturing 1440px footer...");
    const footer1440 = await page.$("footer");
    const out1440 = path.join(process.cwd(), "public", "images", "footer-1440.png");
    await footer1440.screenshot({ path: out1440 });
    console.log("Saved 1440px screenshot to", out1440);

    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(out1440, path.join(ARTIFACT_DIR, "footer-1440.png"));
    }

    // 2. Mobile 375px
    console.log("Setting viewport 375px...");
    await page.setViewport({ width: 375, height: 1300, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("footer", { timeout: 15000 });
    // Hide fixed floating elements for clean footer inspection
    await page.evaluate(() => {
      const floaters = document.querySelectorAll("header, aside, a[href*='wa.me']");
      floaters.forEach((el) => {
        el.style.display = "none";
      });
      document.querySelector("footer")?.scrollIntoView({ behavior: "instant" });
    });
    await new Promise((r) => setTimeout(r, 1500));

    console.log("Capturing 375px footer...");
    const footer375 = await page.$("footer");
    const out375 = path.join(process.cwd(), "public", "images", "footer-375.png");
    await footer375.screenshot({ path: out375 });
    console.log("Saved 375px screenshot to", out375);

    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(out375, path.join(ARTIFACT_DIR, "footer-375.png"));
    }

    await browser.close();
    console.log("All screenshots captured successfully!");
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
