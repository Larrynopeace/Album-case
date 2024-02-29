// This is the Redux store.

// The initial state of the store
const initialState = {
    token: null,
    userInfo: null,
};

// This is the reducer. It takes the current state and an action, and returns a new state.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'SAVE_USER_INFO':
            return {
                ...state,
                userInfo: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;