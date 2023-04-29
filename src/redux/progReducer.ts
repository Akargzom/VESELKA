import prgrm1 from '../assets/prgrm.png'
import prgrm2 from '../assets/prgrm_2.png'
import prgrm3 from '../assets/prgrm_3_fake.png'
import { InferActionsTypes, BaseThunkType } from './store'
import API from '../api/api'
import type { AnyAction } from '@reduxjs/toolkit'
export type InitialStateType = typeof initialState
export type ActionType = InferActionsTypes<typeof actions>
let initialState = {
  whenB: '',
  skip: '',
  kat: '',
  prgPng: '',
  skipidar: ["скіп", "скіпа", "скіпальний", "скіпання", "скіпати", "скіпатися", "скіпетр", "скіпець", "скіпка", "скіпкий", "скіплина", "скіповий", "скіпочка", "скіпчик", "скіпщик", "скіпщина", "скипання", "скипати", "скипатися", "скипень", "скипетро", "скипець", "скипидар", "скипидарити", "скипидаритися", "скипидарний", "скипити", "скипілий", "скипіти", "скипітися", "скип'ятити", "скип'ячений"],
  katarsis: ["ПлаКАТувка", "Катівня Львів", "катер \"раптор\" (утонувший)", "кат", "катаболізм", "катаболічний", "катавасія", "катагенез", "катагенетичний", "катадіоптрика", "катадіоптричний", "катакана", "катаклаз", "катакластичний", "катаклізм", "катаклізмічний", "катакомба", "катакомбний", "катакомбник", "катакомбовий", "каталажка", "каталаза", "каталазний", "каталектика", "каталектичний", "каталепсичний", "каталепсія", "каталептичний", "каталіз", "каталізатор", "каталізаторний", "каталізаційний", "каталізація", "каталізний", "каталізований", "каталізувальний", "каталізувати", "каталізуватися", "каталітичний", "каталка", "каталог", "каталогізатор", "каталогізаторка", "каталогізаційний", "каталогізація", "каталогізований", "каталогізування", "каталогізувати", "каталогізуватися", "каталоговий", "каталогування", "каталогувати", "каталожна", "каталожний", "каталонка", "каталонський", "каталь", "катальний", "катальпа", "катальповий", "катамаран", "катамаранний", "катаморфоз", "катаний", "катанка", "катання", "катаплазматичний", "катапульта", "катапультація", "катапультний", "катапультований", "катапультовий", "катапультування", "катапультувати", "катапультуватися", "катар", "катаракт", "катаракт", "катаракта", "катарактальний", "катаральний", "катарсис", "катарсисний", "катарсисність", "катарсистичний", "катарсичний", "катастрофа", "катастрофізм", "катастрофіст", "катастрофічний", "катастрофічніший", "катастрофічність", "катастрофний", "кататермометр", "кататермометричний", "кататермометрія", "катати", "кататимний", "кататися", "кататонічний", "кататонічно", "кататонія", "кататравма", "катафалк", "катафілаксія", "катафорез", "катафорезний", "катафоричний", "катафорично", "катафот", "катафота", "катафронт", "катахреза", "категоризатор", "категоризаційний", "категоризація", "категоризований", "категоризувати", "категоризуватися", "категоричний", "категоричніший", "категоричність", "категоріальний", "категоріальність", "категорійний", "категорійність", "категорійно-поняттєвий", "категорія", "категорний", "катедра", "катедральний", "катедральність", "катеначо", "катеноїд", "катепсин", "катер", "катеринка", "катеринковий", "катерна", "катерний", "катеробудівний", "катеробудівництво", "катерок", "катет", "катетер", "катетеризаційний", "катетеризація", "катетеризований", "катетеризування", "катетеризувати", "катетеризуватися", "катетерний", "катетометр", "катехиза", "катехизація", "катехизис", "катехизисний", "катехизм", "катехизувати", "катехит", "катехитичний", "катехитка", "катехізація", "катехізис", "катехізисний", "катехізичний", "катехізм", "катехін", "катехіновий", "катехоламін", "катехоламіновий", "катик", "катів", "катівка", "катівня", "катівство", "катівський", "катізма", "катіон", "катіоніт", "катіонітний", "катіонний", "катіоноактивний", "катіонообмін", "катіонообмінний", "катіонообмінник", "катіон-радикал", "катіон-радикальний", "катіонування", "катма", "катований", "катований", "катод", "катодний", "катодно-променевий", "катодовий", "катодолюмінесцентний", "катодолюмінесценція", "катойконім", "каток", "католизація", "католик", "католикос", "католикосат", "католицизм", "католицтво", "католицький", "католицькість", "католичення", "католичити", "католичка", "католікос", "катоптрика", "катоптричний", "каторга", "каторжанин", "каторжанка", "каторжанський", "каторжний", "каторжний", "каторжник", "каторжницький", "каторжниця", "катран", "катран", "катрановий", "катрен", "катувальний", "катувальниця", "катування", "катувати", "катуватися", "катуський", "катюга", "катюжний", "катюша", 'Янукович'],
  prgPngMass: [prgrm1, prgrm2, prgrm3]
},
  progReducer = (state = initialState, action: AnyAction): InitialStateType => {
    if (action.type === 'PROG/SET_WHENB') {
      return { ...state, whenB: action.payload }
    } else if (action.type === 'PROG/SET_SKIP') {
      return { ...state, skip: action.payload }
    } else if (action.type === 'PROG/SET_KAT') {
      return { ...state, kat: action.payload }
    } else if (action.type === 'PROG/SET_PRGPNG') {
      return { ...state, prgPng: action.payload }
    } else {
      return state;
    }
  }
export const actions = {
  setWhenB: (whenB: string) => ({
    type: 'PROG/SET_WHENB',
    payload: whenB
  }) as const,
  setSkip: (skip: string) => ({
    type: 'PROG/SET_SKIP',
    payload: skip
  }) as const,
  setKat: (kat: string) => ({
    type: 'PROG/SET_KAT',
    payload: kat
  }) as const,
  setPrgPng: (prgPng: string) => ({
    type: 'PROG/SET_PRGPNG',
    payload: prgPng
  }) as const
}
export type ThunkType = BaseThunkType<ActionType>
export const InitialProg = (): ThunkType => {
  return async (dispatch) => {
    await API.fetchWhenB().then((r) => { dispatch(actions.setWhenB(r)) })
      .then(() => API.fetchSkip().then((r) => { dispatch(actions.setSkip(r)) }))
      .then(() => API.fetchKat().then((r) => { dispatch(actions.setKat(r)) }))
      .then(() => API.fetchPrg().then((r) => { dispatch(actions.setPrgPng(r)) }))
  }
}
export const setKat = (kat: string): ThunkType => {
  return async (dispatch) => {
    await API.setKat(kat)
    dispatch(actions.setKat(kat))
  }
}
export const setSkip = (skip: string): ThunkType => {
  return async (dispatch) => {
    await API.setSkip(skip)
    dispatch(actions.setSkip(skip))
  }
}
export const setPrgPng = (prgPng: string): ThunkType => {
  return async (dispatch) => {
    await API.SetPrg(prgPng)
    dispatch(actions.setPrgPng(prgPng))
  }
}
export const setWhenB = (whenB: string): ThunkType => {
  return async (dispatch) => {
    await API.SetWhenB(whenB)
    dispatch(actions.setWhenB(whenB))
  }
}

export const requestB = async ():Promise<any> =>{
  return await API.fetchWhenB()
}

export const requestKat = async ():Promise<any> =>{
  return await API.fetchKat()
}
export default progReducer