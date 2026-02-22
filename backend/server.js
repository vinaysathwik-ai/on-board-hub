const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
console.log('Using MONGO_URI:', process.env.MONGO_URI ? 'Connected (String present)' : 'NOT DEFINED');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) console.log('Body:', req.body);
    next();
});

// Routes
app.use('/api', require('./routes/api'));

// Serve static assets from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route for SPA
app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// 404 handler for API
app.use(/^\/api\/.*/, (req, res) => {
    res.status(404).json({ success: false, msg: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    res.status(500).json({ success: false, msg: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
