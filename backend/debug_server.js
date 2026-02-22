const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const logFile = path.join(__dirname, 'debug.log');
const log = (msg) => {
    const text = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(logFile, text);
    console.log(msg);
};

require('dotenv').config({ path: path.join(__dirname, '../.env') });
log('Using MONGO_URI: ' + (process.env.MONGO_URI ? 'Present' : 'MISSING'));

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    log(`${req.method} ${req.url}`);
    if (req.method === 'POST') log('Body: ' + JSON.stringify(req.body));
    next();
});

app.use('/api', require('./routes/api'));
app.use(express.static(path.join(__dirname, 'public')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = 5001; // Use a different port to avoid conflict
app.listen(PORT, () => log(`Debug server started on port ${PORT}`));
