import { useNavigate, useParams } from "react-router-dom"
import ImageZoomable from "../components/ImageZoomable";
import dati from '../impianti.json';


function Ricambi() {
    const navigate = useNavigate();
    const { opzioni } = useParams();

    let srcc = "";

    {
        if (opzioni == "ctm") {
            srcc = "/dettCTM.png"
        } else {
            srcc = "/dettHE.png"

        }
    }

    const ricambiModello = dati.ricambi[opzioni]
    
    const ricambiArray = Object.entries(ricambiModello).map(([numero, contenuto]) => {
    return {
        numero: numero,
        items: Array.isArray(contenuto) ? contenuto : [contenuto]
      
    };
    });     


    return (
        <div className="ricambi-container">
         <div className="header-fisso">
            <ImageZoomable
                src={srcc}
                width="350px"
                height="300px"
                alt="Schema tecnico ricambio"
            />



            <h1>Ricambi { opzioni}</h1>

            <button onClick={() => navigate("/")}>HOME</button>

</div>
            <div className="lista-ricambi-container">
             {ricambiArray.map(ricambio => (
             <div key={ricambio.numero} className="ricambio-gruppo">
            {/* Numero del ricambio */}
            <h4 className="numero-ricambio">{ricambio.numero}</h4>
            
            
         
                {ricambio.items.map((item, index) => (
                    <div key={index} className="ricambio-item">
                        <div className="ricambio-info">
                        <span className="nome">
                            {item.name || item.nome}
                        </span>
                        <span className="codice">
                            {item.code}
                            </span>
                            </div>
                        <button className="btn-aggiungi"> + </button>
                    </div>
                ))}
            </div>
        
    ))}
</div>
            


        </div>
        
        
       
    )
}

export default Ricambi