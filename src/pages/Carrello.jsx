import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Carrello({ carrello, setCarrello }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { opzioni } = useParams();

  const inviaEmail = () => {
    // Crea il corpo dell'email
    const corpo = carrello
      .map(
        (item) =>
          `${item.numero}. ${item.nome}\nCodice: ${item.codice}\nQuantità: ${item.quantita}\n`
      )
      .join("\n---\n");

    const oggetto = `Richiesta Ricambi ${opzioni.toUpperCase()}`;
    const destinatario = "";

    // Apre il client email del dispositivo
    const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(
      oggetto
    )}&body=${encodeURIComponent(corpo)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="header">
      <h1>Carrello</h1>
      {carrello.map((item) => (
        <div className="header" key={item.id}>
          <span className="ricambio-item">
            {item.nome} - Qty: {item.quantita}
          </span>
        </div>
      ))}
      <button onClick={inviaEmail}>Invia mail</button>
      <button onClick={() => navigate(-1)}>Indietro</button>
    </div>
  );
}
