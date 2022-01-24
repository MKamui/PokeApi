const { Router } = require('express');
const {getAllPoke, getPokeByName, getPokeById, postPokedb} = require ('../controllers/pokemonController');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const {name} = req.query
        console.log(name)
        if(!name) { 
            return res.status(200).send(await getAllPoke())
        }else{
            const pokeFoundName = await getPokeByName(name)
            if(pokeFoundName) {
                return res.status(200).json(pokeFoundName)
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send('No se encontro el Pokemon');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const pokeFoundId = await getPokeById(id);
        if(pokeFoundId) return res.status(200).json(pokeFoundId)

    } catch (error) {
        return res.status(404).send('No se encontro el Pokemon');
    }
});

router.post('/', async (req, res) => {
    try {
        const pokeData = req.body
        await postPokedb(pokeData)
        return res.status(200).send('El Pokemon se creo con exito')

    } catch (error) {
        res.status(400).send('Ocurrio un error al crear el Pokemon')
    }
});

module.exports = router;