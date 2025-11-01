import { useNavigate } from "react-router-dom"
import chimici from "../impianti.json"
function Chimici() {

    const navigate = useNavigate()
    const listaChimici = Object.keys(chimici.chimici).sort()

    return (
        <div className="header">
            <h1>CHIMICI</h1>
            <div className="button-container">
            {
                listaChimici.map((chimico) => (
                    <button
                        key={chimico}
                        onClick={() => (
                            navigate(`/chimici/${chimico}`)
                        )}
                    >
                        {chimico.toUpperCase()}

                    </button>
                ))
            }





            <button onClick={() => (
                navigate("/")
            )                
                }>HOME</button>
                </div>
        </div>
    )

    
}

export default Chimici