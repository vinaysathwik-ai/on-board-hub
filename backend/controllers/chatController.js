const { getAnswer } = require('../services/aiService');

exports.askAI = async (req, res) => {
    const { query } = req.body;
    console.log('askAI controller received query:', query);
    try {
        const response = await getAnswer(query);
        console.log('askAI controller got response');
        res.json(response);
    } catch (err) {
        console.error('askAI controller error:', err);
        res.status(500).send('AI Service Error');
    }
};
