import { useNavigate, useParams } from "react-router-dom"
import chimici from "../impianti.json"
function DettaglioChimici() {
    const navigate = useNavigate()
    const { chimico } = useParams()
    const dettChimico = Object.entries(chimici.chimici[chimico])
    
    return (
        <div className="page-container">
        <div className="header">
            <h1>{chimico.toUpperCase()}</h1>
        </div>

        <div className="card">
            <h3>
                <span>🧪</span>
                INFORMAZIONI
            </h3>
            <div className="card-item">
                {dettChimico.map(([chiave, valore]) => {
                    
                    if (chiave === "descrizione") {
                        return (
                            <div key={chiave} className="descrizione-section">
                                <h4 className="descrizione-title">Descrizione:</h4>
                                <p className="descrizione-text">{valore}</p>
                            </div>
                        );
                    }

                   
                    return (
                        <div key={chiave} className="dettaglio-item">
                            <span className="dettaglio-chiave">{chiave}:</span>
                            <span className="dettaglio-valore">
                                {chiave === "link" ? (
                                    <a href={valore} target="_blank" rel="noopener noreferrer">
                                        Vai al link
                                    </a>
                                ) : Array.isArray(valore) ? (
                                    valore.join(", ")
                                ) : (
                                    valore.toString()
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="button-container">
            <button onClick={() => navigate("/")}>HOME</button>
        </div>
    </div>
        
    )

}

export default DettaglioChimici