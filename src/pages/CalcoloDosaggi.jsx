import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CalcoloDosaggi() {
  const [concentrazione, setConcentrazione] = useState("");
  const [quantita, setQuantita] = useState("");
  const [ppm, setPpm] = useState("");
  const [risultato, setRisultato] = useState("");
  const navigate = useNavigate();

  const calcolaDosaggi = () => {
    if (concentrazione && quantita && ppm) {
      const calcolo = (ppm * quantita) / (concentrazione * 10000);
      setRisultato(calcolo.toFixed(2));
    } else setRisultato(2);
  };

  return (
    <div className="header">
      <div>
        <h1>CALCOLO DOSAGGI</h1>

        <div className="form-group">
          <label className="label-calcolo">Centrazione %</label>
          <input
            className="input-calcolo"
            type="number"
            value={concentrazione}
            id="input1"
            placeholder="inserisci il valore"
            onChange={(e) => setConcentrazione(e.target.value)}
          />
        </div>
        <div className="form-group">
          {" "}
          <label className="label-calcolo">Volume soluzione lt</label>
          <input
            className="input-calcolo"
            type="number"
            value={quantita}
            id="input2"
            placeholder="inserisci il valore"
            onChange={(e) => setQuantita(e.target.value)}
          />
        </div>
        <div className="form-group">
          {" "}
          <label className="label-calcolo">ppm desiderati</label>
          <input
            className="input-calcolo"
            type="number"
            value={ppm}
            id="input3"
            placeholder="inserisci il valore"
            onChange={(e) => setPpm(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={() => {
              calcolaDosaggi();
              console.log(risultato);
            }}
          >
            Calcola
          </button>
          <h3>{risultato} Lt</h3>
        </div>

        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
}
