import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { BGColor, PColor, SECColor, SEGColor, SFColor } from '../../../../assets/colors'
import { IconArrowBottom, IconFolder, IconLoading, IconPlus, IconCancel as IconWarning } from '../../../../assets/icons'
import { Overline } from '../../../atoms/Overline'
import { changeSearch, changeValue, findOptionById, renderVal } from './helpers'
import { BoxOptions, BoxSelect, ButtonAction, ContainerItems, ContentBox, CustomButtonS, IconSel, InputText, LabelInput, MainButton, SpanText, TextNotResult, Tooltip } from './styles'

export const NewSelect = ({
  options = [],
  beforeLabel = '',
  noLabel = false,
  disabled = false,
  id = '',
  icon = true,
  loading = false,
  sideLabel = '',
  name = '',
  action = false,
  optionName = '',
  topTitle = '15px',
  value = '',
  border,
  width = '100%',
  search = ' ',
  title = '',
  padding = '',
  margin = '',
  heightBody,
  minWidth = '',
  error = false,
  required = false,
  overLine = false,
  accessor,
  fullName,
  onChange = () => {
    return
  },
  handleClickAction = () => {
    return
  }
}) => {
  /** Hooks */
  const bodyHeight = 100
  const [select, setSelect] = useState(false)
  const [selectRef, setSelectRef] = useState(0)
  const [valueInput, setValueInput] = useState()
  const [selectBody, setSelectBody] = useState(0)
  const [newOption, setNewOption] = useState(false)
  const inputSearch = useRef(null)
  const [refSelect, setRefSelect] = useState(false)
  const refComponente = useRef(null)

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (refComponente.current && !refComponente.current.contains(event.target)) {
        setSelect(false)
      }
    }

    const handleWindowBlur = () => {
      setSelect(false)
    }

    document.addEventListener('mousedown', handleDocumentClick)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [])

  // guarda la referencia de la caja */
  const changeRef = (v) => {
    setSelectRef(v.offsetTop + selectBody)
    setRefSelect(v)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setSelect(!select)
    setTimeout(() => {
      return setNewOption(options)
    }, 500)
  }

  const handleBlur = () => {
    return setSelect(false)
  }
  const val = findOptionById(options, id, value)

  useEffect(() => {
    setNewOption(options)
  }, [options])

  useEffect(() => {
    if (search) {
      select && inputSearch.current.focus()
    }
  }, [select, search])

  return (
    <div ref={refComponente} style={{ position: 'relative' }}>
      <LabelInput
        error={error}
        noLabel={noLabel}
        topTitle={topTitle}
        value={value}
      >
        {title}
      </LabelInput>
      <BoxSelect
        margin={margin}
        minWidth={minWidth}
        padding={padding}
        ref={(v) => {
          return !!v && changeRef(v)
        }}
        width={width}
      >
        {overLine && (
          <Overline
            bgColor={`${SECColor}56`}
            onClick={() => {
              return setSelect(false)
            }}
            show={select}
          />
        )}
        <MainButton
          border={border}
          color={val ? SFColor : '#757575'}
          disabled={disabled}
          error={error}
          height={heightBody}
          minWidth={minWidth}
          onClick={handleClick}
          type='button'
          value={value}
        >
          <SpanText noLabel={noLabel}>
            {renderVal(val, optionName, accessor)} {val && sideLabel}
          </SpanText>
          {icon && (
            <IconSel
              loading={loading}
              style={{
                top: '13px',
                width: '20px',
                right: '15px'
              }}
            >
              {loading ? <IconLoading color={PColor} size='15px' /> : <IconArrowBottom color={error ? BGColor : SEGColor} size='15px' />}
            </IconSel>
          )}
        </MainButton>
        {error && <Tooltip>Este campo es requerido</Tooltip>}
        <ContainerItems active={select} top={top}>
          {search && (
            <>
              <InputText
                onChange={(e) => {
                  const value = e.target.value
                  changeSearch({
                    value,
                    options,
                    optionName,
                    accessor,
                    setValueInput,
                    setNewOption
                  })
                }}
                placeholder='Buscar'
                ref={inputSearch}
                value={valueInput || ''}
              />
            </>
          )}
          {action && (
            <ButtonAction
              onClick={() => {
                return handleClickAction()
              }}
              type='button'
            >
              <IconPlus color={PColor} size='15px' /> &nbsp; {` Añadir nuevo `}
              <>{!newOption.length && valueInput}</>
            </ButtonAction>
          )}
          <ContentBox search={search} style={{ zIndex: '9999999' }}>
            <BoxOptions
              autoHeight
              autoHeightMax='200px'
              autoHeightMin={0}
              autoHideDuration={700}
              autoHideTimeout={1500}
              bottom={selectRef > bodyHeight}
              fullName={fullName}
              onBlur={handleBlur}
              ref={(v) => {
                return setSelectBody(v?.offsetHeight)
              }}
              search={search}
              style={{ width: '100%', overflowY: 'auto' }}
              top={selectRef < bodyHeight}
            >
              {newOption.length > 0
                ? newOption.map((x) => {
                  return (
                    <CustomButtonS
                      key={x[id]}
                      onClick={() => {
                        return changeValue({
                          v: x,
                          id,
                          name,
                          refSelect,
                          setSelect,
                          onChange
                        })
                      }}
                      option
                      type='button'
                    >
                      {beforeLabel} {`${renderVal(x, optionName, accessor)}`} {sideLabel}
                    </CustomButtonS>
                  )
                })
                : valueInput && (
                  <TextNotResult>
                    <IconFolder size='40px' />
                      &nbsp; No hay resultados.
                  </TextNotResult>
                )}
            </BoxOptions>
          </ContentBox>
        </ContainerItems>
        <input
          data-required={required}
          id={id}
          name={name}
          type='hidden'
          value={value || ''}
        />
        <IconWarning
          color={PColor}
          size={20}
          style={{ position: 'absolute', right: 5, bottom: 10, opacity: 0, pointerEvents: 'none' }}
        />
      </BoxSelect>
    </div>
  )
}

NewSelect.propTypes = {
  accessor: PropTypes.any,
  action: PropTypes.bool,
  beforeLabel: PropTypes.string,
  border: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullName: PropTypes.any,
  handleClickAction: PropTypes.func,
  heightBody: PropTypes.any,
  icon: PropTypes.bool,
  id: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.string,
  minWidth: PropTypes.string,
  name: PropTypes.string,
  noLabel: PropTypes.bool,
  onChange: PropTypes.func,
  optionName: PropTypes.string,
  options: PropTypes.array,
  overLine: PropTypes.bool,
  padding: PropTypes.string,
  required: PropTypes.bool,
  search: PropTypes.string,
  sideLabel: PropTypes.string,
  title: PropTypes.string,
  topTitle: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string
}

