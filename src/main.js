const getLinks = require('./getLinks');
const getData = require('./getData');

(async ()=>{
    await getLinks()//.then(message=>console.log(message))
    getData()
})()




