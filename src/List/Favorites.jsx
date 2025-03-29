import { styled } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'
import { Typography as T, Button, Modal } from '@mui/material'
import { CardComponent } from '../Card'
import { useStore } from '../Store/store'
import getClassPrefixer from '../Lib/getClassPrefixer'
import { useState } from 'react'

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


const Favorites = () => {
  const favorites = useStore(state => state.favorites)
  const [open, setOpen] = useState(false)
  const [currentFavorites, setCurrentFavorites] = useState(null)
  
  return(
    <Container>
      {favorites.map((favorites, index) => (
        <Button key={`${favorites?.name}-${index}`} onClick={() => {
          setCurrentFavorites(favorites)
          setOpen(true)
        }}>
          <div  className={classes.content}>
          <T>{favorites?.name}</T>
          <img src={favorites.sprite} />
          </div>
        </Button>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <CardComponent {...currentFavorites} favs={true}/>
      </Modal>
    </Container>
  )
}

export default Favorites