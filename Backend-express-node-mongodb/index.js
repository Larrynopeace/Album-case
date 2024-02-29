//*Need to connect to mongoDB first, then start the server, otherwise the server will start before the connection is established, 
// and the server will not be able to find the collection in the database.
// command: node index.js

// Create const express
import express from 'express';

// Create const app
const app = express();

// *Import cors to allow cross origin requests, because we are running on localhost:3000 and our vue app is running on localhost:5173
import cors from 'cors';
app.use(cors());

// Use express.json middleware, which is used to parse the request body in post method (adding an item to the database)
//app.use(express.json());

import bodyParser from 'body-parser';
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Import mongodb-setting.js
import db from './server/mongodb-setting/mongodb-setting.js';

// Import plant-routes.js
import plantRoutes from './server/routes/plant-routes.js';
// Import user-routes.js
import userRoutes from './server/routes/user-routes.js';

// Connect to mongoDB
db(() => {

    // Use plantRoutes and userRoutes
    app.use(plantRoutes);
    app.use(userRoutes);

    //To serve these local images, you can use the express.static middleware in your Express.js server: localhost:3000/uploads/1619787530000-plant1.jpg
    app.use('/uploads', express.static('uploads'));

    console.log('Connection succeeded');
}, () => {
    console.log('Connection failed');
});

// Start express server, listen to port 3000
app.listen(3000, () => {
    console.log('server started on port 3000!!!');
});