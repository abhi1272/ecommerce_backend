let client = require('../../config/elastic')

client.indices.create({
    index:'gov'
},(err,resp,status)=>{
    if(err){
        console.log(err)
    }else{
        console.log("create",resp);
    }
});