import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

//  function LandingPage(){
//     return (
//         <div className='box'>
//             <h1 className='welcome'>Bienvenido a Videojuegos</h1>
//             <Link exact to="/home" className='button'>Empieza Ahora</Link>
//         </div>
//     )
// } 
class LandingPage extends React.Component{
    render(){
        return(
        <div className='box'>
           <h1 className='welcome'>Bienvenido a Videojuegos</h1>
           <Link exact to="/home" className='button'>Empieza Ahora</Link>
         </div>
        )
    }
}
export default LandingPage