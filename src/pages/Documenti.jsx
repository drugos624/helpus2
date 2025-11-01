
import { useNavigate, useParams } from "react-router-dom"

function Documenti() {
const navigate = useNavigate()

    return ( 
        <>
        <h1>DOCUMENTI</h1>
            <button onClick={() => (
                navigate('/')
        )}>HOME</button>

        </>
    )
    
}


export default Documenti