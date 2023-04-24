import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ModalDialog from './components/ModalDialog/ModalDialog'
import { DateObj, Dialogs } from './types/types'
import API from './api/api'
import Header from './components/Header/Header'
import Dan from './components/Dan-icq/Dan'
import prgrm1 from './assets/prgrm.png'
import prgrm2 from './assets/prgrm_2.png'
import prgrm3 from './assets/prgrm_3_fake.png'
// import Snowfall from 'react-snowfall'
const Counter = React.lazy(() => import('./components/Counter/Counter'))
const Prog = React.lazy(() => import('./components/Prog-B/Prog')),
  App: React.FC = () => {
    const [dialogs, setDialogs] = useState({} as Dialogs),
      [katMass, setKatMass] = useState(() => [] as DateObj[]),
      [count, setCount] = useState(() => 0),
      [date, setDate] = useState(() => ''),
      [name, setName] = useState(() => ''),
      [whenB, setWhenB] = useState(''),
      [skip, setSkip] = useState(''),
      [kat, setKat] = useState(''),
      [prg, setPrg] = useState(''),
      [timezone, setTimezone] = useState(''),
      [katarsis, setKatarsis] = useState([] as Array<string>),
      [skipidar, setSkipidar] = useState([] as Array<string>),
      setOpts = (dateObj: DateObj, RDate: string, name: string): void => {
        setKatMass(prev => prev.concat([dateObj]))
        setName(name)
        setCount(prev => prev + 1)
        setDate(RDate)
      },
      setKataMass = () => {
        let newKat = katarsis[Math.floor(Math.random() * katarsis.length)]
        API.setKat(newKat)
        setKat(newKat)
      },
      setSkipka = (state: boolean) => {
        if (state) {
          let newSkip = skipidar[Math.floor(Math.random() * skipidar.length)]
          API.setSkip(newSkip)
          const prgrm_arr = [prgrm1, prgrm2, prgrm3]
          let prgrm_png = prgrm_arr[Math.floor(Math.random() * prgrm_arr.length)]
          API.SetPrg(prgrm_png)
          setPrg(prgrm_png)
          setSkip(newSkip)
        } else {
          let newSkip = ''
          API.setSkip(newSkip)
          setSkip(newSkip)
        }
      },
      setWhenBprop = (whenB: string) => {
        API.SetWhenB(whenB)
        console.log(whenB)
      }
    useEffect(() => {
      API.fetchDialogs().then(r => setDialogs(r))
      API.fetchRMass().then(r => { setKatMass(r) })
      API.fetchRDate().then(r => setDate(r))
      API.fetchRNum().then(r => setCount(r))
      API.fetchRMode().then(r => r === 'R6' ? setName('Веселка') : setName('Каеска'))
      API.fetchKat().then(r => setKat(r))
      API.fetchSkip().then(r => setSkip(r))
      API.fetchWhenB().then(r => setWhenB(r))
      API.fetchKatarsis().then(r => setKatarsis(r))
      API.fetchSkipidar().then(r => setSkipidar(r))
      API.fetchTimezone().then(r => setTimezone(r))
      API.fetchPrg().then(r => setPrg(r))
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
            <Route path="/counter" element={<Counter timezone={timezone} katMass={katMass} count={count} date={date} name={name} setOpts={setOpts} />} />
            <Route path="/dan-icq" element={<Dan />} />
            <Route path="/prog-b" element={<Prog setWhenB={setWhenBprop} prg={prg} setSkipka={setSkipka} setKataMass={setKataMass} timezone={timezone} whenB={whenB} kat={kat} skip={skip} />} />
          </Routes>
        </Suspense>
      </div>
    );
  }
export default App;