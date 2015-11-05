var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cs5610fall2015exmpl1');
//var db = mongoose.connection;

//var courses = require('./courses')

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('api/course', function (req, res) {
    var str = '(function(){angular.courses = ';
    str += JSON.stringify(courses);
    str += '})();';
    res.send(str);
});

//require("./public/experiments/express/require/get.hello.exp.js")(app);
//require("./public/experiments/require/experiments.js")(app);

//require("./public/lectures/nodejs/expressjs/server.js")(app);
//
//require("./public/lectures/nodejs/angularjsClient/server.js")(app);
//require("./public/experiments/rest/app/model/application.model.test.js");
//require("./public/experiments/rest/app/model/page.model.test.js");
//require("./public/experiments/rest/app/server")(app);
//
////require("./public/lectures/angularjs/jsonp/server/MovieService.js")(app);
//
//require("./public/experiments/express/filter/server/app.js")(app);
//require("./public/experiments/express/movies/server/app.js")(app);
//
//require("./public/lectures/movies/server/app.js")(app);

//require("./public/ds/fc/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
