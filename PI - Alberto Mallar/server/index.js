const server = require('./src/app')
const {conn} = require('./src/db')
const {fillDBwithGenres} = require('../server/src/utils/utilsFunctions');

const PORT = 3001;

server.listen(PORT, () => {
    conn.sync({force:true});
    console.log('Listening on port 3001');
    
    //ACA VOY A LLAMAR A LA FUNCION QUE TRAE TODOS LOS GENEROS DE LA API Y LOS PONE 
    //EN LA BASE DE DATOS
    fillDBwithGenres();
});