import PropTypes from "prop-types"
import { useState } from "react"
import { Button, Tag, RippleButton, Column, Text } from "../../atoms"
import { ResisesColumns, List, AwesomeModal } from "../../organisms"
import { InputHooks } from "../../molecules"
import {
  EColor,
  NorthTexasGreen,
  PColor
} from "../../../assets/colors"
import {
  IconEdit,
  IconDelete,
  IconMiniCheck,
  IconQuestion,
} from "../../../assets/icons"
import { BodyDnd, GarnishChoicesHeader } from "./styled"
import { FormExtra } from "./FormExtra"

export const OptionalExtraProducts = ({
  title = "",
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
  sendNotification = () => {
    return
  },
  editOneExtra = () => {
    return
  },
  ...props
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
        backgroundColor="transparent"
        initialDividerPosition={{ __0: 70, __1: 30 }}
        lastMinWidth="auto"
        padding="0"
      >
        <div className="first-column">
          {dataListIds?.map((listID, index) => {
            const list = data.lists[listID]
            const numberLimit = list?.numberLimit
            const incompleteList = list.numberLimit === list.cards.length
            const messageLimit = `${numberLimit} ${
              numberLimit > 1 ? "opciones" : "opción"
            }`
            return (
              <Column
                style={{ minWidth: "100%", height: '100%' }}
                border={`2px solid ${
                  incompleteList ? NorthTexasGreen : "transparent"
                }`}
                height="min-content"
                key={listID}
                role="list"
              >
                <GarnishChoicesHeader
                  style={{
                    padding: "10px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p className="garnish-choices__title">{list?.title}</p>
                    <p className="garnish-choices__title-desc">
                      Escoge hasta {messageLimit}.
                    </p>
                    {list?.required === 1 && <Tag />}
                  </div>
                  <RippleButton
                    bgColor="transparent"
                    margin="0px"
                    onClick={() => {
                      return handleRemoveList(index, listID)
                    }}
                    type="button"
                    widthButton="min-content"
                  >
                    <IconDelete color={EColor} size="25px" />
                  </RippleButton>
                  <RippleButton
                    bgColor="transparent"
                    margin="0px"
                    onClick={() => {
                      setOpenModalEditExtra(!openModalEditExtra)
                      return setSelectedExtra(list)
                    }}
                    type="button"
                    widthButton="min-content"
                  >
                    <IconEdit color={EColor} size="25px" />
                  </RippleButton>
                  <div style={{ position: "relative", width: "min-content" }}>
                    <Button
                      backgroundColor="transparent"
                      border="none"
                      onClick={() => {
                        return handleShowTooltip(listID)
                      }}
                      primary
                    >
                      {showTooltip === listID && (
                        <div className="tooltip">
                          <Text
                            fontSize=".75rem"
                            color="var(--color-neutral-black)"
                          >
                            Si no completas el numero de items no se mostraran a
                            los clientes
                          </Text>
                          <Button
                            Button
                            className="btn-ok"
                            backgroundColor="transparent"
                            border="none"
                            onClick={() => {
                              return setShowTooltip(false)
                            }}
                            primary
                          >
                            <Text color={PColor} fontWeight="600">
                              Ok, entendí
                            </Text>
                          </Button>
                        </div>
                      )}
                      <IconQuestion
                        color={incompleteList ? "gray" : PColor}
                        size={30}
                      />
                    </Button>
                  </div>
                </GarnishChoicesHeader>
                <div className="contain-check-item">
                  <Tag
                    label={`Total de items ${list?.cards?.length} / ${numberLimit}`}
                  />
                  {incompleteList && (
                    <IconMiniCheck color={NorthTexasGreen} size={16} />
                  )}
                </div>
                <List
                  data={data}
                  index={index}
                  isCustomSubOpExPid={isCustomSubOpExPid}
                  list={list}
                  selectedItem={selectedItem}
                  listID={listID}
                  loadingEditSubOptional={loadingEditSubOptional}
                  removeOneItem={removeOneItem}
                  editOneItem={editOneItem}
                  setData={setData}
                />
                <InputHooks
                  autoFocus={true}
                  margin="5px 0"
                  name="list_value"
                  onChange={(value) => {
                    return handleChangeItems({
                      listID,
                      id: list.id,
                      value,
                      name: "list_value",
                    })
                  }}
                  onFocus={true}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !incompleteList) {
                      handleAdd({ listId: listID })
                    }
                  }}
                  title="Añade un item"
                  value={list?.value}
                />
                <RippleButton
                  disabled={incompleteList}
                  margin="16px 0 auto"
                  onClick={() => {
                    if (!incompleteList) {
                      return handleAdd({ listId: listID })
                    }
                    return null
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !incompleteList) {
                      handleAdd({ listId: listID })
                    }
                  }}
                  widthButton="100%"
                >
                  Adicionar
                </RippleButton>
              </Column>
            )
          })}
        </div>
        <FormExtra
          handleAddList={handleAddList}
          handleShowTooltip={handleShowTooltip}
          setShowTooltip={setShowTooltip}
          setNumberLimit={setNumberLimit}
          handleCheck={handleCheck}
          setTitle={setTitle}
          showTooltip={showTooltip}
          setCheck={setCheck}
          title={title}
          numberLimit={numberLimit}
        />
      </ResisesColumns>
      <AwesomeModal
        borderRadius="4px"
        customHeight="auto"
        footer={false}
        header={false}
        height="auto"
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
        size="600px"
        sizeIconClose="30px"
        zIndex="9999"
      >
        <FormExtra
          isEdit={true}
          selectedExtra={selectedExtra}
          handleAddList={handleAddList}
          setSelectedExtra={setSelectedExtra}
          handleShowTooltip={handleShowTooltip}
          setShowTooltip={setShowTooltip}
          setTitle={setTitle}
          showTooltip={showTooltip}
          setCheck={setCheck}
          title={title}
          numberLimit={numberLimit}
        />
        <RippleButton
          widthButton="80%"
          onClick={() => {
            editOneExtra({
              ...selectedExtra,
            })
          }}
          style={{
            margin: "15px auto",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          Guardar
        </RippleButton>
      </AwesomeModal>
    </BodyDnd>
  )
}

OptionalExtraProducts.propTypes = {
  data: PropTypes.shape({
    lists: PropTypes.any,
  }),
  dataListIds: PropTypes.array,
  handleAdd: PropTypes.func,
  handleAddList: PropTypes.func,
  handleChangeItems: PropTypes.func,
  handleCheck: PropTypes.func,
  handleRemoveList: PropTypes.func,
  isCustomSubOpExPid: PropTypes.any,
  removeOneItem: PropTypes.func,
  sendNotification: PropTypes.func,
  setCheck: PropTypes.func,
  setData: PropTypes.func,
  setTitle: PropTypes.func,
  title: PropTypes.string,
}
