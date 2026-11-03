import React, { useRef } from 'react'
import clsx from 'clsx'

import { AwesomeModal } from '..'
import { MODAL_SIZES } from '../AwesomeModal/constanst'

import { getGlobalStyle } from '../../../utils'

import {
  Button,
  Checkbox,
  Column,
  Icon,
  Row,
  Tag
} from '../../atoms'

import {
  AmountInput,
  InputHooks,
  QuantityButton,
  ToggleSwitch
} from '../../molecules'

import styles from './styles.module.css'

interface ICreateExtra {
  LineItems?: {
    Lines: Array<{
      exPid?: string | number | null
      extraName?: string
      extraPrice?: number | string
      forEdit?: boolean
      exState?: boolean
      manageStock?: boolean
      stock?: number
      error?: boolean
      errorName?: boolean
      errorPrice?: boolean
      messageError?: string
    }>
  }
  loading?: boolean
  modal?: boolean
  inputRefs?: any
  pId?: any
  selected?: {
    loading: boolean
    exPid: any
  }
  handleCleanLines?: () => void
  handleAdd?: () => void
  handleEdit?: (i: number, item: any) => void
  handleFocusChange?: (i: number) => void
  handleSelect?: (item: any, index: number) => void
  handleLineChange?: (
    i: number,
    field: string,
    value:
      | string
      | number
      | boolean
      | React.ChangeEvent<HTMLInputElement>
  ) => void
  handleRemove?: (i: number, exPid: any) => void
  onSubmitUpdate?: ({ pId }: { pId: any }) => void
  setModal?: () => void
}

export const CreateExtra: React.FC<ICreateExtra> = ({
  LineItems = {
    Lines: []
  },
  loading = false,
  modal = false,
  inputRefs,
  pId = null,
  selected = {
    loading: false,
    exPid: null
  },
  handleCleanLines = () => { },
  handleAdd = () => { },
  handleEdit = (i, item) => { return { i, item } },
  handleFocusChange = (i) => { return i },
  handleSelect = (item, index) => { return { item, index } },
  handleLineChange = (i, field, value) => { return { i, field, value } },
  handleRemove = (i, exPid) => { return { i, exPid } },
  onSubmitUpdate = ({ pId }) => { return pId },
  setModal = () => { }
}) => {
  const endOfListRef = useRef<HTMLDivElement | null>(null)

  const lines = LineItems?.Lines ?? []

  const disabled = false

  const disabledButtonSave =
    loading ||
    lines.length === 0 ||
    !lines.some(
      item =>
        item?.exPid === undefined ||
        item?.exPid === null
    )

  /**
   * Calcula una cantidad válida para el control de stock.
   */
  const getStock = (value?: number) => {
    const stock = Number(value)

    return Number.isFinite(stock) && stock >= 1
      ? stock
      : 1
  }

  /**
   * Controla los cambios de cantidad.
   */
  const handleStockChange = (
    index: number,
    currentStock: number,
    operation: 'increment' | 'decrement'
  ) => {
    const nextStock = operation === 'increment'
      ? currentStock + 1
      : Math.max(1, currentStock - 1)

    handleLineChange(index, 'stock', nextStock)
  }

  /**
   * Elimina la última línea que aún no está guardada en base de datos.
   *
   * Un complemento se considera "sin guardar" cuando no tiene `exPid`. Al
   * decrementar el contador del footer solo se retira esa última fila local,
   * nunca una que ya exista en el backend.
   */
  const handleRemoveLastUnsaved = () => {
    for (let index = lines.length - 1; index >= 0; index--) {
      const exPid = lines[index]?.exPid

      if (exPid === undefined || exPid === null || exPid === '') {
        handleRemove(index, exPid ?? null)
        return
      }
    }
  }

  const hasUnsavedLine = lines.some(item => {
    const exPid = item?.exPid
    return exPid === undefined || exPid === null || exPid === ''
  })

  /**
   * Controla la activación del stock.
   */
  const handleStockToggle = (
    index: number,
    extra: (typeof lines)[number]
  ) => {
    const next = !extra.manageStock

    handleLineChange(index, 'manageStock', next)

    if (next) {
      const stock = Number(extra.stock)

      if (!Number.isFinite(stock) || stock < 1) {
        handleLineChange(index, 'stock', 1)
      }
    }
  }

  return (
    <AwesomeModal
      borderRadius={getGlobalStyle('--border-radius-xs')}
      btnCancel={true}
      btnConfirm={false}
      customHeight='60vh'
      footer={false}
      header={true}
      height='60vh'
      onHide={setModal}
      padding={0}
      question={false}
      show={modal}
      size={MODAL_SIZES.large}
      title='Añade Complementos'
      zIndex={getGlobalStyle('--z-index-99999')}
    >
      <Column className={styles['create-extra_container']}>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className={styles['content-create-extra']}>

          {lines.map((extra, i) => {
            const exPid = extra?.exPid ?? null
            const price = extra?.extraPrice

            const forEdit = Boolean(extra?.forEdit)
            const manageStock = Boolean(extra?.manageStock)

            const isSelect = selected.exPid === exPid
            const isLoading = selected.loading || loading
            const isDeleting = selected.loading && selected.exPid === exPid

            const errorName = Boolean(extra?.errorName)
            const errorPrice = Boolean(extra?.errorPrice)

            const stock = getStock(extra?.stock)

            return (
              <div
                key={extra?.exPid ?? i}
                className={clsx(
                  styles['contain-item'],
                  isLoading && styles.loading
                )}
              >
                <div className={styles['contain-item-content']}>

                  {/* =====================================================
                      NAME AND PRICE
                  ===================================================== */}

                  <div className={styles['field-row']}>

                    <div className={styles['field-name']}>
                      <InputHooks
                        name={extra?.extraName}
                        onChange={e => {
                          handleLineChange(
                            i,
                            'extraName',
                            e.target.value
                          )
                        }}
                        required={true}
                        error={errorName}
                        messageError={extra?.messageError || 'Este campo es obligatorio'}
                        disabled={forEdit && !isSelect}
                        title='Nombre'
                        onFocus={() => {
                          if (isSelect) return null

                          handleFocusChange(i)
                        }}
                        max={180}
                        reference={inputRefs?.current[i]}
                        value={extra?.extraName}
                      />
                    </div>

                    <div
                      className={clsx(
                        styles['field-price'],
                        errorPrice && styles['field-price--error']
                      )}
                    >
                      <AmountInput
                        allowDecimals={true}
                        decimalSeparator=','
                        decimalsLimit={2}
                        groupSeparator='.'
                        label='Precio'
                        disabled={forEdit && !isSelect}
                        name={extra?.extraPrice ?? 'extraPrice'}
                        onValueChange={value => {
                          handleLineChange(
                            i,
                            'extraPrice',
                            value
                          )
                        }}
                        onFocus={() => {
                          if (isSelect) return null

                          handleFocusChange(i)
                        }}
                        placeholder='Precio'
                        defaultValue={price}
                      />
                      {errorPrice && (
                        <span className={styles['field-price-error']}>
                          Este campo es obligatorio
                        </span>
                      )}
                    </div>

                  </div>

                  {/* =====================================================
                      STOCK CONTROL

                      El selector siempre permanece montado.
                      Solo cambia su visibilidad.
                  ===================================================== */}

                  <div className={styles['stock-control']}>

                    {/* TOGGLE */}

                    <div className={styles['stock-control-toggle']}>
                      <ToggleSwitch
                        checked={manageStock}
                        id={`manageStock-${i}`}
                        name='manageStock'
                        disabled={forEdit && !isSelect}
                        label='Controlar disponibilidad por stock'
                        onChange={() => {
                          handleStockToggle(i, extra)
                        }}
                        successColor='green'
                      />
                    </div>

                    {/* QUANTITY */}

                    <div
                      className={clsx(
                        styles['stock-control-body'],
                        !manageStock &&
                        styles['stock-control-body--hidden']
                      )}
                      title={
                        manageStock
                          ? 'Define la cantidad disponible del complemento para controlar sus existencias.'
                          : undefined
                      }
                      aria-hidden={!manageStock}
                    >
                      <QuantityButton
                        handleDecrement={() => {
                          handleStockChange(i, stock, 'decrement')
                        }}
                        handleIncrement={() => {
                          handleStockChange(i, stock, 'increment')
                        }}
                        quantity={stock}
                      />
                    </div>

                  </div>

                  {/* =====================================================
                      ACTIONS
                  ===================================================== */}

                  <Row
                    justifyContent='space-between'
                    alignItems='center'
                    as='div'
                    className={styles['contain-item-actions']}
                  >

                    <Column
                      alignItems='center'
                      style={{
                        width: 'min-content'
                      }}
                    >
                      <Checkbox
                        checked={extra?.exState}
                        id={i}
                        label='Obligatorio'
                        name={extra?.exState}
                        onChange={value => {
                          handleLineChange(i, 'exState', value)
                        }}
                      />
                    </Column>

                    {/* DELETE */}

                    <button
                      disabled={disabled || isDeleting}
                      onClick={() => {
                        handleRemove(i, exPid)
                      }}
                      type='button'
                      className={styles['button-action']}
                    >
                      <Icon
                        color={getGlobalStyle('--color-icons-primary')}
                        icon='IconDelete'
                        size={20}
                      />
                    </button>

                    {/* EDIT / SAVE */}

                    {forEdit
                      ? (
                        <>
                          <button
                            disabled={disabled}
                            onClick={() => {
                              if (isSelect) {
                                return handleEdit(i, exPid)
                              }

                              return handleSelect(extra, i)
                            }}
                            type='button'
                            className={styles['button-action']}
                          >
                            <Icon
                              size={20}
                              color={getGlobalStyle(
                                isSelect
                                  ? '--color-icons-primary'
                                  : '--color-icons-primary'
                              )}
                              icon={
                                isSelect
                                  ? 'IconMiniCheck'
                                  : 'IconEdit'
                              }
                            />
                          </button>

                          <span className={styles['saved-tag']}>
                            <Tag
                              label='Guardado'
                              backgroundColor='green'
                            />
                          </span>
                        </>
                      )
                      : (
                        <>
                          <Button
                            disabled={disabled}
                            type='button'
                            className={styles['button-action']}
                            styles={{
                              padding: 0
                            }}
                          >
                            <Icon
                              icon='IconEdit'
                              color={getGlobalStyle('--color-icons-primary')}
                              size={25}
                            />
                          </Button>

                          <Tag label='Sin guardar' />
                        </>
                      )}

                  </Row>

                </div>
              </div>
            )
          })}

          <div ref={endOfListRef} />

        </div>

        {/* =====================================================
            FOOTER ACTIONS
        ===================================================== */}

        <Row
          justifyContent='space-between'
          alignItems='center'
          className={styles['action-buttons']}
        >

          <Button
            onClick={handleCleanLines}
            padding='17px'
            type='button'
            primary={false}
            styles={{
              borderRadius: getGlobalStyle('--border-radius-none'),
              height: '100%'
            }}
          >
            Vaciar lista
          </Button>

          <QuantityButton
            handleIncrement={() => {
              endOfListRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
              })

              handleAdd()
            }}
            handleDecrement={handleRemoveLastUnsaved}
            showNegativeButton={!hasUnsavedLine}
            quantity={lines.length}
            disabled={false}
          />

          <Button
            padding={getGlobalStyle('--spacing-xl')}
            styles={{
              borderRadius: getGlobalStyle('--border-radius-none'),
              height: '100%'
            }}
            disabled={disabledButtonSave}
            primary={true}
            loading={loading}
            onClick={e => {
              e.preventDefault()

              onSubmitUpdate({ pId })
            }}
          >
            Guardar
          </Button>

        </Row>
      </Column>
    </AwesomeModal>
  )
}