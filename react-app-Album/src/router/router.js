// This is the router

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../pages/Layout/layout';
import Plant from '../pages/Plant/plant';
import Login from '../pages/Login/login';
import User from '../pages/User/user';
import Upload from '../pages/Upload/upload-plant';
import { Navigate } from 'react-router-dom';
import SignUp from '../pages/SignUp/create-user';
import Authentication from './authentication';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Authentication> <Layout /> </Authentication>,
        children: [
            {
                path: '/',
                element: <Navigate to="home" />
            },
            {
                path: 'home',
                element: <App />
            },
            {
                path: 'plant',
                element: <Plant />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'upload',
                element: <Upload />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
]);

export default router;