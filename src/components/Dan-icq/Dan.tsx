import React, { useEffect, useState } from "react"
import classes from './Dan.module.css'
let Dan:React.FC = () => {
    const [RCount, setRCount] = useState(0),
        [WPCount, setWPCount] = useState(0),
        [fuz, setFuz] = useState(1),
        [icq, setIcq] = useState(''),
        onRCChanched = (e: any) => {
            setRCount(e.currentTarget.value)
        },
        onWPChanched = (e: any) => {
            setWPCount(e.currentTarget.value)
        },
        onFuzChanged = (e: any) => {
            setFuz(e.currentTarget.value)
        }
    useEffect(() => {
        setIcq('' + WPCount * RCount * fuz * 10)
    }, [WPCount, RCount, fuz])
    useEffect(() => {
        setIcq('')
    }, [])
    return (
        <div className={classes.icq}>
            <div className={classes.text}>Скільки веселки?</div>
            <div className={classes.flex}>
                <input onChange={onRCChanched} type="range" step={1} min={0} max={15} value={RCount} />
                <div className={classes.text + ' ' + classes.number}>{RCount}</div>
            </div>
            <div className={classes.text}>Скільки Вордпреса?</div>
            <div className={classes.flex}>
                <input onChange={onWPChanched} type="range" step={1} min={0} max={15} value={WPCount} />
                <div className={classes.text + ' ' + classes.number}>{WPCount}</div>
            </div>
            <div className={classes.flex}><div className={classes.text}>Який сьогодні Фуз?</div>
                <select onChange={onFuzChanged} value={fuz}>
                    <option value="1">Який?</option>
                    <option value="1.5">Норм</option>
                    <option value="0.75">Не дуж</option>
                    <option value="1.25">Пульс</option>
                    <option value="10">Свиня з фсб</option>
                </select>
            </div>
            <div className={classes.flex}>
                <div className={classes.text}>Твій айсік'ю сьогодні</div> <div className={classes.text + ' ' + classes.number}>{icq}</div>
            </div>
        </div>
    )
}
export default Dan