/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'
import getClassPrefixer from '../Lib/getClassPrefixer'
import { Typography as T } from '@mui/material'
import getPokemons from './Libs/getPokemons'

const displayName = 'List'
const classes = getClassPrefixer(displayName)
const Container = styled('div')({
  backgroundColor: blueGrey[500],
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row', 
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '1rem',
  gap: '1ch', 
  [`& .${classes.content}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
    backgroundColor: blueGrey[50],
    borderRadius: '1ch',
    width: '200px',
    gap: '1rem'
  }
})


const List = ({ pokemons }) => {
  return(
    <Container>
      {pokemons.map((pokemon, index) => (
        <div key={index} className={classes.content}>
          <T>{pokemon?.name}</T>
          <img src={pokemon?.sprites.front_default} />
        </div>
      ))}
      
    </Container>
  ) 
}

const Wrapper = () => {
  const [pokemons, setPokemons] = useState([])
  const requestPokemons = async () => {
    setPokemons(await getPokemons())
  }
  useEffect(() => {
    requestPokemons()
  }, [])

  return (
    <List
      pokemons={pokemons}
    />
  )
}

export default Wrapper