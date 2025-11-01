import { useNavigate } from "react-router-dom"
import tipoImpianto from "../impianti.json"

function Impianti() {

    const navigate = useNavigate();
    const tipiImpianto = Object.keys(tipoImpianto.impianti)
    return (
        <div>
            <h1>IMPIANTI</h1>

            {tipiImpianto.map((impianti) => (
                <button key={impianti}
                    onClick={() => ( 
                        navigate(`/impianti/${impianti}`)
                    )}
                >{ (impianti).toUpperCase()}</button>
                
            ))}
            <button
                onClick={() => { setTimeout(() => {
                    navigate("/") },150)
                }}
            >
                HOME

            </button>
            
        </div>
)

}

export default Impianti