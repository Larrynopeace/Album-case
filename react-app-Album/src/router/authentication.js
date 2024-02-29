// This is the authentication route. It wraps the children components and checks if the user is authenticated.
// It checks if there is a token in the Redux store. 
// If there is, it renders the children components. If there isn't, it navigate to the Login page.

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Authentication = ({ children }) => {
    const token = useSelector(state => state.user.token);

    if (!token) {
        // If there's no token, navigate to the Login page
        return <Navigate to="/login" />;
    }

    // If there is a token, render the children routes
    return <>{children}</>
};

export default Authentication;
