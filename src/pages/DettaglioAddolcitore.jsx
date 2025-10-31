import { useNavigate, useParams } from "react-router-dom"
import specifiche from "../impianti.json"

function DettaglioAddolcitore() {

    const navigate = useNavigate()
    const { impianti, opzione, dimensioni } = useParams()
    const keys = Object.keys(specifiche.impianti[impianti]
    [opzione][dimensioni])
    const param =  Object.entries(specifiche.impianti[impianti]
    [opzione][dimensioni])
    const dati = specifiche.impianti[impianti]
    [opzione][dimensioni]

    return (
   
        <div>
            <h1>dettagli {dimensioni}</h1>

            <ul>
                {Object.entries(dati).map(([chiave, valore]) => (
                    <li key={chiave}>
                        <strong>{chiave}:</strong>{" "}
                        {Array.isArray(valore)
                            ? valore.join(", ")
                            : valore.toString()
                        }

                    </li>
                ))}
            </ul>

            <button onClick={()=> {navigate("/")}}>HOME</button>

        </div>

        
        

  )
}
        

      
 

        
        
        
    



export default DettaglioAddolcitore