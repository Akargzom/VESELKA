import React, { useEffect, useState } from "react"
import moment from "moment"
import 'moment-timezone'
import classes from './Counter.module.css'
import vector from '../../assets/Vector.png'
import { AppDispatch, DateObj} from "../../types/types"
import { useDispatch, useSelector } from "react-redux"
import { getCounter } from "../../redux/selectors"
import { SetCounter, ThunkType} from "../../redux/counterReducer"
let Counter: React.FC = () => {
    let state = useSelector(getCounter),
    [name, setName] = useState(''),
    [date, setDate] = useState('')
    moment.tz.add(state.timezone)
    const dateR = () => {
        let actualDate = ("0" + moment().tz("Europe/Kiev").date()).slice(-2) + "-" + ("0" + (moment().tz("Europe/Kiev").month() + 1)).slice(-2) + "-" + moment().tz("Europe/Kiev").year() + " " + ("0" + moment().tz("Europe/Kiev").hours()).slice(-2) + ":" + ("0" + moment().tz("Europe/Kiev").minutes()).slice(-2)
        return actualDate;
    },
        [isOpen, setOpen] = useState(false),
        dispatch:AppDispatch = useDispatch(),
        addGame = (mode: string) => {
            let RDate = dateR(),
                dateObj = {
                    mode: mode,
                    date: RDate
                },
                count = (state.count + 1),
                katMass = state.katMass.concat([dateObj])
            dispatch(SetCounter(count, katMass) as ThunkType)
        }
        useEffect(()=>{
            if(state.katMass){
                setName(state.katMass[state.katMass.length-1].mode === 'CSGO' ? 'Каеска' : "Веселка")
                setDate(state.katMass[state.katMass.length-1].date)
            }
        },[state.katMass])
    return (
        <div className={classes.wrap}>
            <h1 className={classes.count}>{name} в останній раз була {state.count}</h1>
            <div className={classes.date}>И це було: {date}</div>
            <div className={classes.buttons}>
                <button className={classes.button + ' ' + classes.rainbow} onClick={() => addGame('R6')}>Додати веселку</button>
                <button className={classes.button} onClick={() => addGame('CSGO')}>Додати каеску</button>
            </div>
            <div className={isOpen ? classes.dates + ' ' + classes.open : classes.dates}><div onClick={() => setOpen(!isOpen)} className={classes.flex}><span>{isOpen ? 'сховати' : 'показати'} катки</span><img src={vector} alt="" /></div>
                <ul>
                    {state.katMass && state.katMass.slice(0).reverse().map((k:DateObj, index:number) => <li key={index}><span>{k.mode}</span>  {k.date}</li>)}
                </ul>
            </div>
        </div>
    )
}
export default Counter