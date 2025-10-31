import { useNavigate } from "react-router-dom"
import tipoImpianto from "../impianti.json"

function Impianti() {

    const navigate = useNavigate();
    const tipiImpianto = Object.keys(tipoImpianto.impianti)
    return (
        <div>
            <h1>Pagina impianti</h1>

            {tipiImpianto.map((impianti) => (
                <button key={impianti}
                    onClick={() => (
                        navigate(`/impianti/${impianti}`)
                    )}
                >{ impianti}</button>
                
            ))}
            <button
                onClick={() => {
                    navigate("/")
                }}
            >
                Home

            </button>
            
        </div>
)

}

export default Impianti