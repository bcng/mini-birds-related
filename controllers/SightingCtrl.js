var Sighting = require('../models/Sighting');

module.exports = {
    create: function(req, res) {
        var newSighting = new Sighting(req.body);
        newSighting.save(function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    },

    read: function(req, res) {
        console.log('req.query: ', req.query);
        // Search all
        Sighting.find(req.body)

        // Search for a specific embedded bird
        // Sighting.find({"bird.name": "cedar waxwing"})

        // Search via conditions/query operators
        // Sighting.find({"numberSeen": { '$gt': 3}})
        .populate('user') //this adds the information contained within the user object into the JSON
            .exec(function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    update: function(req, res) {
        // update with id and req.body (single obj)
        // Sighting.findByIdAndUpdate(req.params.id, req.body, function(err, result) {

        // push another bird onto an existing sighting document
        Sighting.findByIdAndUpdate(
            req.params.id, {
                $push: {
                    bird: req.body
                }
            },
            function(err, result) {
                if (err) return res.status(500).send(err);
                res.send(result);
            });
    },

    delete: function(req, res) {
        Sighting.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result);
        });
    }
};
