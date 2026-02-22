const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const chatController = require('../controllers/chatController');
const messageController = require('../controllers/messageController');
const moduleController = require('../controllers/moduleController');
const faqController = require('../controllers/faqController');

// Auth
router.post('/auth/login', authController.login);
router.get('/auth/user/:id', authController.getUserProfile);

// Chat
router.post('/chat', chatController.askAI);

// Messages
router.post('/messages', messageController.sendMessage);
router.get('/messages/:userId', messageController.getMessages);

// Modules
router.get('/modules', moduleController.getModules);
router.post('/modules/complete', moduleController.markModuleComplete);
router.post('/modules/uncomplete', moduleController.markModuleIncomplete);

// FAQs
router.get('/faqs', faqController.getFAQs);

module.exports = router;
