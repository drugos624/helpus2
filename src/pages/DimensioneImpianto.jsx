import { useNavigate, useParams } from "react-router-dom"
import dimesioneImpianto from "../impianti.json"

function DimensioneImpianto() {
    const { impianti , opzione} = useParams()
    const navigate = useNavigate()

    const dimImpianto = Object.keys(dimesioneImpianto.impianti[impianti][opzione] || {})
    console.log(dimImpianto)
    return (<div className="header">
        <h1> {opzione.toUpperCase()}</h1>
        <div className="button-container">
        
        {
        dimImpianto.map((dimensioni) => (
            <button
                key={dimensioni}
                onClick={() => {
                    console.log("hai scelto", dimensioni)
                    navigate(`/impianti/${impianti}/${opzione}/${dimensioni}`)
                }}
            >{ dimensioni}</button>
        ))}

        <button
        onClick={()=>{navigate("/")}}
            >HOME</button>
            </div>
        
        </div>

)
}

export default DimensioneImpianto