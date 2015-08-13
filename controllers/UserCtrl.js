//This User is a constructor that spits out objects
//It is also a reference for the users collection in Mongo, as seen in the read function
var User = require('../models/User');

module.exports = {
    create: function(req, res) {
    	//inject the req.body to create the document 
        var newUser = new User(req.body);
        newUser.save(function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    },

    read: function(req, res) {
        console.log('req.query: ', req.query);
        // uncommented code does below
        // query = User.find(req.query) - create query object
        // query.exec() - then returns a document on that object
        User.find(req.query)
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    update: function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    },

    delete: function(req, res) {
        User.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    }
};
