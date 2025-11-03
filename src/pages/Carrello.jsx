import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Carrello() {
  const location = useLocation();
  const navigate = useNavigate();
  const carrello = location.state?.carrello || [];

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
    </div>
  );
}
