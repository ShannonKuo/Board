var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//var BodyParser = require( 'body-parser' );
var index = require('./routes/index');
var api = require('./routes/api');

app.use(bodyParser.json());
app.use('/', index);
app.use('/api', api);

app.set('port', (process.env.PORT || 3001));
/*const data = {
  test:'',
};
app.get('/', function(req, res) {
  res.send('<H1>server</H1> Express');
  res.sendFile(path.join(__dirname + './client/public/index.html'));
});
app.post('/api', function(req, res) {
  res.send('<h1> my fb</h1>' + 'http://www.facebook.com');
  const test = req.body.id;
  data = data.concat( test );
  res.send(test);
  //data: { id: res.body };
  //console.log( data.id );
})*/
var server = app.listen(app.get('port'), () => {
  console.log('Listening on port 3001');
});
