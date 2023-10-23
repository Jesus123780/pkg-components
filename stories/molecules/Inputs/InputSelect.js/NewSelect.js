import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { BColor, BGColor, EColor, PColor, PLColor, PVColor, SECColor, SEGColor, SFColor, SFVColor } from '../../../../assets/colors'
import { IconArrowBottom, IconFolder, IconLoading, IconPlus, IconCancel as IconWarning } from '../../../../assets/icons'
import { Overline } from '../../../atoms/Overline'
import { changeSearch, changeValue, findOptionById, renderVal } from './helpers'

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

const BoxSelect = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  justify-content: center;
  align-items: center;
  min-width: ${({ minWidth }) => {
    return minWidth || 'auto'
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  border-radius: ${({ radius }) => {
    return radius || '0px'
  }};
  ${({ padding }) => {
    return (
      !!padding &&
      css`
        padding: ${padding};
      `
    )
  }}
  position: relative;
`
const ButtonAction = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  height: 40px;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  color: rgb(57, 58, 61);
  background-color: rgb(212, 215, 220);
  &:hover {
    background-color: #fcebea;
    color: ${BColor};
  }
  &:hover > svg {
    fill: ${BGColor};
  }
`
const LabelInput = styled.label`
  position: absolute;
  text-align: left;
  transition: 0.2s ease;
  font-size: ${({ value }) => {
    return value ? '1rem' : '16px'
  }};
  top: ${({ value, topTitle }) => {
    const top = topTitle ? topTitle : '15px'
    return value ? '-8px' : top
  }};
  left: ${({ value }) => {
    return value ? '-8px' : '10px'
  }};
  color: ${({ value, error }) => {
    const errorColor = error ? PColor : SFVColor
    return value ? SFColor : errorColor
  }};
  pointer-events: none;
  white-space: nowrap;
  width: min-content;
  font-family: PFont-Light;
  background-color: ${({ value }) => {
    return value ? BGColor : 'transparent'
  }};
  padding-left: ${({ value }) => {
    return value ? '16px' : '0px'
  }};
  @media only screen and (max-width: 960px) {
    top: 12px;
  }
  ${(props) => {
    return (
      props.noLabel &&
      css`
        top: 13px;
        font-size: 15px;
        color: ${BColor};
        font-family: PFont-Regular;
        background-color: transparent;
      `
    )
  }}
  z-index: 9;
`
const ContainerItems = styled.div`
  position: absolute;
  top: 98%;
  z-index: 4;
  left: 0;
  transform-origin: 200% 50%;
  transition: 0.2s ease;
  z-index: 9999999 !important;
  box-shadow: hsl(0, 0%, 80%);
  transform-origin: top left;
  ${({ active }) => {
    return active
      ? css`
          display: block;
        `
      : css`
          display: none;
        `
  }}
`
const Tooltip = styled.div`
  position: absolute;
  display: block;
  right: 5px;
  top: -20px;
  background-color: ${PColor};
  padding: 0 10px;
  border-radius: 2px;
  z-index: 10;
  font-size: 11px;
  color: ${BGColor};
  &::after,
  &::before {
    top: 100%;
    left: 90%;
    border: solid transparent;
    content: '';
    position: absolute;
    pointer-events: none;
  }
  &::after {
    border-top-color: ${PColor};
    border-width: 4px;
  }
  &::before {
    border-top-color: ${PColor};
    border-width: 5px;
    margin-left: -1px;
  }
`
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const IconSel = styled.div`
  position: absolute;
  right: 8px;
  top: 30%;
  width: min-content;
  pointer-events: none;

  ${({ loading }) => 
  {return loading && css`
      & > svg {
        animation: ${rotate} 1s linear infinite;
      }
    `}
}
`

// Select
const MainButton = styled.button`
  position: relative;
  display: block;
  background-color: ${({ bgColor, disabled, error }) => {
    const bgColorDisabled = error ? BGColor : bgColor || BGColor
    return disabled ? 'rgba(239, 239, 239, 0.3)' : bgColorDisabled
  }};
  border: ${({ border }) => {
    return border || `1px solid ${SFVColor}`
  }};
  text-align: left;
  height: ${({ height }) => {
    return height || '50px'
  }};
  white-space: nowrap;
  border-radius: 2px;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  color: ${({ color }) => {
    return color || SFColor
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  &:hover {
    // background-color: ${'#f4f4f4'};
    color: ${PColor};
    cursor: ${({ disabled }) => {
    return disabled ? 'no-drop' : 'pointer'
  }};
    ${({ hover }) => {
    return (
      hover &&
        css`
          color: ${PVColor};
        `
    )
  }}
  }
  &:hover > ${IconSel} {
    background-color: ${'#f4f4f4'};
    color: ${PColor};
    cursor: ${({ disabled }) => {
    return disabled ? 'no-drop' : 'pointer'
  }};
    ${({ hover }) => {
    return (
      hover &&
        css`
          color: ${PVColor};
        `
    )
  }}
  }
  &:hover ~ ${Tooltip} {
    display: block;
  }
  &:focus > svg {
    fill: ${PLColor};
  }
`
const CustomButtonS = styled.button`
  position: relative;
  display: block;
  background-color: ${({ bgColor, disabled, error }) => {
    const errorColor = error ? EColor : bgColor || '#fff'
    return disabled ? 'rgba(239, 239, 239, 0.3)' : errorColor
  }};
  outline: 0;
  border-bottom: ${({ border }) => {
    return border || `1px solid ${SFVColor}`
  }};
  text-align: left;
  height: ${({ height }) => {
    return height || '45px'
  }};
  white-space: nowrap;
  border-radius: 2px;
  /* text-overflow: ellipsis;
    overflow: hidden; */
  font-family: PFont-Light;
  color: ${({ color }) => {
    return color || SFColor
  }};
  width: ${({ width }) => {
    return width || '100%'
  }};
  &:hover {
    background-color: ${'#f4f4f4'};
    color: ${PColor};
    cursor: ${({ disabled }) => {
    return disabled ? 'no-drop' : 'pointer'
  }};
    ${({ hover }) => {
    return (
      hover &&
        css`
          color: ${PVColor};
        `
    )
  }}
  }
  &:hover ~ ${Tooltip} {
    display: block;
  }
  &:focus {
    border: 1px solid ${PColor};
  }
`

const BoxOptions = styled.div`
  bottom: ${({ bottom }) => {
    return bottom || '0'
  }};
  top: ${({ top, search }) => {
    return top && search ? '0%' : '0'
  }};
  width: 100%;
  min-width: ${(props) => {
    return props.fullName ? 'min-content' : 'auto'
  }};
  background-color: ${BGColor};
  border: 1px solid #cccccc50;
  overflow-y: auto;
  height: ${({ heightBox, search }) => {
    return heightBox && search ? 'min-content' : 'auto'
  }};
  z-index: 9999999888;
  max-height: 300px;
`
const ContentBox = styled.div`
  bottom: ${({ search }) => {
    return search ? '-20px' : '0'
  }};
`
const SpanText = styled.label`
  font-size: 14px;
  color: ${SFColor};
  ${(props) => {
    return (
      props.noLabel &&
      css`
        display: none;
      `
    )
  }}
`
const TextNotResult = styled.span`
  font-size: 20px;
  color: ${SEGColor};
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
// Input Text (search engine)
export const InputText = styled.input`
  width: 100%;
  margin: 0;
  padding: 20px 8px;
  outline: none;
  border: 1px solid #ccc;
  font-size: 12px;
`