// This is the route handler for sending emails.

import { config } from 'dotenv'; // It is the pass from .env file
config();
import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/send-email', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'larryandsea@gmail.com', 
            pass: process.env.EMAIL_PASSWORD
        }
    });

    /* let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '2501990530@qq.com', // replace with your QQ email
            pass: 'dyotmjbwgaqyeabf' // replace with your QQ email smtp授权码
        }
    }); */
    let mailOptions = {
        from: 'larryandsea@gmail.com',
        to: req.body.email,
        subject: 'Login Notification',
        text: 'You have successfully logged in.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent: ' + info.response);
        }
    });
});

export default router;