import React, { useState } from 'react'
import {
  EColor,
  NorthTexasGreen
} from '../../../assets/colors'
import {
  IconDelete,
  IconEdit,
  IconMiniCheck
} from '../../../assets/icons'
import {
  Column,
  RippleButton,
  Tag
} from '../../atoms'
import { InputHooks } from '../../molecules'
import {
  AwesomeModal,
  List,
  ResisesColumns
} from '../../organisms'
import { FormExtra } from './FormExtra'
import { BodyDnd, GarnishChoicesHeader } from './styled'

interface IOptionalExtraProducts {
  title: string
  dataListIds: string[]
  data: any
  isCustomSubOpExPid: any
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

}
export const OptionalExtraProducts: React.FC<IOptionalExtraProducts> = ({
  title = '',
  dataListIds = [],
  data = {
    lists: []
  },
  isCustomSubOpExPid,
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
  setOpenModalEditExtra = (boolean: boolean) => {
    return boolean
  },
  handleCheck = () => {

  },
  editOneItem = () => {

  },
  handleRemoveList = () => {

  },
  setTitle = () => {

  },
  setCheck = {},
  handleChangeItems = () => {

  },
  handleAdd = () => {

  },
  removeOneItem = () => {

  },
  handleAddList = () => {

  },
  setData = () => {

  },
  editOneExtra = () => {

  }
}) => {
  // STATES
  const [numberLimit, setNumberLimit] = useState<number>(1)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

  /**
 * Toggles the visibility of a tooltip.
 * @param {boolean} index - The boolean value indicating tooltip visibility.
 * @returns {React.Dispatch<React.SetStateAction<boolean>>} - The state setter function.
 */
  const handleShowTooltip = (index: boolean): void => {
    return setShowTooltip((prevIndex: boolean) => (prevIndex === index ? false : index))
  }

  return (
    <BodyDnd>
      <ResisesColumns
        backgroundColor='transparent'
        initialDividerPosition={{ __0: 70, __1: 30 }}
        lastMinWidth='auto'
        padding='0'
      >
        <div className='first-column'>
          {dataListIds?.map((listID, index) => {
            const list = data.lists[listID]
            const numberLimit = list?.numberLimit
            const incompleteList = Number(list.numberLimit) === Number(list.cards.length)
            const messageLimit = `${numberLimit} ${
              numberLimit > 1 ? 'opciones' : 'opción'
            }`
            return (
              <Column
                style={{
                  border: `2px solid ${
                    incompleteList ? NorthTexasGreen : 'transparent'
                  }`,
                  height: 'min-content'
                }}
                key={listID}
              >
                <GarnishChoicesHeader
                  style={{
                    padding: '10px',
                    marginBottom: '20px',
                    display: 'flex',
                    zIndex: 999,
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p className='garnish-choices__title'>{list?.title}</p>
                    <p className='garnish-choices__title-desc'>
                      Escoge hasta  jejeje{messageLimit}.
                    </p>
                    {Boolean(list?.required === 1) && <Tag />}
                  </div>
                  <RippleButton
                    bgColor='transparent'
                    margin='0px'
                    onClick={() => {
                      return handleRemoveList(index, listID)
                    }}
                    type='button'
                    widthButton='min-content'
                  >
                    <IconDelete color={EColor} size='25px' />
                  </RippleButton>
                  <RippleButton
                    bgColor='transparent'
                    margin='0px'
                    onClick={() => {
                      setOpenModalEditExtra(!openModalEditExtra)
                      return setSelectedExtra(list)
                    }}
                    type='button'
                    widthButton='min-content'
                  >
                    <IconEdit color={EColor} size='25px' />
                  </RippleButton>
                </GarnishChoicesHeader>
                <div className='contain-check-item'>
                  <Tag
                    label={`Total de items ${list?.cards?.length} / ${numberLimit}`}
                  />
                  {incompleteList && (
                    <IconMiniCheck color={NorthTexasGreen} size={16} />
                  )}
                </div>
                <List
                  data={data}
                  editOneItem={editOneItem}
                  list={list}
                  listID={listID}
                  loadingEditSubOptional={loadingEditSubOptional}
                  removeOneItem={removeOneItem}
                  selectedItem={selectedItem}
                  setData={setData}
                />
                <InputHooks
                  autoFocus={true}
                  margin='5px 0'
                  name='list_value'
                  onChange={(value) => {
                    return handleChangeItems({
                      listID,
                      id: list.id,
                      value,
                      name: 'list_value'
                    })
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && !incompleteList) {
                      handleAdd({ listId: listID })
                    }
                  }}
                  title='Añade un item'
                  value={list?.value}
                />
                <RippleButton
                  loading={loadingCreateSubDessert}
                  disabled={incompleteList}
                  margin='16px 0 auto'
                  onClick={() => {
                    if (!incompleteList) {
                      return handleAdd({ listId: listID })
                    }
                    return null
                  }}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && !incompleteList) {
                      handleAdd({ listId: listID })
                    }
                  }}
                  widthButton='100%'
                >
                  Adicionar
                </RippleButton>
              </Column>
            )
          })}
        </div>
        <FormExtra
          handleAddList={handleAddList}
          handleCheck={handleCheck}
          handleShowTooltip={handleShowTooltip}
          numberLimit={String(numberLimit)}
          setCheck={setCheck}
          setNumberLimit={setNumberLimit}
          setShowTooltip={setShowTooltip}
          setTitle={setTitle}
          showTooltip={String(showTooltip)}
          title={title}
        />
      </ResisesColumns>
      <AwesomeModal
        borderRadius='4px'
        customHeight='auto'
        footer={false}
        header={false}
        height='auto'
        onCancel={() => {
          setSelectedExtra({})
          return false
        }}
        onHide={() => {
          setSelectedExtra({})
          return setOpenModalEditExtra(!openModalEditExtra)
        }}
        padding={0}
        question={false}
        show={openModalEditExtra}
        size='600px'
        sizeIconClose='30px'
        zIndex='9999'
      >
        <FormExtra
          handleAddList={handleAddList}
          handleShowTooltip={handleShowTooltip}
          isEdit={true}
          numberLimit={String(numberLimit)}
          selectedExtra={selectedExtra}
          setCheck={setCheck}
          setSelectedExtra={setSelectedExtra}
          setShowTooltip={setShowTooltip}
          setTitle={setTitle}
          showTooltip={String(showTooltip)}
          title={title}
        />
        <RippleButton
          onClick={() => {
            editOneExtra({
              ...selectedExtra
            })
          }}
          style={{
            margin: '15px auto',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex'
          }}
          widthButton='80%'
        >
          Guardar
        </RippleButton>
      </AwesomeModal>
    </BodyDnd>
  )
}
