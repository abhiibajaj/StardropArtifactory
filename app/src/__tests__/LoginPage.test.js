import { login } from "../__testFiles__/appActions"
import { buildBrowser } from "../__testFiles__/puppeteerSetup"
import env from "../__testFiles__/env"

describe("Login Page", () => {
  let browser, page
  beforeEach(async () => ({ browser, page } = await buildBrowser()))

  afterEach(() => browser.close())

  test("Email/Password Sign In", async () => {
    // wait for page to load
    await page.waitForNavigation({ waitUntil: "networkidle0" })
    await page.screenshot({ path: "./screenshot.png" })
    //await login(page)
    //await page.waitFor(10000)
    //expect(page.url()).toBe(`${env.url}/`)
  }, 1000000)
})
