import { useNavigate, useParams } from "react-router-dom";
import ImageZoomable from "../components/ImageZoomable";
import dati from "../impianti.json";
import { useEffect, useState } from "react";
import SchemaCTM from "../assets/spaccatoCTM.svg?react";

export default function Ricambi({ carrello, setCarrello }) {
  const navigate = useNavigate();
  const { opzioni } = useParams();
  // const [carrello, setCarrello] = useState([]);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  let srcc = "";

  {
    if (opzioni == "ctm") {
      srcc = "/dettCTMhd.png";
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
    <div className="container-ricambi">
      {/* STICKY HEADER COMPATTO */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#f5f5f5",
          borderBottom: "2px solid #ddd",
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          {/* THUMBNAIL CLICCABILE */}
          <div
            onClick={() => setIsImageExpanded(true)}
            style={{
              position: "relative",
              flexShrink: 0,
              cursor: "pointer",
              border: "2px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={srcc}
              alt="Schema ricambio"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                backgroundColor: "rgba(0,0,0,0.6)",
                borderRadius: "4px",
                padding: "4px 6px",
                fontSize: "14px",
              }}
            >
              🔍
            </div>
          </div>

          {/* INFO E PULSANTI */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#2c3e50",
              }}
            >
              Ricambi {opzioni}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{ margin: 0, padding: "6px 12px", fontSize: "14px" }}
                onClick={() => navigate(`/carrello/${opzioni}`)}
              >
                Carrello ({carrello.length})
              </button>

              {carrello.length > 0 && (
                <button
                  style={{ margin: 0, padding: "6px 12px", fontSize: "14px" }}
                  onClick={inviaEmail}
                >
                  📧 Email
                </button>
              )}

              <button
                style={{
                  margin: 0,
                  padding: "6px 12px",
                  fontSize: "12px",
                  backgroundColor: "#f44336",
                }}
                onClick={() => setCarrello([])}
              >
                Reset
              </button>

              <button
                style={{ margin: 0, padding: "6px 12px", fontSize: "14px" }}
                onClick={() => navigate("/")}
              >
                HOME
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL IMMAGINE FULLSCREEN */}
      {isImageExpanded && (
        <div
          onClick={() => setIsImageExpanded(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.95)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <button
            onClick={() => setIsImageExpanded(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 201,
              fontSize: "24px",
              color: "white",
            }}
          >
            ✕
          </button>

          <ImageZoomable
            src={srcc}
            width="90vw"
            height="90vw"
            alt="Schema tecnico ricambio"
          />
        </div>
      )}

      {/* LISTA RICAMBI (con le tue classi CSS originali) */}
      <div className="lista-ricambi-container">
        {ricambiArray.map((ricambio) => (
          <div key={ricambio.numero} className="ricambio-gruppo">
            <h4 className="numero-ricambio">{ricambio.numero}</h4>

            {ricambio.items.map((item, index) => {
              const itemCarrello = carrello.find(
                (articolo) => articolo.codice === item.code
              );

              return (
                <div key={index} className="ricambio-item">
                  <div className="ricambio-info">
                    <span className="nome">{item.name}</span>
                    <span className="codice">{item.code}</span>
                  </div>
                  <div className="container-aggiungi-modifica">
                    <button
                      onClick={() =>
                        aggiornaCarrello(ricambio.numero, item, "rimuovi")
                      }
                    >
                      -
                    </button>
                    <span className="quantita-badge">
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
