import React, { useState } from "react";
import './Search.css';
import {connect} from 'react-redux';
import {searchVideogames} from '../../Store/Actions/index.js'; 
import lupa from "./lupa.png"

function Search(props){
    const [state, setState] = useState('');
    //voy guardandome el valor en mi componente
    function handleChange(event) {
        setState(event.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();//para prevenir el comportamiento por defecto
        props.searchVideogames(state);
    }
    return(
        <div className="">
            <div className="buscar">
               {/* //capturo el value y me lo guardo en el estado  */}
                <input type="text" autoComplete="off" placeholder="Buscar Videojuego"
                value={state} onChange={(event) => handleChange(event)} />
                <button type="submit" onClick={(event) => handleSubmit(event)} className="btn"><img src={lupa} alt="buscar"/></button>
            </div>
        </div>
    )
}
//recibimos el estado de la aplicacion y lo pasamos a props de react 
const mapStateToProps = function(state){
    return {
        videogames: state.videogames
    }
}
//lo usamos para despachar las acciones al store
const mapDispatchToProps = function(dispatch){
    return {
        searchVideogames: name => {
            dispatch(searchVideogames(name))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search)