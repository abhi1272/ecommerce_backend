let client = require('../../config/elastic')

client.count({index:'gov',type:"constitute"},(err,resp,status)=>{
    console.log('constitute',resp)
})