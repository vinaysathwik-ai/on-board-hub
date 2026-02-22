const mongoose = require('mongoose');

const DocSchema = new mongoose.Schema({
    title: String,
    content: String, // The actual text content to search
    category: String,
    tags: [String]
});

// Create text index for simple search
DocSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Doc', DocSchema);
