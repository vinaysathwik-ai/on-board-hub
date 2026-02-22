const express = require('express');
require('dotenv').config({ path: '../.env' });
console.log('MONGO_URI:', process.env.MONGO_URI);
const mongoose = require('mongoose');

// Connect Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Minimal: MongoDB Connected'))
    .catch(err => {
        console.error('Minimal: MongoDB Connection Failed', err);
        process.exit(1);
    });

// require route
console.log('loading routes/api');
require('./routes/api');
const app = express();

const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
