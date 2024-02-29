// This is the route handler to get a user by _id in MongoDB

import { Router } from 'express';
import UserModel from '../../models/user.js';

const router = Router();

router.get('/user/:id', (req, res) => {
    UserModel.findOne({ _id: req.params.id })
        .then((data) => {
            console.log("@@@Selected Item:", data);
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;
