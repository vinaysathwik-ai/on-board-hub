const axios = require('axios');

async function testChat() {
    try {
        console.log('Logging in as fresher...');
        const fresherLogin = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'fresher@company.com'
        });
        const fresherId = fresherLogin.data.user._id;

        console.log('Logging in as mentor...');
        const mentorLogin = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'mentor@company.com'
        });
        const mentorId = mentorLogin.data.user._id;

        console.log('\nFresher sending message to mentor...');
        const msg1 = await axios.post('http://localhost:5000/api/messages', {
            senderId: fresherId,
            content: 'Hello mentor, I need help with the VPN setup.'
        });
        console.log('Message 1 saved:', msg1.data.content, '-> Recipient:', msg1.data.recipient.username);

        console.log('\nMentor replying to fresher...');
        const msg2 = await axios.post('http://localhost:5000/api/messages', {
            senderId: mentorId,
            content: 'Sure, I can help with that. Are you on Mac or Windows?'
        });
        console.log('Message 2 saved:', msg2.data.content, '-> Recipient:', msg2.data.recipient.username);

        console.log('\nFetching messages for fresher...');
        const fresherMsgs = await axios.get(`http://localhost:5000/api/messages/${fresherId}`);
        console.log('Fresher chat history count:', fresherMsgs.data.length);
        fresherMsgs.data.forEach(m => console.log(`[${m.sender.role}] ${m.content}`));

    } catch (err) {
        console.error('Test failed:', err.response ? err.response.data : err.message);
    }
}

testChat();
