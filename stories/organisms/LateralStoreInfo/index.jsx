import PropTypes from 'prop-types'
import React from 'react'
import { Rate } from '../../molecules'
import { AsideInfoStore } from '../../molecules/AsideInfoStore'
import { HeaderSteps } from '../../molecules/HeaderSteps'
import { Text, Button, Row, Column } from '../../atoms'
import { Divider } from '../../atoms/Divider'

export const LateralStoreInfo = ({
  active = 0,
  fState = 0,
  idStore = '',
  minOrder = false,
  overActive = 0,
  rating = 0,
  show,
  steps = [],
  schedulesStore = [],
  setRatingStar = (props) => {
    return props
  },
  handleClose = () => {
    return
  },
  setActive = (active) => {
    return active
  },
  setRating = (active) => {
    return active
  },
  handleOverActive = (index) => {
    return index
  },
  removeFav = (props) => {
    return props
  },
  addFav = (props) => {
    return props
  }
}) => {
  return (
    <AsideInfoStore handleClose={handleClose} show={show}>
      <div style={{ width: '90%', margin: 'auto' }}>
        <HeaderSteps
          active={active}
          handleOverActive={handleOverActive}
          overActive={overActive}
          setActive={setActive}
          steps={steps}
        />
        {active === 0 && (
          <>
            <div style={{ width: '50%' }}>
              <Text margin='0 0 20px 0'>Califica este restaurante</Text>
              <div style={{ width: 'min-content' }}>
                <Rate
                  onRating={(rate) => {
                    setRating(rate)
                    setRatingStar({
                      variables: {
                        data: {
                          rScore: rate
                        }
                      }
                    })
                  }}
                  rating={rating}
                  size={30}
                />
              </div>
            </div>
            <Divider borderTop={true} margin='20px 0' />
            <div
              className='containe'
              style={{ width: '50%', justifyContent: 'end' }}
            >
              {!!minOrder && (
                <Text margin='0 0 20px 0' size='15px'>
                  Precio de Producto mínimo $ {minOrder}
                </Text>
              )}
              <Text margin='0 0 20px 0'>
                {fState === 1 ? 'Elimina de' : 'Añade de '} tus favoritos
              </Text>
              <Button
                isLiked={fState === 1}
                onClick={() => {
                  return fState === 1
                    ? removeFav(idStore, fState)
                    : addFav(idStore)
                }}
              >
                {fState === 1 ? 'Eliminar' : 'Añadir'}
              </Button>
            </div>
          </>
        )}
        {active === 1 &&
          schedulesStore.map((schedule, index) => {
            return (
              <Column key={index}>
                <Row>
                  <Text margin='0 20px 20px 0'>{schedule.day}</Text>
                  {schedule?.horarios?.map((horario, i) => {return (
                    <div key={i}>
                      <Row>
                        <Text margin='0 0 10px 0'>
                          {horario.horaInicio || 'Cerrado'}
                        </Text>
                        <Text margin='0 0 10px 0'> - </Text>
                        <Text margin='0 0 10px 0'>
                          {horario.horaFin || 'Cerrado'}
                        </Text>
                      </Row>
                    </div>
                  )})}
                </Row>
                <Divider borderTop={true} margin='0 0 10px 0' />
              </Column>
            )
          })}
      </div>
    </AsideInfoStore>
  )
}

LateralStoreInfo.propTypes = {
  active: PropTypes.number,
  addFav: PropTypes.func,
  fState: PropTypes.number,
  handleClose: PropTypes.func,
  setRating: PropTypes.func,
  setActive: PropTypes.func,
  handleOverActive: PropTypes.func,
  idStore: PropTypes.string,
  minOrder: PropTypes.bool,
  rating: PropTypes.number,
  overActive: PropTypes.number,
  removeFav: PropTypes.func,
  setRatingStar: PropTypes.func,
  show: PropTypes.bool,
  steps: PropTypes.array,
  schedulesStore: PropTypes.array
}
