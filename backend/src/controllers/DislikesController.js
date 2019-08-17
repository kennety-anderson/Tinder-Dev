//require do model Dev
const Dev = require('../models/Dev');

//exportação da funcionalidade de dislike
module.exports = {
    async store(req, res) {

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' })
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        res.json(loggedDev);

    }
};
