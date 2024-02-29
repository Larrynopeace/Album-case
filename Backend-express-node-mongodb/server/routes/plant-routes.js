//This is the route handler for all plant related requests

import { Router } from 'express';

// Import upload-image route
import uploadImage from './upload-image.js';
// Import get-plant route
import getPlant from './plant-routes/get-plant.js';
// Import add-plant route
import addPlant from './plant-routes/add-plant.js';
// import delete-plant route
import deletePlant from './plant-routes/delete-plant.js';
// import update-plant route
import updatePlant from './plant-routes/update-plant.js';

const router = Router();

// Use the routes: CRUD and upload image
router.use(uploadImage);
router.use(addPlant);
router.use(getPlant);
router.use(deletePlant);
router.use(updatePlant);


export default router;