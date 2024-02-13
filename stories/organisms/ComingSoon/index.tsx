
import React from 'react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'
import { RippleButton } from '../../atoms'

// Estilos usando styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
`

const Message = styled.h1`
  font-size: 3rem;
  color: var(--color-neutral-gray-dark);
  text-align: center;
`

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinningIcon = styled.span`
  display: inline-block;
  font-size: 2rem;
  margin-left: 10px;
  animation: ${rotateAnimation} 2s linear infinite;
`

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
}
export const ComingSoon = () => {
  const router = useRouter()

  return (
    <Container>
      <div style={style}>
        <Message>Muy pronto <SpinningIcon>🚀</SpinningIcon></Message>
        <RippleButton onClick={() => { return router.back() }} widthButton='200px' >Regresar</RippleButton>
      </div>
    </Container>
  )
}

