import React, { useState } from "react"
import moment from "moment"
import 'moment-timezone'
import classes from './Counter.module.css'
import vector from '../../assets/Vector.png'
import { CounterProps} from "../../types/types"
import API from "../../api/api"
let Counter: React.FC<CounterProps> = (props) => {
    moment.tz.add(props.timezone)
    const dateR = () => {
        let actualDate = ("0" + moment().tz("Europe/Kiev").date()).slice(-2) + "-" + ("0" + (moment().tz("Europe/Kiev").month() + 1)).slice(-2) + "-" + moment().tz("Europe/Kiev").year() + " " + ("0" + moment().tz("Europe/Kiev").hours()).slice(-2) + ":" + ("0" + moment().tz("Europe/Kiev").minutes()).slice(-2)
        return actualDate;
    },
        [isOpen, setOpen] = useState(false),
        addGame = (mode: string) => {
            let RDate = dateR(),
                dateObj = {
                    mode: mode,
                    date: RDate
                },
                name = mode === 'R6' ? 'Веселка' : 'Каеска'
            API.SetRNum(props.count + 1).then(() => {
                API.SetRDate(dateObj).then(() => {
                    API.SetRMass(props.katMass.concat([dateObj])).then(() => {
                        props.setOpts(dateObj, RDate, name)
                    })
                })
            })
        }
    return (
        <div className={classes.wrap}>
            <h1 className={classes.count}>{props.name} в останній раз була {props.count}</h1>
            <div className={classes.date}>И це було: {props.date}</div>
            <div className={classes.buttons}>
                <button className={classes.button + ' ' + classes.rainbow} onClick={() => addGame('R6')}>Додати веселку</button>
                <button className={classes.button} onClick={() => addGame('CSGO')}>Додати каеску</button>
            </div>
            <div className={isOpen ? classes.dates + ' ' + classes.open : classes.dates}><div onClick={() => setOpen(!isOpen)} className={classes.flex}><span>{isOpen ? 'сховати' : 'показати'} катки</span><img src={vector} alt="" /></div>
                <ul>
                    {props.katMass && props.katMass.slice(0).reverse().map((k, index) => <li key={index}><span>{k.mode}</span>  {k.date}</li>)}
                </ul>
            </div>
        </div>
    )
}
export default Counter