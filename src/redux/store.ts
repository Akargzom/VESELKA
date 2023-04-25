import { ThunkAction, ThunkMiddleware } from "redux-thunk"
import thunkMiddleware from 'redux-thunk'
import { configureStore, Action, AnyAction } from '@reduxjs/toolkit'
import counterReducer from "./counterReducer"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import dialogsReducer from "./dialogsReducer"
type PropertiesType<T> = T extends {[key: string] : infer U} ? U : never
export type InferActionsTypes<T extends {[key: string] : (...args: any[])=> any}> = ReturnType<PropertiesType<T>>
export type AppStateType = ToolkitStore<any, AnyAction, [ThunkMiddleware<any, AnyAction>]>
export type BaseThunkType<A extends Action, R = Promise<void | "succes" | undefined> | void> = ThunkAction<R, AppStateType, unknown, A>
export const store = configureStore({
    reducer: {
        counterReducer: counterReducer,
        dialogsReducer: dialogsReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunkMiddleware)
});
let state = store.getState()
export type StateType = typeof state