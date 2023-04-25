import { StateType } from "./store"

export const getCounter = (state: StateType) => {
    return state.counterReducer
}

export const getDialogs = (state: StateType) => {
    return state.dialogsReducer
}