import React from 'react'
import { Overline } from '../../atoms/Overline'
import { ResisesColumns } from '../ResisesColumns'
import { Column } from '../../atoms/Column'
import { Button } from './../../atoms/Button/index'
import { Text } from './../../atoms'
import {
  ActionButton,
  ModalWrapper,
  SectionDetailOrder
} from './styled'

export const ModalDetailOrder = ({
  dataModal = {},
  dataStore,
  openAction = false,
  handleOpenActions = () => { return },
  onPress = () => { return }
}) => {
  const { pSState, pCodeRef } =  dataModal
  console.log({dataStore})
  const stateOrder = {
    0: 'Confirmado',
    2: 'En Proceso',
    3: 'Listo Para Entrega',
    4: 'Pedido Concluido',
    5: 'Rechazado',
  }
  return (
    <>
    <Overline
        show
        zIndex='9800'
        bgColor='rgba(0,0,0,.4)'
        onClick={() => { return onPress()}}
     />
    <ModalWrapper>
      <ResisesColumns backgroundColor='transparent' padding='0' lastMinWidth={200}>
        <div className='modal--section__main'>
        <Text as='h1' fontSize='24px' color='#172b4d'>{pCodeRef}</Text>
        </div>
        <div className='modal--section__sec'>
          <Column position='relative'>
            <Button
              color='#ffffff'
              width='90%'
              padding='5px'
              borderRadius='2px'
              backgroundColor={'#ff0000'}
              onClick={()=> { return handleOpenActions() }}
            >
              {stateOrder[pSState]}
            </Button>
            <Column>
            {openAction &&
            <ActionButton onPress={() => { return  }}>
              <div className='option' onClick={() => { return }}> Confirmar pedido</div>
              <div className='option' onClick={() => { return }}> Pedido en proceso</div>
              <div className='option' onClick={() => { return }}> Pedido en listo para entrega</div>
              <div className='option' onClick={() => { return }}> Pedido concluido</div>
              <div className='option' onClick={() => { return }}> Rechazar pedido</div>
            </ActionButton>
            }
            </Column>
          </Column>
          <Column>
          <SectionDetailOrder>
            <div className='header-detail'>
              <Text fontSize='14px' >Detalles</Text>
            </div>

            <div className='header-responsible'>
              <Text fontSize='14px' >Responsable</Text>
              <Text fontSize='14px' >{dataStore?.storeName}</Text>
            </div>

            <div className='header-responsible'>
              <Text fontSize='14px' >Canal</Text>
              <Text fontSize='14px' >DELIVERY-APP</Text>
            </div>
          </SectionDetailOrder>
          </Column>
        </div>
      </ResisesColumns>
    </ModalWrapper>
    </>
  )
}

