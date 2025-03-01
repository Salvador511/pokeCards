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
  }
})

const Card = ({ backgroundColor, name, healthPoints, imgUrl, bgImgUrl }) => {
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
      </div>
    </Container>
  )
}

const Wrapper = () => {
  const [bgImgUrl, setBgImgUrl] = useState('')
  const backgroundColor = indigo[400]
  const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
  
  const requestBgImgUrl = async () => {
    const backgroundImgUrl = await fetch(`${randomImgUrl}/${widthRequestImg}/${heightRequestImg}/?blur=2`)
    .then(response => response.url)
    setBgImgUrl(backgroundImgUrl)
    console.log(bgImgUrl, '<<<<<<<<')
  }

  useEffect(() => {
    requestBgImgUrl()
  }, [])

  return (
    <Card
      imgUrl={imgUrl}
      bgImgUrl={bgImgUrl}
      backgroundColor={backgroundColor} 
    />
  )
}

export default Wrapper