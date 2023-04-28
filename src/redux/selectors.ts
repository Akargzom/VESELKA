import { StateType } from "./store"

export const getCounter = (state: StateType) => {
    return state.counterReducer
}

export const getDialogs = (state: StateType) => {
    return state.dialogsReducer
}

export const getProg = (state: StateType) => {
    return state.progReducer
}