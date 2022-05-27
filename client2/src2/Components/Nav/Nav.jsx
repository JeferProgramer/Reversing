import React from "react";
import {Link} from "react-router-dom";
import './nav.css';

// export default function Nav(){
//     return (
//         <div className="nav">
//             <Link to="/">Empieza</Link>
//             <Link to="/home">Home</Link>
//             <Link to="/addvideogame">Añadir Videojuego</Link>
//         </div>
//     )
// }
export default class Nav extends React.Component{
    render(){
        return(
            <div className="nav">
                 <Link to="/">Empieza</Link>
                 <Link to="/home">Home</Link>
                 <Link to="/addvideogame">Añadir Videojuego</Link>
             </div>
        )
    }
}