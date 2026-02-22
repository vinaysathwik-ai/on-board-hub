const axios = require('axios');

async function testApi() {
    try {
        console.log('Testing Login...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'fresher@company.com'
        });
        console.log('Login Response:', JSON.stringify(loginRes.data, null, 2));

        if (loginRes.data.success) {
            const userId = loginRes.data.user._id;
            console.log('\nTesting Get Profile...');
            const profileRes = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
            console.log('Profile Response:', JSON.stringify(profileRes.data, null, 2));

            console.log('\nTesting Get FAQs...');
            const faqRes = await axios.get('http://localhost:5000/api/faqs');
            console.log('FAQs count:', faqRes.data.length);

            console.log('\nTesting Get Modules...');
            const moduleRes = await axios.get('http://localhost:5000/api/modules');
            console.log('Modules count:', moduleRes.data.length);
            console.log('\nTesting Chat AI...');
            console.log('\nTesting Chat AI (with 15s timeout)...');
            const chatRes = await axios.post('http://localhost:5000/api/chat', {
                query: 'How to use VPN?'
            }, { timeout: 15000 });
            console.log('Chat Response:', JSON.stringify(chatRes.data, null, 2));
        }
    } catch (err) {
        if (err.code === 'ECONNABORTED') {
            console.error('Test failed: Request timed out after 15s');
        } else {
            console.error('Test failed:', err.response ? JSON.stringify(err.response.data) : err.message);
        }
    }
}

testApi();
