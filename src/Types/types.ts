import { ThunkDispatch } from "redux-thunk"
import { AppStateType } from "../redux/store"
import { AnyAction } from "redux"

export type DialogsItem = {
    head?: string,
    quest?: string,
    yesBtn: string,
    noBtn?: string,
    navYes?: string,
    navNo?: string,
    header?: string
}
export type Dialogs = {
    yurkoOne: DialogsItem,
    yurkoTwo: DialogsItem,
    yurkoThree: DialogsItem,
    progOne: DialogsItem,
    progTwo: DialogsItem,
    danOne: DialogsItem,
    danTwo: DialogsItem,
    out: DialogsItem
}
export type ModalProps = {
    dialogs: {
        head?: string,
        quest?: string,
        yesBtn: string,
        noBtn?: string,
        navYes?: string,
        navNo?: string,
        header?: string
    }
}
export type DateObj = {
    mode: string, 
    date: string 
}
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>; 