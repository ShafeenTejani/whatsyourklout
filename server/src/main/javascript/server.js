var express = require('express');
var path = require('path');
var app = express();
var static_path = path.join(__dirname, '../../../../web/build');

var twitter = require('./twitter');
var klout = require('./klout');
var _ = require("lodash");

var PORT = (process.env.PORT || 8000)


app.route('/').get(function(req, res) {
    res.sendFile('index.html', {
        root: static_path
    });
});

app.route('/api/search').get(function(req, res) {
  var query = req.param('q');
  twitter.search(query,
   function (error) {
     res.status(500).json({error: error});
   },
   function (success) {
     res.status(200).json(success);
   }
 );
});

app.route('/api/user').get(function(req, res) {
  var name = req.param("name");
  twitter.getUser(name,
    function (error) {
      res.status(500).json({error: error});
    },
    function (success) {
      res.status(200).json(JSON.parse(success));
    }
  );

});


app.route('/api/klout').get(function(req, res) {
  var user = req.param("user");
  klout.getKlout(user,
    function (error) {
      res.status(error.statusCode || 500).json({error: error.message});
    },
    function (success) {
      res.status(200).json(success);
    }
  )
});


app.use('/', express.static(static_path, {
    maxage: 31557600
}));

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});
