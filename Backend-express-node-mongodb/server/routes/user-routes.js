//This is the route handler for all user related requests

import { Router } from 'express';

// Import create-user route
import createUser from './user-routes/create-user.js';
import loginUser from './user-routes/login-user.js';
import getUser from './user-routes/get-user.js';

const router = Router();

// Use the routes: CRUD
router.use(createUser);
router.use(loginUser);

export default router;