/**
 * Created by andy on 11/2/2016.
 */
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = function(req, res, next){
    //user needs this filed
    res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || ! password){
        return res.status(422).send({error: 'You must provide email and password'});
    }
    // see if user with given username exists
    User.findOne({email:email},function(err, existingUser){

        if(err){ return next(err);}

        if (existingUser) {
            return res.status(422).send({error:'email is in use'});
        }
        const user = new User({
            email: email,
            password: password
        });
        user.save(function(err){
            if(err)
            {
                return next(err);
            }
            //respond to request to return the user object

            res.json({token: tokenForUser(user)});
        });
    });

}