import React, { useEffect, useState } from "react"
import classes from './Prog.module.css'
import { AppDispatch } from "../../types/types"
import moment from "moment"
import 'moment-timezone'
import { useDispatch, useSelector } from "react-redux"
import { InitialProg, actions, requestB, setKat, setPrgPng, setSkip, setWhenB } from "../../redux/progReducer"
import { getCounter, getProg } from "../../redux/selectors"
import cantWait from '../../assets/cant_wait_07.jpg'
import def from '../../assets/image_1.jpg'
import ng from '../../assets/image_new_year.jpg'
const Timer: React.FC<{ whenB: string }> = ({ whenB }) => {
    const [hours, setHours] = useState(() => 0),
        [minutes, setMinutes] = useState(() => 0),
        [seconds, setSeconds] = useState(() => 0),
        addZero = (num: number): string | number => {
            if (num <= 9) {
                return '0' + num;
            } else return num;
        },
        getTime = (whenB: string) => {
            const time = moment(whenB).diff(moment().tz("Europe/Kiev"))
            setHours(Math.floor((time / (1000 * 60 * 60))))
            setMinutes(Math.floor(time / 1000 / 60 % 60))
            setSeconds(Math.floor(time / 1000 % 60))
        }
    useEffect(() => {
        getTime(whenB)
    }, [])
    useEffect(() => {
        const interval = setInterval(() => getTime(whenB), 1000)
        return () => clearInterval(interval)
    }, [whenB]);
    return (
        <div className={classes.timer}>
            <h1 className={classes.text}>Прибуття на бе {seconds >= 0 && minutes >= 0 && hours >= 0 ? <span >очікується через: {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}</span> : <span>не очікується</span>}</h1>
        </div>
    )
},
    Prog: React.FC = () => {
        const [katIsOpen, setKatIsOpen] = useState(false),
            [skipIsOpen, setSkipIsOpen] = useState(false),
            [whenIsOpen, setWhenIsOpen] = useState(false),
            [day, setDay] = useState(() => 0),
            [hour, setHour] = useState(() => 21),
            dispatch: AppDispatch = useDispatch(),
            state = useSelector(getProg),
            timezone = useSelector(getCounter).timezone,
            katarsis = () => {
                if (!katIsOpen) {
                    setKatIsOpen(true)
                    setWhenIsOpen(false)
                    setSkipIsOpen(false)
                }
                moment.tz.add(timezone)
                let newKat = state.katarsis[Math.floor(Math.random() * state.katarsis.length)]
                dispatch(setKat(newKat))
            },
            skipidar = () => {
                let newSkip,
                    prgPng
                if (!skipIsOpen) {
                    setKatIsOpen(false)
                    setWhenIsOpen(false)
                    setSkipIsOpen(true)
                }
                newSkip = state.skipidar[Math.floor(Math.random() * state.skipidar.length)]
                prgPng = state.prgPngMass[Math.floor(Math.random() * state.prgPngMass.length)]
                dispatch(setSkip(newSkip))
                dispatch(setPrgPng(prgPng))
            },
            clearSkip = () => {
                let newSkip = ''
                dispatch(setSkip(newSkip))
                setSkipIsOpen(false)
            },
            daySelect = (e: React.ChangeEvent<HTMLSelectElement>) => setDay(parseInt(e.target.value)),
            hourSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setHour(parseInt(e.target.value))
        let whenBActual = moment().tz("Europe/Kiev").add(+day, 'days').format('YYYY-MM-DD') + " " + hour + ":00"
        const setB = () => {
            setWhenIsOpen(!whenIsOpen)
            dispatch(setWhenB(whenBActual))
        }
        useEffect(()=>{
            dispatch(InitialProg())
            setInterval(() => requestB().then((r) => {
                if (r !== state.whenB) {
                  dispatch(actions.setWhenB(r))
                }
              }), 10000)
        },[])
        useEffect(() => {
            if (day === 1) {
                document.body.style.backgroundImage = 'url(' + cantWait + ')'
            }
            return () => {
                if (moment().isBefore('2024-15-01', 'day') && moment().isAfter('2023-20-12', 'day')) {
                    document.body.style.backgroundImage = 'url(' + ng + ')'
                } else {
                    document.body.style.backgroundImage = 'url(' + def + ')'
                }
            }
        }, [day])
        return (
            <div className={classes.prog}>
                <Timer whenB={state.whenB} />
                <h2 className={classes.text}>Сьогодні ти: <div>{state.kat}</div>{state.skip && <div>{state.skip}</div>}</h2>
                {state.skip && <button onClick={clearSkip}>Прибрати скіпідар</button>}
                <div className={classes.tabs}>
                    <div className={classes.tabGroup}>
                        <button onClick={katarsis} className={classes.kat}>{katIsOpen ? 'Більше катарсіса!' : 'Отримати катарсіс!'}</button>
                        <div className={classes.tab} style={katIsOpen ? { display: 'block' } : { display: 'none' }}>
                            <div className={classes.text}>Сьогодні ти {state.kat}!</div>
                            <button className={classes.small} onClick={() => setKatIsOpen(!katIsOpen)}>Чудово!</button>
                        </div>
                    </div>
                    <div className={classes.tabGroup}>
                        <button onClick={skipidar} className={classes.skip}>{skipIsOpen ? 'Більше скипідара!' : 'Отримати скіпідар!'}</button>
                        <div className={classes.tab} style={skipIsOpen ? { background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + state.prgPng + ')', display: 'block' } : { background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + state.prgPng + ')', display: 'none' }}>
                            <div className={classes.text}>Сьогодні ти {state.skip}!</div>
                            <button className={classes.small} onClick={() => setSkipIsOpen(!skipIsOpen)}>Чудово!</button>
                        </div>
                    </div>
                    <div className={classes.tabGroup}>
                        <button onClick={() => { if (!whenIsOpen) { setWhenIsOpen(true); setSkipIsOpen(false); setKatIsOpen(false) } }} className={classes.whenB}>Бе, повільно...</button>
                        <div className={classes.tab} style={whenIsOpen ? { display: 'block' } : { display: 'none' }}>
                            <div className={classes.text} >Наскільки повільно?</div>
                            <div className={classes.selects}>
                                <select value={day} onChange={daySelect}>
                                    <option value="0" >сьогодні</option>
                                    <option value="1" >завтра</option>
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