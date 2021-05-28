// const redis = require('redis')

// const client = redis.createClient()

// client.on('connect',() => {
//     console.log('connected')
// })

// module.exports = client

//Set Single Object 

// client.set(['framework','Angular'], (err,reply)=>{
//     console.log(reply)
// })


// client.get('framework', (err,reply)=>{
//     console.log(reply)
// })

// Multiple Object

// client.hmset('frameworks', {
//     'javascript': 'AngularJS',
//     'css': 'Bootstrap',
//     'node': 'Express'
// });

// client.hgetall('frameworks',(err,reply)=>{
//     console.log(reply)
// })


// List add data

// client.rpush(['Tech','angular','backbone','java'],(err,reply) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(reply)
// })

// List push data

// client.LPUSH(['Tech','AWS'],(err,reply)=>{
//     console.log(reply)
// })

// List fetch data

// client.lrange('Tech',0,3, (err,reply) => {
//     console.log(reply)
// })

// List(set) without duplicates 

// client.sadd(['tags','angular js','angular','aws','aws'],(err,reply) => {
//     console.log(reply)
// })

// fetch set 

// client.smembers('tags',(err,reply) => {
//     console.log(reply)
// })

// check key exists

// client.exists('Tech',(err,reply) => {
//     if(reply === 1){
//         console.log('pre exsits')
//     } else{
//         console.log('does not exists')
//     }
// })

// delete key 

// client.del('Tech', (err,reply) => {
//     console.log(reply)
// })

// set key 

// client.set('Tech','new',(err,reply)=>{
//     console.log(reply,'ket set done')
// })

// set expiry of key where 10 is in seconds 

// client.expire('Tech',10,(err,replay)=>{
//     console.log(replay)
// })

// increment a key by 1 

// client.set('key1', 10, function() {
//     client.incr('key1', function(err, reply) {
//         console.log(reply); // 11
//     });
// });

// decrement a key by 1 


// client.set('key1', 10, function() {
//     client.decr('key1', function(err, reply) {
//         console.log(reply); // 11
//     });
// });


// increment key by any number 

// client.set('key1', 10, function() {
//     client.incrby('key1',5, function(err, reply) {
//         console.log(reply); // 11
//     });
// });

// decrement key by any number 

// client.set('key1', 10, function() {
//     client.decrby('key1',5, function(err, reply) {
//         console.log(reply); // 11
//     });
// });


// client.keys('*', function (err, keys) {
//     if (err) return console.log(err);
//     for(i in keys){
//       console.log(keys[i]);   
//     }
//   });  






