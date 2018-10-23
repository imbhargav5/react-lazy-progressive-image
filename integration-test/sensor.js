import puppeteer from "puppeteer";
import app, { runBundle } from "../example/app";

const PORT = 1234;

describe("Scrolltest", () => {
  let server;
  let page;
  let browser;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      executablePath: process.env.GOOGLE_CHROME_BINARY || undefined,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-lcd-text"]
    });
    server = await runBundle(app, PORT);
    page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    await page.goto(`http://localhost:${PORT}`);
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
    await server.close();
  });

  it('should display "LazyImage" text on page', async () => {
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    await expect(bodyHTML).toMatch("LazyImage");
  });

  it("should load src when it is becomes visible", async () => {
    const src = await page.evaluate(
      () => document.getElementById("scenery-img").src
    );
    expect(src).toMatch("placeholder");

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitFor(
      () => document.getElementById("scenery-img").className === "loaded"
    );
    const src2 = await page.evaluate(
      () => document.getElementById("scenery-img").src
    );
    expect(src2).toMatch("scenery");
  });
});
