export type DialogsItem = {
    head?: string,
    quest?: string,
    yesBtn: string,
    noBtn?: string,
    navYes?: string,
    navNo?: string,
    header?: string
}
export type Dialogs = {
    yurkoOne: DialogsItem,
    yurkoTwo: DialogsItem,
    yurkoThree: DialogsItem,
    progOne: DialogsItem,
    progTwo: DialogsItem,
    danOne: DialogsItem,
    danTwo: DialogsItem,
    out: DialogsItem
}
export type ModalProps = {
    dialogs: {
        head?: string,
        quest?: string,
        yesBtn: string,
        noBtn?: string,
        navYes?: string,
        navNo?: string,
        header?: string
    }
}
export type DateObj = {
    mode: string, 
    date: string 
}
export type CounterProps = {
    katMass: DateObj[],
    count: number,
    date: string,
    name: string,
    setOpts: (dateObj: DateObj, RDate: string, mode: string) => void
}