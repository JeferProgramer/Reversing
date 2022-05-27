const {Genres} = require('../../db.js');
const {API_KEY} = process.env;
const fetch = require('node-fetch');
//vamos a ver si esa importacion es obligatoria
async function getGenre(req, res) {
    // fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    // .then(response => response.json())
    // .then(genres => {
    //     genres.results.map(genre => {
    //         Genres.findOrCreate({//lo uso para guardar los generos que me traje de la API en la base de datos
    //             where:{name:genre.name, id: genre.id}
    //         })
    //         .then(() => console.log('todo bien'))
    //         .catch(error => console.log(error))
    //     })
    // })
    // Genres.findAll()//me traigo todos los generos que guarde en mi db
    // .then(genres => res.json(genres))
    const responseApi = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const respuesta = await responseApi.json()
    const genres = await respuesta.results.map(genre => { return {name:genre.name, id: genre.id}})
    console.log(genres)
    genres.map(genero => Genres.findOrCreate({where:{name:genero.name, id: genero.id}}))
    const generos = await Genres.findAll()
    res.json(generos)
}

module.exports = {
    getGenre
}