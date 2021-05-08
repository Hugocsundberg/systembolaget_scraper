const { chromium } = require('playwright');

const getData = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const linkArray = [
    'https://www.systembolaget.se/produkt/ol/hawkshead-120101/', 
    'https://www.systembolaget.se/produkt/ol/gosser-132015/', 
    'https://www.systembolaget.se/produkt/ol/pistonhead-102115/', 
    ]

  for(let i = 0; i < linkArray.length; i++) {
      await page.goto(linkArray[i])
      await page.screenshot({path: `link${i}.png`})
  }
  await browser.close();
};

module.exports = getData;