import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean
    type: string
}

const initialState: ModalState = {
    isOpen: false,
    type: 'register'
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        closeModal: (state) => {
            state.isOpen = false
        },
        openModal: (state) => {
            state.isOpen = true
        },
        loginType: (state) => {
            state.type = "login"
        },
        registerType: (state) => {
            state.type = "register"
        }

    },
})


export const { closeModal, openModal, loginType, registerType } = modalSlice.actions
export default modalSlice.reducer



