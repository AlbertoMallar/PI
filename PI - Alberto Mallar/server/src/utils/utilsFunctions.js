
const infoFiltered = (arr) => arr.map( (game) => {
    return {
        id: game.id,
        name: game.name,
        genres: game.genres.map( (genre) => genre.name),
        platforms: game.platforms.map(({ platform }) => platform.name),
        background_image: game.background_image,
        released: game.released,
        rating: game.rating
    }
});

module.exports  = {
    infoFiltered
}