import React, { Suspense, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ModalDialog from './components/ModalDialog/ModalDialog'
import { AppDispatch } from './types/types'
import Header from './components/Header/Header'
import Dan from './components/Dan-icq/Dan'
import { useDispatch, useSelector } from 'react-redux'
import { InitialCounter } from './redux/counterReducer'
import { getDialogs } from './redux/selectors'
import { InitialProg } from './redux/progReducer'
import Prog from './components/Prog-B/Prog'
// import Snowfall from 'react-snowfall'
const Counter = React.lazy(() => import('./components/Counter/Counter')),
  App: React.FC = () => {
    const dialogs = useSelector(getDialogs),
    dispatch:AppDispatch = useDispatch()
    useEffect(() => {
      dispatch(InitialProg())
      dispatch(InitialCounter())
    }, [])
    return (
      <div className="App">
        <Header />
        {/* <Snowfall/> */}
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