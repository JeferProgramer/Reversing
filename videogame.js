const {Videogame} = require('../../db')
const {Genres} = require('../../db')
const fetch = require('node-fetch');
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
async function getAllVideogames (req, res, next)  {
    const {name} = req.query
    if(name){ // get /videogames?name='algo'
        const DBvideogames = await Videogame.findAll({
            //tareme todo lo que encuentres con mane y sus generos
            where:{name:{[Op.substring] : name}}, include: Genres
        })
        const api = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
        const apiJson = await api.json()
        console.log(DBvideogames)
        //console.log(apiJson)
        const totalGames = DBvideogames.concat(apiJson.results);
        if(!totalGames){
            res.send(`No se encontro ningun juego con el nombre de ${name}`)
        }else{
            var juegos = [];
                    //lleno el array con mis videojuegos encontrados
                    totalGames.forEach((element, index) => {
                        if(index < 15){
                            juegos.push(element);
                        }
            });
            res.send(juegos)
        }
        // //busco en mi base de datos
        // const DBvideogames = Videogame.findAll({
        //     where:{
        //         name: {
        //             [Op.substring]: name
        //             //like te encuntre todo lo parecido
        //         },
        //     },include: Genres
        // })
        // console.log(DBvideogames)
        // //busco en mi api
        // const APIvideogames = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
        //     .then(videojuego => videojuego.json())
        // Promise.all([DBvideogames, APIvideogames])
        //     .then((results) => {
        //         const [DBvideogames, APIvideogames] = results;
        //         //uno ambas busquedas
        //         const responseTotal = DBvideogames.concat(APIvideogames.results);
        //         //envio la respuesta
        //         res.json(responseTotal);
        //     })
        //     .catch(e => console.log(e))
    }else{
        const DBvideogames = await Videogame.findAll({include: Genres})
        const APIvideogames = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        const APIvideogamesJson = await APIvideogames.json()
        const APIvideogames2 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        const APIvideogames2Json = await APIvideogames2.json()
        const APIvideogames3 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        const APIvideogames3Json = await APIvideogames3.json()
        const APIvideogames4 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        const APIvideogames4Json = await APIvideogames4.json()
        const APIvideogames5 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        const APIvideogames5Json = await APIvideogames5.json()
        const resultado = APIvideogamesJson.results.concat(APIvideogames2Json.results.concat(APIvideogames3Json.results.concat(APIvideogames4Json.results.concat(APIvideogames5Json.results.concat(DBvideogames)))))         
         res.send(resultado)
        // const DBvideogames = Videogame.findAll({include: Genres})
        // const APIvideogames = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        //     .then(videojuegos => videojuegos.json())
        // const APIvideogames2 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        //     .then(videojuegos2 => videojuegos2.json())
        // const APIvideogames3 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        //     .then(videojuegos3 => videojuegos3.json())
        // const APIvideogames4 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        //     .then(videojuegos4 => videojuegos4.json())
        // const APIvideogames5 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        //     .then(videojuegos5 => videojuegos5.json())
        // Promise.all([DBvideogames,APIvideogames, APIvideogames2,APIvideogames3,APIvideogames4, APIvideogames5])
        //     .then((response) => {
        //         const [DBvideogames,APIvideogames, APIvideogames2, APIvideogames3, APIvideogames4, APIvideogames5] = response;
        //         //para poder tener sus resultados y concatenar 
        //         const resultado = APIvideogames.results.concat(APIvideogames2.results.concat(APIvideogames3.results.concat(APIvideogames4.results.concat(APIvideogames5.results.concat(DBvideogames)))))         
        //         res.send(resultado)
        //     })
        //     .catch(error => next(error))
    }        
}
async function getVideogameById(req, res)  {
    const idGame = req.params.id;
    if(idGame.length>10){
        //si es asi el registro esta en mi db por el uuid
        // Videogame.findByPk(idGame,{include: Genres})
        // //debe el tener una asociacion a generos
        //     .then(videogame => res.json(videogame))
        //     .catch(e => console.log(e))
        const videogameDB = await Videogame.findByPk(idGame, {include:Genres})
        res.json(videogameDB)
    }else{
        //probar con el await 
        //  fetch(`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`)
        //     .then(response => response.json())
        //     .then(videojuegos => {
        //         res.send(videojuegos)
        //     })
        //     .catch(e => console.log(e))
        const responseApi = await fetch(`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`)
        //console.log(responseApi)
        const response = await responseApi.json()
        //console.log(response)
        res.json(response)
    }
}
const getMyDBvideogames = async(req, res) => {
    // Videogame.findAll({include: Genres})//para traernos los generos de ese juego
    //     .then(videojuegos => res.json(videojuegos))
    //     .catch(e => console.log(e))
    const dbVideogames = await Videogame.findAll({include: Genres})
    res.json(dbVideogames)
}
const getAPIvideogames = async(req, res) =>{
    //hago las 5 peticiones a la api
    // const APIvideogames = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    //     .then(videojuegos1 => videojuegos1.json())
    // const APIvideogames2 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    //     .then(videojuegos2 => videojuegos2.json())
    // const APIvideogames3 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    //     .then(videojuegos3 => videojuegos3.json())  
    // const APIvideogames4 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    //     .then(videojuegos4 => videojuegos4.json())
    // const APIvideogames5 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    //     .then(videojuegos5 => videojuegos5.json())
    // //si se resolvieron todas las promesas entramos al then 
    // Promise.all([APIvideogames, APIvideogames2, APIvideogames3, APIvideogames4, APIvideogames5])
    //     //response tiene la respuesta de promise.all
    //     .then((response) => {
    //         const [APIvideogames, APIvideogames2, APIvideogames3, APIvideogames4, APIvideogames5] = response 
    //         //concateno todas las respuestas en una sola 
    //         const result = APIvideogames.results.concat(APIvideogames2.results.concat(APIvideogames3.results.concat(APIvideogames4.results.concat(APIvideogames5.results))))
    //         res.send(result)
    //     })
    //     .catch(e => console.log(e))
    try {
        const APIvideogames = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        const APIvideogamesJson = await APIvideogames.json()
        const APIvideogames2 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        const APIvideogames2Json = await APIvideogames2.json()
        const APIvideogames3 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        const APIvideogames3Json = await APIvideogames3.json()
        const APIvideogames4 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        const APIvideogames4Json = await APIvideogames4.json()
        const APIvideogames5 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        const APIvideogames5Json = await APIvideogames5.json()
        const resultado = APIvideogamesJson.results.concat(APIvideogames2Json.results.concat(APIvideogames3Json.results.concat(APIvideogames4Json.results.concat(APIvideogames5Json.results))))         
        res.send(resultado)
    } catch (error) {
        console.log(error)
    }
}
const filterGenres =async(req,res) =>{
    const {genre} = req.params
    try {
        const DBvideogames = await Videogame.findAll({include: Genres})
        const APIvideogames = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        const APIvideogamesJson = await APIvideogames.json()
        const APIvideogames2 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        const APIvideogames2Json = await APIvideogames2.json()
        const APIvideogames3 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        const APIvideogames3Json = await APIvideogames3.json()
        const APIvideogames4 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        const APIvideogames4Json = await APIvideogames4.json()
        const APIvideogames5 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        const APIvideogames5Json = await APIvideogames5.json()
        let dbFilter = []
        for (let i = 0; i < DBvideogames.length; i++) {
           DBvideogames[i].genres.forEach(genero => {
            if(genero.name === genre){
                dbFilter.push(DBvideogames[i])
            }})
        }
        let gamesFilter = []
        //accedo a los resultados de la peticion a la api y recorro cada uno de los resultados y los generos de cada uno de ese resultado y miro si concide con lo que estoy buscando 
         for (let i = 0; i < APIvideogamesJson.results.length; i++) {
             APIvideogamesJson.results[i].genres.forEach(genero => {
                 if(genero.name === genre){
                     gamesFilter.push(APIvideogamesJson.results[i])
                 }
             })
         }
        for (let i = 0; i < APIvideogames2Json.results.length; i++) {
            APIvideogames2Json.results[i].genres.forEach(genero => {
                if(genero.name === genre){
                    gamesFilter.push(APIvideogames2Json.results[i])
                }
            })
        }
        for (let i = 0; i < APIvideogames3Json.results.length; i++) {
            APIvideogames3Json.results[i].genres.forEach(genero => {
                if(genero.name === genre){
                    gamesFilter.push(APIvideogames3Json.results[i])
                }
            })
        }
        for (let i = 0; i < APIvideogames4Json.results.length; i++) {
            APIvideogames4Json.results[i].genres.forEach(genero => {
                if(genero.name === genre){
                    gamesFilter.push(APIvideogames4Json.results[i])
                }
            })
        }
        for (let i = 0; i < APIvideogames5Json.results.length; i++) {
            APIvideogames5Json.results[i].genres.forEach(genero => {
                if(genero.name === genre){
                    gamesFilter.push(APIvideogames5Json.results[i])
                }
            })
        }
        //uno el filtrado en bd y en la api
        const filterTotal = gamesFilter.concat(dbFilter)
        res.json(filterTotal)
    } catch (error) {
        console.log(error)
    }
    // const videogamesDb = Videogame.findAll({include: Genres})
    // const videogamesApi = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    //     .then(videojuegos => videojuegos.json())
    // const videogamesApi2 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    //     .then(videojuegos2 => videojuegos2.json())
    // const videogamesApi3 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    //     .then(videojuegos3 => videojuegos3.json())
    // const videogamesApi4 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    //     .then(videojuegos4 => videojuegos4.json())
    // const videogamesApi5 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    //     .then(videojuegos5 => videojuegos5.json())
    // Promise.all([videogamesDb, videogamesApi, videogamesApi2,videogamesApi3,videogamesApi4, videogamesApi5])
    //     .then((results) => {
    //         const [videogamesDb, videogamesApi, videogamesApi2, videogamesApi3, videogamesApi4, videogamesApi5] = results;
    //         var dbFiltered=[];
    //         for(var i=0;i<videogamesDb.length;i++){
    //             videogamesDb[i].genres.forEach(genero => {
    //                 if(genero.name===genre){
    //                     dbFiltered.push(videogamesDb[i])
    //                 }})
    //             }
    //         var apiFiltered=[];
    //         for(var i=0;i<videogamesApi.results.length;i++){
    //             videogamesApi.results[i].genres.forEach(genero => {
    //                 if(genero.name===genre){
    //                     apiFiltered.push(videogamesApi.results[i])
    //                 }})
    //         }
    //         for(var i=0;i<videogamesApi2.results.length;i++){
    //             videogamesApi2.results[i].genres.forEach(genero => {
    //                 if(genero.name===genre){
    //                     apiFiltered.push(videogamesApi2.results[i])
    //                 }})
    //         }
    //         for(var i=0;i<videogamesApi3.results.length;i++){
    //             videogamesApi3.results[i].genres.forEach(genero => {
    //                 if(genero.name===genre){
    //                     apiFiltered.push(videogamesApi3.results[i])
    //                 }})
    //         }
    //         for(var i=0;i<videogamesApi4.results.length;i++){
    //             videogamesApi4.results[i].genres.forEach(genero => {
    //                 if(genero.name===genre){
    //                     apiFiltered.push(videogamesApi4.results[i])
    //                 }})
    //         }
    //         for(var i=0;i<videogamesApi5.results.length;i++){
    //             videogamesApi5.results[i].genres.forEach(genero => {
    //                 if(genero.name===genre){
    //                     apiFiltered.push(videogamesApi5.results[i])
    //                 }})
    //         }
    //         const response = apiFiltered.concat(dbFiltered)
    //         res.json(response);
    //     })
    //     .catch(error => console.log(error))
}
const getPlatforms = async(req, res) => {
    try {
        const APIvideogames = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        const APIvideogamesJson = await APIvideogames.json()
        const APIvideogames2 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        const APIvideogames2Json = await APIvideogames2.json()
        const APIvideogames3 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        const APIvideogames3Json = await APIvideogames3.json()
        const APIvideogames4 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        const APIvideogames4Json = await APIvideogames4.json()
        const APIvideogames5 = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        const APIvideogames5Json = await APIvideogames5.json()

        const resultado = APIvideogamesJson.results.concat(APIvideogames2Json.results.concat(APIvideogames3Json.results.concat(APIvideogames4Json.results.concat(APIvideogames5Json.results))))
        let todasPlataformas = []
        resultado.map((game) => {
            game.platforms.map(p => {
                if(!todasPlataformas.includes(p.platform.name)){
                    todasPlataformas.push(p.platform.name)
                }
            })
        })
        //res.send(resultado)   
        res.send(todasPlataformas)      
    } catch (error) {
        console.log(error)
    }
    // const APIvideogames = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    //     .then(videojuegos1 => videojuegos1.json())
    // const APIvideogames2 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    //     .then(videojuegos2 => videojuegos2.json())
    // const APIvideogames3 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    //     .then(videojuegos3 => videojuegos3.json())  
    // const APIvideogames4 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    //     .then(videojuegos4 => videojuegos4.json())
    // const APIvideogames5 = fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    //     .then(videojuegos5 => videojuegos5.json())
    // //si se resolvieron todas las promesas entramos al then 
    // Promise.all([APIvideogames, APIvideogames2, APIvideogames3, APIvideogames4, APIvideogames5])
    //     //response tiene la respuesta de promise.all
    //     .then((response) => {
    //         let todasPlataformas = []
    //         const Juegos = response.map((element) => element.results)
    //         //console.log(Juegos.flat())
    //         //le digo con el flat que todos los sub array me los concatene para que sepa que es platfroms 
    //        Juegos.flat().map((e) => {
    //             //recorrer cada uno de los
    //                 e.platforms.map(p => {
    //                     //recorro las plataformas de los juegos y si no estan el en array los agrego
    //                     if(!todasPlataformas.includes(p.platform.name)){
    //                         todasPlataformas.push(p.platform.name)
    //                     }
    //                 })
    //         })
    //         res.send(todasPlataformas)
    //     })
    //     .catch((e) => console.log(e))
}
const addVideogame = async(req, res) => {
    const {name, description, released, rating,platforms, genres} = req.body
    console.log(name, description, released, rating,platforms, genres)
    // try {
    //     //Creamos el juego
    //     let newGame = await Videogame.create({
    //         //le paso el objeto con todos los atributos que quiero que tenga mi nuevo videojuego
    //         name,
    //         released,
    //         rating,
    //         platforms,
    //         description
    //     })
    //     const generos = await Genres.findAll({
    //         where: { //en donde tenga esos generos
    //             name:{[Op.in]: genres}
    //         }
    //     })
    //     console.log(generos)
    //     await newGame.addGenre(generos);//a mi juego creado le agrego algun genero
    //     res.json(newGame);
    // } catch (e) {
    //     console.log(e)
    // }
    const videojuego = Videogame.create({
        name,
        released,
        rating,
        platforms,
        description  
    })
    const generos = Genres.findAll({
        where:{
            name:{[Op.in]:genres}
        }
    })
    Promise.all([videojuego, generos])
        .then((values) => {
            const [videojuego, generos] = values
            videojuego.addGenres(generos)
        })
    .catch(e => console.log(e))
}
const deleteGame = async(req, res) => {
    const {id} = req.params;
    console.log('eliminar el: ',id)
    try {
        const gameDelete = await Videogame.destroy({
            where:{id: id}
        })
        res.send(id)
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    getAllVideogames,
    getVideogameById,
    getMyDBvideogames,
    getAPIvideogames,
    filterGenres,
    getPlatforms,
    addVideogame,
    deleteGame
}