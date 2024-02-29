// setToken action
const saveToken = (token) => {
    return {
        type: 'SAVE_TOKEN',
        payload: token,
    };
};

// setUserInfo action
const saveUserInfo = (userInfo) => {
    return {
        type: 'SAVE_USER_INFO',
        payload: userInfo,
    };
};

export { saveToken, saveUserInfo };