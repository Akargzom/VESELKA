import React, { useState } from "react";
import classes from './Header.module.css'
import { Link, useLocation } from "react-router-dom";
const Out:React.FC = () => {
    let outStyle = { opacity: 0, visibility: 'hidden' },
    location = useLocation()
    if (location.pathname !== '/VESELKA')
        outStyle = { opacity: 1, visibility: 'visible' }
    return (
        //@ts-ignore
        <Link style={outStyle} to='/VESELKA' className={classes.out}>
            <svg height="800px" width="800px" version="1.1" id="_x32_" viewBox="0 0 512 512"><g><path d="M180.154,101.188c27.934,0,50.598-22.656,50.598-50.598c0-27.942-22.665-50.59-50.598-50.59c-27.942,0-50.59,22.648-50.59,50.59C129.564,78.532,152.211,101.188,180.154,101.188z" /><path d="M466.439,366.826l-102.347-4.504l-3.219-72.381c-0.126-1.445-0.361-2.857-0.664-4.26c-1.807-18.336-6.992-37.707-14.698-49.497c-8.177-12.504-33.321-54.926-41.102-68.07l38.018-7.168l67.456,61.775c7.698,7.69,20.168,7.69,27.85,0c7.681-7.689,7.697-20.16,0-27.849l-61.649-68.17c-6.008-7.286-12.009-12.857-23.353-14.522c0,0-121.492-5.698-143.778-0.563c-13.916,3.21-37.707,12-49.018,31.842l-35.665,54.245l-84.675,3.89c-10.874,0-19.698,8.816-19.698,19.69c0,10.875,8.824,19.69,19.698,19.69l97.381,4.463c0.109,0,0.219-0.009,0.336-0.017c7.597,0.109,15.143-3.362,19.934-9.992l31.092-39.295c0.017,0.016,0.051,0.05,0.051,0.05c0.168-0.268,0.353-0.52,0.529-0.773l1.428-1.815c2.614-2.849,4.16-2.26,7.757,3.731c6.849,11.429,23.992,46.278,28.563,57.136c1.975,4.68,3.01,8.857,1.135,14.404c-0.152,0.243-0.319,0.446-0.454,0.689l-47.564,87.221l-63.397,116.289c-7.32,12.127-3.428,27.909,8.714,35.245c12.126,7.32,27.909,3.412,35.236-8.714l73.364-110.272l47.43-71.279c2.269-2.95,5.093-6.833,5.958-8.95l1.647-2.479c0.127-0.193,0.211-0.395,0.328-0.588c0.924-0.42,1.832,0.538,2.168,3.866c0,0.017,0.016,0.017,0.025,0.034l11.294,84.826c0.294,3.37,1.118,6.547,2.378,9.496c4.656,11.564,15.966,19.732,29.194,19.732l132.314-5.823c14.168,0,25.664-11.497,25.664-25.666C492.104,378.314,480.608,366.826,466.439,366.826z" /></g></svg>
        </Link>
    )
}
const Eye:React.FC = () => {
    const [style, setStyle] = useState({ display: 'none' })
    let click = () => {
        setStyle({ display: 'none' })
    }
    let eyeClick = () => {
        setStyle({ display: 'block' })
    }
    return (
        <div className={classes.eye}>
            <button onClick={eyeClick} className={classes.eyeBtn}></button>
            <div style={style} className={classes.modal}>
                <div className={classes.content}>{`Навіщо ти мені в глаз тичиш? Дурак... ;((`}</div>
                <div className={classes.buttons}>
                    <button className={classes.yesBtn} onClick={click}>{`Бля, внатурі((`}</button>
                </div>
            </div>
        </div>
    )
}
const Header:React.FC = () => {
    return (
        <div className={classes.header}>
            <Out />
            <Eye />
        </div>
    )
}
export default Header