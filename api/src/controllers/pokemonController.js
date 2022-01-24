const axios = require('axios')
const { Pokemon, Type } = require('../db')
const { URL_API_POKEMON, URL_API_POKEMON_NAME_OR_ID } = require('../global')

const getPokeapi = async () => {
    try {
        const totalPokemonsRequest = await axios.get(URL_API_POKEMON)
        const totalPokemonsSubrequest = totalPokemonsRequest.data.results.map(obj => axios.get(obj.url)) 
        const infoUrlPokemons = await axios.all(totalPokemonsSubrequest)

        let pokemons = infoUrlPokemons.map(obj => obj.data)
        let infoPokemons = pokemons.map(pokemon => objPokeApi(pokemon))
        return infoPokemons

    } catch (error) {
        return error
    }
}

const getPokedb = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
            }
        })
    } catch (error) {
        return error
    }
}

const getAllPoke = async () => {
    try {
        const apiPokeData = await getPokeapi()
        const dbPokeData = await getPokedb()
        return [...apiPokeData, ...dbPokeData]

    } catch (error) {
        return error
    }
}

const getPokeByName = async (name) => {
    try {
        const searchPokeNameDB = await Pokemon.findOne({
            where: { name },
            include: { model: Type }
        })
        if (searchPokeNameDB) {
            let pokedbName = {
                id: searchPokeNameDB.id,
                name: searchPokeNameDB.name,
                hp: searchPokeNameDB.hp,
                attack: searchPokeNameDB.attack,
                defense: searchPokeNameDB.defense,
                speed: searchPokeNameDB.speed,
                height: searchPokeNameDB.height,
                weight: searchPokeNameDB.weight,
                image: searchPokeNameDB.image,
                types: searchPokeNameDB.types.length < 2 ? [searchPokeNameDB.types[0]] : [searchPokeNameDB.types[0], searchPokeNameDB.types[1]]
            }
            return pokedbName
        }else {
            const searchPokeapiName = await axios.get(`${URL_API_POKEMON_NAME_OR_ID}${name.toLowerCase()}`)
            const foundPokeapiName = objPokeApi(searchPokeapiName.data)
            return foundPokeapiName
        }
    } catch (error) {
        return error
    }
};

const getPokeById = async (id) => {
    try {
        if (id.length > 2) {
            const searchPokeIdDB = await Pokemon.findOne({where: {id}, include: Type})
            let pokedbId = {
                id: searchPokeIdDB.id,
                name: searchPokeIdDB.name,
                hp: searchPokeIdDB.hp,
                attack: searchPokeIdDB.attack,
                defense: searchPokeIdDB.defense,
                speed: searchPokeIdDB.speed,
                height: searchPokeIdDB.height,
                weight: searchPokeIdDB.weight,
                image: searchPokeIdDB.image,
                types: searchPokeIdDB.types.length < 2 ? [searchPokeIdDB.types[0]] : [searchPokeIdDB.types[0] , searchPokeIdDB.types[1]]
            }
            return pokedbId
        } else {
            const searchPokeapiId = await axios.get(`${URL_API_POKEMON_NAME_OR_ID}${id.toString()}`);
            const foundPokeapiId = objPokeApi(searchPokeapiId.data);
            return foundPokeapiId
        }
    } catch (error) {
        return error
    }
}

const objPokeApi = (poke) => {
    const objPokeapi =
    {
        id: poke.id,
        name: poke.name,
        hp: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        speed: poke.stats[5].base_stat,
        height: poke.height,
        weight: poke.weight,
        image: poke.sprites.front_default,
        types: poke.types.length < 2 ? [{ name: poke.types[0].type.name}] : [{ name: poke.types[0].type.name}, { name: poke.types[1].type.name}]
    }
    return objPokeapi
}

const postPokedb = async (pokeData) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, image, types } = pokeData;
        const myPoke = await Pokemon.create(
            {
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                image,
            }
        )
        const pokeTypedb = await Type.findAll({
            where: { name: types }
        })

        let createdMyPoke = myPoke.addType(pokeTypedb)
        return createdMyPoke
    } catch (error) {
        return error
    }
}


module.exports = {
    getPokeapi,
    getPokedb,
    getAllPoke,
    getPokeByName,
    getPokeById,
    postPokedb,
}