import { useParams, useNavigate } from "react-router-dom";
import tipoImpianto from "../impianti.json"

function TipoImpianto() {
    const { impianti } = useParams()
    const navigate = useNavigate()
    
    let opzioni = []
    console.log(tipoImpianto)
    console.log(impianti)

    if (impianti === 'addolcitori') {
        opzioni = Object.keys(tipoImpianto.impianti.addolcitori || {})
    } else if (impianti === "filtri") {
        opzioni = Object.keys(tipoImpianto.impianti.filtri || {})
    }


    return (
        <div>
            <h1>{impianti.toUpperCase()}</h1>
            {opzioni.map((opzione) => (
                <button
                    key={opzione}
                    onClick={() => {
                        console.log("hai scelto: ", opzione)
                        
                        navigate(`/impianti/${impianti}/${opzione}`)
                    }}
                >
                  {opzione}  
                </button>
               
            ))}
            <button onClick={() => {
                navigate("/")
            }}>Home</button>
        </div>
    )


}

export default TipoImpianto