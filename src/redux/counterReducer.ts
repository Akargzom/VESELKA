import { InferActionsTypes, BaseThunkType } from './store'
import API from '../api/api'
import type { AnyAction } from '@reduxjs/toolkit'
import { DateObj } from '../types/types'
export type InitialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
let initialState = {
    katMass: [] as DateObj[],
    count: 0,
    date: '',
    name: '' as 'Веселка' | 'Каеска',
    timezone: "Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5"
  },
  counterReducer = (state = initialState, action: AnyAction): InitialStateType => {
    if(action.type === 'COUNTER/SET_KATMASS'){
        return{...state, katMass: action.payload}
    }else if(action.type === 'COUNTER/SET_COUNT'){
        return{...state, count: action.payload}
    }else if(action.type === 'COUNTER/SET_DATE'){
        return{...state, date: action.payload}
    } else if(action.type === 'COUNTER/SET_NAME'){
        return{...state, name: action.payload}
    }else{
    return state;
    }
}
export const actions = {
    setKatMass: (katMass:DateObj[]) =>({
        type: 'COUNTER/SET_KATMASS',
        payload: katMass
    }) as const,
    setCount: (count:number) =>({
        type: 'COUNTER/SET_COUNT',
        payload: count
    }) as const,
    setDate: (date: '') =>({
        type: 'COUNTER/SET_DATE',
        payload: date
    }) as const,
    setName: (name: 'Веселка' | 'Каеска') =>({
        type: 'COUNTER/SET_NAME',
        payload: name
    }) as const
}
export type ThunkType = BaseThunkType<ActionType>
export const InitialCounter = ():ThunkType => {
    return async (dispatch) => {
      await API.fetchRMass().then((r)=>{dispatch(actions.setKatMass(r))})
      .then(()=>API.fetchRNum().then((r)=>{dispatch(actions.setCount(r))}))
      .then(()=>API.fetchRDate().then((r)=>{dispatch(actions.setDate(r))}))
      .then(()=>API.fetchRMode().then((r)=>{r === 'R6' ? dispatch(actions.setName('Веселка')) : dispatch(actions.setName('Каеска'))}))
    }
  }
  export const SetCounter = (RDate:DateObj, rNum: number, katMass:DateObj[]):ThunkType=> {
    return async (dispatch) => {
      await API.SetRDate(RDate).then(()=>API.SetRMass(katMass).then(()=>API.SetRNum(rNum)))
      .then(()=>{
        API.fetchRMass().then((r)=>{dispatch(actions.setKatMass(r))})
      .then(()=>API.fetchRNum().then((r)=>{dispatch(actions.setCount(r))}))
      .then(()=>API.fetchRDate().then((r)=>{dispatch(actions.setDate(r))}))
      .then(()=>API.fetchRMode().then((r)=>{r === 'R6' ? dispatch(actions.setName('Веселка')) : dispatch(actions.setName('Каеска'))}))
      })
    }
  }
export default counterReducer