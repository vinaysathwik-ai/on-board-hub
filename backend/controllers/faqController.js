const FAQ = require('../models/FAQ');

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.json(faqs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
