const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
    const { senderId, content, recipientId } = req.body;
    try {
        let recipient = recipientId;
        if (!recipient) {
            const sender = await User.findById(senderId);
            if (sender.role === 'fresher') {
                const mentor = await User.findOne({ role: 'mentor' });
                recipient = mentor ? mentor._id : null;
            } else {
                // If mentor is sending, find the latest fresher who messaged them
                const lastMessage = await Message.findOne({ recipient: senderId }).sort({ timestamp: -1 });
                if (lastMessage) {
                    recipient = lastMessage.sender;
                } else {
                    // Fallback to the first fresher found
                    const fresher = await User.findOne({ role: 'fresher' });
                    recipient = fresher ? fresher._id : null;
                }
            }
        }

        const message = new Message({
            sender: senderId,
            recipient: recipient,
            content
        });

        await message.save();
        await message.populate('sender', 'username role');
        await message.populate('recipient', 'username role');

        res.json(message);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.getMessages = async (req, res) => {
    const { userId } = req.params;
    try {
        // Get messages where user is sender OR recipient
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }]
        })
            .sort({ timestamp: 1 })
            .populate('sender', 'username role')
            .populate('recipient', 'username role');

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
