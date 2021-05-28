var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/invoice');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(5000);
console.log('Server is listening on port 8080');