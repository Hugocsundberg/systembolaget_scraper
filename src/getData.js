const { chromium } = require('playwright');
const fs = require('fs')

const getData = async () => {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();

  const linkArray = fs.readFileSync('assets/links.txt', {encoding:'utf8'}).split('\n')
  console.log(linkArray)
  process.exit()

  // const linkArray = [
  //   'https://www.systembolaget.se/produkt/ol/hawkshead-120101/', 
  //   'https://www.systembolaget.se/produkt/ol/gosser-132015/', 
  //   'https://www.systembolaget.se/produkt/ol/pistonhead-102115/', 
  //   ]

  const dataArray = []  
  for(let i = 0; i < linkArray.length; i++) {
      await page.goto(linkArray[i])
      if(await page.$('button.css-1upq44r')) {
        await page.click('button.css-1upq44r')
        await page.click('button.css-cpght4.epc1dj70')
      } 
      const price = await page.$eval('.css-kmwgon', (el)=>el.innerText)
      //Todo: Fix this
      const alkohol = await page.$$eval('.css-mggt0o div', (el)=>{
        return el[2].querySelector('span.css-1bmnxg7').textContent
      })
      const size = await page.$$eval('.css-mggt0o div', (el)=>{
        return el[1].querySelector('span.css-1bmnxg7').textContent
      })
      let name, brand;
      if(await page.$('span.css-lk6drb')) 
      name = await page.$eval('span.css-lk6drb', (el)=>el.innerText)
      if(await page.$('span.css-cm7wym'))
      brand = await page.$eval('span.css-cm7wym', (el)=>el.innerText)
      await page.screenshot({path: `link${i}.png`})
      const data = {
        brand: brand || undefined,
        name: name || undefined,
        price: price || undefined,
        alkohol: alkohol || undefined,
        size: size || undefined
      };
      dataArray.push(data);
  }
  console.log(dataArray)
  page.waitForTimeout(5000);
  await browser.close();
};

module.exports = getData;