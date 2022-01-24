const { Router } = require('express');
const typesRoute = require('./types');
const pokemonsRoute = require('./pokemons'); 

const router = Router();

router.use("/pokemons", pokemonsRoute);
router.use("/types", typesRoute);

module.exports = router;