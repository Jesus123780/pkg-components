
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { RippleButton } from '../../atoms'
import { useRouter } from 'next/router'

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
  color: #333;
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

export const Card = styled.div`
    font-size: 16px;
    position: relative;
    justify-content: center;
    display: flex;
    width: 50%;
    height: 100vh;
    @media only screen and (min-width: 960px) {
        &::before {
            right: 0;
            bottom: unset;
            left: auto;
            min-width: 130vh;
            min-height: 135vh;
            max-width: 80vw;
            max-height: 80vw;
            width: 80vw;
            height: 80vw;
            -webkit-transform: translate(15vw,-23%);
            transform: translate(15vw,-23%);
        }
    }
    &:before {
    content: "";
        min-width: 130vh;
        min-height: 135vh;
        width: 130vw;
        height: 130vw;
        z-index: -1;
        position: absolute;
        background-color: #fdedee;
        border-radius: 0 100% 100%;
        left: 50%;
        transform: translate(-70%);
        bottom: -70px;
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
            <Card></Card>
            <div style={style}>
                <Message>Muy pronto <SpinningIcon>🚀</SpinningIcon></Message>
                <RippleButton widthButton='200px' onClick={() => { return router.back() }} >Regresar</RippleButton>
            </div>
        </Container>
    )
}

