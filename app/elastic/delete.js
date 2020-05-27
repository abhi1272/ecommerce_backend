let client = require('../../config/elastic')

client.indices.delete({index:'gov'},(err,resp,status)=>{
    console.log("delete",resp)
})

