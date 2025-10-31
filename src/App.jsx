import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Impianti from './pages/Impianti'
import TipoImpianto from './pages/TipoImpianto'
import DimensioneImpianto from './pages/DimensioneImpianto'
import DettaglioAddolcitore from './pages/DettaglioAddolcitore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/impianti' element={<Impianti></Impianti>}></Route>
            <Route path='/impianti/:impianti' element={<TipoImpianto></TipoImpianto>}></Route>
          <Route path='/impianti/:impianti/:opzione' element={<DimensioneImpianto></DimensioneImpianto>}></Route>
          <Route path='/impianti/:impianti/:opzione/:dimensioni' element=
          {<DettaglioAddolcitore></DettaglioAddolcitore>}> </Route>
          
        </Routes>
      </div>
     
    
    </>
  )
}

export default App
