import { useNavigate, useParams } from "react-router-dom"
import ImageZoomable from "../components/ImageZoomable";



function Ricambi() {
    const navigate = useNavigate();
    const { opzioni } = useParams();



    return (
        <div>
            <ImageZoomable
             src="https://www.iciam.it/wp-content/uploads/2023/07/HR4013C_page-0001.jpg"
             width="400px"
             height="300px"
             alt="Schema tecnico ricambio"
             >
                
</ImageZoomable>



            <h1>Ricambi { opzioni}</h1>

             <button onClick={()=>navigate("/")}>HOME</button>
        </div>
        
       
    )
}

export default Ricambi