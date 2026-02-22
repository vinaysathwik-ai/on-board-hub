const Module = require('../models/Module');
const User = require('../models/User');

exports.getModules = async (req, res) => {
    try {
        const modules = await Module.find().sort({ order: 1 });
        res.json(modules);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.markModuleComplete = async (req, res) => {
    const { userId, moduleId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user.completedModules.includes(moduleId)) {
            user.completedModules.push(moduleId);
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.markModuleIncomplete = async (req, res) => {
    const { userId, moduleId } = req.body;
    try {
        const user = await User.findById(userId);
        user.completedModules = user.completedModules.filter(id => id.toString() !== moduleId);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
