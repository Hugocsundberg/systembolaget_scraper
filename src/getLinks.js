const { chromium } = require('playwright');
const fs = require('fs')

const getLinks = async () => {
    const browser = await chromium.launch({headless: false, slowMo: 70});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.systembolaget.se/sok/?categoryLevel1=%C3%96l');
    await page.click('.css-1upq44r')
    await page.click('.css-cpght4.epc1dj70')
    
    const continueRunning = async () => {
        beerLinks = await page.$$eval('a.css-i8ij9s.e1yt52hj1', (divs) => {
            return divs.map(div=>div.href)
        })
        fs.writeFile('/assets/links.txt', beerLinks.join(', \n'), err => console.log(`File write Errors: ${err}`))
        await page.waitForTimeout(10000);
        await browser.close();
    }
    
    let clickNum = 0;
     (showMore = async () => {
        try {
            await page.waitForSelector('button.css-1ykaym0.epc1dj70')
            await page.click('button.css-1ykaym0.epc1dj70');
            clickNum++
            console.log(clickNum)
            showMore();
          } catch (error) {
                continueRunning()
          }
    })()
}

module.exports = getLinks;


