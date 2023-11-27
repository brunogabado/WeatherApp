import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    name: string;
    email: string;
    isLogged: boolean
    list: string[];
}

const initialState: UserState = {
    name: "",
    email: "",
    isLogged: false,
    list: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setIsLogged: (state) => {
            state.isLogged = true
        },
        setUserList: (state, action) => {
            state.list = action.payload
        },
        clearUserState: (state) => {
            state.email = ""
            state.name = ""
            state.isLogged = false
            state.list = []
        }
    }
})

export const { setUserName, setUserEmail, setIsLogged, setUserList, clearUserState } = userSlice.actions
export default userSlice.reducer