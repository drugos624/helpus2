import { useNavigate, useParams } from "react-router-dom";

function Documenti() {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <h1>DOCUMENTI</h1>
        <button onClick={() => navigate("/")}>HOME</button>
      </div>
    </>
  );
}

export default Documenti;
