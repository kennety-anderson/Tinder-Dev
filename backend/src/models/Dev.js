const { Schema, model } = require('mongoose');

//model Dev
const DevSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {
        timestamps: true
    });


//exporação do model Dev
module.exports = model('Dev', DevSchema);
