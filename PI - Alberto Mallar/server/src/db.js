const {Sequelize} = require('sequelize');
require('dotenv').config() //importo esta dependencia para poder leer las variables de db
const gamesModels  = require('./models/gamesModels');
const genreModels  = require('./models/genreModels');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env //funcion disponible gracias a dotenv
//const sequelize = new Sequelize('postgres://user:[pass@example.com:5432/dbname')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
 {logging: false}
 );

 gamesModels(sequelize); // definimos los modelos en la instancia de sequielize en la base de datos
 genreModels(sequelize);

 // Formar las relaciones. Un juego muchas plataformas una plataforma muchos juegos.
 // muchos a muchos.
 const { Videogame, Genre } = sequelize.models;

Videogame.belongsToMany(Genre, {through: 'videogame_genres'});
Genre.belongsToMany(Videogame, {through: 'videogame_genres'});

 module.exports = {
    ...sequelize.models,
    conn: sequelize
 }
