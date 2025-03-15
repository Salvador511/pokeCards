import apiFetch from "../../Lib/apiFetch"
import capitalizeFirstLetter from "../../Lib/capitalizeFirstLetter"

const getPokemons = async () => {
  const pokemonsReq = await apiFetch({ url: 'https://pokeapi.co/api/v2/pokemon' })
  const pokemonsURLs = pokemonsReq.results.map(pokemon => pokemon.url)
  const pokemons = await Promise.all(pokemonsURLs.map(async url => {
    const pokemonReq = await apiFetch({ url })
    const pokemon = { ...pokemonReq, name: capitalizeFirstLetter(pokemonReq.name) }
    return pokemon
  }))
  return pokemons
}
export default getPokemons