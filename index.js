var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/data', function (req, res) {
    res.render('pages/data');
});

app.get('/reports', function (req, res) {
    res.render('pages/reports');
});

app.post('/new', function (req, res) {
    console.log('Adding to the database:');
    console.log(req.body);
    console.log('Received a post!');
});

app.post('/edit', function (req, res) {
    console.log('Received an edit post!');
});

app.post('/delete', function (req, res) {
    console.log('Received a delete post!');
});

app.listen(80);
console.log("Server listening on port 80.");