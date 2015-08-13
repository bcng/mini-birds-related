var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//add in User reference in the sighting schema
var sightingSchema = new Schema({
    // below looks in the User model for a given objectId
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    //allow user to post multiple bird documents in one POST 
    bird: [{
        name: {
            type: String,
            lowercase: true
        },
        order: {
            type: String,
            lowercase: true,
            maxlength: 20
        },
        status: {
            type: String,
            lowercase: true,
            enum: [
                'extinct',
                'extinct in the wild',
                'critically endangered',
                'endangered',
                'vulnerable',
                'near threatened',
                'conservation dependent',
                'least concern'
            ]
        }
    }],
    confirmed: {
        type: Boolean,
        default: false
    },
    numberSeen: {
        type: Number,
        min: 1
    }
});

module.exports = mongoose.model('Sighting', sightingSchema);
