import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import "./videogames.css";
import {Link} from "react-router-dom";
import { getVideogames, deleteGame } from "../../Store/Actions";
import juego from "./videogame.gif"
import Pagination from "../Pagination/Pagination.jsx";
import Cargando from "../Loading/loading.jsx"


export default function Videogame({videogames}){
    //hook para acceder a un estado del store 
    const videogamesComplete = useSelector(state =>  (state.videogames))
    //hook para dispachar una accion
    const dispatch = useDispatch()
    const [carga, setCarga] = useState(true);//para verificar el load
    const [currentPage, setCurrentPage] = useState(1);//lo seteo en 1 porque siempre arranco por la primer pagina
    const [gamePerPage] = useState(15);//cantidad de juegos que debe haber por pagina

    useEffect(() => {
        //cuando hayan cargado todos mis videjuegos setao carga a false 
        dispatch(getVideogames()).then(() => setCarga(false));
    }, [dispatch])
    if(carga){
        return <Cargando/>
    }
    console.log(videogamesComplete) 
    const indexOfLastGame = currentPage * gamePerPage;//2*15 = 30
    const indexOfFirstGame = indexOfLastGame - gamePerPage;//30-15 = 15
    const currentGames = videogamesComplete.slice(indexOfFirstGame, indexOfLastGame)//decirle la cantidad de juegos por pagina
    //cambio mis estados dependiendo de la pagina en la que me encuentre
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const handleSubmit = (id) => {
        dispatch(deleteGame(id))
    }

    return (
        <div className='Pagination-videogames'>
            <div className='CardVideogames'>
                {currentGames?.map(videogame => {
                    return (
                        <div className='CardVideogameEntry' key={videogame.id}>
                            <Link to={`/home/${videogame.id}`} className='link'>
                                {/* me traigo las imagenes */}
                                {videogame.id.length > 10 ? (<img src={juego} className='CardImage' alt=""/>) : <img src={videogame.background_image} className='CardImage' alt="" />}
                                <span id="emoji" className='puntaje'>&#11088;+{videogame.rating}</span>
                                <h4 className='titleCard'>{videogame.name}</h4>
                            </Link>
                            <span className='genres'>
                                {/* me traigo los generos */}
                                {videogame.genres?.map(genre => {
                                return (
                                    <span className='genre_videojuego' key={genre.id}>{genre.name + ' - '}</span>)
                            })}
                                <span id="emoji">&#x1F3AF;</span>
                                <br />
                            </span>
                            <button onClick={(id) => handleSubmit(videogame.id)}>X</button>
                        </div>
                    )
                })}
                </div>
                <div className='PaginationBlock'>
                    <Pagination gamePerPage={gamePerPage} totalGames={videogamesComplete.length} paginate={pagination} estado={currentPage}/>
                </div>
        </div>
    )
}



