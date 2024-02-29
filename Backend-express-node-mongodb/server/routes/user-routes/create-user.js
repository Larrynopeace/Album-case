// This is the route handler for creating a new user

import { Router } from 'express';
import UserModel from '../../models/user.js';

const router = Router();

router.post('/user/create', (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    })

    newUser.save()
        .then((data) => {
            console.log("@@@Created user:", data);
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;