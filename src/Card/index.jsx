/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles'
import getClassPrefixer from '../Lib/getClassPrefixer'
import { yellow, grey } from '@mui/material/colors'
import { IconButton, Stack, Typography as T } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import StarIcon from '@mui/icons-material/Star'
import { useMemo } from 'react'
import stringToColor from '../Utils/stringToColor'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Loading from '../Loading'
import { useStore } from '../Store/store';


const displayName = 'Card'
const classes = getClassPrefixer(displayName)
const widthRequestImg = '320'
const heightRequestImg = '200'
const randomImgUrl = 'https://picsum.photos'

const Container = styled('div')({
  width: '350px',
  height: '500px',
  border: `1.5rem solid ${yellow[500]}`,
  borderRadius: '1rem',
  position: 'relative',
  [`& .${classes.content}`]: {
    position: 'absolute',
    top: '-1ch',
    left: '-1ch',
    right: '-1ch',
    bottom: '-1ch',
    borderRadius: '0.8ch',
    backgroundColor: 'var(--background-color)',
  },
  [`& .${classes.imageContainer}`]: {
    position: 'relative',
    width: `${widthRequestImg}px`,
    height: `${heightRequestImg}px`,
    border: `1px solid ${grey[500]}`,
    overflow: 'hidden',
  },
  [`& .${classes.pokeimage}`]: {
    top: 10,
    left: 50,
    position: 'absolute',
    width: 200,
    zIndex: 100,
  },
  [`& .${classes.refetchImage}`]: {
    right: 0,
    position: 'absolute'
  },
  [`& .${classes.favorite}`]: {
    right: 30,
    position: 'absolute'
  },
  [`& .${classes.stats}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem 1.4rem',
  }
})

export const CardComponent = ({ backgroundColor, name, healthPoints, imgUrl, bgImgUrl, stats, invalidateImage, handleFavorite, favs }) => {
  const currentStats = useMemo(() => stats.slice(1).map(stat => ({
    value: stat?.base_stat,
    label: stat?.stat?.name 
  })))
  return (
    <Container
      style={{
        '--background-color': backgroundColor ?? grey[50]
      }}
    >
      <div className={classes.content}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          padding='0 1ch'
        >
          <T variant='h6' fontWeight='700'>{name ?? 'Mewtwo'}</T>
          <Stack
            direction='row'
            alignItems='flex-end'
            justifyContent='flex-end'
          >
            <T fontSize='1ch'>HP</T>
            <T variant='h6' fontWeight='700'>{healthPoints ?? '130'}</T>
          </Stack>
        </Stack>
        <Stack
          alignItems ='center'
          justifyContent='center'
        >
          <div className={classes.imageContainer}>
            <img src={bgImgUrl}/>
            <img 
              src={imgUrl}
              className={classes.pokeimage}
            />
            {favs ?? 
              <>
                <IconButton 
                  className={classes.refetchImage}
                  onClick={() => invalidateImage()}
                  >
                  <RefreshIcon />
                </IconButton>
                <IconButton 
                  className={classes.favorite}
                  onClick={() => handleFavorite()}
                  >
                  <StarIcon />
                </IconButton>
              </> 
            }
            
          </div>
        </Stack>
        <div className={classes.stats}>
          <T fontWeight='bold'>Stats:</T>
          {currentStats.map((stat, index) => (
            <Stack
              key={index}
              direction='row'
              justifyContent='space-between'
            >
              <T>{stat?.label}</T>
              <T>{stat?.value}</T>
            </Stack>
          ))}
        </div>
      </div> 
    </Container>
  )
}

const Wrapper = ({ pokemon, ...props }) => {
  const queryClient = useQueryClient()
  const backgroundColor = stringToColor(pokemon?.name)
  const setFavorite = useStore(state => state.setFavotite)
  const [isLoading, setIsLoading] = useState(false)


  const requestBgImgUrl = async () => {
    setIsLoading(true)
    const backgroundImgUrl = await fetch(`${randomImgUrl}/${widthRequestImg}/${heightRequestImg}/?blur=2`)
    .then(response => response.url)
    setIsLoading(false)
    return backgroundImgUrl
  }

  const { data : bgImgUrl } = useQuery({ 
    queryKey: [`image-${pokemon.name}`], queryFn: requestBgImgUrl,
    staleTime: Infinity
  })

  const invalidateImage = () => {
    queryClient.invalidateQueries({ 
      queryKey: [`image-${pokemon.name}`] 
    })
  }

  const pokemonData = {
    imgUrl: pokemon?.sprites?.other['official-artwork']?.front_default,
    bgImgUrl,
    name: pokemon?.name,
    backgroundColor,
    stats: pokemon?.stats,
    healthPoints: pokemon?.stats[0]?.base_stat,
    sprite: pokemon.sprites.front_default
  }

  const handleFavorite = () => setFavorite(pokemonData)


  return (
    isLoading ? <Loading /> :
    <CardComponent
      {...pokemonData}
      {...props}
      invalidateImage={invalidateImage}
      handleFavorite={handleFavorite}
    />
  )
}

export default Wrapper