import React, { useEffect, useState } from "react"
import classes from './Dan.module.css'
let Dan:React.FC = () => {
    let [RCount, setRCount] = useState(0),
        [WPCount, setWPCount] = useState(0),
        [fuz, setFuz] = useState(1),
        [icq, setIcq] = useState(''),
        x,
        onRCChanched = (e: React.ChangeEvent<HTMLInputElement>) => {
            setRCount(parseInt(e.currentTarget.value))
        },
        onWPChanched = (e: React.ChangeEvent<HTMLInputElement>) => {
            setWPCount(parseInt(e.currentTarget.value))
        },
        onFuzChanged = (e: any) => {
            setFuz(parseInt(e.currentTarget.value))
        }
    useEffect(() => {
        if(fuz === 1 || fuz === 10)
        x = 10
        else
        x = 2.5
        setIcq('' + WPCount * RCount * fuz * x)
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
                    <option value='4'>Який?</option>
                    <option value='6'>Норм</option>
                    <option value='3'>Не дуж</option>
                    <option value='5'>Пульс</option>
                    <option value='10'>Свиня з фсб</option>
                </select>
            </div>
            <div className={classes.flex}>
                <div className={classes.text}>Твій айсік'ю сьогодні</div> <div className={classes.text + ' ' + classes.number}>{icq}</div>
            </div>
        </div>
    )
}
export default Dan