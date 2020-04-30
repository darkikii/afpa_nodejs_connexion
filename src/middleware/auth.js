const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async(req, res, next) => {
    console.log('debut auth');/*erreur ne peux pas lire la propriete replace avec undefined*/
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, 'WinterIsComingGOT2019');
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }

}
module.exports = auth;