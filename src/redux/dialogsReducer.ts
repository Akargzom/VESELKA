import { AnyAction } from "redux";
let initialState = {
    "yurkoOne":{
        "head":"Ти Юрко?",
        "quest":"Переконайся у тому, що ти точно Юрко, а потім відповидай!",
        "yesBtn":"Так.jpg",
        "noBtn":"Nit",
        "navYes":"/isYurko-2",
        "navNo":"/isProg-1"
        },
        "yurkoTwo":{
        "head":"Точно Юрко?",
        "quest":"Не пиздиш мені?",
        "yesBtn":"ДА БЛЕТ!",
        "noBtn":"Пізжу((",
        "navYes":"/isYurko-3",
        "navNo":"/out"
        },
        "yurkoThree":{
        "quest":"Witamy Pana. Teraz Pan może dodać tęczę!",
        "yesBtn":"Gdze bimba!",
        "navYes":"/counter"
        },
        "progOne":{
        "head":"Тоді може ти Олексій?",
        "yesBtn":"Ващєт",
        "noBtn":"Ващєт",
        "navYes":"/isProg-2",
        "navNo":"/isDan-1"
        },
        "progTwo":{
        "head":"Вітаємо, Олексій!",
        "quest":"Бажаєте отримати свій катарсіс?",
        "yesBtn":"ДАДАДАДА!",
        "navYes":"/prog-b"
        },
        "out":{
        "header":"Ця веселка не для тебе!",
        "head":"Ну так іди нахуй, холоп!",
        "yesBtn":"Щож(("
        },
        "danOne":{
        "head":"Але може ти Данил?",
        "yesBtn":"АХАХАХА!!!",
        "noBtn":"Ні, не він",
        "navYes":"/isDan-2",
        "navNo":"/out"
        },
        "danTwo":{
        "quest":"Тоді познай свій АЙСІК'Ю!",
        "yesBtn":"АХАХАХА!!!",
        "navYes":"/dan-icq"
        }
}
export type InitialStateType = typeof initialState
const dialogsReducer = (state = initialState, action: AnyAction): InitialStateType => {
    return state;
}
export default dialogsReducer