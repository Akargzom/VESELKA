import { InferActionsTypes, BaseThunkType } from './store'
import API from '../api/api'
import type { AnyAction } from '@reduxjs/toolkit'
import { DateObj } from '../types/types'
export type InitialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
let initialState = {
  katMass: [] as DateObj[],
  timezone: "Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5"
},
  counterReducer = (state = initialState, action: AnyAction
  ): InitialStateType => {
    if (action.type === 'COUNTER/SET_KATMASS') {
      return { ...state, katMass: action.payload }
    } else {
      return state;
    }
  }
export const actions = {
  setKatMass: (katMass: DateObj[]) => ({
    type: 'COUNTER/SET_KATMASS',
    payload: katMass
  }) as const
}
export type ThunkType = BaseThunkType<ActionType>
export const InitialCounter = (): ThunkType => {
  return async (dispatch) => {
    await API.fetchRMass().then((r) => dispatch(actions.setKatMass(r)))
      .then(() => API.fetchRNum())
  }
}
export const SetCounter = (katMass: DateObj[]): ThunkType => {
  return async (dispatch) => {
    await API.SetRMass(katMass)
    dispatch(actions.setKatMass(katMass))
  }
}
export default counterReducer