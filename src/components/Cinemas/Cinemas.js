import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar"
// import './Admin.css';
import {getAllTheaters} from '../../api/theater'
const Cinemas = () => {
    const [cinemaList, setCinemaList] = useState([]);

    const init = async () => {

        const result = await getAllTheaters();
        setCinemaList(result.data);
        console.log(result.data)
    
    }

    useEffect(() => {
        init();
        
      }, [])

return (
    <div>
        <h2>Theaters : </h2>
        {
            cinemaList.map((cinemas)=>{
                return ( <div key={cinemas._id}>
                    <h4>{cinemas.name}</h4>
                </div>)
                
            }
                )
        }
        


    </div>
)
}

export default Cinemas;