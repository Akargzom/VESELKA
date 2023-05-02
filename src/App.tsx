import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ModalDialog from './components/ModalDialog/ModalDialog'
import { AppDispatch } from './types/types'
import Header from './components/header/header'
import Dan from './components/Dan-icq/Dan'
import { useDispatch, useSelector } from 'react-redux'
import { InitialCounter } from './redux/counterReducer'
import { getDialogs, getProg } from './redux/selectors'
import { InitialProg, requestB, requestKat } from './redux/progReducer'
import moment from "moment"
import Snowfall from 'react-snowfall'
import def from './assets/image_1.jpg'
import ng from './assets/image_new_year.jpg'
import Counter from './components/counter/counter'
import addNotification, { Notifications } from 'react-push-notification'
import icon from './assets/favicon-32x32.png'
const Prog = React.lazy(() => import('./components/Prog-B/Prog')),
  App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(),
      dialogs = useSelector(getDialogs)
    let kat = useSelector(getProg).kat,
      whenB = useSelector(getProg).whenB
    useEffect(() => {
      dispatch(InitialProg())
      dispatch(InitialCounter())
      requestKat().then(r => kat = r)
      requestB().then((r) => {
        if (moment(r).diff(moment().tz("Europe/Kiev")) > 0) {
          addNotification({
            title: 'Прибуття на бе заплановано на ' + r,
            message: 'Сьогдні ми ' + kat,
            duration: 120000,
            icon: icon,
            native: true
          })
        } else {
          addNotification({
            title: 'Прибуття на бе не очікується',
            message: 'В останній раз ми були ' + kat,
            duration: 120000,
            icon: icon,
            native: true
          })
        }
      }
      )
      if (moment().isBefore('2024-15-01', 'day') && moment().isAfter('2023-20-12', 'day')) {
        document.body.style.backgroundImage = 'url(' + ng + ')'
      } else {
        document.body.style.backgroundImage = 'url(' + def + ')'
      }
      setInterval(async () => await requestB().then((r) => {
        if (r !== whenB) {
          whenB = r
        }
      }), 10000)
    }, [])
    useEffect(() => {
      if (whenB && kat && moment(whenB).diff(moment().tz("Europe/Kiev")) > 0) {
        addNotification({
          title: 'Прибуття на бе заплановано на ' + whenB,
          message: 'Сьогдні ми ' + kat,
          duration: 120000,
          icon: icon,
          native: true
        })
      }
    }, [whenB])
    return (
      <div className="App">
        <Notifications />
        <Header />
        {moment().isBefore('2024-15-01', 'day') && moment().isAfter('2023-20-12', 'day') ? <Snowfall /> : ''}
        <Suspense>
          <Routes>
            <Route path="/*" element={<Navigate to="/VESELKA" />} />
            <Route path="/VESELKA" element={<ModalDialog dialogs={dialogs.yurkoOne} />} />
            <Route path="/isYurko-2" element={<ModalDialog dialogs={dialogs.yurkoTwo} />} />
            <Route path="/isYurko-3" element={<ModalDialog dialogs={dialogs.yurkoThree} />} />
            <Route path="/isProg-1" element={<ModalDialog dialogs={dialogs.progOne} />} />
            <Route path="/isProg-2" element={<ModalDialog dialogs={dialogs.progTwo} />} />
            <Route path="/out" element={<ModalDialog dialogs={dialogs.out} />} />
            <Route path="/isDan-1" element={<ModalDialog dialogs={dialogs.danOne} />} />
            <Route path="/isDan-2" element={<ModalDialog dialogs={dialogs.danTwo} />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/dan-icq" element={<Dan />} />
            <Route path="/prog-b" element={<Prog />} />
          </Routes>
        </Suspense>

      </div>
    );
  }
export default App;