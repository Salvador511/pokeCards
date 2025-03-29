import apiFetch from "../../Lib/apiFetch"
import capitalizeFirstLetter from "../../Lib/capitalizeFirstLetter"

const getPokemons = async ({ url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40' }) => {
  const pokemonsReq = await apiFetch({ url })
  const pokemonsURLs = pokemonsReq.results.map(pokemon => pokemon.url)
  const pokemons = await Promise.all(pokemonsURLs.map(async url => {
    const pokemonReq = await apiFetch({ url })
    const pokemon = { ...pokemonReq, name: capitalizeFirstLetter(pokemonReq.name) }
    return pokemon
  }))
  return { pokemons, next: pokemonsReq.next }
}
export default getPokemons