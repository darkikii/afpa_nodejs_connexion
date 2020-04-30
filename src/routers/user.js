const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/signup', userCtrl.signup);
router.post('/login', urlencodedParser, userCtrl.login);
router.get('/accueil', auth, userCtrl.accueil);
router.get('/', userCtrl.connection);

module.exports = router;

/*router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user);
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

*/