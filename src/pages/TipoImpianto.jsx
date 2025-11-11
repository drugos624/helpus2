import { useParams, useNavigate } from "react-router-dom";
import tipoImpianto from "../impianti.json";
import { useEffect } from "react";

function TipoImpianto() {
  const { impianti } = useParams();
  const navigate = useNavigate();

  //useEffect per il locaStorage

  useEffect(() => {
    localStorage.setItem("categoriaImpianto", impianti);
  }, [impianti]);

  let opzioni = [];
  console.log(tipoImpianto);
  console.log(impianti);

  if (impianti === "addolcitori") {
    opzioni = Object.keys(tipoImpianto.impianti.addolcitori || {});
  } else if (impianti === "filtri") {
    opzioni = Object.keys(tipoImpianto.impianti.filtri || {});
  } else if (impianti === "osmosi") {
    opzioni = Object.keys(tipoImpianto.impianti.osmosi || {});
  }

  return (
    <div className="header">
      <h1>{impianti.toUpperCase()}</h1>

      <div className="button-container">
        {opzioni.map((opzione) => (
          <button
            key={opzione}
            onClick={() => {
              localStorage.setItem("tipoImpiantoSelezionato", opzione);

              navigate(`/impianti/${impianti}/${opzione}`);
            }}
          >
            {opzione.toUpperCase()}
          </button>
        ))}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </button>
      </div>
    </div>
  );
}

export default TipoImpianto;
