import puppeteer from 'puppeteer'

export async function screen(page) {
  return await page.evaluate(() => [screen.availWidth, screen.availHeight])
}

// it a simple scrapper
async function main() {
  const browser = await puppeteer.launch({
    // run in background mode?
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
  })

  const page = await browser.newPage()

  const [width, baseHeight] = await screen(page)
  const height = baseHeight - 150

  await page.setViewport({ width, height })

  await page.goto('https://www.google.com/')

  await page.waitFor('[type="text"]')
  await page.waitFor('form > div > div > div > center > [type="submit"]')

  await page.type('[type="text"]', 'Puppeteer JS')
  await page.click('form > div > div > div > center > [type="submit"]')

  await page.waitFor('[role=main] div div div div div div div div a')
  await page.click('[role=main] div div div div div div div div a')

  await page.waitFor('h1')
  await page.waitFor('blockquote p')

  const title = await page.$$eval('h1', v => v[1].innerText)
  const description = await page.$eval('blockquote p', v => v.innerText)

  console.log(`\n${title}\n\n${description}`)

  await page.close()
  await browser.close()

  console.log('\nDone!')
}

main()