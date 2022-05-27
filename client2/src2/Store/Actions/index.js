const axios = require('axios');
const baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
export const getVideogames = () => {
    // return async function(dispatch){
    //     const responseApi = await fetch(`${baseURL}/videogames`)
    //     const json = await responseApi.json()
    //     dispatch({type:"GET_VIDEOGAMES", payload: json}) 
    // }
    return function (dispatch){
        return fetch(`${baseURL}/videogames`)
            .then(response => response.json())
            .then(json => {
                dispatch({type:"GET_VIDEOGAMES", payload: json})
            })
    }
}
export const searchVideogames = (name) => {
    // return async function(dispatch){
    //     const responseApi = await fetch(`${baseURL}/videogames?name=${name}`)
    //     const json = await responseApi.json()
    //     //envio la accion al reducer con la informacion de la api de los juegos que quiero encontrar
    //     dispatch({ type: "SEARCH_VIDEOGAMES", payload: json })
    // }
    return function (dispatch){
        return fetch(`${baseURL}/videogames?name=${name}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: "SEARCH_VIDEOGAMES", payload: json })
            })
    }
}
export const getGenres = () => {
    // return async function(dispatch) {
    //     const response = await fetch(`${baseURL}/genres`)
    //     const json = await response.json()
    //     //envio los generos de los videojuegos
    //     dispatch({ type: "GET_GENRES", payload: json })
    // }
    return function(dispatch){
        return fetch(`${baseURL}/genres`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: "GET_GENRES", payload: json })
            })
    }
}
export const getByGenre = (genre) => {
    // return async function(dispatch){
    //    const response = await fetch(`${baseURL}/filterGenres/${genre}`)
    //    const json = await response.json()
    //    //envio los videjuegos que filtre con ese genero
    //    dispatch({type:"GET_BY_GENRE", payload:json})
    // }
    return function(dispatch){
        return fetch(`${baseURL}/filterGenres/${genre}`)
            .then(response => response.json())
            .then(json => {
                dispatch({type:"GET_BY_GENRE", payload:json})
            })
    }
}
export const getMyVideogamesDB = () => {
    // return async function(dispatch){
    //     const response = await fetch(`${baseURL}/myvideogames`)
    //     const json = await response.json()
    //     //envio los videojuegos de mi DB
    //     dispatch({type:"GET_MY_VIDEOGAMES_DB", payload: json})
    // }
    return function(dispatch){
        return fetch(`${baseURL}/myvideogames`)
            .then(response => response.json())
            .then(
                json => {
                    if(json.length){
                        dispatch({type:"GET_MY_VIDEOGAMES_DB", payload: json})
                    }else{
                       alert('no hay nada en mis juegos')
                       dispatch({type:"GET_MY_VIDEOGAMES_DB", payload: json})
                    }
            })
    }
}
export const getAPIvideogames = () => {
    // return async function(dispatch){
    //     const response = await fetch(`${baseURL}/videogamesApi`)
    //     const json = await response.json()
    //     //envio todos los videojuegos de la api
    //     dispatch({type:"GET_API_VIDEOGAMES", payload:json})
    // }
    return function (dispatch){
        return fetch(`${baseURL}/videogamesApi`)
            .then(response =>  response.json())
            .then(json => {
                dispatch({type:"GET_API_VIDEOGAMES", payload:json})
            })
    } 
}
export function getVideogamesOrder(order,arreglo) {
    return function(dispatch) {
      //me raigo el arreglo
      const videogames = arreglo.slice()
      //empiezo a ordenar con short
      if(order==='Nombre A-Z') videogames.sort((a, b) => (a.name > b.name) ? 1 : -1)
      //cuando a es mayor a b va primero a y despues b 1 si no b va primero y despues a
      if(order==='Nombre Z-A') videogames.sort((a, b) => (a.name > b.name) ? -1 : 1)
      //va primero b y despues a , va primero a y despues b
      if(order==='Mayor Rating')videogames.sort((a, b) => (b.rating - a.rating))
      //    4-3=1                                              3-4=-1
      // b - a > 0 = b primero y despues a , < 0 a va primero y despues b
      if(order==='Menor Rating')videogames.sort((a, b) => (a.rating - b.rating))
      //    4-3=1                   3-4=-1
      //a - b > 0 = b y despues a  a-b < 0 = a y despues b
      dispatch({type:'ORDER_VIDEOGAMES', payload: videogames}) 
    }
}
export function getVideogameDetail(id){
    // return async function(dispatch){
    //     const response = await fetch(`${baseURL}/videogame/${id}`)
    //     const json = await response.json()
    //     //envio el detalle del videojuego
    //     dispatch({type:"GET_VIDEOGAME_DETAIL",payload:json})
    // }
    return function(dispatch){
        return fetch(`${baseURL}/videogame/${id}`)
        .then(RESPONSE => RESPONSE.json())
        .then(JSON =>{
            dispatch({type:"GET_VIDEOGAME_DETAIL",payload:JSON})
        })
    }
}
export function getPlatforms(){
    // return async (dispatch) => {
    //     const response = await fetch(`${baseURL}/videogame/platforms`)
    //     const json = await response.json()
    //     //envio la plataforma
    //     dispatch({type:"GET_PLATFORMS", payload: json})
    // }
    return function(dispatch){
        return fetch(`${baseURL}/videogame/platforms`)
        .then(response => response.json())
        .then(json => {
            dispatch({type:"GET_PLATFORMS", payload: json})
        })
    }
}
export function addVideogame(body){
    // return async function(dispatch){
    //     const {info} = await axios.post(
    //         `${baseURL}/videogame`
    //         ,body
    //     );
    //     return dispatch({
    //         type: "CREATE_VIDEOGAME",
    //         payload: info
    //     })      
    // }
    return function(dispatch){
        return axios.post(`${baseURL}/videogame`,body)
        .then(response => {
            dispatch({type:"CREATE_VIDEOGAME", payload:response})
        })
    }
}
export function deleteGame(id){
    // return async function(dispatch){
    //     if(id.length > 10){
    //         const response = await axios.post(`${baseURL}/videogame/eliminar/${id}`)
    //         return dispatch({
    //             type:"DELETE_GAME",
    //             payload:response.data
    //         })
    //     }
    //     return dispatch({
    //         type:"DELETE_GAME",
    //         payload:id
    //     })
    // }
    return function(dispatch){
        if(id.length > 10){
            return axios.post(`${baseURL}/videogame/eliminar/${id}`)
            .then(response => {
                dispatch({type:"DELETE_GAME", payload:response.data})
            })
        }else{
            dispatch({type:"DELETE_GAME", payload:id})
        }
    }
}
