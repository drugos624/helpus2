import { useNavigate, useParams } from "react-router-dom";
import ImageZoomable from "../components/ImageZoomable";
import dati from "../impianti.json";
import { useEffect, useState } from "react";
import SchemaCTM from "../assets/spaccatoCTM.svg?react";

function Ricambi({ carrello, setCarrello }) {
  const navigate = useNavigate();
  const { opzioni } = useParams();
  // const [carrello, setCarrello] = useState([]);

  let srcc = "";

  {
    if (opzioni == "ctm") {
      srcc = "../src/assets/dettCTM.png";
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

  const aggiornaCarrello = (numeroRicambio, item, azione) => {
    setCarrello((prev) => {
      // Cerca se il ricambio esiste già nel carrello
      const esistente = prev.find((articolo) => articolo.codice === item.code);

      // Se esiste già nel carrello
      if (esistente) {
        if (azione === "rimuovi") {
          // Se la quantità diventerebbe zero, rimuovilo del tutto
          if (esistente.quantita - 1 <= 0) {
            return prev.filter((articolo) => articolo.codice !== item.code);
          }
          // Altrimenti, diminuisci la quantità
          return prev.map((articolo) =>
            articolo.codice === item.code
              ? { ...articolo, quantita: articolo.quantita - 1 }
              : articolo
          );
        }

        if (azione === "aggiungi") {
          // Aumenta la quantità
          return prev.map((articolo) =>
            articolo.codice === item.code
              ? { ...articolo, quantita: articolo.quantita + 1 }
              : articolo
          );
        }

        // Se nessuna azione specificata → nessuna modifica
        return prev;
      }

      // Se non esiste nel carrello e l'azione è "aggiungi"
      if (azione === "aggiungi") {
        const nuovoItem = {
          id: Date.now(),
          modello: opzioni,
          numero: numeroRicambio,
          nome: item.name || item.nome,
          codice: item.code,
          quantita: 1, // parte da 1 invece di 3, più naturale
        };
        return [...prev, nuovoItem];
      }

      // Se non esiste e l'azione è "rimuovi", non fare nulla
      return prev;
    });
  };
  // immagine interattiva
  const handleSvgClick = (id) => {
    console.log("hai cliccato su:", id);
  };

  useEffect(() => {
    const svg = document.getElementById("schema-svg");
    if (!svg) return;

    // Seleziona tutti gli elementi con un id numerico (ricambi)
    const elementi = svg.querySelectorAll("[id]");

    elementi.forEach((el) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => handleSvgClick(el.id));
    });

    return () => {
      elementi.forEach((el) => {
        el.removeEventListener("click", () => handleSvgClick(el.id));
      });
    };
  }, [opzioni]);

  return (
    <div className="ricambi-container">
      <div className="header-fisso">
        {
          <ImageZoomable
            src={srcc}
            width="350px"
            height="300px"
            alt="Schema tecnico ricambio"
          />
        }

        {/* <SchemaCTM id="schema-svg" className="schema-interattivo" /> */}

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
                    <span className="nome">{item.name + "    "}</span>
                    <span className="codice">{item.code}</span>
                  </div>
                  <div className="container-aggiungi-modifica">
                    <button
                      onClick={() => aggiornaCarrello(ricambio.numero, item)}
                    >
                      -
                    </button>
                    <span className="quantita-badge">
                      {" "}
                      x{itemCarrello?.quantita ?? 0}
                    </span>

                    <button
                      onClick={() =>
                        aggiornaCarrello(ricambio.numero, item, "aggiungi")
                      }
                    >
                      +
                    </button>
                  </div>
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
