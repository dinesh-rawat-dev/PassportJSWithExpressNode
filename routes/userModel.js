var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    created: {
        type: Date
    },
    modified: {
        type: Date
    },
});

userSchema.pre('save', function(next) {
    var user = this;
    var cb = function(err, psw) {
        if (err) {
            throw new Error(err);
        }
        user.password = psw;
        next();
    }
    bcrypt.hash(user.password, bcrypt.genSaltSync(8), null, cb);
});

userSchema.statics.isValidUserPassword = function(username, password, next) {
    this.findOne({
        username: username
    }, function(err, usr) {
        if (err === null && usr === null) {
            return next(true);
        }
        var cb = function(err, result) {
            if (!result) {
                return next(true);
            }
            var user = usr.toObject();
            delete user.password;
            delete user.__v;
            return next(false, {
                message: 'User authenticated successfully!',
                user: user
            })
        };
        bcrypt.compare(password, usr.password, cb);
    });
};

module.exports = mongoose.model('User', userSchema);