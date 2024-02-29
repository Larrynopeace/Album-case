// Encapsulate the plant model in a module

// import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

let PlantSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: [{
        url: String,
    }],
    type: {
        type: String,
        enum: ['day', 'night'],
    },
});

let PlantModel = model('plants', PlantSchema);

export default PlantModel;