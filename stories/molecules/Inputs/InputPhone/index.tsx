import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { IconColombia } from '../../../../assets/icons'
import { countries } from './helpers'
import './styles.css'

const colombianPhoneNumberRegex = /^(\+57)?([1-9]{1}[0-9]{0,9})$/

export const PhoneInput = ({
  value,
  required = false,
  onChange = (value) => { return value },
  defaultCountry = 'CO'
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
    <div className='phone-input-container'>
      <div className='phone-country-selector'>
        {countries.map((country) => {return (
          <button
            aria-label={`Select ${country.name}`}
            className={`phone-country-selector-button ${
              selectedCountry === country.code ? 'selected' : ''
            }`}
            key={country.code}
            onClick={() => {return handleCountrySelection(country.code)}}
            title={country.name}
          >
            <IconColombia size={25} />
          </button>
        )})}
      </div>
      <input
        className={`phone-input ${
          isValidPhoneNumber ? '' : 'invalid'
        }`}
        onChange={handleInputChange}
        placeholder='Enter phone number'
        type='tel'
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
