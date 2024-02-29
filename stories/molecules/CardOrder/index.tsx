import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import {
  IconInformationProduct,
  IconMiniCheck
} from '../../../assets'
import { getGlobalStyle } from '../../../utils'
import { Button, Icon, Row, Text } from '../../atoms'
import { calculateRemainingTime, color } from './helpers'
import style from './CardOrder.module.css'

interface CardOrderProps {
  pCodeRef?: string
  view?: boolean
  pDatCre?: string
  deliveryTimeMinutes?: number | null
  handleViewOrder?: (pCodeRef: string) => string
}

export const CardOrder: React.FC<CardOrderProps> = ({
  pCodeRef = '',
  view = true,
  pDatCre = '',
  deliveryTimeMinutes = null,
  handleViewOrder = (pCodeRef: string) => pCodeRef
}) => {
  const label = 'Nuevo Pedido'
  const { minutes, hour, remainingTimeText, entregaText, delay } =
    deliveryTimeMinutes !== null
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
            onClick={() => handleViewOrder(pCodeRef)}
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
          {Boolean(!(delay ?? false)) && <Row alignItems='center'>
            <div style={{ width: '20px', marginRight: '20px' }}>
              <Icon size={25} icon='time' />
            </div>
            {Boolean(!(delay ?? false)) && (
              <Text className={style.card_text_content}>
                {`Tiempo de entrega: ${hour !== null ? hour : ''} ${
                  minutes ?? ''
                }`}
              </Text>
            )}
          </Row>}
          {Boolean(!(delay ?? false)) && <Row alignItems='center'>
            <div style={{ width: '20px', marginRight: '20px' }}>
              <Icon size={25} icon='time' />
            </div>
            {Boolean(!(delay ?? false)) && (
              <Text className={style.card_text_content}>{entregaText}</Text>
            )}
          </Row>}
        </div>
      </div>
    </div>
  )
}

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

interface BubbleProps {
  color?: string
}

export const Bubble = styled.div<BubbleProps>`
  display: block;
  position: relative;
  margin: 0;

  &:hover:after {
    background-color: ${({ color }) => color ?? ''};
  }

  &:after {
    content: "";
    background-color: ${({ color }) => color ?? ''};
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
    background-color: ${({ color }) => color ?? ''};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }

  .bubble-inner-dot {
    display: block;
    text-align: center;
    opacity: 1;
    background-color: ${({ color }) => color ?? ''};
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
    background-color: ${({ color }) => color ?? ''};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${pulse} 1.5s linear infinite;
  }
`

Bubble.displayName = 'Bubble'
