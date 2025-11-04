import { useNavigate, useParams } from "react-router-dom";
import ImageZoomable from "../components/ImageZoomable";
import dati from "../impianti.json";
import { useState } from "react";

function Ricambi({ carrello, setCarrello }) {
  const navigate = useNavigate();
  const { opzioni } = useParams();
  // const [carrello, setCarrello] = useState([]);

  let srcc = "";

  {
    if (opzioni == "ctm") {
      srcc = "/dettCTM.png";
    } else {
      srcc = "/dettHE.png";
    }
  }
  const inviaEmail = () => {
    // Crea il corpo dell'email
    const corpo = carrello
      .map(
        (item) =>
          `${item.numero}. ${item.nome}\nCodice: ${item.codice}\nQuantità: ${item.quantita}\n`
      )
      .join("\n---\n");

    const oggetto = `Richiesta Ricambi ${opzioni.toUpperCase()}`;
    const destinatario = "tuaemail@esempio.com";

    // Apre il client email del dispositivo
    const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(
      oggetto
    )}&body=${encodeURIComponent(corpo)}`;

    window.location.href = mailtoLink;
  };

  const ricambiModello = dati.ricambi[opzioni];

  const ricambiArray = Object.entries(ricambiModello).map(
    ([numero, contenuto]) => {
      return {
        numero: numero,
        items: Array.isArray(contenuto) ? contenuto : [contenuto],
      };
    }
  );

  const aggiungiCarrello = (numeroRicambio, item) => {
    setCarrello((prev) => {
      // Cerca se il ricambio esiste già nel carrello
      const esistente = prev.find((articolo) => articolo.codice === item.code);

      if (esistente) {
        // Se esiste, aumenta solo la quantità
        return prev.map((articolo) =>
          articolo.codice === item.code
            ? { ...articolo, quantita: articolo.quantita + 1 }
            : articolo
        );
      } else {
        // Se non esiste, aggiungilo
        const nuovoItem = {
          id: Date.now(),
          modello: opzioni,
          numero: numeroRicambio,
          nome: item.name || item.nome,
          codice: item.code,
          quantita: 1,
        };
        return [...prev, nuovoItem];
      }
    });
  };

  return (
    <div className="ricambi-container">
      <div className="header-fisso">
        <ImageZoomable
          src={srcc}
          width="350px"
          height="300px"
          alt="Schema tecnico ricambio"
        />

        <h1>Ricambi {opzioni}</h1>
        <div className="carrello-summary">
          <button onClick={() => navigate(`/carrello/${opzioni}`)}>
            Carrello ({carrello.length})
          </button>
          {carrello.length > 0 && (
            <button className="btn-invia-email" onClick={inviaEmail}>
              📧 Invia via Email
            </button>
          )}
        </div>

        <button onClick={() => navigate("/")}>HOME</button>
        <button
          onClick={() => {
            setCarrello([]);
          }}
        >
          reset
        </button>
      </div>
      <div className="lista-ricambi-container">
        {ricambiArray.map((ricambio) => (
          <div key={ricambio.numero} className="ricambio-gruppo">
            {/* Numero del ricambio */}
            <h4 className="numero-ricambio">{ricambio.numero}</h4>

            {ricambio.items.map((item, index) => {
              // Cerca nel carrello
              const itemCarrello = carrello.find(
                (articolo) => articolo.codice === item.code
              );

              // Devi aggiungere "return"!
              return (
                <div key={index} className="ricambio-item">
                  <div className="ricambio-info">
                    <span className="nome">
                      {item.name + "    "}
                      {itemCarrello && (
                        <span className="quantita-badge">
                          x{itemCarrello.quantita}
                        </span>
                      )}
                    </span>
                    <span className="codice">{item.code}</span>
                  </div>
                  <button
                    className="btn-aggiungi"
                    onClick={() => aggiungiCarrello(ricambio.numero, item)}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ricambi;
