import puppeteer from "puppeteer"
import env from "./env"

export async function buildBrowser() {
  // build a browser
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--headless", "--disable-gpu"]
  })
  const page = await browser.newPage()
  page.emulate({
    viewport: {
      width: 1920,
      height: 1080
    },
    userAgent: ""
  })
  // navigate to url
  await page.goto(env.url)

  return {
    browser,
    page
  }
}
