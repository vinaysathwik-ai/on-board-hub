const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function checkUsers() {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({});
    console.log('Users in DB:', JSON.stringify(users, null, 2));
    process.exit(0);
}

checkUsers();
