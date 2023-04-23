import React, { useState } from "react"
import classes from "./ModalDialog.module.css"
import { Link } from 'react-router-dom'
import { ModalProps } from "../../Types/Types"
let ModalDialog: React.FC<ModalProps> = ({ dialogs }) => {
    const [moadlStyle, setModalStyle] = useState({ display: 'block' })
    if (dialogs) {
        const styleHead = dialogs.head ? undefined : { display: 'none' },
            styleNo = dialogs.noBtn ? undefined : { display: 'none' },
            click = () => {
                setModalStyle({ display: 'none' })
            }
        return (
            <div className={classes.modalWindow}>
                <h1 className={classes.header}>{dialogs.header}</h1>
                <div key={dialogs.head} style={moadlStyle} className={classes.modal}>
                    <div style={styleHead} className={classes.head}>{dialogs.head}</div>
                    <div className={classes.content}>{dialogs.quest}</div>
                    <div className={classes.buttons}>
                        {dialogs.navYes ? <Link className={classes.yesBtn} to={dialogs.navYes}>{dialogs.yesBtn}</Link> : <button className={classes.yesBtn} onClick={click}>{dialogs.yesBtn}</button>}
                        {dialogs.navNo && <Link className={classes.noBtn} style={styleNo} to={dialogs.navNo}>{dialogs.noBtn}</Link>}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}
export default ModalDialog