import { useNavigate, useParams } from "react-router-dom";
import specifiche from "../impianti.json";

function DettaglioAddolcitore() {
  const navigate = useNavigate();
  const { impianti, opzione, dimensioni } = useParams();
  const keys = Object.keys(specifiche.impianti[impianti][opzione][dimensioni]);
  const param = Object.entries(
    specifiche.impianti[impianti][opzione][dimensioni]
  );
  const dati = specifiche.impianti[impianti][opzione][dimensioni];

  //prove varie

  const sottogruppi = specifiche.impianti[impianti][opzione][dimensioni];
  const gruppi = Object.keys(sottogruppi);

  return (
    <div className="header">
      <h1>
        Dettagli {opzione.toUpperCase()}: {dimensioni}
      </h1>
      <button
        onClick={() => {
          if (opzione === "mfp_4") {
            navigate(`/ricambi/${opzione}/${dimensioni}`);
          } else navigate(`/ricambi/${opzione}/${dimensioni}`);
        }}
      >
        RICAMBI {opzione}
      </button>
      <div>
        <div>
          {Object.entries(sottogruppi).map(([nomeGruppo, campiGruppo]) => (
            <div key={nomeGruppo} className="card">
              <h3>
                <span>
                  {nomeGruppo === "portate"
                    ? "💦"
                    : nomeGruppo === "capacità"
                    ? "🔋"
                    : nomeGruppo === "dimensioni"
                    ? "​📐"
                    : nomeGruppo === "elettrici"
                    ? "⚡"
                    : nomeGruppo === "generalità"
                    ? "🔧"
                    : "⛑️"}
                </span>
                {nomeGruppo.toUpperCase()}
              </h3>
              <div className="card-item">
                {Object.entries(campiGruppo).map(([chiave, valore]) => (
                  <div key={chiave} className="dettaglio-item">
                    <span className="dettaglio-chiave">
                      {chiave.toUpperCase()}:{" "}
                    </span>
                    <span className="dettaglio-valore">{valore}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => navigate(`/ricambi/${opzione}`)}>
        RICAMBI {opzione}
      </button>
      <button onClick={() => navigate("/")}>HOME</button>
    </div>
  );
}

export default DettaglioAddolcitore;
