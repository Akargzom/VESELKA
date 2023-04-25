import React, { useEffect, useState } from "react"
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
        [hours, setHours] = useState(0),
        [minutes, setMinutes] = useState(0),
        [seconds, setSeconds] = useState(0),
        katarsis = () => {
            if (!katIsOpen) {
                setKatIsOpen(true)
                setWhenIsOpen(false)
                setSkipIsOpen(false)
            }
            props.setKataMass()
        },
        skipidar = () => {
            if (!skipIsOpen) {
                setKatIsOpen(false)
                setWhenIsOpen(false)
                setSkipIsOpen(true)
            }
            props.setSkipka(true)
        },
        addZero = (num:number):string | number => {
            if (num <= 9) {
              return '0' + num;
            } else return num;
          },
        daySelect = (e: React.ChangeEvent<HTMLSelectElement>) => setDay(parseInt(e.target.value)),
        hourSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setHour(parseInt(e.target.value))
    let whenBActual = moment().tz("Europe/Kiev").add(+day, 'days').format('YYYY-MM-DD') + " " + hour + ":00"
    const setB = () => {
            setWhenIsOpen(!whenIsOpen)
        props.setWhenBProp(whenBActual)
    },
        getTime = (whenB: string) => {
            if (props.whenB) {
                const time = moment(props.whenB).diff(moment().tz("Europe/Kiev"))
                setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
                setMinutes(Math.floor((time / 1000 / 60) % 60))
                setSeconds(Math.floor((time / 1000) % 60))
            }
        };
    useEffect(() => {
        const interval = setInterval(() => getTime(props.whenB), 1000)
        return () => clearInterval(interval)
    }, []);
    useEffect(() => {
        const interval = setInterval(() => getTime(props.whenB), 1000)
        return () => clearInterval(interval)
    }, [props.whenB]);
    return (
        <div className={classes.prog}>
            <h1 className={classes.text}>Прибуття на бе {seconds > 0 ? <span >очікується через: {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}</span> : <span>не очікується</span>}</h1>
            <h2 className={classes.text}>Сьогодні ти: <div>{props.kat}</div>{props.skip && <div>{props.skip}</div>}</h2>
            {props.skip && <button onClick={() => props.setSkipka(false)}>Прибрати скіпідар</button>}
            <div className={classes.tabs}>
                <div className={classes.tabGroup}>
                    <button onClick={katarsis} className={classes.kat}>{katIsOpen ? 'Більше катарсіса!' : 'Отримати катарсіс!'}</button>
                    <div className={classes.tab} style={katIsOpen ? {display:'block'}:{display:'none'}}>
                        <div className={classes.text}>Сьогодні ти {props.kat}!</div>
                        <button className={classes.small} onClick={() => setKatIsOpen(!katIsOpen)}>Чудово!</button>
                    </div>
                </div>
                <div className={classes.tabGroup}>
                    <button onClick={skipidar} className={classes.skip}>{skipIsOpen ? 'Більше скипідара!' : 'Отримати скіпідар!'}</button>
                    <div className={classes.tab} style={skipIsOpen ? { background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + props.prg + ')', display: 'block'} :{ background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + props.prg + ')', display: 'none' }}>
                        <div className={classes.text}>Сьогодні ти {props.skip}!</div>
                        <button className={classes.small} onClick={() => setSkipIsOpen(!skipIsOpen)}>Чудово!</button>
                    </div>
                </div>
                <div className={classes.tabGroup}>
                    <button onClick={() => { if (!whenIsOpen) { setWhenIsOpen(true); setSkipIsOpen(false); setKatIsOpen(false) } }} className={classes.whenB}>Бе, повільно...</button>
                    <div className={classes.tab} style={whenIsOpen ? {display:'block'}:{display:'none'}}>
                        <div className={classes.text} >Наскільки повільно?</div>
                        <div className={classes.selects}>
                        <select value={day} onChange={daySelect}>
                            <option value="0" >сьогодні</option>
                            <option value=" 1">завтра</option>
                        </select>
                        <select value={hour} onChange={hourSelect}>
                            <option value="21" >21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                        </div>
                        <button className={classes.small} onClick={setB}>Потихеньку...</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Prog