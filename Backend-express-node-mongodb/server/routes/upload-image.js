// This is the route handler for uploading an image. 

import { Router } from 'express';
import multer from 'multer';

const router = Router();

// 1. Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// 2. Set up multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50 }, // Adjust the limit as needed
});

// Route handler for one image uploading of antD component ('upload' need to be defined by Multer)
router.post('/upload', upload.array('image'), (req, res) => {
    try {
        // See the uploaded file details when the upload is done: 'files' is from multer
        console.log("@@@Uploaded file:", req.files);

        // Return a response to the client
        return res.status(201).json({
            message: 'File uploded successfully',
            // Add this line so the frontend can see and access the uploaded file name
            filename: req.files[0].filename,
        });
    } catch (error) {
        console.error(error);
    }
});

export default router;