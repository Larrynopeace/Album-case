//this is the starting point of the application

//import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

//import the App root component
//import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

import { Provider } from 'react-redux';
import store from './store/store'

//import the global css file
import './index.css';

//render the App component to the 'root' element in the DOM, the root element is in the public/index.html file
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);


