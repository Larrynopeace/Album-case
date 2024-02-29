// This is the User page

import React from 'react';
import { useSelector } from 'react-redux';

// import css
import './user.css';

const User = () => {

    const userInfo = useSelector(state => state.user.userInfo);

    return (
        <>
            <h1>This is the user page</h1>
            <h2>User Info</h2>
            <div>
                <p>Username: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
            </div>
        </>
    );
}

export default User;