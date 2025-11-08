import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1>HELPUS 💧</h1>

      <div className="button-container">
        <button onClick={() => navigate("/impianti")}>IMPIANTI</button>
        <button onClick={() => navigate("/chimici")}>CHIMICI</button>
        <button onClick={() => navigate("/documenti")}>DOCUMENTI</button>
        <button>UTILITA'</button>
      </div>
    </div>
  );
}

export default Home;
