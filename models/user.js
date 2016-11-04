/**
 * Created by andy on 10/14/2016.
 */

const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//define model

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:String
});
// on save encrypt password
userSchema.pre('save', function(next) {
    //get access to user model.
    const user = this;
    //run salt then make a callback
    bcrypt.genSalt(10, function(err, salt){
        if (err) {return next(err);}
        //hash password using a salt.
        bcrypt.hash(
            user.password,salt,null, function(err, hash){
               if (err) {return next(err);}
                //override plain text password with encrypted password
                user.password = hash;
                next();

    });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err){return callback(err);}
        callback(null, isMatch);
    });
}

//create model class
const ModelClass = mongoose.model('user', userSchema);




//export model

module.exports= ModelClass;