import PropTypes from 'prop-types'

import React, {
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { SFVColor } from '../../../../assets/colors'
import { IconNoShow, IconShowEye } from '../../../../assets/icons'
import {
  isCC,
  isEmail,
  isPassword,
  onlyLetters,
  rangeLength,
  valNit,
  validatePhoneNumber
} from '../../../../utils'
import { simpleVerifyEmail } from './helpers'
import {
  BoxInput,
  InputV,
  LabelInput,
  List,
  Listbox,
  ShowPass,
  TextAreaInput,
  Tooltip
} from './styled'

interface InputHooksProps {
  autoComplete?: string
  border?: string
  Cc?: any
  checked?: boolean
  autoFocus?: any
  dataForm?: object
  disabled?: boolean
  display?: string
  email?: any
  error?: string | boolean
  fontSize?: string
  height?: any
  labelColor?: any
  labelTop?: any
  letters?: any
  margin?: string
  maxWidth?: string
  minWidth?: string
  name?: string
  nit?: boolean
  numeric?: boolean
  onChange?: (e: any, v: any) => void
  padding?: string
  paddingInput?: string
  pass?: any
  passConfirm?: {
    passValue: any
    validate: any
  }
  placeholder?: string
  radius?: string
  range?: {
    max: any
    min: any
  }
  reference?: any
  required?: any
  setDataValue?: (e: any) => void
  title?: string
  messageError?: string
  type?: string
  typeTextarea?: boolean
  value?: string
  width?: string
  onFocus?: () => void
  onInvalid?: () => void
  onBlur?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
export const InputHooks: React.FC<InputHooksProps> = ({
  autoComplete = 'off',
  border = '',
  Cc,
  checked = false,
  autoFocus,
  dataForm = {},
  disabled = false,
  display = '',
  email = false,
  error = false,
  labelTop = '',
  fontSize = '14px',
  height,
  labelColor,
  letters,
  margin = '0',
  maxWidth = '',
  minWidth = '',
  name = '',
  nit = false,
  numeric = false,
  onChange = (e) => {
    return e
  },
  padding = '',
  paddingInput = '',
  pass,
  passConfirm,
  placeholder = '',
  radius = '',
  range,
  reference,
  required,
  title = '',
  messageError = '',
  type = 'text',
  typeTextarea = false,
  value = '',
  width = '100%',
  onFocus = () => { },
  onInvalid = () => { },
  setDataValue = () => { },
  onBlur = () => { },
  onKeyDown = () => { },
  ...rest
}) => {
  // STATE
  const [errors, setError] = useState(error)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [message, setMessage] = useState(messageError || 'El campo no debe estar vacío')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionList, setSuggestionList] = useState([])
  const errorFunc = (e, v, m) => {
    setError(v)
    v && setMessage(m)
    onChange(e, v)
  }
  useEffect(() => {
    setError(error)
  }, [error])

  const topLevelEmailDomainList = [
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'live.com',
    'yahoo.com',
    'icloud.com'
  ]
  const otherLevelEmailDomainList = [
    'gmail.com',
    'gmail.co.uk',
    'outlook.com',
    'outlook.co.uk',
    'yahoo.com',
    'yahoo.ca',
    'hotmail.com',
    'live.com',
    'icloud.com'
  ]
  const provideEmailSuggestion = (email) => {
    const emailParts = email.split('@')
    const emailUsername = emailParts[0]
    const emailDomain = emailParts[1]
    let suggestionList = []
    if (emailDomain !== undefined) {
      if (emailDomain === '') {
        suggestionList = topLevelEmailDomainList?.map(
          domain => { return emailUsername + '@' + domain }
        )
      } else {
        suggestionList = otherLevelEmailDomainList.filter(domain => { return domain.startsWith(emailDomain) }).map(domain => { return emailUsername + '@' + domain })
      }
    }
    return suggestionList
  }

  const autoCompleteEmail = (email) => {
    setShowSuggestions(false)
    // errorMessage: '',
    if (email) {
      const suggestionList = provideEmailSuggestion(email)
      if (suggestionList.length > 1) {
        setShowSuggestions(true)
        setSuggestionList(suggestionList)
      } else {
        const errorMessage = simpleVerifyEmail(email, setMessage)
        // eslint-disable-next-line no-empty
        if (errorMessage) {
          // mysql.services.clever-cloud.co
        }
      }
    }
  }
  // const arrowUpPressed = useKeyPress('ArrowUp')
  // const backSpace = useKeyPress('backSpace')
  // const arrowDownPressed = useKeyPress('ArrowDown')
  const arrowUpPressed = ''
  const backSpace = ''
  const arrowDownPressed = ''
  const initialState = { selectedIndex: 0 }

  function reducer(state, action) {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex: state.selectedIndex !== 0 ? state.selectedIndex - 1 : topLevelEmailDomainList.length - 1
        }
      case 'arrowDown':
        return {
          selectedIndex: state.selectedIndex !== topLevelEmailDomainList.length - 1 ? state.selectedIndex + 1 : 0
        }
      case 'Backspace':
        return {
          selectedIndex: 0
        }
      case 'select':
        return { selectedIndex: action.payload }
      default: return null
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' })
    }
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' })
    }
    if (backSpace) {
      dispatch({ type: 'Backspace' })
    }
  }, [arrowUpPressed, arrowDownPressed, backSpace])
  const refInput = useRef({
    focus: () => { return }
  })
  const handleSuggestionOnClick = () => {
    // setEmail(suggestion)
    setShowSuggestions(!showSuggestions)
    // setValue(suggestion)
    setTimeout(() => {
      refInput.current.focus()
    })
  }
  /**
     * @description Which function to validate the text fields by the onChange method
     * @version 0.0.1
     * @param {object} e change method event
     * @return {boolean} returns true or false if validation is successful or unsuccessful
     *
     */
  // eslint-disable-next-line consistent-return
  const validations = e => {
    autoCompleteEmail(e.target.value)
    // Valida que el campo no sea nulo
    if (required) {
      if (e.target.value.length == 0) return errorFunc(e, true, 'El campo no debe estar vacío')
      errorFunc(e, false, '')
    }
    // Valida que el campo sea tipo numérico
    if (numeric) {
      if (isNaN(parseFloat(e.target.value))) return errorFunc(e, true, 'El campo debe ser numérico')
      errorFunc(e, false, '')
    }
    // Valida que el campo sea solo letras
    if (letters) {
      if (onlyLetters(e.target.value)) return errorFunc(e, true, 'El campo debe contener solo letras')
      errorFunc(e, false, '')
    }
    // Valida que el campo esté en el rango correcto
    if (range) {
      if (rangeLength(e.target.value, range.min, range.max)) return errorFunc(e, true, `El rango de caracteres es de ${range.min} a ${range.max}`)
      errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de email correcto
    if (email) {
      if (isEmail(e.target.value)) return errorFunc(e, true, 'El formato de email no es válido')
      errorFunc(e, false, '')
    }
    if (pass) {
      if (isPassword(e.target.value)) { return errorFunc(e, true, 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.') } errorFunc(e, false, '')
    }
    if (nit) {
      if (valNit(e.target.value)) { return errorFunc(e, true, 'El nit no es correcto') } errorFunc(e, false, '')
    }
    if (Cc) {
      if (isCC(e.target.value)) { return errorFunc(e, true, 'El numero de documento no es correcto') } errorFunc(e, false, '')
    }
    if (type == 'tel') {
      if (validatePhoneNumber(e.target.value)) { return errorFunc(e, true, 'El numero de teléfono no es correcto') } errorFunc(e, false, '')
    }
    // Valida que las contraseñas coincidan
    if (passConfirm?.validate) {
      if (validatePhoneNumber(e.target.value, passConfirm?.passValue)) { return errorFunc(e, true, 'Las contraseñas no coinciden.') } errorFunc(e, false, '')
    }
    if (e) {
      return errorFunc(e, false, '')
    }
  }
  const isAutoComplete = !autoComplete ? 'off' : autoComplete
  const isEmailValue = email ? 'off' : isAutoComplete
  const handleBlur = () => {
  }
  const handleFocus = () => {
  }
  const asType = numeric ? 'number' : type
  return (
    <BoxInput
      {...rest}
      maxWidth={maxWidth}
      minWidth={minWidth}
      padding={padding}
      width={width}
    >
      {pass && <ShowPass onClick={() => { return setIsPasswordShown(!isPasswordShown) }} type='button'>
        {isPasswordShown ? <IconNoShow size='20px' /> : <IconShowEye size='20px' />}
      </ShowPass>}
      {!typeTextarea
        ? <div>
          <InputV
            {...rest}
            autoComplete={type === 'password' ? 'current-password' : isEmailValue}
            autoFocus={autoFocus}
            border={border}
            checked={checked}
            data-required={required}
            disabled={disabled}
            display={display}
            error={errors}
            focus={onFocus}
            margin={margin}
            name={name}
            numeric={numeric}
            onBlur={onBlur || handleBlur}
            onChange={(e) => { return validations(e) }}
            onFocus={handleFocus}
            onInvalid={onInvalid}
            paddingInput={paddingInput}
            placeholder={placeholder}
            radius={radius}
            ref={email ? refInput : reference}
            size={fontSize}
            type={isPasswordShown ? 'text' : asType}
            value={value}
            onKeyDown={onKeyDown}
          />
          {(!!showSuggestions) && (
            <div>
              <Listbox role='listbox'>
                {suggestionList.map((suggestion, index) => {
                  return (
                    <List
                      aria-pressed={index === state.selectedIndex}
                      key={index}
                      onClick={() => {
                        dispatch({ type: 'select', payload: index })
                        handleSuggestionOnClick()
                        setDataValue({ ...dataForm, [name]: suggestion })
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          dispatch({ type: 'select', payload: index })
                          e.target.blur()
                        }
                      }}
                      style={{ cursor: 'pointer', backgroundColor: index === state.selectedIndex ? `${SFVColor}2e` : 'transparent' }}
                      tabIndex={0}
                    >
                      {suggestion}
                    </List>
                  )
                })}
              </Listbox>
            </div>
          )}
        </div>
        : <TextAreaInput
          autoFocus={autoFocus}
          border={border}
          data-required={required}
          disabled={disabled}
          error={errors}
          height={height}
          maxWidth={maxWidth}
          minWidth={minWidth}
          name={name}
          numeric={numeric}
          onBlur={onBlur}
          onChange={validations}
          padding={padding}
          paddingInput={paddingInput}
          placeholder={placeholder}
          radius={radius}
          ref={reference}
          size={fontSize}
          value={value || ''}
          width={width}
        />}
      {<LabelInput
        error={error}
        labelColor={labelColor}
        labelTop={labelTop}
        onClick={() => { return refInput.current.focus() }}
        type={type}
        value={value}
      >
        {title}
      </LabelInput>}
      {errors && <Tooltip>{message}</Tooltip>}
    </BoxInput>
  )
}

InputHooks.propTypes = {
  Cc: PropTypes.any,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.any,
  border: PropTypes.string,
  checked: PropTypes.bool,
  dataForm: PropTypes.object,
  disabled: PropTypes.bool,
  display: PropTypes.string,
  email: PropTypes.shape({
    split: PropTypes.func
  }),
  error: PropTypes.string,
  fontSize: PropTypes.string,
  height: PropTypes.any,
  labelColor: PropTypes.any,
  labelTop: PropTypes.any,
  letters: PropTypes.any,
  margin: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  name: PropTypes.string,
  nit: PropTypes.bool,
  numeric: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  messageError: PropTypes.string,
  onInvalid: PropTypes.func,
  padding: PropTypes.string,
  paddingInput: PropTypes.string,
  pass: PropTypes.any,
  passConfirm: PropTypes.shape({
    passValue: PropTypes.any,
    validate: PropTypes.any
  }),
  placeholder: PropTypes.string,
  radius: PropTypes.string,
  range: PropTypes.shape({
    max: PropTypes.any,
    min: PropTypes.any
  }),
  reference: PropTypes.any,
  required: PropTypes.any,
  setDataValue: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
  typeTextarea: PropTypes.bool,
  value: PropTypes.string,
  width: PropTypes.string
}