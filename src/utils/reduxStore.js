import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./feature/usereducer"
import feedReducer from "./feature/feedreducer"
import connectionReducer from "./feature/connectionreducer"
import requestReducer from "./feature/requestReducer"

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        request: requestReducer
    }
})