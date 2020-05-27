let client = require('../../config/elastic')

client.index({
    index:'gov',
    type:'constitute',
    body:{
        "name":"US",
        "userId":'Es1d',
        "type":'broddd',
        "electorate":33272,
        "validVotes":24222
    }
},(err,resp,status)=>{
    console.log(resp)
})


