import { useNavigate } from "react-router-dom";

export default function Utilita() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h1>UTILITA'</h1>
      <div className="button-container">
        <button onClick={() => navigate("/calcoloDosaggi")}>
          Calcolo dosaggi
        </button>

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
