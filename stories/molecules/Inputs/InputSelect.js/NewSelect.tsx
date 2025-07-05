'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  changeSearch,
  changeValue,
  renderVal
} from './helpers'
import type { NewSelectProps } from './types'
import {
  Column,
  Icon,
  Row
} from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'
import styles from './styles.module.css'

export const NewSelect: React.FC<NewSelectProps> = ({
  options = [],
  beforeLabel = '',
  disabled = false,
  id = '',
  icon = true,
  loading = false,
  sideLabel = '',
  title = '',
  name = '',
  action = false,
  optionName = '',
  value = '',
  error = false,
  canDelete = false,
  required = false,
  accessor = '',
  dataForm = {},
  handleClean = (dataForm: any) => { return null },
  onChange = () => {
    return null
  },
  handleClickAction = () => {
    return null
  }
}) => {
  // HOOKS
  const componentRef = useRef<HTMLDivElement>(null)

  const [valueInput, setValueInput] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [newOption, setNewOption] = useState([] as any)

  // HANDLESS
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if ((componentRef.current != null) && !componentRef.current.contains(event.target as Node)) {
      setShowOptions(false)
    }
  }, [])

  // EFFECTS
  useEffect(() => { setNewOption(options) }, [options])

  useEffect(() => {
    if (showOptions) {
      document.addEventListener('pointerdown', handleClickOutside)
    } else {
      document.removeEventListener('pointerdown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
    }
  }, [showOptions])

  const handleCleanInput = (): null => {
    setValueInput('')
    handleClean({ ...dataForm, [name]: undefined })
    setShowOptions(false)
    return null
  }
  const thereValue = (valueInput.length > 0) && typeof valueInput === 'string' && valueInput.length > 0
  return (
    <div
      className={styles['input-wrapper']}
      ref={componentRef}
      style={{
        outline: `2px solid ${getGlobalStyle(showOptions ? '--color-secondary-blue' : error ? '--color-text-error' : '--color-base-transparent')}`,
        cursor: disabled ? 'no-drop' : 'pointer'
      }}
    >
      <span className={`${styles['input-wrapper__title']} ${styles['input-wrapper__title--animated']} ${showOptions || value?.length > 0 ? styles['input-wrapper__title--active'] : ''}`}>
        {title}
      </span>

      <Row className={styles['input-wrapper_content']} justifyContent='space-between'>
        <input
          autoCorrect='off'
          autoComplete='off'
          data-required={required}
          id={id}
          name={name}
          tabIndex={0}
          role='combobox'
          aria-autocomplete='list'
          disabled={disabled}
          className={styles['input-wrapper_content_input']}
          onClick={() => {
            return null
          }}
          onFocus={() => {
            if (disabled) return null
            setShowOptions(true)
          }}
          onChange={(e) => {
            const value = e.target.value
            if (disabled) return null
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
          value={valueInput ?? ''}
          style={{
            cursor: disabled ? 'no-drop' : 'pointer'
          }}
        />
        <Column
          onClick={() => {
            if (disabled) return null
            return setShowOptions(!showOptions)
          }}
          type='button'
          alignItems='center'
          justifyContent='center'
          style={{
            display: icon ? 'flex' : 'none',
            width: '40px'
          }}>
          <Icon
            color={getGlobalStyle('--color-icons-black')}
            icon={loading ? 'IconLoading' : (showOptions ? 'IconSearch' : 'IconArrowBottom')}
            size={15}
          />
        </Column>
        {(thereValue && canDelete) &&
          <button onClick={handleCleanInput} type='button'>
            <Icon
              color={getGlobalStyle('--color-icons-black')}
              icon='IconCancel'
              size={20}
            />
          </button>
        }
      </Row>
      <div className={styles['input-wrapper__list']} style={{
        display: showOptions ? 'block' : 'none'
      }}>
        {action && <button
          className={styles['input-wrapper__list-option_action']}
          key='select_action'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            return handleClickAction()
          }}
        >
          <Icon
            icon='IconPlus'
            size={25}
            style={{
              margin: getGlobalStyle('')
            }}
          />
          {newOption.length > 0
            ? 'Agregar'
            : `Agregar ${(thereValue)
              ? valueInput.charAt(0).toUpperCase() + valueInput?.slice(1)
              : ''
            }`}
        </button>
        }
        {newOption.length > 0
          ? newOption.map((x: any) => {
            return (
              <div
                className={styles['input-wrapper__list-option']}
                key={x[id]}
                onClick={() => {
                  changeValue({
                    v: x,
                    id,
                    name,
                    optionName,
                    setShowOptions,
                    setValueInput,
                    onChange
                  })
                }}
              >
                {beforeLabel} {`${renderVal(x, optionName, accessor)}`} {sideLabel}
              </div>
            )
          })
          : Boolean(valueInput) && (
            <div className={styles['input-wrapper__list-option']}>
              No hay resultados.
            </div>
          )}
      </div>
    </div>
  )
}
