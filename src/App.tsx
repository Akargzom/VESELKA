import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ModalDialog from './components/ModalDialog/ModalDialog'
import { AppDispatch } from './types/types'
import Header from './components/Header/Header'
import Dan from './components/Dan-icq/Dan'
import { useDispatch, useSelector } from 'react-redux'
import { InitialCounter } from './redux/counterReducer'
import { getCounter, getDialogs } from './redux/selectors'
import { InitialProg } from './redux/progReducer'
import moment from "moment"
import 'moment-timezone'
import Snowfall from 'react-snowfall'
import def from './assets/image_1.jpg'
import ng from './assets/image_new_year.jpg'
const Counter = React.lazy(() => import('./components/Counter/Counter')),
Prog = React.lazy(() => import('./components/Prog-B/Prog')),
  App: React.FC = () => {
    const dialogs = useSelector(getDialogs),
    dispatch:AppDispatch = useDispatch(),
    timezone = useSelector(getCounter).timezone
    moment.tz.add(timezone)
    useEffect(() => {
      dispatch(InitialProg())
      dispatch(InitialCounter())
      if (moment().isBefore('2024-15-01', 'day') && moment().isAfter('2023-20-12', 'day')) {
        document.body.style.backgroundImage = 'url(' + ng + ')'
    } else {
        document.body.style.backgroundImage = 'url(' + def + ')'
    }
    }, [])
    return (
      <div className="App">
        <Header />
        {moment().isBefore('2024-15-01', 'day') && moment().isAfter('2023-20-12', 'day') ? <Snowfall/> : ''}
        <Suspense>
          <Routes>
            <Route path="/*" element={<Navigate to="/isYurko-1" />} />
            <Route path="/isYurko-1" element={<ModalDialog dialogs={dialogs.yurkoOne} />} />
            <Route path="/isYurko-2" element={<ModalDialog dialogs={dialogs.yurkoTwo} />} />
            <Route path="/isYurko-3" element={<ModalDialog dialogs={dialogs.yurkoThree} />} />
            <Route path="/isProg-1" element={<ModalDialog dialogs={dialogs.progOne} />} />
            <Route path="/isProg-2" element={<ModalDialog dialogs={dialogs.progTwo} />} />
            <Route path="/out" element={<ModalDialog dialogs={dialogs.out} />} />
            <Route path="/isDan-1" element={<ModalDialog dialogs={dialogs.danOne} />} />
            <Route path="/isDan-2" element={<ModalDialog dialogs={dialogs.danTwo} />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/dan-icq" element={<Dan />} />
            <Route path="/prog-b" element={<Prog/>} />
          </Routes>
        </Suspense>
      </div>
    );
  }
export default App;