const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.systembolaget.se/sok/?categoryLevel1=%C3%96l&categoryLevel2=Vete%C3%B6l');
    await page.click('.css-1upq44r')
    await page.click('.css-cpght4.epc1dj70')

    const buttonIsPresent = async () => {
        return buttonExists = await page.$eval("button.css-1ykaym0.epc1dj70", button => button.innerHTML ? true : false);
    };
    
    const continueRunning = async () => {
        console.log('done')
        await page.waitForTimeout(10000);
        beerLinks = await page.$$eval('a.css-i8ij9s.e1yt52hj1', (divs) => {
            return divs.map(div=>div.href)
        })
        console.log(beerLinks)
        
        await page.waitForTimeout(10000);
        await page.screenshot({path: 'screenshot.png'});
        await browser.close();
    }
    let clickNum = 0;
     (showMore = async () => {
        if(await buttonIsPresent()) {
            clickNum++
            console.log(clickNum)
            await page.click('button.css-1ykaym0.epc1dj70');
            showMore();
        } else if (!await buttonIsPresent()) {
            continueRunning()
        }
    })()
    
})()
