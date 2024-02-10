import { 
  AnimatePresence, 
  motion, 
  usePresence
} from 'framer-motion'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { AwesomeModal } from '..'
import { APColor, EColor } from '../../../assets/colors'
import { 
  IconDelete, 
  IconEdit, 
  IconMiniCheck
} from '../../../assets/icons'
import { getGlobalStyle, numberFormat } from '../../../utils'
import {
  Checkbox,
  RippleButton,
  Row,
  Tag
} from '../../atoms'
import { InputHooks, QuantityButton } from '../../molecules'
import {
  Action,
  ContentLinesItems,
  ContentModal
} from './styled'

export const CreateExtra = ({
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
  CleanLines = () => { return },
  handleAdd = () => { return },
  handleEdit = (i, item) => { return { i, item } },
  handleFocusChange = (i) => { return i},
  handleSelect = (item, index) => { return { item, index } },
  handleLineChange = (i, extraName, value) => { return { i, extraName, value }},
  handleRemove = (i, exPid) => { return { i, exPid } },
  onSubmitUpdate = ({ pId }) => { return pId },
  setModal = () => { return }
}) => {
  const disabled = false
  const transition = { type: 'spring', stiffness: 300, damping: 30 }

  const [isPresent, safeToRemove] = usePresence()
  const animations = {
    layout: true,
    initial: 'out',
    style: {
      position: isPresent ? 'static' : 'absolute'
    },
    animate: isPresent ? 'in' : 'out',
    whileTap: 'tapped',
    variants: {
      in: { y: 0, opacity: 1 },
      out: { y: 30, opacity: 0, zIndex: -1 }
    },
    onAnimationComplete: () => {return !isPresent && safeToRemove()},
    transition
  }
  const endOfListRef = useRef({
    scrollIntoView: (args) => { return args },
    current: null
  })

  return (
    <AwesomeModal
      borderRadius='4px'
      btnCancel={true}
      btnConfirm={false}
      customHeight='60vh'
      footer={false}
      header={true}
      height='60vh'
      onCancel={() => { return setModal() }}
      onHide={() => { return setModal() }}
      padding={0}
      question={false}
      show={modal}
      size='90%'
      sizeIconClose='30px'
      title='Añade Complementos'
      zIndex={getGlobalStyle('--z-index-99999')}
    >
      <ContentModal>
        <AnimatePresence>
          <div className='content'>
            {LineItems?.Lines?.length ? LineItems?.Lines?.map((extra, i) => {
              const price = numberFormat(extra?.extraPrice)
              const exPid = extra?.exPid ?? null
              const forEdit = extra?.forEdit || false
              const isSelect = selected.exPid === exPid

              return (
                <motion.div {...animations} key={extra?.exPid || i} >
                  <ContentLinesItems loading={isSelect}>
                    <Row>
                      <InputHooks
                        name={extra?.extraName}
                        onChange={e => {
                          const value = e.target.value
                          return handleLineChange(i, 'extraName', value)
                        }}
                        onFocus={() => { return handleFocusChange(i) }}
                        placeholder='Nombre'
                        reference={inputRefs && inputRefs?.current[i]}
                        value={extra?.extraName}
                      />
                      <InputHooks
                        error={extra.error}
                        messageError={extra.messageError}
                        name={extra?.extraPrice}
                        onChange={e => {
                          const value = e.target.value
                          const price = numberFormat(value)
                          return handleLineChange(i, 'extraPrice', price)
                        }}
                        onFocus={() => { return handleFocusChange(i) }}
                        placeholder='Precio'
                        value={price}
                      />
                    </Row>
                    <Checkbox
                      checked={extra?.exState}
                      id={i}
                      margin='10px 0'
                      name={extra?.exState}
                      onChange={value => { return handleLineChange(i, 'exState', value) }}
                    />
                    <RippleButton
                      bgColor={getGlobalStyle('--color-base-transparent')}
                      disabled={disabled}
                      margin='0px'
                      onClick={() => { return handleRemove(i, exPid) }}
                      type='button'
                      widthButton='min-content'
                    >
                      <IconDelete color={EColor} size='25px' />
                    </RippleButton>
                    {forEdit ?
                      <>
                        <RippleButton
                          bgColor='transparent'
                          disabled={disabled}
                          margin='0px'
                          onClick={() => {
                            if (isSelect) return handleEdit(i, exPid)
                            return handleSelect(extra, i)
                          }}
                          type='button'
                          widthButton='min-content'
                        >
                          {selected?.exPid === exPid ? <IconMiniCheck color={APColor} size='25px' /> : <IconEdit color={EColor} size='25px' />}
                        </RippleButton>
                        <span style={{ marginLeft: '15px' }}>
                          <Tag label={'guardado'} />
                        </span>
                      </>
                      : 
                      <>
                        <RippleButton
                          bgColor='transparent'
                          disabled={disabled}
                          margin='0px'
                          type='button'
                          widthButton='min-content'
                        >
                          <IconEdit color={getGlobalStyle('--color-icons-gray-light')} size='25px' />
                        </RippleButton>
                        <Tag label='sin guardar' />
                      </>
                    }
                  </ContentLinesItems>
                </motion.div>

              )
            }) : null}
            <div ref={endOfListRef} />
          </div>

        </AnimatePresence>
        <Action>
          <RippleButton
            margin='0px'
            onClick={CleanLines}
            padding='17px'
            type='button'
            widthButton='140px'
          >
              Eliminar
          </RippleButton>
          <QuantityButton
            handleIncrement={() => {
              if (endOfListRef?.current) {
                endOfListRef.current.scrollIntoView({ behavior: 'smooth' })
              }
              return handleAdd()
            }}
            quantity={Number(LineItems?.Lines?.length || 0)}
            showNegativeButton={true}
            style={{ margin: '0 20px 0 0', width: '60%' }}
          />
          <RippleButton
            loading={loading}
            onClick={(e) => {
              e.preventDefault()
              return onSubmitUpdate({ pId })
            }}
            widthButton='140px'
          >
            Guardar
          </RippleButton>
        </Action>
      </ContentModal>
    </AwesomeModal>
  )
}

CreateExtra.propTypes = {
  CleanLines: PropTypes.func,
  LineItems: PropTypes.shape({
    Lines: PropTypes.shape({
      length: PropTypes.any,
      map: PropTypes.func
    })
  }),
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleFocusChange: PropTypes.func,
  handleLineChange: PropTypes.func,
  handleRemove: PropTypes.func,
  handleSelect: PropTypes.func,
  inputRefs: PropTypes.shape({
    current: PropTypes.any
  }),
  loading: PropTypes.bool,
  modal: PropTypes.bool,
  onSubmitUpdate: PropTypes.func,
  pId: PropTypes.any,
  selected: PropTypes.shape({
    exPid: PropTypes.any,
    loading: PropTypes.bool
  }),
  setModal: PropTypes.func
}


