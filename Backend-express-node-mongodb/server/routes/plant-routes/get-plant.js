// This the route handler for getting plants from the database.

import { Router } from 'express';
import PlantModel from '../../models/plant.js';


const router = Router();

// Route handler for /plant: Get all plants
router.get('/plant/all', (req, res) => {
    PlantModel.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Route handler for /plant/:id Get a plant by _id in MongoDB
router.get('/plant/:id', (req, res) => {
    PlantModel.findOne({ _id: req.params.id })
        .then((data) => {
            console.log("@@@Selected Item:", data);
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Route handler for /plant/type/:type Get all plants by type
router.get('/plant/type/:type', (req, res) => {
    PlantModel.find({ type: req.params.type })
        .then((data) => {
            console.log("@@@Retreived Item:", data);
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
});
export default router;