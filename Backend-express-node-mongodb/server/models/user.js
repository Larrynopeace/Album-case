// Encapsulate the user model in a module

// import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

let UserModel = model('users', UserSchema);

export default UserModel;