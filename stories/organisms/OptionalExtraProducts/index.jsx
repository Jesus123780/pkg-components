import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  EColor,
  NorthTexasGreen,
  PColor
} from '../../../assets/colors'
import {
  IconDelete,
  IconEdit,
  IconMiniCheck,
  IconQuestion
} from '../../../assets/icons'
import { Button, Column, RippleButton, Tag, Text } from '../../atoms'
import { InputHooks } from '../../molecules'
import { AwesomeModal, List, ResisesColumns } from '../../organisms'
import { FormExtra } from './FormExtra'
import { BodyDnd, GarnishChoicesHeader } from './styled'

export const OptionalExtraProducts = ({
  title = '',
  dataListIds = [],
  data,
  isCustomSubOpExPid,
  loadingEditSubOptional,
  selectedItem = {},
  selectedExtra,
  openModalEditExtra,
  setSelectedExtra,
  setOpenModalEditExtra = () => {
    return
  },
  handleCheck = () => {
    return
  },
  editOneItem = () => {
    return
  },
  handleRemoveList = () => {
    return
  },
  setTitle = () => {
    return
  },
  setCheck = {},
  handleChangeItems = () => {
    return
  },
  handleAdd = () => {
    return
  },
  removeOneItem = () => {
    return
  },
  handleAddList = () => {
    return
  },
  setData = () => {
    return
  },
  editOneExtra = () => {
    return
  }
}) => {
  // STATES
  const [numberLimit, setNumberLimit] = useState(1)
  const [showTooltip, setShowTooltip] = useState(false)
  const handleShowTooltip = (index) => {
    return setShowTooltip(index === showTooltip ? false : index)
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
            const incompleteList = list.numberLimit === list.cards.length
            const messageLimit = `${numberLimit} ${
              numberLimit > 1 ? 'opciones' : 'opción'
            }`
            return (
              <Column
                border={`2px solid ${
                  incompleteList ? NorthTexasGreen : 'transparent'
                }`}
                key={listID}
                role='list'
                style={{ minWidth: '100%', height: 'max-content' }}
              >
                <GarnishChoicesHeader
                  style={{
                    padding: '10px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p className='garnish-choices__title'>{list?.title}</p>
                    <p className='garnish-choices__title-desc'>
                      Escoge hasta {messageLimit}.
                    </p>
                    {list?.required === 1 && <Tag />}
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
                  <div style={{ position: 'relative', width: 'min-content' }}>
                    <Button
                      backgroundColor='transparent'
                      border='none'
                      onClick={() => {
                        return handleShowTooltip(listID)
                      }}
                      primary
                    >
                      {showTooltip === listID && (
                        <div className='tooltip'>
                          <Text
                            color='var(--color-neutral-black)'
                            fontSize='.75rem'
                          >
                            Si no completas el numero de items no se mostraran a
                            los clientes
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
                      <IconQuestion
                        color={incompleteList ? 'gray' : PColor}
                        size={30}
                      />
                    </Button>
                  </div>
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
                  index={index}
                  isCustomSubOpExPid={isCustomSubOpExPid}
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
                  onFocus={true}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !incompleteList) {
                      handleAdd({ listId: listID })
                    }
                  }}
                  title='Añade un item'
                  value={list?.value}
                />
                <RippleButton
                  disabled={incompleteList}
                  margin='16px 0 auto'
                  onClick={() => {
                    if (!incompleteList) {
                      return handleAdd({ listId: listID })
                    }
                    return null
                  }}
                  onKeyPress={(e) => {
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
          numberLimit={numberLimit}
          setCheck={setCheck}
          setNumberLimit={setNumberLimit}
          setShowTooltip={setShowTooltip}
          setTitle={setTitle}
          showTooltip={showTooltip}
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
          numberLimit={numberLimit}
          selectedExtra={selectedExtra}
          setCheck={setCheck}
          setSelectedExtra={setSelectedExtra}
          setShowTooltip={setShowTooltip}
          setTitle={setTitle}
          showTooltip={showTooltip}
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

OptionalExtraProducts.propTypes = {
  data: PropTypes.shape({
    lists: PropTypes.any
  }),
  dataListIds: PropTypes.array,
  editOneExtra: PropTypes.func,
  editOneItem: PropTypes.func,
  handleAdd: PropTypes.func,
  handleAddList: PropTypes.func,
  handleChangeItems: PropTypes.func,
  handleCheck: PropTypes.func,
  handleRemoveList: PropTypes.func,
  isCustomSubOpExPid: PropTypes.any,
  loadingEditSubOptional: PropTypes.any,
  openModalEditExtra: PropTypes.any,
  removeOneItem: PropTypes.func,
  selectedExtra: PropTypes.any,
  selectedItem: PropTypes.object,
  setCheck: PropTypes.func,
  setData: PropTypes.func,
  setOpenModalEditExtra: PropTypes.func,
  setSelectedExtra: PropTypes.func,
  setTitle: PropTypes.func,
  title: PropTypes.string
}
