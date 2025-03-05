export const handleAnimationQuantity = (
  direction: 'up' | 'down',
  setStartAnimateUp: React.Dispatch<React.SetStateAction<string>>
): void => {
  setStartAnimateUp('')

  const delay = direction === 'up' ? 250 : 150
  const startAnimation = direction === 'up' ? 'start-animate-up' : 'start-animate-down'

  setTimeout(() => {
    setStartAnimateUp(startAnimation)
    setTimeout(() => {
      setStartAnimateUp('')
    }, delay)
  }, 0)
}
