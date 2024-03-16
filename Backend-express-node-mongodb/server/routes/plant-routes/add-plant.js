// This is the route handler for adding a plant to the database.

import { Router } from 'express';
import PlantModel from '../../models/plant.js';

const router = Router();

router.post('/plant/add', (req, res) => {

    // See the uploaded image details when submitting the form
    console.log("@@@Image in request:", req.body.image);

    const images = req.body.image.map(img => ({ url: `http://localhost:3000/uploads/${img.response.filename}` }));

    const newPlant = new PlantModel({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        // Access the uploaded image file: filename is made in the upload-image.js
        image: images,
    })

    // Process the data here, e.g., save it to a database
    newPlant.save()
        .then((data) => {
            console.log("@@@Added object:", data);
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;