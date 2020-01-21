var express = require('express');
var app = express();
var db = require('./db.js');
// disconnect to mongodb upon request
var disconnectRequested = false;
var whoisdb;

// connect to mongodb
db.connectToMongoDB(err => {
    if(err) throw err;
    whoisdb = db.getWhoisDB();
})

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// looking for the root file
app.use(express.static(__dirname + '/'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var whois = require('whois');
app.post('/', function(req, res) {
    var domain = req.body.domain;
    var timestamp = new Date().toString();
    var logging = { domain: domain, timestamp: timestamp };
    // insert logging info into db
    whoisdb.collection('domainLookUp').insertOne(logging, function(err, res) {
        if(err) throw err;
        console.log('DOMAIN LOGGING INSERTED');
        if(disconnectRequested) db.disconnectToMongoDB();
    })
    // whois lookup
    var options = {
        "server": 'whois.verisign-grs.com',
        "port": 43,
        "timeout": 0,
        "follow": 2
    }
    whois.lookup(domain, options, function(err, data) {
        res.send({ code: 200, whoisData: data });
    });
})

var server = require('http').Server(app);
server.listen(5000, () => { console.log('Listening to port 5000...'); })
