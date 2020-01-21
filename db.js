var mongodb, whoisdb;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/whoisdb";
var options = { useUnifiedTopology: true };

var connectToMongoDB = (callback) => {
    MongoClient.connect(url, options, function(err, db) {
        mongodb = db;
        whoisdb = db.db('whoisdb');
        console.log('WHOIS DATABASE CREATED');
        whoisdb.createCollection('domainLookUp', function(err, res) {
            if(err) throw err;
            console.log('DOMAINLOOKUP COLLECTION CREATED');
        })
        return callback(err);
    })
}

var disconnectToMongoDB = () => mongodb.close();

var getWhoisDB = () => whoisdb;

module.exports = { connectToMongoDB, disconnectToMongoDB, getWhoisDB };
