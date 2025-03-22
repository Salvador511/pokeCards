import capitalizeFirstLetter from "./capitalizeFirstLetter"
const adapterMovementsNames = rawMovement => {
  const movement = rawMovement.replace(/\W+/g, ' ')
  return capitalizeFirstLetter(movement)
}

export default adapterMovementsNames