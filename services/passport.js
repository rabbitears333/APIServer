const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
//create local strategy
const localOptions = {usernameField:'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({email:email}, function(err){
        if (err){return done(err);}
        if (!user) {return done(null, false)}
        //compare passwords
        user.comparePassword(password, function(err, isMatch){
            if (err) { return done(err);}
            if (!isMatch) {return done(null, false);}
            return done(null, user);
        });
    });

});
//setup options for jwt strategy
const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: config.secret
};

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload, done){
 // verify if user id and payload exists in the database. if exitsts, call done. else, call done without a user object.
    User.findById(payload.sub, function(err, user){
        if (err){ return done(err, false);}
        if (user) {
            done(null,user);
        }
        else {
            done(null, false);
        }
    });
});
//tell passport to use strategy
passport.use(jwtLogin);
passport.use(localLogin);
