/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles'
import getClassPrefixer from '../Lib/getClassPrefixer'
import { indigo, yellow, grey } from '@mui/material/colors'
import { Stack, Typography as T } from '@mui/material'
import { useEffect, useState } from 'react'

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
  [`& .${classes.movements}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem 1.4rem',
  }
})

const Card = ({ backgroundColor, name, healthPoints, imgUrl, bgImgUrl, movements }) => {
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
          </div>
        </Stack>
        <div className={classes.movements}>
          <T fontWeight='bold'>Movements</T>
          {movements.map(movement => (
            // eslint-disable-next-line react/jsx-key
            <Stack
              direction='row'
              justifyContent='space-between'
            >
              <T>{movement?.name}</T>
              <T>{`PP: ${movement?.pp}`}</T>
            </Stack>
          ))}
        </div>
      </div>
    </Container>
  )
}

const Wrapper = () => {
  const [bgImgUrl, setBgImgUrl] = useState('')
  const backgroundColor = indigo[400]
  const movement1 = { name: 'Mega Punch', pp: 20 }
  const movement2 = { name: 'Fire Punch', pp: 15 }
  const movement3 = { name: 'Pay Day', pp: 10 }
  const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
  
  const requestBgImgUrl = async () => {
    const backgroundImgUrl = await fetch(`${randomImgUrl}/${widthRequestImg}/${heightRequestImg}/?blur=2`)
    .then(response => response.url)
    setBgImgUrl(backgroundImgUrl)
  }

  useEffect(() => {
    requestBgImgUrl()
  }, [])

  return (
    <Card
      imgUrl={imgUrl}
      bgImgUrl={bgImgUrl}
      backgroundColor={backgroundColor} 
      movements={[movement1, movement2, movement3]}
    />
  )
}

export default Wrapper