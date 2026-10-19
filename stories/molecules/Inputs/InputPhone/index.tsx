'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { countries as defaultCountries, type PhoneCountry } from './helpers'
import styles from './styles.module.css'

export interface PhoneInputChangeDetails {
  country: PhoneCountry
  /** Digits only, without the country calling code. */
  nationalNumber: string
  /** National number as displayed in the input. */
  formattedNumber: string
  /** E.164-style value, e.g. +573001234567. Empty when no number is entered. */
  internationalNumber: string
  isValid: boolean
}

export interface PhoneInputProps {
  /** ISO country code (CO) or dial code (+57). Defaults to Colombia. */
  defaultCountry?: string
  /** Kept compatible with the original component. */
  onChange?: (value: string) => void
  required?: boolean
  /** National number by default; may also receive an international value via outputFormat. */
  value?: string
  name?: string
  style?: React.CSSProperties
  /** Extend or replace the built-in country collection. */
  countryOptions?: PhoneCountry[]
  /** Countries shown at the top of the list, in the order provided. */
  preferredCountries?: string[]
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  id?: string
  className?: string
  /** `national` preserves the component's original onChange output; `international` includes +dialCode. */
  outputFormat?: 'national' | 'international'
  /** Applies optional country-specific grouping, such as 300 123 4567. */
  autoFormat?: boolean
  /** Shows a searchable country list. */
  showSearch?: boolean
  /** Allows the user to open and change the selected country. */
  allowCountrySelection?: boolean
  /** Receives the selected country when it changes. */
  onCountryChange?: (country: PhoneCountry) => void
  /** Extended callback with both national and international values plus basic validity. */
  onChangeDetails?: (details: PhoneInputChangeDetails) => void
  /** Shows the validation helper text after the input has been blurred. */
  showValidationMessage?: boolean
  autoComplete?: string
}

interface ParsedPhoneValue {
  nationalNumber: string
  country?: PhoneCountry
}

const onlyDigits = (value: string) => value.replace(/\D/g, '')

const getFlag = (country: PhoneCountry) => {
  if (country.flag) return country.flag
  if (!/^[a-z]{2}$/i.test(country.code)) return '🌐'

  return String.fromCodePoint(
    ...country.code
      .toUpperCase()
      .split('')
      .map((character) => 127397 + character.charCodeAt(0))
  )
}

const getMaxLength = (country: PhoneCountry) => {
  if (country.maxLength) return country.maxLength
  return Math.max(4, 15 - onlyDigits(country.dialCode).length)
}

const getMinLength = (country: PhoneCountry) => country.minLength ?? 7

const getCountry = (countryValue: string, list: PhoneCountry[]) => {
  const normalized = countryValue.trim().toUpperCase()
  return list.find(
    (country) =>
      country.code.toUpperCase() === normalized ||
      country.dialCode === countryValue.trim()
  )
}

const formatNationalNumber = (
  value: string,
  country: PhoneCountry,
  enabled: boolean
) => {
  if (!enabled || !country.formatGroups?.length || !value) return value

  const parts: string[] = []
  let offset = 0

  for (const groupSize of country.formatGroups) {
    if (offset >= value.length) break
    parts.push(value.slice(offset, offset + groupSize))
    offset += groupSize
  }

  if (offset < value.length) parts.push(value.slice(offset))
  return parts.join(' ')
}

const parsePhoneValue = (value: string | undefined, list: PhoneCountry[]): ParsedPhoneValue => {
  if (!value?.trim()) return { nationalNumber: '' }

  const trimmed = value.trim()
  const isInternational = trimmed.startsWith('+') || trimmed.startsWith('00')

  if (isInternational) {
    const internationalDigits = onlyDigits(trimmed.startsWith('00') ? trimmed.slice(2) : trimmed.slice(1))
    const orderedCountries = [...list].sort(
      (a, b) => onlyDigits(b.dialCode).length - onlyDigits(a.dialCode).length
    )
    const country = orderedCountries.find((item) =>
      internationalDigits.startsWith(onlyDigits(item.dialCode))
    )

    if (country) {
      return {
        country,
        nationalNumber: internationalDigits
          .slice(onlyDigits(country.dialCode).length)
          .slice(0, getMaxLength(country))
      }
    }
  }

  return { nationalNumber: onlyDigits(trimmed) }
}

const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  required = false,
  name = '',
  onChange = () => undefined,
  defaultCountry = 'CO',
  style = {},
  countryOptions = defaultCountries,
  preferredCountries = ['CO', 'US', 'MX', 'ES', 'AR', 'BR'],
  placeholder = 'Ingresa el número de teléfono',
  disabled = false,
  readOnly = false,
  id,
  className = '',
  outputFormat = 'national',
  autoFormat = true,
  showSearch = true,
  allowCountrySelection = true,
  onCountryChange,
  onChangeDetails,
  showValidationMessage = true,
  autoComplete = 'tel-national'
}) => {
  const generatedId = React.useId()
  const inputId = id ?? `phone-input-${generatedId}`
  const listId = `${inputId}-country-list`
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const initialParsedValue = parsePhoneValue(value, countryOptions)
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    initialParsedValue.country?.code ?? getCountry(defaultCountry, countryOptions)?.code ?? 'CO'
  )
  const [nationalNumber, setNationalNumber] = useState(initialParsedValue.nationalNumber)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const selectedCountry =
    countryOptions.find((country) => country.code === selectedCountryCode) ??
    getCountry(defaultCountry, countryOptions) ??
    countryOptions[0] ??
    defaultCountries[0]

  useEffect(() => {
    if (value === undefined) return

    const parsed = parsePhoneValue(value, countryOptions)
    setNationalNumber(parsed.nationalNumber)
    if (parsed.country) setSelectedCountryCode(parsed.country.code)
  }, [value, countryOptions])

  useEffect(() => {
    if (!isDropdownOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchQuery('')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (isDropdownOpen && showSearch) searchRef.current?.focus()
  }, [isDropdownOpen, showSearch])

  const formattedNumber = formatNationalNumber(nationalNumber, selectedCountry, autoFormat)
  const hasNumber = nationalNumber.length > 0
  const isValidPhoneNumber = hasNumber
    ? nationalNumber.length >= getMinLength(selectedCountry) &&
      nationalNumber.length <= getMaxLength(selectedCountry)
    : !required
  const showInvalid =
    (isTouched && required && !hasNumber) || (isTouched && hasNumber && !isValidPhoneNumber)

  const emitChange = (digits: string, country: PhoneCountry) => {
    const formatted = formatNationalNumber(digits, country, autoFormat)
    const international = digits ? `${country.dialCode}${digits}` : ''
    onChange(outputFormat === 'international' ? international : formatted)
    onChangeDetails?.({
      country,
      nationalNumber: digits,
      formattedNumber: formatted,
      internationalNumber: international,
      isValid:
        digits.length === 0
          ? !required
          : digits.length >= getMinLength(country) && digits.length <= getMaxLength(country)
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim()
    const hasInternationalPrefix = inputValue.startsWith('+') || inputValue.startsWith('00')

    if (hasInternationalPrefix) {
      const parsed = parsePhoneValue(inputValue, countryOptions)
      if (parsed.country) {
        const nextDigits = parsed.nationalNumber.slice(0, getMaxLength(parsed.country))
        setSelectedCountryCode(parsed.country.code)
        setNationalNumber(nextDigits)
        emitChange(nextDigits, parsed.country)
      } else {
        // Avoid treating an incomplete prefix such as "+5" as the national number.
        setNationalNumber('')
        emitChange('', selectedCountry)
      }
      return
    }

    const nextDigits = onlyDigits(inputValue).slice(0, getMaxLength(selectedCountry))
    setNationalNumber(nextDigits)
    emitChange(nextDigits, selectedCountry)
  }

  const handleCountrySelection = (country: PhoneCountry) => {
    setSelectedCountryCode(country.code)
    setIsDropdownOpen(false)
    setSearchQuery('')
    setIsTouched(false)
    onCountryChange?.(country)

    const nextDigits = nationalNumber.slice(0, getMaxLength(country))
    setNationalNumber(nextDigits)
    if (nextDigits) emitChange(nextDigits, country)
  }

  const filteredCountries = useMemo(() => {
    const query = normalizeSearch(searchQuery)
    const matching = countryOptions.filter((country) => {
      if (!query) return true
      return (
        normalizeSearch(country.name).includes(query) ||
        normalizeSearch(country.code).includes(query) ||
        country.dialCode.includes(query) ||
        onlyDigits(country.dialCode).includes(onlyDigits(query))
      )
    })

    if (query) return matching

    const preferred = preferredCountries
      .map((code) => matching.find((country) => country.code.toUpperCase() === code.toUpperCase()))
      .filter((country): country is PhoneCountry => Boolean(country))
    const preferredCodes = new Set(preferred.map((country) => country.code))
    return [...preferred, ...matching.filter((country) => !preferredCodes.has(country.code))]
  }, [countryOptions, preferredCountries, searchQuery])

  const preferredVisibleCountries = searchQuery
    ? []
    : filteredCountries.filter((country) =>
      preferredCountries.some((code) => code.toUpperCase() === country.code.toUpperCase())
    )
  const otherVisibleCountries = searchQuery
    ? filteredCountries
    : filteredCountries.filter(
      (country) =>
        !preferredCountries.some((code) => code.toUpperCase() === country.code.toUpperCase())
    )

  const renderCountryOption = (country: PhoneCountry) => (
    <button
      aria-selected={country.code === selectedCountry.code}
      className={`${styles.countryOption} ${
        country.code === selectedCountry.code ? styles.countryOptionSelected : ''
      }`}
      key={country.code}
      onClick={() => handleCountrySelection(country)}
      role="option"
      type="button"
    >
      <span aria-hidden="true" className={styles.countryFlag}>
        {getFlag(country)}
      </span>
      <span className={styles.countryName}>{country.name}</span>
      <span className={styles.countryDialCode}>{country.dialCode}</span>
    </button>
  )

  return (
    <div
      className={`${styles.phoneInputRoot} ${
        showInvalid ? styles.phoneInputRootInvalid : ''
      } ${disabled ? styles.phoneInputRootDisabled : ''} ${className}`.trim()}
      ref={rootRef}
      style={style}
    >
      <button
        aria-controls={listId}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
        aria-label={`País seleccionado: ${selectedCountry.name}, ${selectedCountry.dialCode}`}
        className={`${styles.countryButton} ${
          !allowCountrySelection ? styles.countryButtonStatic : ''
        }`}
        disabled={disabled || !allowCountrySelection}
        onClick={() => {
          setIsDropdownOpen((open) => !open)
          setSearchQuery('')
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && allowCountrySelection) {
            event.preventDefault()
            setIsDropdownOpen(true)
          }
        }}
        type="button"
      >
        <span aria-hidden="true" className={styles.selectedFlag}>
          {getFlag(selectedCountry)}
        </span>
        <span className={styles.selectedDialCode}>{selectedCountry.dialCode}</span>
        {allowCountrySelection && (
          <svg
            aria-hidden="true"
            className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}
            fill="none"
            viewBox="0 0 20 20"
          >
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        )}
      </button>

      <span aria-hidden="true" className={styles.inputDivider} />

      <input
        aria-describedby={showInvalid && showValidationMessage ? `${inputId}-error` : undefined}
        aria-invalid={showInvalid}
        autoComplete={autoComplete}
        className={styles.phoneInput}
        disabled={disabled}
        id={inputId}
        inputMode="tel"
        maxLength={Math.max(1, getMaxLength(selectedCountry) + (autoFormat ? 4 : 0))}
        name={name}
        onBlur={() => setIsTouched(true)}
        onChange={handleInputChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        type="tel"
        value={formattedNumber}
      />

      {isDropdownOpen && allowCountrySelection && (
        <div className={styles.countryDropdown}>
          {showSearch && (
            <div className={styles.searchContainer}>
              <svg aria-hidden="true" className={styles.searchIcon} fill="none" viewBox="0 0 24 24">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
                <path d="m16 16 4.3 4.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
              <input
                aria-label="Buscar país o código telefónico"
                className={styles.searchInput}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar país o código..."
                ref={searchRef}
                type="search"
                value={searchQuery}
              />
              {searchQuery && (
                <button
                  aria-label="Limpiar búsqueda"
                  className={styles.clearSearchButton}
                  onClick={() => setSearchQuery('')}
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
          )}

          <div aria-label="Países disponibles" className={styles.countryList} id={listId} role="listbox">
            {preferredVisibleCountries.length > 0 && (
              <>
                <p className={styles.groupLabel}>Frecuentes</p>
                {preferredVisibleCountries.map(renderCountryOption)}
              </>
            )}

            {otherVisibleCountries.length > 0 && (
              <>
                {!searchQuery && preferredVisibleCountries.length > 0 && (
                  <div aria-hidden="true" className={styles.listDivider} />
                )}
                {!searchQuery && <p className={styles.groupLabel}>Todos los países</p>}
                {otherVisibleCountries.map(renderCountryOption)}
              </>
            )}

            {filteredCountries.length === 0 && (
              <div className={styles.emptyState}>No encontramos ese país o código.</div>
            )}
          </div>
        </div>
      )}

      {showInvalid && showValidationMessage && (
        <span className={styles.validationMessage} id={`${inputId}-error`} role="alert">
          {!hasNumber
            ? 'Este campo es obligatorio.'
            : `Revisa el número de ${selectedCountry.name}. Debe tener entre ${getMinLength(
                selectedCountry
              )} y ${getMaxLength(selectedCountry)} dígitos.`}
        </span>
      )}
    </div>
  )
}

export default PhoneInput
