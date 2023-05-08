// Requiere express y llama al metodo router
const router = require("express").Router();

//Requiere importa el modelo
const Celebrity = require('../models/Celebrity.model')

//Este get renderiza la creacion de celebrities
router.get("/celebrities/create", (req, res, next) => {

    Celebrity

        .find()
        .then(celebritiesFromDB => {
            res.render("celebrities/new-celebrity", { celebritiesFromDB })
        })
        .catch(err => {
            console.log(err)
        })
});
//Este get devuelve la data de la pagina creada
router.post("/celebrities/create", (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity

        .create({ name, occupation, catchPhrase })
        .then(createdCelebrity => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            next(err)
            res.render("celebrities/new-celebrity")
        })
});
//Este modulo marca las rutas
router.get("/celebrities", (req, res, next) => {

    Celebrity
        .find()
        .then(celebritiesFromDb => res.render('celebrities/celebrities', { celebrities: celebritiesFromDb }))
        .catch(err => console.log(err))
});
module.exports = router
module.exports = router;