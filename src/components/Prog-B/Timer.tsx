import React, { useEffect, useState } from "react"
import classes from './Prog.module.css'
import moment from "moment"
import 'moment-timezone'
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
}
export default Timer