let client = require('../../config/elastic')

client.search({index:'gov',type:'constitute',body:{
    query:{
        match:{"name":"Us"}
    }
}
},(err,resp,status)=>{
    if (err){
        console.log("search error: "+error)
      }
      else {
        console.log("--- Response ---");
        console.log(resp);
        console.log("--- Hits ---");
        resp.hits.hits.forEach(function(hit){
          console.log(hit);
        })
      }
})

