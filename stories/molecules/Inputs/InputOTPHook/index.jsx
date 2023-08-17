import PropTypes from 'prop-types'
import React, { memo, useState, useCallback } from 'react'
import SingleInput, { Content } from './SingleInput'

export const InputOTPHookMemo = (props) => {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    arrayCode,
    inputClassName,
    inputStyle,
    ...rest
  } = props

  // Define state activeInput = 0
  const [activeInput, setActiveInput] = useState(0)

  // Define state otpValues = array with <length> items with default value = ""
  const [otpValues, setOTPValues] = useState(arrayCode || Array(length).fill(''))

  // helpers
  // Define some helper functions

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp) => {
      const otpValue = otp.join('')
      onChangeOTP(otpValue)
    },
    [onChangeOTP]
  )

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str) => {
      let changedValue = str
      if (!isNumberInput) {
        return changedValue
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : ''
    },
    [isNumberInput]
  )

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues]
      updatedOTPValues[activeInput] = str[0] || ''
      setOTPValues(updatedOTPValues)
      handleOtpChange(updatedOTPValues)
    },
    [activeInput, handleOtpChange, otpValues]
  )

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
      setActiveInput(selectedIndex)
    },
    [length]
  )

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1)
  }, [activeInput, focusInput])

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1)
  }, [activeInput, focusInput])

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index) => {return () => {
      focusInput(index)
    }},
    [focusInput]
  )

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e) => {
      const val = getRightValue(e.currentTarget.value)
      if (!val) {
        e.preventDefault()
        return
      }
      changeCodeAtFocus(val)
      focusNextInput()
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  )

  // Hanlde onBlur input
  const handleOnBlur = useCallback(() => {
    setActiveInput(-1)
  }, [])

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault()
          if (otpValues[activeInput]) {
            changeCodeAtFocus('')
          } else {
            focusPrevInput()
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          focusPrevInput()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          focusNextInput()
          break
        }
        case ' ': {
          e.preventDefault()
          break
        }
        default:
          break
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  )

  const handleOnPaste = useCallback(
    (e) => {
      e.preventDefault()
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('')
      if (pastedData) {
        let nextFocusIndex = 0
        const updatedOTPValues = [...otpValues]
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val)
            if (changedValue) {
              updatedOTPValues[index] = changedValue
              nextFocusIndex = index
            }
          }
        })
        setOTPValues(updatedOTPValues)
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
      }
    },
    [activeInput, getRightValue, length, otpValues]
  )

  return (
    <Content {...rest}>
      {Array(length)
        .fill('')
        .map((_, index) => {return (
          <SingleInput
            autoFocus={autoFocus}
            className={inputClassName}
            disabled={disabled}
            focus={activeInput === index}
            key={`SingleInput-${index}`}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onFocus={handleOnFocus(index)}
            onKeyDown={handleOnKeyDown}
            onPaste={handleOnPaste}
            style={inputStyle}
            value={otpValues && otpValues[index]}
          />
        )})}
    </Content>
  )
}

InputOTPHookMemo.propTypes = {
  arrayCode: PropTypes.func,
  autoFocus: PropTypes.any,
  disabled: PropTypes.any,
  inputClassName: PropTypes.any,
  inputStyle: PropTypes.any,
  isNumberInput: PropTypes.any,
  length: PropTypes.number,
  onChangeOTP: PropTypes.func
}

export const InputOTPHook = memo(InputOTPHookMemo)
