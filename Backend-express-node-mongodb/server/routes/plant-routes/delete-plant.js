// This is the route handler for deleting a plant by _id in MongoDB

import { Router } from 'express';
import PlantModel from '../../models/plant.js';

const router = Router();

router.delete('/plant/delete/:id', (req, res) => {
    PlantModel.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "No plant found with id " + req.params.id });
            }
            // Check the deleted plant details
            console.log("@@@Deleted Item:", data);
            res.send({ message: "Plant deleted successfully!" });
        })
        .catch((err) => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({ message: "No plant found with id " + req.params.id });
            }
            return res.status(500).send({ message: "Could not delete plant with id " + req.params.id });
        });
});

export default router;