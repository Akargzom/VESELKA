import React, { useState } from "react"
import api from "../../api/api"
import moment from "moment"
import 'moment-timezone'
import classes from './counter.module.css'
import vector from '../../assets/Vector.png'
type Props = {
    katMass: { mode: string, date: string }[],
    count: number,
    date: string,
    name: string,
    setOpts: (dateObj: { mode: string, date: string }, RDate: string, mode: string) => void
}
let Counter: React.FC<Props> = (props) => {
    moment.tz.add("Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5")
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
            api.SetRNum(props.count + 1).then(() => {
                api.SetRDate(dateObj).then(() => {
                    api.SetRMass(props.katMass.concat([dateObj])).then(() => {
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