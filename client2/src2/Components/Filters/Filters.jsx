import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAPIvideogames, getByGenre, getGenres, getMyVideogamesDB,getVideogamesOrder} from "../../Store/Actions";
import './Filters.css';

// function Filters(props){
//     useEffect(() => {
//         props.getGenres();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[])//cuando se monta y desmonta mi componente
//     function handleSubmitOrder(event){              
//         props.getVideogamesOrder(event.target.value,props.videogames);
//     }
//     function handleSubmitGenre(event){
//         //el juego con ese genero
//         props.getByGenre(event.target.value)
//     }
//     function handleSubmitMyVideogames(event){
//         if(event.target.value === "Mis Videojuegos"){
//            //me traigo los de la DB
//             props.getMyVideogamesDB();        
//         }
//         if(event.target.value === "Videojuegos existentes"){
//             //me traigo los de la api
//             props.getAPIvideogames();
//         }
//     }
//     return(
//         <div className="filters">
//            <div className="content-select">
//             <label>ORDENAR POR: </label>
// 	        <select onChange={handleSubmitOrder}>
//                 <option key={0} ></option>
//                 <option key={1} >Nombre A-Z</option>
//                 <option key={2} >Nombre Z-A</option>
//                 <option key={3} >Mayor Rating</option>
//                 <option key={4} >Menor Rating</option>
// 	        </select>
// 	        <i></i>
//             </div>
//             <div className="content-select">
//                 <label>FILTRAR POR GENERO: </label>
//                     <select onChange={(event) => handleSubmitGenre(event)}>
//                        {
//                            props.genres && props.genres.map(genre => {
//                                return(
//                                    <option key={genre.name} value={genre.name}> {genre.name}</option>
//                                )
//                            })
//                        }
//                     </select>
//                     <i></i>
//             </div>
//             <div className="content-select">
//                 <label>MIS VIDEOJUEGOS</label>
//                     <select onChange={(event) => handleSubmitMyVideogames(event)}>
//                        <option></option>
//                        <option>Mis Videojuegos</option>
//                        <option>Videojuegos existentes</option>
//                     </select>
//                     <i></i>
//             </div>
//         </div>
//     )
//}
//recibimos el estado de store en generes y videogames
class Filters extends React.Component{
    componentDidMount(){
        this.props.getGenres()
    }
    handleSubmitOrder(event){
        this.props.getVideogamesOrder(event.target.value, this.props.videogames)
    }
    handleSubmitGenre(event){
        this.props.getByGenre(event.target.value)
    }
    handleSubmitMyVideogames(event){
        if(event.target.value === "Mis Videojuegos"){
            this.props.getMyVideogamesDB();
        }
        if(event.target.value === "Videojuegos existentes"){
            this.props.getAPIvideogames();
        }
    }
    render(){
        return(
            <div className="filters">
            <div className="content-select">
             <label>ORDENAR POR: </label>
 	        <select onChange={(event) => this.handleSubmitOrder(event)}>
                 <option key={0} ></option>
                 <option key={1} >Nombre A-Z</option>
                 <option key={2} >Nombre Z-A</option>
                 <option key={3} >Mayor Rating</option>
                 <option key={4} >Menor Rating</option>
 	        </select>
 	        <i></i>
             </div>
             <div className="content-select">
                 <label>FILTRAR POR GENERO: </label>
                     <select onChange={(event) => this.handleSubmitGenre(event)}>
                        {
                            this.props.genres && this.props.genres.map(genre => {
                                return(
                                    <option key={genre.name} value={genre.name}> {genre.name}</option>
                                )
                            })
                        }
                     </select>
                     <i></i>
             </div>
             <div className="content-select">
                 <label>MIS VIDEOJUEGOS</label>
                     <select onChange={(event) => this.handleSubmitMyVideogames(event)}>
                        <option></option>
                        <option>Mis Videojuegos</option>
                        <option>Videojuegos existentes</option>
                     </select>
                     <i></i>
             </div>
         </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        genres: state.genres,
        videogames:state.videogames,
    }
}
//accedo y dispacho las actions creators que necesito
const mapDispatchToProps = (dispatch) => {
    return {
        getGenres: () => {
            dispatch(getGenres())
        },
        getMyVideogamesDB: () => {
            dispatch(getMyVideogamesDB())
        },
        getAPIvideogames: () => {
            dispatch(getAPIvideogames())
        },
        getVideogamesOrder: (type,videogames) =>{
            dispatch(getVideogamesOrder(type,videogames))
        },
        getByGenre: (genre) => {
            dispatch(getByGenre(genre))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Filters)