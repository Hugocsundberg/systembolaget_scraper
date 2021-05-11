const { chromium } = require('playwright');
const fs = require('fs')

const getLinks = async () => {
    return new Promise(async(resolve, reject)=>{
        const browser = await chromium.launch({headless: false});
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.systembolaget.se/sok/?categoryLevel1=%C3%96l&categoryLevel2=Vete%C3%B6l');
        await page.click('.css-1upq44r')
        await page.click('.css-cpght4.epc1dj70')
        
        const continueRunning = async () => {
            beerLinks = await page.$$eval('a.css-i8ij9s.e1yt52hj1', (divs) => {
                return divs.map(div=>div.href)
            })
            console.log(`number of beers are: ${beerLinks.length}`)
            fs.writeFile('./assets/links.txt', beerLinks.join('\n'), err => {
                if(err)console.log(`File write Errors: ${err}`)
            })
            await browser.close();
            resolve('Links has been saved');
        }
        
        let clickNum = 0;
         return (showMore = async () => {
            try {
                await page.waitForSelector('button.css-1oyj15r.epc1dj70', {timeout: 40000});
                await page.click('button.css-1oyj15r.epc1dj70');
                clickNum++;
                console.log(clickNum * 15);
                showMore();
              } catch (error) {
                    console.log('done')
                    return continueRunning()
              }
        })() 
    })
}

module.exports = getLinks;


