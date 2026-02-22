const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['fresher', 'mentor'],
        default: 'fresher'
    },
    // Simple tracking: array of completed module IDs
    completedModules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }]
});

module.exports = mongoose.model('User', UserSchema);
