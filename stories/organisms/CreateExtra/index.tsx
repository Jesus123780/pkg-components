import React, { useRef } from 'react'
import { AwesomeModal } from '..'
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
  QuantityButton
} from '../../molecules'
import clsx from 'clsx'
import styles from './styles.module.css'

interface ICreateExtra {
  LineItems?: {
    Lines: any[]
  }
  loading?: boolean
  modal?: boolean
  inputRefs?: any
  pId?: any
  selected?: {
    loading: boolean
    exPid: any
  }
  CleanLines?: () => void
  handleAdd?: () => void
  handleEdit?: (i: number, item: any) => void
  handleFocusChange?: (i: number) => void
  handleSelect?: (item: any, index: number) => void
  handleLineChange?: (i: number, extraName: string, value: string | number) => void
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
  CleanLines = () => { },
  handleAdd = () => { },
  handleEdit = (i, item) => { return { i, item } },
  handleFocusChange = (i) => { return i },
  handleSelect = (item, index) => { return { item, index } },
  handleLineChange = (i, extraName, value) => { return { i, extraName, value } },
  handleRemove = (i, exPid) => { return { i, exPid } },
  onSubmitUpdate = ({ pId }) => { return pId },
  setModal = () => { }
}) => {
  const disabled = false
  const endOfListRef = useRef({
    scrollIntoView: (args: any) => { return args },
    current: null
  })

  return (
    <AwesomeModal
      borderRadius={getGlobalStyle('--border-radius-xs')}
      btnCancel={true}
      btnConfirm={false}
      customHeight='60vh'
      footer={false}
      header={true}
      height='60vh'
      onCancel={() => { setModal() }}
      onHide={() => { setModal() }}
      padding={0}
      question={false}
      show={modal}
      size='70vw'
      title='Añade Complementos'
      zIndex={getGlobalStyle('--z-index-99999')}
    >
      <Column className={styles['create-extra_container']}>
        <div className={styles['content-create-extra']}>
          {LineItems?.Lines?.length > 0
            ? LineItems?.Lines?.map((extra, i) => {
              const price = extra?.extraPrice
              const exPid = extra?.exPid ?? null
              const forEdit = (Boolean((extra?.forEdit))) || false
              const isSelect = selected.exPid === exPid
              const isLoading = selected.loading || loading
              return (
                <div key={extra?.exPid || i}
                  className={clsx(
                    styles['contain-item'] as string,
                    isLoading && (styles.loading as string)
                  )}
                >
                  <div className={styles['contain-item-content']}>
                    <InputHooks
                      name={extra?.extraName}
                      onChange={e => {
                        const value = e.target.value
                        return handleLineChange(i, 'extraName', `${value}`)
                      }}
                      required={true}
                      title='Nombre'
                      onFocus={() => { return handleFocusChange(i) }}
                      max={180}
                      reference={inputRefs?.current[i]}
                      value={extra?.extraName}
                    />
                    <AmountInput
                      allowDecimals={true}
                      decimalSeparator=','
                      decimalsLimit={2}
                      groupSeparator='.'
                      label='Precio'
                      name={extra?.extraPrice ?? 'extraPrice'}
                      onValueChange={(value) => {
                        return handleLineChange(i, 'extraPrice', value)
                      }}
                      onFocus={() => { return handleFocusChange(i) }}
                      placeholder='Precio'
                      defaultValue={price}
                    />
                    <Row justifyContent='space-between' alignItems='center' className={styles['contain-item-actions']}>
                      <Column alignItems='center'
                        style={{
                          width: 'min-content'
                        }}
                      >
                        <Checkbox
                          checked={extra?.exState}
                          id={i}
                          label='Obligatorio'
                          name={extra?.exState}
                          onChange={value => { return handleLineChange(i, 'exState', value) }}
                        />
                      </Column>
                      <Button
                        disabled={disabled}
                        onClick={() => { return handleRemove(i, exPid) }}
                        type='button'
                        className={styles['button-action']}
                      >
                        <Icon
                          color={getGlobalStyle('--color-icons-primary')}
                          icon='IconDelete'
                          size={25}
                        />
                      </Button>
                      {forEdit
                        ? <>
                          <Button
                            disabled={disabled}
                            onClick={() => {
                              if (isSelect) return handleEdit(i, exPid)
                              return handleSelect(extra, i)
                            }}
                            type='button'
                            className={styles['button-action']}
                          >
                            <Icon
                              color={getGlobalStyle(selected?.exPid === exPid ? '--color-icons-primary' : '--color-icons-gray-light')}
                              icon={selected?.exPid === exPid ? 'IconMiniCheck' : 'IconEdit'}
                            />
                          </Button>
                          <span style={{ marginLeft: '15px' }}>
                            <Tag label='Guardado' backgroundColor='green' />
                          </span>
                        </>
                        : <>
                          <Button
                            disabled={disabled}
                            type='button'
                            className={styles['button-action']}
                          >
                            <Icon
                              icon='IconEdit'
                              color={getGlobalStyle('--color-icons-gray-light')}
                              size={25}
                            />
                          </Button>
                          <Tag label='Sin guardar' />
                        </>
                      }
                    </Row>
                  </div>
                </div>
              )
            })
            : null}
          <div ref={endOfListRef} />
        </div>
        <Row justifyContent='space-between' alignItems='center' className={styles['action-buttons']}>
          <Button
            onClick={CleanLines}
            padding='17px'
            type='button'
            primary={false}
            styles={{
              borderRadius: getGlobalStyle('--border-radius-none'),
              height: '100%'
            }}
          >
            Eliminar
          </Button>
          <QuantityButton
            handleIncrement={() => {
              if (endOfListRef?.current !== null) {
                endOfListRef.current.scrollIntoView({ behavior: 'smooth' })
              }
              handleAdd()
            }}
            quantity={typeof LineItems?.Lines?.length === 'number' && !isNaN(LineItems.Lines.length) ? LineItems.Lines.length : 0}
            disabled={false}
            validationOne={true}
          />
          <Button
            padding={getGlobalStyle('--spacing-xl')}
            styles={{
              borderRadius: getGlobalStyle('--border-radius-none'),
              height: '100%'
            }}
            primary={true}
            loading={loading}
            onClick={(e) => {
              e.preventDefault()
              return onSubmitUpdate({ pId })
            }}
          >
            Guardar
          </Button>
        </Row>
      </Column>
    </AwesomeModal>
  )
}
