var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        maxlength: 20
    },
    level: {
        type: Number,
        min: 0,
        max: 100
    },
    location: {
        type: String,
        maxlength: 40
    },
    member: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);
