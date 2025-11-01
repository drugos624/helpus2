import { useNavigate, useParams } from "react-router-dom"
import chimici from "../impianti.json"
function DettaglioChimici() {
    const navigate = useNavigate()
    const { chimico } = useParams()
    const dettChimico = Object.entries(chimici.chimici[chimico])
    
    return (
        <>
            <h1>{chimico.toUpperCase()}</h1>
            <ul>
                {dettChimico.map(([chiave, valore]) => {
                    return (

                        <li key={chiave}>
                            <strong>{chiave}:</strong>{" "}
                            {chiave === "link" ? (
                                <a href={valore} target="_blank" rel="noopener noreferrer">
                                    {valore}
                                </a>
                            ) :
                                Array.isArray(valore)
                                    ? valore.join(", ")
                                    : valore.toString()}


                        </li>
                    )
                })}
            </ul>

            <button onClick={() => (
                navigate("/")
            )}>HOME</button>

            
        </>
    )

}

export default DettaglioChimici