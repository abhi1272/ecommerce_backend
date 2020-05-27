let client = require('../../config/elastic')

client.delete({index:'gov',id:'2',type:'constitute'},(err,resp,status)=>{
    console.log('delete',resp)
})