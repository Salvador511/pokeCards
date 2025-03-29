import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      favorites:[],
      setFavotite: favPokemon => {
        const store = get().favorites
        if (store.find(pokemon => pokemon.name === favPokemon.name)) return
        set({favorites: [...store, favPokemon]})
      }
    }),
    {
      name: 'POKEMON_STORAGE',
      whitelist: ['favorites'],
    }
  )
)