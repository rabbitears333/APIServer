/**
 * Created by andy on 10/14/2016.
 */

const Authentication = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session: false});


module.exports= function(app){
    app.get('/', requireAuth, function(res, req){
        res.send({hi: "there"});
    });
    app.post('/signin',requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}
