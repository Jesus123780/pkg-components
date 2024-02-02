import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { IconMiniCheck, IconTime } from '../../../assets'
import { Button, Row, Text } from '../../atoms'
import style from './CardOrder.module.css'
import { calculateRemainingTime, color } from './helpers'

export const CardOrder = ({
  pCodeRef = '',
  view = true,
  pDatCre = '',
  deliveryTimeMinutes = null
}) => {
  const {
    minutes,
    hour,
    remainingTimeText,
    entregaText,
    delay
  } = deliveryTimeMinutes ? calculateRemainingTime(pDatCre, deliveryTimeMinutes) : {
    minutes: '',
    hour: '',
    remainingTimeText: '',
    entregaText: '',
    delay: false
  }
  return (
    <div className={style.card} style={view ? { border: '1px solid var(--color-feedback-warning-light)' } : {}}>
      <div className={style.card_header}>
        <div className={style.card_header_content}>
          <Text className={style.card_header_title}>
            Nuevo Pedido
          </Text>
          <IconMiniCheck color={color[1]} size={10} />
        </div>
      </div>
      <div className={style.card_content}>
        <div className={style.card_content_action}>
          <Text className={style.card_text_code}>
            # {pCodeRef}
          </Text>
          <Button primary={true}>
            Ver
          </Button>
        </div>
        <Bubble color={color[1]}>
          <span className='bubble-outer-dot'>
            <span className='bubble-inner-dot'></span>
          </span>
        </Bubble>
        <Text className={style.card_text_content}>
          Confirmar pedido
        </Text>
        <div className={style.content__delivery_time}>
          {Boolean(delay) && (
            <Text className={style.card_text_content}>
              {`Retrasado: ${remainingTimeText}`}
            </Text>
          )}
          <Row alignItems='center'>
            <IconTime size='35px' />
            {Boolean(!delay) && <Text className={style.card_text_content}>
              {`Tiempo de entrega: ${hour ? `${hour}h` : ''} ${minutes ? minutes : ''}`}
            </Text>}
          </Row>
          <Row alignItems='center'>
            <IconTime size='25px' /> 
            {Boolean(!delay) && <Text className={style.card_text_content}>
              {entregaText}
            </Text>}
          </Row>
        </div>
      </div>
    </div>
  )
}
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: .75;
  }
  25% {
    transform: scale(1);
    opacity: .75;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`

export const Bubble = styled.div`
  display: block;
  position: relative;
  margin: 0;
  &:hover:after {
    background-color:  ${({ color }) => {return color || '' }};
  }

  &:after {
    content: "";
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    display: block;
    top: 1px;
    left: 1px;
  }

  .bubble-outer-dot {
    margin: 1px;
    display: block;
    text-align: center;
    opacity: 1;
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }

  .bubble-inner-dot {
    display: block;
    text-align: center;
    opacity: 1;
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }

  .bubble-inner-dot:after {
    content: "";
    display: block;
    text-align: center;
    opacity: 1;
    background-color:  ${({ color }) => {return color || '' }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }
`

CardOrder.propTypes = {
  pCodeRef: PropTypes.string,
  pDatCre: PropTypes.string,
  deliveryTimeMinutes: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  view: PropTypes.bool
}
