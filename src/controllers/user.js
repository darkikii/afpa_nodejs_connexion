const jwt = require('jsonwebtoken');/*pour les token sert à identifier les user(npm install --save jsonwebtoken)*/

const User = require('../models/User');

/*creation nouveau user*/
exports.signup = async(req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(405).send(error);
    }
};

/*verif login + redirection page accueil*/
exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        var token2 = 'Bearer ' + token;
        res.setHeader(  
            'Authorization', token2
            );
        console.log('test2 ' + token);
        
        res.redirect('/accueil');
        next();
    } catch (error) {
        res.status(403).send(error);
    }
};

/*page accueil*/
exports.accueil = (req, res, next) => {/*ne fonctionne pas car pas de token qui arrive*/
    console.log('test4 ' + req.headers.authorization);
    res.render('page.ejs');
};

exports.connection = (req, res, next) => {
    res.render('connection.ejs');
}