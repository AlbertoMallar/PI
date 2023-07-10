const axios = require('axios')
const {Videogame, Genre} = require('../db')
const {API_KEY} = process.env;
const {infoFiltered} = require('../utils/utilsFunctions');
const { Op } = require('sequelize');

//Postear un nuevo juego

const createGameDB = async (name, description, genres, platforms, background_image, released, rating) => {
    const gamePosted = await Videogame.create({name, description, platforms, background_image, released, rating});

    const genresPosted = await Genre.create( { name: genres} )

    await gamePosted.addGenre(genresPosted);

    return gamePosted;
}; //sequelize me permite usar la funcion .create como si usara el CREATE en SQL



// Obtener el detail de un juego por ID

const getByIdDB = async (id, source) => {
    
    const game = source === 'api' ? (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
        .data

    : await Videogame.findByPk(id);

    return game;
}


const getGamesByName = async (name) => {
    const gamesByNameDB = await Videogame.findAll(
        {
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        }
    );

    const allGamesFromApiFullInfo = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;
    let allGamesFromApiFiltered = infoFiltered(allGamesFromApiFullInfo);
    const gamesByNameApi = allGamesFromApiFiltered.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));

    if ( gamesByNameDB.length === 0 && gamesByNameApi.length === 0) return `No se encontraron juegos que contengan ${name} en su nombre`
    
    return [...gamesByNameDB, ...gamesByNameApi]
};


const getAllGames = async () => {
    const allGamesFromDB = await Videogame.findAll();

    const allGamesFromApiFullInfo = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results;
    let allGamesFromApiFiltered = infoFiltered(allGamesFromApiFullInfo);

    //allGamesFromApiFiltered = await (allGamesFromApiFiltered.map( async (game) => {
    //    const description = (await axios.get(`https://api.rawg.io/api/games/${game.id}?key=$//{API_KEY}`)).data.description
    //    game.description = description;
    //} ))

    
    return [...allGamesFromDB, ...allGamesFromApiFiltered];

}

module.exports = {
    createGameDB,
    getByIdDB,
    getAllGames,
    getGamesByName
}