// This is a Route handler for /plant/update/:id: Update a plant by _id in MongoDB

import { Router } from 'express';
import PlantModel from '../../models/plant.js';

const router = Router();

router.put('/plant/update/:id', (req, res) => {
    let images;
    if (req.body.image[0].response && req.body.image[0].response.filename) {
        // Add a new image: Use the filename brought from the upload-image route
        // It creates an array of objects with the 'url' of the image, which fits with the model
        images = req.body.image.map(img => ({ url: `uploads/${img.response.filename}` }));
    } else {
        // keep the old image: extract the filename from the URL
        images = req.body.image.map(img => ({ url: img.url }));
    }

    const updatedPlant = {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        image: images
    };

    // See the updated plant details to check how the data is processed
    console.log("@@@updatedPlant:", updatedPlant);

    PlantModel.findOneAndUpdate({ _id: req.params.id }, updatedPlant, { new: true })
        .then((data) => {
            console.log("@@@Updated Item in Mongodb:", data);
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;