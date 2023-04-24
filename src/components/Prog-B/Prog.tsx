import React, { useState } from "react"
import classes from './Prog.module.css'
import { ProgProps } from "../../types/types"
import moment from "moment"
import 'moment-timezone'
const Prog: React.FC<ProgProps> = (props) => {
    const [katIsOpen, setKatIsOpen] = useState(false),
    [skipIsOpen, setSkipIsOpen] = useState(false),
    [whenIsOpen, setWhenIsOpen] = useState(false),
    [day, setDay] = useState(0),
    [hour, setHour] = useState(21),
    katarsis = () => {
        if(!katIsOpen){
            setKatIsOpen(true)
            setWhenIsOpen(false)
            setSkipIsOpen(false)
        }
        props.setKataMass()
    },    
    skipidar = () => {
        if(!skipIsOpen){
            setKatIsOpen(false)
            setWhenIsOpen(false)
            setSkipIsOpen(true)
        }
        props.setSkipka(true)
    },
    daySelect = (e:React.ChangeEvent<HTMLSelectElement>)=>setDay(parseInt(e.target.value)),
    hourSelect = (e:React.ChangeEvent<HTMLSelectElement>)=>setHour(parseInt(e.target.value)),
    setB = () => {
        setKatIsOpen(false)
    }
    return (
        <div>
            <h1 className={classes.text}>Прибуття на бе </h1>
            <h2 className={classes.text}>Сьогодні ти: <div>{props.kat}</div>{props.skip && <div>{props.skip}</div>}</h2>
            {props.skip && <button onClick={()=> props.setSkipka(false)}>Прибрати скіпідар</button>}
            <div className={classes.button}>
                <button onClick={katarsis} className={classes.kat}>{katIsOpen ? 'Більше катарсіса!' : 'Отримати катарсіс!'}</button>
                <button onClick={skipidar} className={classes.skip}>{skipIsOpen ? 'Більше скипідара!' : 'Отримати скіпідар!'}</button>
                <button className={classes.whenB}>Бе, повільно...</button>
            </div>
            <div className={classes.tabs}>
                <div>
                    <div className={classes.text}>Сьогодні ти {props.kat}!</div>
                    <button onClick={()=>setKatIsOpen(!katIsOpen)}>Чудово!</button>
                </div>
                <div style={{background:'url('+props.prg+')'}}>
                    <div className={classes.text}>Сьогодні ти {props.skip}!</div>
                    <button onClick={()=>setSkipIsOpen(!skipIsOpen)}>Чудово!</button>
                </div>
                <div>
                    <div onClick={()=> {if(!whenIsOpen){setWhenIsOpen(true); setSkipIsOpen(false); setKatIsOpen(false)}}} className={classes.text}>Наскільки повільно?</div>
                    <select value={day} onChange={daySelect}>
                        <option value="0" >сьогодні</option>
                        <option value=" 1">завтра</option>
                    </select>
                    <select value={hour} onChange={hourSelect}>
                        <option value="21" >21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                    </select>
                    <button onClick={setB}>Потихеньку...</button>
                </div>
            </div>
        </div>
    )
}
export default Prog