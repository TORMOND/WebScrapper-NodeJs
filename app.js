const axios = require('axios')
const cheerio = require('cheerio')
require('dotenv').config()
//TWILIO
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const url  = 'https://www.amazon.com/Apple-iPhone-128GB-Pacific-Blue/dp/B08PMYLKVF/?_encoding=UTF8&pd_rd_w=lBEeg&content-id=amzn1.sym.595f69d1-9647-4ce9-9fca-a43eb1c1f3b6&pf_rd_p=595f69d1-9647-4ce9-9fca-a43eb1c1f3b6&pf_rd_r=C5C32TJCXXJV704TF741&pd_rd_wg=fcpsv&pd_rd_r=c191f628-605a-4726-b02b-54a0b26d2103&ref_=pd_gw_exports-popular-this-season-with-similar-asins'

const product = {name: '', price: '', url:''}
async function scrape(){
    const {data} = await axios.get(url)
    // console.log(data)
    const $ = cheerio.load(data)
    const item = $('div#dp.wireless.en_US')
    product.name = $(item).find('span#productTitle').text()
    product.url = url;
    product.price = $(item).find('span#renewedBuyBoxPrice').first().text().replace(/[,]/g,'')

    console.log(product)
//send SMS
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure


client.messages
  .create({
  body: `Hello find the attached ${product.name} ,price: ${product.price}, link: ${product.url}`, 
  from: "TWLIO PHONE NO",
  mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
  to: "YOUR PHONE NO"
 })
  .then(message => console.log(message.sid));

}

scrape()