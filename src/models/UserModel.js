import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.connect('mongodb://localhost/dsign');

const db = mongoose.connection;

let UserSchema = mongoose.Schema({
    email: {
        type: String,
        index: true
    },

    password: {
        type: String
    }
});

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

