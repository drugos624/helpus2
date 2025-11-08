import { useState } from "react";

export default function CalcoloDosaggi() {
  const [concentrazione, setConcentrazione] = useState("");
  const [quantita, setQuantita] = useState("");
  const [ppm, setPpm] = useState("");
  const [risultato, setRisultato] = useState("");

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
          <label className="label-calcolo">concentrazione</label>
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
          <label className="label-calcolo">volume soluzione</label>
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
          <h3>{risultato} lt</h3>
        </div>
      </div>
    </div>
  );
}
