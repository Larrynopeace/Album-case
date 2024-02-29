// This is the route handler for logging in a user

import { Router } from 'express';
import UserModel from '../../models/user.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/user/login', (req, res) => {
    UserModel.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.status(400).send('@@@Cannot find user');
            }

            // Check password
            if (req.body.password !== user.password) {
                return res.status(400).send('@@@Invalid password');
            }

            // User is authenticated, generate a token
            const token = jwt.sign({ _id: user._id }, 'your-secret-key');

            console.log("@@@Logged in user:", user);
            console.log("@@@Token:", token);
            // Send the token to the frontend client so that it can be used in future requests
            res.send({ user, token });
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;