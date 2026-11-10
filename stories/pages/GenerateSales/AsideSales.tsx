import React from 'react'

import {
  AlertInfo,
  AmountInput,
  PaymentMethods,
  NewSelect,
  type Methods,
  OrderDiscount,
  LateralModal
} from '../../molecules'

import {
  Button,
  Column,
  Divider,
  Overline
} from '../../atoms'

import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

interface AsideProps {
  openAside?: boolean
  disabled: boolean
  overline?: boolean
  loadingClients?: boolean
  payId?: string
  storeTables?: any[]
  paymentMethods?: Methods[]
  dataClientes?: any[]

  client?: {
    clientName: string
    ccClient?: string
  }

  totalProductPrice?: string | number

  values?: {
    cliId: string
    ValueDelivery: string
    change: string
    tableId: string
  }

  errors?: {
    change: boolean
    ValueDelivery: boolean
  }

  discountType?: 'PERCENT' | 'AMOUNT'
  discountPercent?: number
  discountAmount?: number
  discountResetKey?: number | string

  handleSave?: () => void
  handleClickAction?: () => void
  handleCloseAside?: () => void
  handleOpenAside?: () => void

  handleChange?: (e: {
    target: {
      name: string
      value: any
    }
  }) => void

  dispatch?: React.Dispatch<any>
}

export const AsideSales: React.FC<AsideProps> = ({
  openAside = false,
  disabled,
  loadingClients = false,
  payId = '',
  paymentMethods = [],
  storeTables = [],
  dataClientes = [],
  values = {
    cliId: '',
    change: '',
    tableId: '',
    ValueDelivery: ''
  },
  overline = false,
  discountType = 'PERCENT',
  discountPercent = 0,
  discountAmount = 0,
  discountResetKey = 0,
  dispatch = () => {},
  handleSave = () => {},
  handleCloseAside = () => {},
  handleOpenAside = () => {},
  handleClickAction = () => {},
  handleChange = () => {}
}) => {
  const handleDiscount = (payload: {
    type: string
    value: number
  }): void => {
    dispatch({
      type: 'APPLY_DISCOUNT',
      payload
    })
  }

  const closeAside = (): void => {
    handleOpenAside()
    handleCloseAside()
  }

  const handleGenerateSale = (): void => {
    handleOpenAside()
    handleSave()
  }

  return (
    <>
      {overline && (
        <Overline
          show={openAside}
          bgColor={getGlobalStyle('--color-background-overline')}
          zIndex={getGlobalStyle('--z-index-99999')}
          onClick={closeAside}
          style={{
            padding: getGlobalStyle('--spacing-lg')
          }}
        />
      )}

      <LateralModal
        open={openAside}
        handleClose={closeAside}
        style={{
          padding: getGlobalStyle('--spacing-xs'),
          zIndex: getGlobalStyle('--z-index-modal'),

          // Altura limitada al viewport.
          height: '100dvh',
          maxHeight: '100dvh',
          minHeight: 0,

          top: 0,
          right: 0,

          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Column
          className={styles.panel}
          justifyContent='space-between'
          style={{
            height: '100%',
            maxHeight: '100%',
            minHeight: 0,
            flex: '1 1 auto'
          }}
        >
          {/* =========================================
              CONTENIDO DESPLAZABLE
          ========================================= */}

          <Column className={styles.content} style={{
            overflow: 'scroll',
            height: 'min-content'
          }}>
            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <AlertInfo
              message='Selecciona a un cliente para la venta'
              type='warning'
            />

            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <NewSelect
              handleClickAction={handleClickAction}
              id='cliId'
              tabIndex={0}
              action={false}
              beforeLabel='Cliente'
              loading={loadingClients}
              name='cliId'
              onChange={(e) => {
                handleChange({
                  target: {
                    name: String(e.target.name),
                    value: e.target.value
                  }
                })
              }}
              optionName={['clientName', 'clientLastName']}
              options={dataClientes}
              canDelete
              handleClean={() => {
                handleChange({
                  target: {
                    name: 'cliId',
                    value: ''
                  }
                })
              }}
              title='Selecciona un cliente'
              value={values.cliId ?? ''}
            />

            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <NewSelect
              name='tableId'
              optionName='tableName'
              tabIndex={1}
              options={storeTables}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: String(e.target.name),
                    value: e.target.value
                  }
                })
              }}
              title='Selecciona una mesa'
              value={values.tableId ?? ''}
              handleClean={() => {
                handleChange({
                  target: {
                    name: 'tableId',
                    value: ''
                  }
                })
              }}
              canDelete
              id='tableId'
            />

            <PaymentMethods
              dispatch={dispatch}
              methods={paymentMethods}
              payId={payId}
            />

            <Divider
              marginBottom={getGlobalStyle('--spacing-3xl')}
            />

            <AmountInput
              allowDecimals
              decimalSeparator=','
              tabIndex={2}
              decimalsLimit={2}
              disabled={false}
              groupSeparator='.'
              label='Cambio'
              name='change'
              onValueChange={(value) => {
                handleChange({
                  target: {
                    name: 'change',
                    value
                  }
                })
              }}
              placeholder='$ 0.00'
              prefix='$'
              value={values.change}
            />

            <AmountInput
              allowDecimals
              decimalSeparator=','
              decimalsLimit={3}
              tabIndex={3}
              disabled={false}
              groupSeparator='.'
              label='Precio del domicilio'
              name='ValueDelivery'
              onValueChange={(value) => {
                handleChange({
                  target: {
                    name: 'ValueDelivery',
                    value
                  }
                })
              }}
              placeholder='$ 0.00'
              prefix='$'
              value={values.ValueDelivery}
            />

            <OrderDiscount
              key={discountResetKey}
              tabIndex={4}
              onChange={handleDiscount}
              discountType={discountType}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
            />
          </Column>

          {/* =========================================
              FOOTER INDEPENDIENTE DEL SCROLL
          ========================================= */}

          <div className={styles.footer}>
            <Button
              primary
              disabled={disabled}
              width='100%'
              tabIndex={8}
              onClick={handleGenerateSale}
              iconName='IconSales'
              iconPosition='right'
              styles={{
                justifyContent: 'center'
              }}
            >
              Generar venta
            </Button>
          </div>
        </Column>
      </LateralModal>
    </>
  )
}