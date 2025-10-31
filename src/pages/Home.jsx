import { useNavigate } from "react-router-dom"


function Home() {
    const navigate = useNavigate();

    return (
        <div>
            
            <h1>Questa è la pagina principale</h1>

            {<button onClick={()=> navigate('/impianti')}>
            IMPIANTI
            </button> }
        </div>
    )



}

export default Home