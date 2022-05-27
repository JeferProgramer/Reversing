//inicialisamos el estado inicial
const initialState = {
    videogames: [],
    videogameDetail: {},
    genres:[],
    platforms: []
}
function reducer(state = initialState, action){
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return{
                ...state,
                videogames: action.payload
            }
        case "SEARCH_VIDEOGAMES":
            return{
                //hacemos una copia del estado para no perder info
                ...state,
                //agregamos la info 
                videogames: action.payload
            }
        case "ORDER_VIDEOGAMES":
            return{
                ...state,
                videogames: action.payload,
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case "GET_BY_GENRE":
            return {
                ...state,
                videogames: action.payload
            }
        case "GET_MY_VIDEOGAMES_DB":
            return {
                ...state,
                videogames: action.payload
            }
        case "GET_API_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload
            }
        case "GET_VIDEOGAME_DETAIL":
            return {
                ...state,
                videogameDetail: action.payload
            }
        case "GET_PLATFORMS":
            return{
                ...state,
                platforms: action.payload
            }
        case "CREATE_VIDEOGAME":
            return{
                ...state
            }
        case "DELETE_GAME":
            return{
                ...state,
                videogames: state.videogames.filter(game => game.id !== action.payload)
            }
        default:
           return {...state}
    }
}
export default reducer