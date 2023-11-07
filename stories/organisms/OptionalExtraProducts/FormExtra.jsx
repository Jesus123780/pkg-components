import PropTypes from 'prop-types'
import React from 'react'
import { BGColor, PColor } from '../../../assets/colors'
import { IconQuestion } from '../../../assets/icons'
import { Button, Checkbox, Tag, Text } from '../../atoms'
import { InputHooks, QuantityButton } from '../../molecules'
import { ContentCheckbox, GarnishChoicesHeader } from './styled'

export const FormExtra = ({
  isEdit = false,
  numberLimit = '',
  selectedExtra = {},
  setCheck,
  showTooltip,
  title = '',
  handleAddList = () => {
    return
  },
  setSelectedExtra = () => {
    return
  },
  handleCheck = () => {
    return
  },
  handleShowTooltip = () => {
    return
  },
  setNumberLimit = () => {
    return
  },
  setShowTooltip = () => {
    return
  },
  setTitle = () => {
    return
  },
  sendNotification = () => {
    return
  }
}) => {
  const defaultTitle = 'Escoge tu... '
  const finalTitle = title || defaultTitle
  const emptyTitle = title?.trim() === ''

  return (
    <div style={{ height: '100%' }}>
      <div>
        <GarnishChoicesHeader>
          <div className='content'>
            <div>
              <p className='garnish-choices__title'>{finalTitle}</p>
              <p className='garnish-choices__title-desc'>
                Escoge hasta  {isEdit ? selectedExtra?.numberLimit : numberLimit}{' '}
                opciones.
              </p>
            </div>
            <div className='garnish-choices'>
              {isEdit
                ? !!selectedExtra?.required && <Tag />
                : setCheck.exState === true && <Tag />}
            </div>
          </div>
          {!isEdit && (
            <Button
              backgroundColor='transparent'
              border='none'
              onClick={() => {
                return handleShowTooltip('main')
              }}
              primary
            >
              {showTooltip === 'main' && !isEdit && (
                <div className='tooltip' style={{ right: 0, top: 70 }}>
                  <Text color='var(--color-neutral-black)' fontSize='.75rem'>
                    Si no completas el numero de items no se mostraran a los
                    clientes
                  </Text>
                  <Button
                    Button
                    backgroundColor='transparent'
                    border='none'
                    className='btn-ok'
                    onClick={() => {
                      return setShowTooltip(false)
                    }}
                    primary
                  >
                    <Text color={PColor} fontWeight='600'>
                      Ok, entendí
                    </Text>
                  </Button>
                </div>
              )}
              <IconQuestion size={30} />
            </Button>
          )}
        </GarnishChoicesHeader>
        <InputHooks
          name='title'
          onChange={(e) => {
            if (isEdit)
              return setSelectedExtra({
                ...selectedExtra,
                title: e.target.value
              })
            return setTitle(e.target.value)
          }}
          onKeyDown={(e) => {
            if (isEdit) return
            if (e.key === 'Enter') {
              handleAddList({ title: title, numberLimit: numberLimit })
            }
          }}
          title='Añadir nueva lista'
          type='text'
          value={isEdit ? selectedExtra?.title : title}
        />
        <GarnishChoicesHeader>
          <ContentCheckbox>
            <Checkbox
              checkbox
              checked={isEdit ? (selectedExtra?.required === 1 ) : (!!setCheck.exState)}
              id={
                isEdit ? 'selectedExtraCheckbox'
                  : 'setCheckCheckbox'
              }
              margin='10px 0'
              name='exState'
              onChange={(e) => {
                if (isEdit) {
                  setSelectedExtra((prevSelectedExtra) => {return {
                    ...selectedExtra,
                    required: prevSelectedExtra.required === 1 ? 0 : 1
                  }})
                } else {
                  handleCheck(e)
                }
              }}
              type='checkbox'
            />
          </ContentCheckbox>
          <QuantityButton
            handleDecrement={() => {
              if (isEdit)
                return setSelectedExtra({
                  ...selectedExtra,
                  numberLimit: selectedExtra?.numberLimit - 1
                })
              return setNumberLimit(numberLimit === 0 ? 0 : numberLimit - 1)
            }}
            handleIncrement={() => {
              if (isEdit)
                return setSelectedExtra({
                  ...selectedExtra,
                  numberLimit: selectedExtra?.numberLimit + 1
                })
              return setNumberLimit(numberLimit + 1)
            }}
            quantity={isEdit ? selectedExtra?.numberLimit : numberLimit}
            showNegativeButton={isEdit ? (selectedExtra?.numberLimit === 1) : (numberLimit === 1)}

          />
          {!isEdit && (
            <Button
              backgroundColor={PColor}
              borderRadius='0'
              color={BGColor}
              disabled={emptyTitle}
              fontWeight='300'
              margin='0 0 0 10px'
              onClick={() => {
                if (emptyTitle) {
                  return sendNotification({
                    description: 'hace falta el titulo de la sobremesa',
                    title: 'Error',
                    backgroundColor: 'error'
                  })
                }
                return handleAddList({
                  title: title,
                  numberLimit: numberLimit
                })
              }}
              type='button'
              width='100%'
            >
              Añadir
            </Button>
          )}
        </GarnishChoicesHeader>
      </div>
    </div>
  )
}

FormExtra.propTypes = {
  handleAddList: PropTypes.func,
  handleCheck: PropTypes.func,
  handleShowTooltip: PropTypes.func,
  isEdit: PropTypes.bool,
  numberLimit: PropTypes.string,
  selectedExtra: PropTypes.object,
  sendNotification: PropTypes.func,
  setCheck: PropTypes.shape({
    exState: PropTypes.bool
  }),
  setNumberLimit: PropTypes.func,
  setSelectedExtra: PropTypes.func,
  setShowTooltip: PropTypes.func,
  setTitle: PropTypes.func,
  showTooltip: PropTypes.string,
  title: PropTypes.string
}
