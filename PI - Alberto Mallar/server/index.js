const server = require('./src/app')
const { conn } = require('./src/db')
const { fillDBwithGenres } = require('../server/src/utils/utilsFunctions');

const PORT = 3001;


conn.sync({ force: true })
    .then(() => { fillDBwithGenres() })  //ACA VOY A LLAMAR A LA FUNCION QUE TRAE TODOS LOS GENEROS DE LA API Y LOS PONE EN LA BASE DE DATOS

    .then(() => {
        server.listen(PORT, () => {
            console.log('Listening on port 3001');
        })
    })
    .catch((error) => console.log('ERROR UP SERVER--->' + error.message));

