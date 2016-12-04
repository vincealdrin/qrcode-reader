var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

app.listen(5000, () => console.log('Listening at port 5000'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/save', (req, res) => {
  fs.stat('./list.txt', (err, stats) => {
    try {
      fs.appendFile('list.txt', `${req.body.serial}\n`, (err) => {
        if (err) console.log(err);
        console.log(`${req.body.serial} has appended to list`);
      });
    } catch (e) {
      fs.createWriteStream('./public/list.txt');

      fs.appendFile('list.txt', `${req.body.serial}\n`, (err) => {
        if (err) console.log(err);
        console.log(`${req.body.serial} has appended to list`);
      });
    }
  });
});
