import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { IconColombia } from '../../../../assets/icons'
import { countries } from './helpers'
import './styles.css'
import { Icon } from '../../../atoms'

const colombianPhoneNumberRegex = /^(\+57)?([1-9]{1}[0-9]{0,9})$/

interface PhoneInputProps {
  defaultCountry?: string
  onChange?: (value: string) => void
  required?: boolean
  value?: string
  name?: string
  style?: React.CSSProperties
}
export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  required = false,
  name = '',
  onChange = (value) => { return value },
  defaultCountry = 'CO',
  style = {}
}) => {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry)
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(value)
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true)

  const handleCountrySelection = (countryCode) => {
    setSelectedCountry(countryCode)
    onChange(countryCode)
  }

  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-numeric characters from the input value
    const numericValue = phoneNumber.replace(/\D/g, '')
    let formattedValue = numericValue

    // Format the phone number according to the Colombian format
    if (numericValue.length >= 3 && numericValue.length <= 6) {
      formattedValue = `${numericValue.slice(0, 3)} ${numericValue.slice(3)}`
    } else if (numericValue.length > 6) {
      formattedValue = `${numericValue.slice(0, 3)} ${numericValue.slice(3, 6)} ${numericValue.slice(6)}`
    }

    setFormattedPhoneNumber(formattedValue)
    onChange(formattedValue)
  }

  const handleInputChange = (event) => {
    let phoneNumber = event.target.value

    // Si el número ingresado supera el formato deseado, truncarlo
    if (phoneNumber.length > 12) {
      phoneNumber = phoneNumber.slice(0, 12)
    } else if (phoneNumber.length === 3 && event.nativeEvent.inputType === 'deleteContentBackward') {
      // Permitir la eliminación completa si solo se han ingresado tres primeros números
      phoneNumber = ''
    }

    formatPhoneNumber(phoneNumber)
    setIsValidPhoneNumber(colombianPhoneNumberRegex.test(phoneNumber))
  }

  return (
    <div className='phone-input-container' style={style}>
      <div className='phone-country-selector'>
        {countries.map((country) => {
          return (
          <button
            aria-label={`Select ${country.name}`}
            className={`phone-country-selector-button ${
              selectedCountry === country.code ? 'selected' : ''
            }`}
            key={country.code}
            onClick={() => { return handleCountrySelection(country.code) }}
            title={country.name}
          >
            <Icon icon='IconColombia' size={25} />
          </button>
          )
        })}
      </div>
      <input
        className={`phone-input ${
          isValidPhoneNumber ? '' : 'invalid'
        }`}
        onChange={handleInputChange}
        placeholder='Ingresa el número de teléfono'
        type='tel'
        name={name}
        value={formattedPhoneNumber}
      />
    </div>
  )
}

PhoneInput.propTypes = {
  defaultCountry: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.any
}
