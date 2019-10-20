import env from "./env"
// navigate and use the app using puppeteer

// Log In from the starting page
export async function login(page) {
  await page.waitForSelector("#sign-in-button")
  await page.click("#sign-in-button")
  await page.type("#email", env.email)
  await page.type("#password", env.password)
  await page.click("#submit")
}
