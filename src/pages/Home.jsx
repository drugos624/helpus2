import { useNavigate } from "react-router-dom"


function Home() {
    const navigate = useNavigate();

    return (
        <div>
            
            <h1>HELPUS</h1>

            
            <button onClick={()=> navigate('/impianti')}>
            IMPIANTI
            </button> 
            <button>CHIMICI</button>
            <button onClick={() => (
                navigate("/documenti")
            )}>DOCUMENTI</button>
            <button >UTILITA'</button>
            
        </div>
    )



}

export default Home