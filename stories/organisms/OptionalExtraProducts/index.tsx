'use client'

import React, { useState } from 'react'

import {
  NorthTexasGreen
} from '../../../assets/colors'

import {
  Column,
  Icon,
  RippleButton,
  Tag
} from '../../atoms'

import {
  ChoicesHeader,
  InputHooks
} from '../../molecules'

import {
  AwesomeModal,
  List,
  ResisesColumns
} from '../../organisms'

import { FormExtra } from './FormExtra'
import { BodyDnd } from './styled'
import { getGlobalStyle } from '../../../helpers'
import { type NotificationProps } from '../../../types/global'

interface IOptionalExtraProducts {
  title: string
  dataListIds: string[]
  data: any
  loadingEditSubOptional: any
  selectedItem: any
  selectedExtra: any
  openModalEditExtra: boolean
  loadingCreateSubDessert: boolean
  handleCheck: any
  editOneItem: any
  handleRemoveList: any
  setTitle: any
  setCheck: any
  handleChangeItems: any
  handleAdd: any
  removeOneItem: any
  handleAddList: any
  setData: any
  editOneExtra: any
  setSelectedExtra: (args: any) => void
  setOpenModalEditExtra: (boolean: boolean) => void
  sendNotification?: (
    notification: NotificationProps
  ) => void
}

export const OptionalExtraProducts:
React.FC<IOptionalExtraProducts> = ({
  title = '',
  dataListIds = [],
  data = {
    lists: []
  },
  loadingCreateSubDessert = false,
  loadingEditSubOptional,
  selectedItem = {
    id: '',
    listID: ''
  },
  selectedExtra,
  openModalEditExtra = false,

  setSelectedExtra = (args) => {
    return args
  },

  setOpenModalEditExtra = (
    boolean: boolean
  ) => {
    return boolean
  },

  handleCheck = () => {},

  editOneItem = () => {},

  handleRemoveList = () => {},

  setTitle = () => {},

  setCheck = {},

  handleChangeItems = () => {},

  handleAdd = () => {},

  removeOneItem = () => {},

  handleAddList = () => {},

  setData = () => {},

  editOneExtra = () => {},

  sendNotification = () => {}
}) => {
  const [
    numberLimit,
    setNumberLimit
  ] = useState<number>(1)

  /**
     * Valida el value del input.
     *
     * Considera vacío:
     * ''
     * '   '
     * null
     * undefined
     */
  const isValueEmpty = (
    value: unknown
  ): boolean => {
    return String(
      value ?? ''
    ).trim() === ''
  }

  /**
     * Notificación centralizada para no repetir
     * el mismo objeto en diferentes eventos.
     */
  const notifyEmptyValue = (): void => {
    sendNotification({
      description:
          'El título no debe estar vacío',
      title: 'Error',
      backgroundColor:
          'warning'
    })
  }

  return (
      <BodyDnd>
        <ResisesColumns
          backgroundColor='transparent'
          initialDividerPosition={{
            __0: 70,
            __1: 30
          }}
          lastMinWidth='auto'
          padding='0'
        >
          <div className='first-column'>
            {dataListIds?.map(
              (
                listID,
                index
              ) => {
                const list =
                  data?.lists?.[
                    listID
                  ]

                const numberLimit =
                  list?.numberLimit

                const cardsLength =
                  Array.isArray(
                    list?.cards
                  )
                    ? list.cards.length
                    : 0

                const incompleteList =
                  Number(
                    numberLimit
                  ) ===
                  Number(
                    cardsLength
                  )

                const messageLimit =
                  `${numberLimit} ${
                    Number(
                      numberLimit
                    ) > 1
                      ? 'opciones'
                      : 'opción'
                  }`

                return (
                  <Column
                    style={{
                      border:
                        `2px solid ${
                          incompleteList
                            ? NorthTexasGreen
                            : 'transparent'
                        }`,
                      height:
                        'min-content'
                    }}
                    key={listID}
                  >
                    <ChoicesHeader
                      title={
                        list?.title
                      }
                      description={
                        `Escoge hasta ${messageLimit}.`
                      }
                      label={
                        list?.required ===
                        1
                          ? 'Requerido'
                          : ''
                      }
                      deleting={
                        true
                      }
                      edit={
                        true
                      }
                      handleDelete={() => {
                        return handleRemoveList(
                          index,
                          listID
                        )
                      }}
                      handleEdit={() => {
                        setOpenModalEditExtra(
                          !openModalEditExtra
                        )

                        return setSelectedExtra(
                          list
                        )
                      }}
                    />

                    <div className='contain-check-item'>
                      <Tag
                        label={
                          `Total de items ${cardsLength} / ${numberLimit}`
                        }
                      />

                      {incompleteList && (
                        <Icon
                          icon='IconMiniCheck'
                          size={15}
                        />
                      )}
                    </div>

                    <List
                      data={
                        data
                      }
                      editOneItem={
                        editOneItem
                      }
                      list={
                        list
                      }
                      listID={
                        listID
                      }
                      loadingEditSubOptional={
                        loadingEditSubOptional
                      }
                      removeOneItem={
                        removeOneItem
                      }
                      selectedItem={
                        selectedItem
                      }
                      setData={
                        setData
                      }
                    />

                    <InputHooks
                      range={{
                        max: 255,
                        min: 3
                      }}
                      tabIndex={
                        index
                      }
                      autoFocus={
                        true
                      }
                      name='list_value'
                      onChange={(
                        value
                      ) => {
                        return handleChangeItems({
                          listID,
                          id: list.id,
                          value,
                          name: 'list_value'
                        })
                      }}
                      onKeyDown={(
                        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
                      ) => {
                        if (
                          e.key !== 'Enter'
                        ) {
                          return
                        }

                        const value =
                          String(
                            list?.value ??
                              ''
                          ).trim()

                        if (
                          isValueEmpty(
                            value
                          )
                        ) {
                          e.preventDefault()

                          notifyEmptyValue()

                          return
                        }

                        if (
                          !incompleteList
                        ) {
                          handleAdd({
                            listId:
                              listID
                          })
                        }
                      }}
                      title='Agrega un subproducto'
                      value={
                        list?.value
                      }
                    />

                    <RippleButton
                      tabIndex={
                        index + 1
                      }
                      loading={
                        loadingCreateSubDessert
                      }
                      disabled={
                        incompleteList
                      }
                      margin='16px 0 auto'
                      onClick={() => {
                        const value =
                          String(
                            list?.value ??
                              ''
                          ).trim()

                        if (
                          isValueEmpty(
                            value
                          )
                        ) {
                          notifyEmptyValue()
                          return
                        }

                        if (
                          incompleteList
                        ) {
                          return null
                        }

                        return handleAdd({
                          listId:
                            listID
                        })
                      }}
                      onKeyPress={(
                        e: React.KeyboardEvent<HTMLButtonElement>
                      ) => {
                        if (
                          e.key !==
                          'Enter'
                        ) {
                          return
                        }

                        const value =
                          String(
                            list?.value ??
                              ''
                          ).trim()

                        if (
                          isValueEmpty(
                            value
                          )
                        ) {
                          e.preventDefault()

                          notifyEmptyValue()

                          return
                        }

                        if (
                          !incompleteList
                        ) {
                          handleAdd({
                            listId:
                              listID
                          })
                        }
                      }}
                    >
                      Agregar
                    </RippleButton>
                  </Column>
                )
              }
            )}
          </div>

          <FormExtra
            handleAddList={
              handleAddList
            }
            handleCheck={
              handleCheck
            }
            numberLimit={
              String(
                numberLimit
              )
            }
            setCheck={
              setCheck
            }
            setNumberLimit={
              setNumberLimit
            }
            setTitle={
              setTitle
            }
            title={
              title
            }
          />
        </ResisesColumns>

        <AwesomeModal
          borderRadius='4px'
          customHeight='auto'
          footer={false}
          header={false}
          height='auto'
          onCancel={() => {
            setSelectedExtra(
              {}
            )

            return false
          }}
          onHide={() => {
            setSelectedExtra(
              {}
            )

            return setOpenModalEditExtra(
              !openModalEditExtra
            )
          }}
          padding={0}
          question={false}
          show={
            openModalEditExtra
          }
          size='600px'
          zIndex={getGlobalStyle(
            '--z-index-9999'
          )}
        >
          <FormExtra
            handleAddList={
              handleAddList
            }
            isEdit={
              true
            }
            numberLimit={
              String(
                numberLimit
              )
            }
            selectedExtra={
              selectedExtra
            }
            setCheck={
              setCheck
            }
            setSelectedExtra={
              setSelectedExtra
            }
            setTitle={
              setTitle
            }
            title={
              title
            }
          />

          <RippleButton
            onClick={() => {
              editOneExtra({
                ...selectedExtra
              })
            }}
            style={{
              margin:
                'var(--spacing-xs) auto',
              justifyContent:
                'center',
              alignItems:
                'center',
              display:
                'flex'
            }}
          >
            Guardar
          </RippleButton>
        </AwesomeModal>
      </BodyDnd>
  )
}
