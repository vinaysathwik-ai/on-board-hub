const User = require('../models/User');

exports.login = async (req, res) => {
    const { email } = req.body;
    console.log('Login attempt for email:', email);
    try {
        let user = await User.findOne({ email });

        if (!user) {
            console.log('User not found, creating new user for:', email);
            const username = email;
            user = new User({
                email,
                username,
                role: 'fresher', // Default role
                completedModules: []
            });
            await user.save();
            console.log('New user created successfully');
        } else {
            console.log('User found:', user.email);
        }

        res.json({ success: true, user });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('completedModules');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
