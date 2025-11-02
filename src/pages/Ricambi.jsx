import { useNavigate, useParams } from "react-router-dom"
import ImageZoomable from "../components/ImageZoomable";
import dati from '../impianti.json';


function Ricambi() {
    const navigate = useNavigate();
    const { opzioni } = useParams();

    const ricambiModello = dati.ricambi[opzioni]
    
    const ricambiArray = Object.entries(ricambiModello).map(([numero, contenuto]) => {
    return {
        numero: numero,
        items: Array.isArray(contenuto) ? contenuto : [contenuto]
      
    };
    });     


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

            <button onClick={() => navigate("/")}>HOME</button><div className="lista-ricambi-container">
    {ricambiArray.map(ricambio => (
        <div key={ricambio.numero} className="ricambio-gruppo">
            {/* Numero del ricambio */}
            <h4 className="numero-ricambio">{ricambio.numero}</h4>
            
            {/* Tutti gli items di quel numero */}
            <div className="ricambio-items">
                {ricambio.items.map((item, index) => (
                    <div key={index} className="ricambio-item">
                        <span className="nome">
                            {item.name || item.nome}
                        </span>
                        <span className="codice">
                            {item.code}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ))}
</div>
            


        </div>
        
        
       
    )
}

export default Ricambi