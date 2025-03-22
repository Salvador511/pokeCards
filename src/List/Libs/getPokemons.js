import apiFetch from "../../Lib/apiFetch"
import capitalizeFirstLetter from "../../Lib/capitalizeFirstLetter"

// const getAllUrls = async ({ url }) => {
//   let next = url
//   const pokemons = []
//   while(next) {
//     const req = await apiFetch({ url: next })
//     next = req.next
//     const pokemons = await Promise.all(req.results.map(async url => {
//       const pokemonReq = await apiFetch({ url })
//       const pokemon = { ...pokemonReq, name: capitalizeFirstLetter(pokemonReq.name) }
//       return pokemon
//     }))
//     pokemons.push(...req.results)
//   }

//   return pokemons
// }

const getPokemons = async ({ url = 'https://pokeapi.co/api/v2/pokemon' }) => {
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