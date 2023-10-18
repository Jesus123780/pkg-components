import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { PColor } from '../../../assets/colors'

export const Placeholder = ({ onClick = () => { return } }) => {
  return (
    <Container>
      <div className='container'>
        <div className='container--content__image'>
          <Image
            alt={''}
            blurDataURL='/images/DEFAULTBANNER.png'
            className='image_item'
            height={200}
            src={'/images/DEFAULTBANNER.png'}
            width={200}
          />
        </div>
        <button className='button' onClick={onClick}>
          <div className='button_icon'>
            {/* ICon camera */}
            Escoge una imagen
          </div>
        </button>
      </div>
    </Container>
  )
}
const Container = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .container--content__image {
      width: 80px !important;
      height: 80px !important;
      img {
        object-fit: contain !important;
      }
    }
  }
  .button {
    border: 1px solid ${PColor};
    padding: 5px;
    width: 300px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
  }
  .button_icon {
    font-family: PFont-Light;
    text-align: center;
  }
`
