import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "./modal/modalSlice"
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userSlice
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
