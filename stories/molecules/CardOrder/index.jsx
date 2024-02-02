import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
  IconInformationProduct,
  IconMiniCheck,
  IconTime
} from '../../../assets'
import { getGlobalStyle } from '../../../utils'
import { Button, Row, Text } from '../../atoms'
import style from './CardOrder.module.css'
import { calculateRemainingTime, color } from './helpers'

export const CardOrder = ({
  pCodeRef = '',
  view = true,
  pDatCre = '',
  deliveryTimeMinutes = null,
  handleViewOrder = (pCodeRef) => {
    return pCodeRef
  }
}) => {
  const label = 'Nuevo Pedido'
  const { minutes, hour, remainingTimeText, entregaText, delay } =
    deliveryTimeMinutes
      ? calculateRemainingTime(pDatCre, deliveryTimeMinutes)
      : {
        minutes: '',
        hour: '',
        remainingTimeText: '',
        entregaText: '',
        delay: false
      }
  return (
    <div
      className={style.card}
      style={
        view
          ? { borderLeft: '5px solid var(--color-feedback-warning-light)' }
          : {}
      }
    >
      <div className={style.card_header}>
        <div className={style.card_header_content}>
          <Text className={style.card_header_title}>
            <div style={{ width: '20px', marginRight: '20px' }}>
              <IconInformationProduct
                color={getGlobalStyle('--color-icons-black')}
                size={25}
              />
            </div>
            {label}
          </Text>
          <IconMiniCheck color={color[1]} size={20} />
        </div>
      </div>
      <div className={style.card_content}>
        <div className={style.card_content_action}>
          <Text className={style.card_text_code}># {pCodeRef}</Text>
          <Button
            onClick={() => {
              return handleViewOrder(pCodeRef)
            }}
            primary={true}
          >
            Ver
          </Button>
        </div>
        <Bubble color={color[1]}>
          <span className='bubble-outer-dot'>
            <span className='bubble-inner-dot'></span>
          </span>
        </Bubble>
        <Text className={style.card_text_content}>Confirmar pedido</Text>
        <div className={style.content__delivery_time}>
          {Boolean(delay) && (
            <Text className={style.card_text_content}>
              {`Retrasado: ${remainingTimeText}`}
            </Text>
          )}
          {Boolean(!delay) && <Row alignItems='center'>
            <div style={{ width: '20px', marginRight: '20px' }}>
              <IconTime size={25} />
            </div>
            {Boolean(!delay) && (
              <Text className={style.card_text_content}>
                {`Tiempo de entrega: ${hour ? `${hour}h` : ''} ${
                  minutes || ''
                }`}
              </Text>
            )}
          </Row>}
          {Boolean(!delay) && <Row alignItems='center'>
            <div style={{ width: '20px', marginRight: '20px' }}>
              <IconTime size={25} />
            </div>
            {Boolean(!delay) && (
              <Text className={style.card_text_content}>{entregaText}</Text>
            )}
          </Row>}
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
    background-color: ${({ color }) => {
    return color || ''
  }};
  }

  &:after {
    content: "";
    background-color: ${({ color }) => {
    return color || ''
  }};
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
    background-color: ${({ color }) => {
    return color || ''
  }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }

  .bubble-inner-dot {
    display: block;
    text-align: center;
    opacity: 1;
    background-color: ${({ color }) => {
    return color || ''
  }};
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
    background-color: ${({ color }) => {
    return color || ''
  }};
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
  view: PropTypes.bool,
  handleViewOrder: PropTypes.func
}
