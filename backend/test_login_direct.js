const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const email = 'fresher@company.com';
        let user = await User.findOne({ email });
        console.log('User found:', user ? user.email : 'Not found');

        if (!user) {
            user = new User({ email, username: email, role: 'fresher' });
            await user.save();
            console.log('User created');
        }

        process.exit(0);
    } catch (err) {
        console.error('Test failed:', err);
        process.exit(1);
    }
}

test();
