var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.listen(80);
console.log("Server listening on port 80.");