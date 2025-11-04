import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Impianti from "./pages/Impianti";
import TipoImpianto from "./pages/TipoImpianto";
import DimensioneImpianto from "./pages/DimensioneImpianto";
import DettaglioAddolcitore from "./pages/DettaglioAddolcitore";
import Documenti from "./pages/Documenti";
import Chimici from "./pages/Chimici";
import DettaglioChimici from "./pages/DettaglioChimici";
import Ricambi from "./pages/Ricambi";
import Carrello from "./pages/Carrello";

function App() {
  const [carrello, setCarrello] = useState([]);

  return (
    <>
      <div className="header">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/impianti" element={<Impianti></Impianti>}></Route>
          <Route
            path="/impianti/:impianti"
            element={<TipoImpianto></TipoImpianto>}
          ></Route>
          <Route
            path="/impianti/:impianti/:opzione"
            element={<DimensioneImpianto></DimensioneImpianto>}
          ></Route>
          <Route
            path="/impianti/:impianti/:opzione/:dimensioni"
            element={<DettaglioAddolcitore></DettaglioAddolcitore>}
          >
            {" "}
          </Route>
          <Route path="/documenti" element={<Documenti></Documenti>}></Route>
          <Route path="/chimici" element={<Chimici></Chimici>}></Route>
          <Route
            path="/chimici/:chimico"
            element={<DettaglioChimici></DettaglioChimici>}
          ></Route>
          <Route
            path="/ricambi/:opzioni"
            element={
              <Ricambi carrello={carrello} setCarrello={setCarrello}></Ricambi>
            }
          ></Route>
          <Route
            path="/carrello/:opzioni"
            element={
              <Carrello
                carrello={carrello}
                setCarrello={setCarrello}
              ></Carrello>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
