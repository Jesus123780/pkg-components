import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Tag
} from '../../atoms'
import { AlertInfo, InputHooks, QuantityButton } from '../../molecules'
import { ContentCheckbox, GarnishChoicesHeader } from './styled'
import { getGlobalStyle } from '../../../helpers'

interface SelectedExtra {
  numberLimit: number
  required: number
  title: string
}

interface SetCheck {
  exState: boolean
}

interface Props {
  isEdit?: boolean
  numberLimit?: string
  selectedExtra?: SelectedExtra
  setCheck?: SetCheck
  showTooltip?: string
  title?: string
  handleAddList?: (args: { title: string, numberLimit: string }) => void
  setSelectedExtra?: (args: SelectedExtra) => void
  handleCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleShowTooltip?: (string: string) => void
  setNumberLimit?: (number: string) => void
  setShowTooltip?: (boolean: boolean) => void
  setTitle?: (text: string) => void
  sendNotification?: (args: { description: string, title: string, backgroundColor: string }) => void
}

/**
 * FormExtra component for handling extra form fields.
 * @param {Object} props - Component props.
 * @param {boolean} [props.isEdit=false] - Flag indicating if the form is in edit mode.
 * @param {string} [props.numberLimit=''] - Limit for the number of entries.
 * @param {Object} [props.selectedExtra={ numberLimit: 0, required: 0, title: '' }] - Currently selected extra.
 * @param {function} [props.setCheck=()=>{}] - Function to set checkbox state.
 * @param {string} [props.showTooltip=''] - Tooltip to display.
 * @param {string} [props.title=''] - Title of the form.
 * @param {function} [props.handleAddList=(args)=>args] - Function to handle adding to the list.
 * @param {function} [props.setSelectedExtra=(args)=>args] - Function to set selected extra.
 * @param {function} [props.handleCheck=(event)=>event] - Function to handle checkbox change.
 * @param {function} [props.handleShowTooltip=(string)=>string] - Function to handle showing tooltip.
 * @param {function} [props.setNumberLimit=(number)=>number] - Function to set number limit.
 * @param {function} [props.setShowTooltip=(boolean)=>boolean] - Function to set show tooltip state.
 * @param {function} [props.setTitle=(text)=>text] - Function to set title.
 * @param {function} [props.sendNotification=(args)=>args] - Function to send notification.
 * @returns {JSX.Element} Rendered FormExtra component.
 */
export const FormExtra: React.FC<Props> = ({
  isEdit = false,
  numberLimit = '',
  selectedExtra = {
    numberLimit: 0,
    required: 0,
    title: ''
  },
  setCheck = {
    exState: false
  },
  showTooltip = '',
  title = '',
  handleAddList = (args) => {
    return args
  },
  setSelectedExtra = (args) => {
    return args
  },
  handleCheck = (event) => {
    return event
  },
  handleShowTooltip = (string) => {
    return string
  },
  setNumberLimit = (number) => {
    return number
  },
  setShowTooltip = (boolean) => {
    return boolean
  },
  setTitle = (text) => {
    return text
  },
  sendNotification = (args) => {
    return args
  }
}) => {
  const defaultTitle = 'Escoge tu... '
  const finalTitle = title ?? defaultTitle
  const emptyTitle = title?.trim() === ''

  const parseNumberLimit = (limit: string | number): void => {
    return typeof limit === 'string' ? parseInt(limit, 10) : limit
  }

  const isLimitEqualToOne = (limit: string | number): void => {
    return parseNumberLimit(limit) === 1
  }

  const quantity = isEdit
    ? parseNumberLimit(selectedExtra?.numberLimit)
    : parseNumberLimit(numberLimit)

  const showNegativeButton = isEdit
    ? isLimitEqualToOne(selectedExtra?.numberLimit)
    : isLimitEqualToOne(numberLimit)
  return (
    <div style={{ height: '100%' }}>
      <div>
        <GarnishChoicesHeader>
          <div className='content'>
            <div>
              <p className='garnish-choices__title'>{finalTitle}</p>
              <p className='garnish-choices__title-desc'>
                Escoge hasta {isEdit ? selectedExtra?.numberLimit : numberLimit}{' '}
                opciones.
              </p>
            </div>
            <div className='garnish-choices'>
              {isEdit
                ? Boolean(selectedExtra?.required) && <Tag />
                : Boolean(setCheck.exState) && <Tag />}
            </div>
          </div>
        </GarnishChoicesHeader>
        <InputHooks
          name='title'
          onChange={(e) => {
            if (isEdit) {
              setSelectedExtra({
                ...selectedExtra,
                title: e.target.value
              })
              return
            }
            setTitle(e.target.value)
          }}
          onKeyDown={(e) => {
            if (isEdit) return
            if (e.key === 'Enter') {
              handleAddList({ title, numberLimit })
            }
          }}
          title='Añadir nueva lista'
          type='text'
          value={isEdit ? selectedExtra?.title : title}
        />
        <div>
          <ContentCheckbox>
            <Checkbox
              checkbox
              label='Marcar como obligatorio.'
              checked={
                isEdit ? selectedExtra?.required === 1 : Boolean(setCheck.exState)
              }
              id={isEdit ? 'selectedExtraCheckbox' : 'setCheckCheckbox'}
              margin='10px 0'
              name='exState'
              onChange={(e) => {
                if (isEdit) {
                  setSelectedExtra(
                    (prevSelectedExtra: { required: number }) => {
                      return {
                        ...selectedExtra,
                        required: prevSelectedExtra.required === 1 ? 0 : 1
                      }
                    }
                  )
                } else {
                  handleCheck(e)
                }
              }}
              type='checkbox'
            />
          </ContentCheckbox>
          <QuantityButton
            handleDecrement={() => {
              if (isEdit) {
                setSelectedExtra((prevSelectedExtra) => ({
                  ...prevSelectedExtra,
                  numberLimit: isNaN(prevSelectedExtra?.numberLimit) ? 0 : Math.max(0, Number(prevSelectedExtra?.numberLimit) - 1)
                }))
                return
              }
              setNumberLimit((prevNumberLimit) => Math.max(0, parseInt(prevNumberLimit, 10) - 1))
            }}
            handleIncrement={() => {
              if (isEdit) {
                setSelectedExtra((prevSelectedExtra) => ({
                  ...prevSelectedExtra,
                  numberLimit: isNaN(prevSelectedExtra?.numberLimit) ? 0 : Number(prevSelectedExtra?.numberLimit) + 1
                }))
                return
              }
              setNumberLimit((prevNumberLimit) => Math.max(0, Number(prevNumberLimit) + 1))
            }}
            quantity={quantity}
            showNegativeButton={showNegativeButton}
          />

          {!isEdit && (
            <>
              <Divider marginTop={getGlobalStyle('--spacing-xl')} />
              <Button
                disabled={emptyTitle}
                padding='10px 20px'
                primary
                width='100%'
                borderRadius='0.25rem'
                onClick={() => {
                  if (emptyTitle) {
                    sendNotification({
                      description: 'hace falta el titulo de la sobremesa',
                      title: 'Error',
                      backgroundColor: 'error'
                    })
                    return
                  }
                  handleAddList({
                    title,
                    numberLimit
                  })
                }}
              >
                Añadir
              </Button>
              <Divider marginTop={getGlobalStyle('--spacing-2xl')} />
              <AlertInfo message='Agrega sub productos como adicionales, salsas... etc.' type='warning' />
            </>
          )}
        </div>
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
