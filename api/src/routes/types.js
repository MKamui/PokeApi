const { Router } = require('express')
const {getTypesTotal} = require ('../controllers/typeController')

const router = Router()

router.get('/', async (req, res) => {
    try{
        let currentTypes = await getTypesTotal()
        currentTypes = currentTypes.filter(type => type !== "unknown" && type !== "shadow") 
        return res.status(200).send(currentTypes)
    }catch(error){
        return res.status(400).send('No se encontraron los tipos de Pokemon')
    }
})

module.exports = router