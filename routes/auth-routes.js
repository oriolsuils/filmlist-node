const router = require('express').Router();
const userController = require('../controllers/user-controller');

router.post('/register', async (req, res) => {
    try {
        let savedUser = await userController.registerUser(req.body);
        if(savedUser.error) return res.status(400).send(savedUser.error);
        res.send({user: savedUser._id});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        let token = await userController.login(req.body);
        if(token.error) return res.status(400).send(token.error);
        res.header('auth-token', token).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;