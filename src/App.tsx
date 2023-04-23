import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ModalDialog from './components/ModalDialog/ModalDialog'
import Header from './components/header/header'
import api from './api/api'
import Dan from './components/dan/dan'
import Prog from './components/prog/prog'
// import Snowfall from 'react-snowfall'
const Counter = React.lazy(() => import('./components/counter/counter'))
type Props = {
  head?: string,
  quest?: string,
  yesBtn: string,
  noBtn?: string,
  navYes?: string,
  navNo?: string,
  header?: string
}
type Dialogs = {
  yurkoOne: Props,
  yurkoTwo: Props,
  yurkoThree: Props,
  progOne: Props,
  progTwo: Props,
  danOne: Props,
  danTwo: Props,
  out: Props
}
const App: React.FC = () => {
  const [dialogs, setDialogs] = useState({} as Dialogs),
    [katMass, setKatMass] = useState(() => [] as { mode: string, date: string }[]),
    [count, setCount] = useState(() => 0),
    [date, setDate] = useState(() => ''),
    [name, setName] = useState(() => ''),
    setOpts = (dateObj: { mode: string, date: string }, RDate: string, name: string): void => {
      setKatMass(prev => prev.concat([dateObj]))
      setName(name)
      setCount(prev => prev + 1)
      setDate(RDate)
    }
  useEffect(() => {
    api.fetchDialogs().then(r => setDialogs(r))
    api.fetchRMass().then(r => { setKatMass(r) })
    api.fetchRDate().then(r => setDate(r))
    api.fetchRNum().then(r => setCount(r))
    api.fetchRMode().then(r => r === 'R6' ? setName('Веселка') : setName('Каеска'))
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
          <Route path="/counter" element={<Counter katMass={katMass} count={count} date={date} name={name} setOpts={setOpts} />} />
          <Route path="/dan-icq" element={<Dan />} />
          <Route path="/prog-b" element={<Prog />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;