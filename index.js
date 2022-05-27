const { Router } = require('express');
const {getAllVideogames, getVideogameById, getMyDBvideogames,getAPIvideogames, filterGenres,getPlatforms, addVideogame, deleteGame} = require('./functions/videogame.js');
const {getGenre} = require('./functions/genres.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getAllVideogames);//bien
router.get('/videogame/platforms', getPlatforms)//esta debe ir primero por quer si no me reconoce como si estubiera buscando juego
router.get('/videogame/:id', getVideogameById);//bien
router.post('/videogame/eliminar/:id', deleteGame)
router.post('/videogame', addVideogame);//bien
router.get('/genres', getGenre);//bien
router.get('/filterGenres/:genre', filterGenres);//bien
router.get('/myvideogames', getMyDBvideogames);//bien
router.get('/videogamesApi',getAPIvideogames);//bien

module.exports = router;
