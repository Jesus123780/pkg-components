import React from 'react'
import {
  Button,
  Checkbox,
  Divider
} from '../../atoms'
import {
  AlertInfo,
  ChoicesHeader,
  InputHooks,
  QuantityButton
} from '../../molecules'
import { ContentCheckbox } from './styled'
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
  title?: string
  handleAddList?: (args: {
    title: string
    numberLimit: string
  }) => void
  setSelectedExtra?: (
    args:
    | SelectedExtra
    | ((prev: SelectedExtra) => SelectedExtra)
  ) => void
  handleCheck?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleShowTooltip?: (message: string) => void
  setNumberLimit?: React.Dispatch<React.SetStateAction<number>>
  setShowTooltip?: (show: boolean) => void
  setTitle?: (text: string) => void
  sendNotification?: (args: {
    description: string
    title: string
    backgroundColor: string
  }) => void
}

/**
 * FormExtra component for creating and editing product option lists.
 *
 * A list represents a group of optional products such as toppings,
 * sauces or additional ingredients that customers can select.
 *
 * @param {Props} props - Component properties.
 * @returns {JSX.Element} Rendered extra list form.
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
  title = '',
  handleAddList = (args) => args,
  setSelectedExtra = (args) =>
    typeof args === 'function' ? args(selectedExtra) : args,
  handleCheck = (event) => event,
  setNumberLimit = (number) => number,
  setTitle = (text) => text,
  sendNotification = (args) => args
}) => {
  const defaultTitle = 'Escoge tu...'
  const finalTitle = title || defaultTitle
  const emptyTitle = title.trim() === ''

  /**
   * Converts a quantity value into a valid number.
   *
   * @param {string | number} limit - Quantity value.
   * @returns {number} Parsed quantity or zero when invalid.
   */
  const parseNumberLimit = (limit: string | number): number => {
    const parsedLimit = Number(limit)

    return Number.isFinite(parsedLimit)
      ? Math.max(0, parsedLimit)
      : 0
  }

  /**
   * Determines whether the quantity limit is exactly one.
   *
   * @param {string | number} limit - Quantity value.
   * @returns {boolean} True when the limit equals one.
   */
  const isLimitEqualToOne = (limit: string | number): boolean =>
    parseNumberLimit(limit) === 1

  const quantity = isEdit
    ? parseNumberLimit(selectedExtra.numberLimit)
    : parseNumberLimit(numberLimit)

  const showNegativeButton = isEdit
    ? isLimitEqualToOne(selectedExtra.numberLimit)
    : isLimitEqualToOne(numberLimit)

  /**
   * Handles adding a new extra list.
   *
   * @returns {void}
   */
  const handleAddExtraList = (): void => {
    if (emptyTitle) {
      sendNotification({
        description: 'Ingresa un nombre para la lista de opciones.',
        title: 'Falta el nombre de la lista',
        backgroundColor: 'error'
      })

      return
    }

    handleAddList({
      title: title.trim(),
      numberLimit: String(numberLimit)
    })
  }

  return (
    <div style={{ height: '100%' }}>
      <div>
        <Divider
          marginTop={getGlobalStyle('--spacing-2xl')}
        />

        <AlertInfo
          type='warning'
          message={
            'Las listas te permiten agrupar productos que el cliente puede elegir al personalizar su pedido. ' +
            'Por ejemplo: “Salsas”, “Toppings” o “Acompañamientos”. ' +
            'Define cuántas opciones puede seleccionar y si la elección será obligatoria.'
          }
        />

        <ChoicesHeader
          description={`El cliente podrá escoger hasta ${
            isEdit
              ? selectedExtra.numberLimit
              : numberLimit || 0
          } opción${
            Number(
              isEdit
                ? selectedExtra.numberLimit
                : numberLimit
            ) === 1
              ? ''
              : 'es'
          }.`}
          title={finalTitle}
          label={
            isEdit
              ? selectedExtra.required === 1
                ? 'Obligatorio'
                : ''
              : setCheck.exState
                ? 'Obligatorio'
                : ''
          }
        />

        <InputHooks
          name='title'
          onChange={(e) => {
            const value = e.target.value

            if (isEdit) {
              setSelectedExtra({
                ...selectedExtra,
                title: value
              })

              return
            }

            setTitle(value)
          }}
          onKeyDown={(e) => {
            if (isEdit) {
              return
            }

            if (e.key === 'Enter') {
              e.preventDefault()
              handleAddExtraList()
            }
          }}
          title='Nombre de la lista'
          type='text'
          value={
            isEdit
              ? selectedExtra.title
              : title
          }
          info='Usa un nombre claro que indique qué opciones encontrará el cliente.'
        />

        <div>
          <ContentCheckbox>
            <Checkbox
              label='Marcar como obligatorio.'
              checked={
                isEdit
                  ? selectedExtra.required === 1
                  : Boolean(setCheck.exState)
              }
              id={
                isEdit
                  ? 'selectedExtraCheckbox'
                  : 'setCheckCheckbox'
              }
              name='exState'
              onChange={(e) => {
                if (isEdit) {
                  setSelectedExtra(
                    (prevSelectedExtra) => ({
                      ...prevSelectedExtra,
                      required:
                        prevSelectedExtra.required === 1
                          ? 0
                          : 1
                    })
                  )

                  return
                }

                handleCheck(e)
              }}
              type='checkbox'
            />
          </ContentCheckbox>
          <QuantityButton
            handleDecrement={() => {
              if (isEdit) {
                setSelectedExtra(
                  (prevSelectedExtra) => ({
                    ...prevSelectedExtra,
                    numberLimit: Math.max(
                      1,
                      parseNumberLimit(
                        prevSelectedExtra.numberLimit
                      ) - 1
                    )
                  })
                )

                return
              }

              setNumberLimit(
                (prevNumberLimit) =>
                  Math.max(
                    1,
                    parseNumberLimit(prevNumberLimit) - 1
                  )
              )
            }}
            handleIncrement={() => {
              if (isEdit) {
                setSelectedExtra(
                  (prevSelectedExtra) => ({
                    ...prevSelectedExtra,
                    numberLimit:
                      parseNumberLimit(
                        prevSelectedExtra.numberLimit
                      ) + 1
                  })
                )

                return
              }

              setNumberLimit(
                (prevNumberLimit) =>
                  parseNumberLimit(prevNumberLimit) + 1
              )
            }}
            quantity={quantity}
            showNegativeButton={showNegativeButton}
          />

          <AlertInfo
            type='warning'
            message={
              `Límite de selección: el cliente podrá elegir hasta ${
                quantity || 1
              } opción${
                quantity === 1
                  ? ''
                  : 'es'
              } de esta lista. ` +
              'Ejemplo: si defines 2 en “Toppings”, podrá seleccionar hasta 2 toppings.'
            }
          />

          {!isEdit && (
            <>
              <Divider
                marginTop={getGlobalStyle('--spacing-xl')}
              />

              <Button
                disabled={emptyTitle}
                padding={getGlobalStyle('--spacing-xl')}
                primary
                width='100%'
                borderRadius='0.25rem'
                onClick={handleAddExtraList}
              >
                Añadir
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
