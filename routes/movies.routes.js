// Requiere express y llama al metodo router
const router = require("express").Router();
//Requiere importa el modelo
const Movie = require('../models/Movie.model')
const Celebrities = require('../models/Celebrity.model')
//Este get renderiza la creacion de movies
router.get("/movies/create", (req, res, next) => {

    Celebrities
        .find()
        .then(celebritiesFromDB => {
            res.render("movies/new-movie", { celebritiesFromDB })
        })
        .catch(err => {
            console.log(err)
        })
});
//Este get devuelve la data de la pagina creada
router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect(`/movies`))
        //.catch(err => res.render(`/new-movie`))
        .catch(err => {console.log(err)})
});
//Esto me renderiza la pagina movies
router.get("/movies", (req, res, next) => {

    Movie
        .find()
        .then(moviesFromDb => res.render('movies/movies', { movies: moviesFromDb }))
        .catch(err => console.log(err))
});
//Esto me renderiza los detalles
router.get("/movies/:id", (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .populate('cast')
        .then(moviesFromDb => res.render('movies/movie-details', moviesFromDb))
        .catch(err => console.log(err))
});
router.post('/movies/:id/delete', (req, res, next) => {

    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/movies`))
        .catch(err => console.log(err))
});
router.post('/movies/:id/edit', (req, res, next) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(moviesFromDb => {
            return moviesFromDb
        })
        .then(moviesFromDb => {
            Celebrities
                .find()
                .then(celebritiesFromDB => {
                    return res.render('/movies/:id/edit', { movie, celebritiesFromDb })
                })
        })
        .catch(err => console.log(err))
});
router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(moviesFromDb =>
            res.render('movies/edit-movies', { moviesFromDb })
        )
        .catch(err => console.log(err))
});
//Este modulo marca las rutas
module.exports = router;

Movie
    .find()
    .then(moviesFromDb => res.render('movies/movies', { movies: moviesFromDb }))
    .catch(err => console.log(err))