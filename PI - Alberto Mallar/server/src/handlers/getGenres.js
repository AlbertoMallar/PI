const { getAllGenres } = require('../controllers/genresControllers')



const getGenres = async (req, res) => {
    try {
        const allGenres = await getAllGenres();
        const allGenresNames = allGenres.map( genre => genre.name)
        res.status(200).json(allGenresNames);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    getGenres,
}