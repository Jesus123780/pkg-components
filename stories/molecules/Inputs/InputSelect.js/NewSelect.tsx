import React, {
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
  name = '',
  action = false,
  optionName = '',
  value = '',
  border,
  width = '100%',
  search = ' ',
  title = '',
  padding = '',
  margin = '',
  minWidth = '',
  error = false,
  required = false,
  overLine = false,
  accessor = '',
  fullName,
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
  const handleClickOutside = (event: MouseEvent): void => {
    if ((componentRef.current != null) && !componentRef.current.contains(event.target as Node)) {
      setShowOptions(false)
    }
  }

  // EFFECTS
  useEffect(() => { setNewOption(options) }, [options])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={styles['input-wrapper']}
      ref={componentRef}
      style={{
        outline: `2px solid ${getGlobalStyle(showOptions ? '--color-secondary-blue' : '--color-base-transparent')}`,
        cursor: disabled ? 'no-drop' : 'pointer'
      }}
    >
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
            size={15} />
        </Column>
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
          <Icon icon='IconPlus' size={25} style={{
            margin: getGlobalStyle('')
          }} />
          {newOption.length > 0
            ? 'Agregar'
            : `Agregar ${
          (valueInput.length > 0) && typeof valueInput === 'string' && valueInput.length > 0
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
