const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        enum: ['overview', 'tech', 'process', 'rules'],
        default: 'overview'
    },
    order: Number
});

module.exports = mongoose.model('Module', ModuleSchema);
