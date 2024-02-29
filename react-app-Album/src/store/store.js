import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

//Create the store
const store = configureStore({
    reducer: {
        user: reducer,
    },
});

// Export the store
export default store;