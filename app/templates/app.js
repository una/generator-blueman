'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public', { extensions: ['html'] }));
app.use(express.static(__dirname + 'public'));

app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});


var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

app.listen(port, host);
console.log('App started on port ' + port);
