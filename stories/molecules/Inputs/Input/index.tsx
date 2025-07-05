'use client'

import { InputV, LabelInput } from './styled'
import {
  isEmail,
  isPassword,
  onlyLetters,
  rangeLength
} from '../../../../helpers'
import React, { useEffect, useState, type ChangeEvent, type FC } from 'react'
import { Button } from '../../../atoms/Button'

interface InputProps {
  autoComplete?: string
  border?: string
  checked?: boolean
  disabled?: boolean
  letters?: string
  labelTop?: string
  fontSize?: string
  display?: string
  error?: string
  autoFocus?: boolean
  height?: boolean | string
  email?: boolean
  dataForm?: object | null | any
  labelColor?: string
  margin?: string
  maxWidth?: string
  minWidth?: string
  name?: string
  nit?: boolean
  numeric?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void // Ajustado para tipar correctamente el evento
  padding?: string
  paddingInput?: string
  pass?: boolean
  passConfirm?: boolean
  placeholder?: string
  radius?: string
  range?: ValidationRange
  reference?: React.RefObject<HTMLInputElement>
  required?: boolean
  title?: string
  type?: string
  typeTextarea?: boolean
  value?: string | number | readonly string[] // Ajustado para admitir tipos adicionales según el código proporcionado
  width?: string
  labelButton?: string
  onFocus?: () => void
  setDataValue?: () => void
  onBlur?: () => void
}

interface ValidationRange {
  min: number
  max: number
}

export const Input: FC<InputProps> = ({
  autoComplete = 'off',
  border = '',
  checked = false,
  autoFocus = false,
  dataForm = {},
  disabled = false,
  display = '',
  email = false,
  error = '',
  labelTop = '',
  labelButton = '',
  fontSize = '18px',
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
  type = 'text',
  typeTextarea = false,
  value = '',
  width = '100%',
  onFocus = () => {

  },
  setDataValue = () => {

  },
  onBlur = () => {

  },
  ...rest
}) => {
  const isAutoComplete = !autoComplete ? 'off' : autoComplete
  const isEmailValue = email ? 'off' : isAutoComplete
  const [errors, setErrors] = useState<string | boolean>(error)
  const [message, setMessage] = useState('El campo no debe estar vacío')

  const errorFunc = (
    e: ChangeEvent<HTMLInputElement>,
    v: boolean,
    m: string
  ) => {
    setErrors(v)
    v && setMessage(m)
    onChange(e)
  }
  useEffect(() => {
    setErrors(error)
  }, [error])

  const validations = (e: ChangeEvent<HTMLInputElement>) => {
    // Valida que el campo no sea nulo
    if (required) {
      if (e.target.value.length == 0) { return errorFunc(e, true, 'El campo no debe estar vacío') }
      errorFunc(e, false, '')
    }
    // Valida que el campo sea tipo numérico
    if (numeric) {
      if (isNaN(parseFloat(e.target.value))) { return errorFunc(e, true, 'El campo debe ser numérico') }
      errorFunc(e, false, '')
    }
    // Valida que el campo sea solo letras
    if (letters) {
      if (onlyLetters(e.target.value)) { return errorFunc(e, true, 'El campo debe contener solo letras') }
      errorFunc(e, false, '')
    }
    // Valida que el campo esté en el rango correcto
    if (range) {
      if (rangeLength(e.target.value, range.min, range.max)) {
        return errorFunc(
          e,
          true,
          `El rango de caracteres es de ${range.min} a ${range.max}`
        )
      }
      errorFunc(e, false, '')
    }
    // Valida si el campo tiene un formato de email correcto
    if (email) {
      if (isEmail(e.target.value)) { return errorFunc(e, true, 'El formato de email no es válido') }
      errorFunc(e, false, '')
    }
    if (pass) {
      if (isPassword(e.target.value)) {
        return errorFunc(
          e,
          true,
          'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.'
        )
      }
      errorFunc(e, false, '')
    }
    if (e) {
      return errorFunc(e, false, '')
    }
  }

  return (
    <div style={{ width, display: 'flex' }}>
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
        onBlur={onBlur}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          return validations(e)
        }}
        paddingInput={paddingInput}
        placeholder={placeholder}
        radius={radius}
        ref={reference}
        size={fontSize}
        value={value}
      />
      <LabelInput
        error={error}
        labelColor={labelColor}
        labelTop={labelTop}
        type={type}
        value={value}
      >
        {title}
      </LabelInput>
      <Button
        styles={{ margin: '0 0 0 3px' }}
        primary
        width="207px"
        borderRadius="5px 50px 50px 5px"
        fontSize="22px"
      >
        {labelButton}
      </Button>
    </div>
  )
}
