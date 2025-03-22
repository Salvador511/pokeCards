/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'
import getClassPrefixer from '../Lib/getClassPrefixer'
import { Typography as T, Button, Modal } from '@mui/material'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import getPokemons from './Libs/getPokemons'
import Loading from '../Loading'
import Card from '../Card'
import InfiniteScroll from 'react-infinite-scroll-component'

const displayName = 'List'
const classes = getClassPrefixer(displayName)

const Container = styled('div')({
  backgroundColor: blueGrey[500],
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
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

const List = ({ 
  pokemons, 
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending
}) => {
  const [open, setOpen] = useState(false)
  const [currentPokemon, setCurrentPokemon] = useState(null)
  
  return(
    <InfiniteScroll
      dataLength={pokemons?.length}
      next={() => {
        if (!hasNextPage || isFetchingNextPage || isPending) return
        fetchNextPage()
      }}
      hasMore={hasNextPage}
      endMessage={<T>All pokemons loaded</T>}
    >
      <Container>
      {pokemons.map((pokemon, index) => (
        <Button key={`${pokemon?.name}-${index}`} onClick={() => {
          setCurrentPokemon(pokemon)
          setOpen(true)
        }}>
          <div  className={classes.content}>
          <T>{pokemon?.name}</T>
          <img src={pokemon?.sprites.front_default} />
          </div>
        </Button>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card pokemon={currentPokemon}/>
      </Modal>
    </Container>
    </InfiniteScroll>
  ) 
}

const Wrapper = () => {
  // const { data } = useQuery({ 
  //   queryKey: ['pokemons'], queryFn: getPokemons,
  //   staleTime: Infinity
  // })
  const { data, ...restQueryProps } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => getPokemons({ url: pageParam }),
    staleTime: Infinity,
    initialPageParam: undefined,
    getNextPageParam: page => page.next
  })

  const pokemons = useMemo(() => (
    data?.pages.flatMap(data => data.pokemons)
  ), [data])

  return (
    !data ?
    <Loading /> :
    <List
      pokemons={pokemons ?? []}
      {...restQueryProps}
    />
  )
}

export default Wrapper