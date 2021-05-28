const app = require('express')()
const http = require('http')
app.get('/', (req,res) => {
    console.log(res)
})

var options = {
    host: 'pharmeasy.in/api/categoryDetails/fetchCategoryDetails/114',
    port: 80,
    path: '/resource?id=foo&bar=baz',
    method: 'GET'
  };

http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }).end();

app.listen(7500)