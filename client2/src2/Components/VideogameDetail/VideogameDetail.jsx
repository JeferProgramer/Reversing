import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetail } from "../../Store/Actions";
import { NavLink } from "react-router-dom";
import Cargando from "../Loading/loading";
import juego from "../Videogames/videogame.gif";
import  "./videogameDetail.css";
function VideogameDetail({videogameDetail,match}){
    const id =  match.params.id
    const[load, setLoad] = useState(true);
    const dispatch = useDispatch();
    const videogameDetailCompleted = useSelector(state => state.videogameDetail)
    useEffect(() => {
        dispatch(getVideogameDetail(id)).then(() => setLoad(false))
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])
     if(load){
         return <Cargando/>
     }
     console.log(videogameDetailCompleted.platforms)
    return(
        <div className="Cardvideogame">
            <h3 className="title">{videogameDetailCompleted.name}</h3>
            <div className="Detailvideogame">
                {/* me traigo las imagenes */}
                <img src={videogameDetailCompleted.background_image ? videogameDetailCompleted.background_image: juego} alt="juego" className="imagenDetail"/>
                <div className="detailInfo">
                    {/* Me traigo la descripcion */}
                    <div className="descripcion">{videogameDetailCompleted.description_raw ? videogameDetailCompleted.description_raw : videogameDetailCompleted.description}</div>
                    <br />
                    <div>
                        <span className="rating">{videogameDetailCompleted.rating}</span>
                        <span>
                            {/* me traigo los generos */}
                            {videogameDetailCompleted.genres && videogameDetailCompleted.genres.map((genero) => {
                                return(
                                    <span key={genero.id}>{`${genero.name} - `}</span>
                                )
                            })}
                           <span id="emoji">&#x1F3AF;</span>
                            {/* me traigo la fecha de lanzamiento */}
                            <span>Fecha de Lanzamineto: {videogameDetailCompleted.released}</span>
                            <br />
                            <br />
                            <span> {"Plataformas: "} 
                            <span></span>
                            {videogameDetailCompleted.id.length > 10  ?videogameDetailCompleted.platforms.map(juego => {
                                return(<span key={juego}>{juego}{'/ '}</span>)
                            }): videogameDetailCompleted.platforms.map(juego => {
                                return(<span key={juego.platform.id}>{juego.platform.name}{'/ '}</span>)
                            })} &#127918;</span> 
                        </span>
                    </div>
                    <br />
                        <NavLink to={'/home'} className={"btn"}>
                          <span>↵ Volver Home</span>
                        </NavLink>
                </div>
            </div>
        </div>
    )    
}
export default VideogameDetail