'use client'

import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import { DateRange, type Range, Calendar } from 'react-date-range'
import { Icon } from '../../../atoms'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getGlobalStyle } from '../../../../helpers'
import styles from './styles.module.css'

interface InputDateProps {
  classNames?: string
  date: Date
  defaultValue?: string
  id?: string
  keySelection?: string
  label?: string
  maxDate?: Date
  minDate?: Date
  name?: string
  placeholder?: string
  style?: React.CSSProperties
  value?: Date
  withRange?: boolean
  showClearButton?: boolean
  onChange: (date: Date) => void
  onCleanValue?: () => void
  onSelect?: (ranges: Range[]) => void
}

export const InputDate: React.FC<InputDateProps> = ({
  id = 'input-date',
  placeholder,
  value,
  label,
  date = null,
  style,
  showClearButton = false,
  keySelection,
  minDate,
  maxDate,
  withRange = false,
  onChange = () => { },
  onCleanValue = () => { }
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const componentRef = useRef<HTMLDivElement>(null)

  const handleOpen = (): void => {
    setOpen(!open)
  }

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: keySelection ?? 'selection'
  })
  const handleSelect = (ranges: { selection: { startDate: Date, endDate: Date, key: string } }): void => {
    setSelectionRange(ranges.selection)
    onChange(ranges.selection.startDate)
  }

  const onChangeCalendar = (date: Date): void => {
    onChange(date)
  }

  // Function to handle clicks outside the component
  const handleClickOutside = (event: MouseEvent): void => {
    if ((componentRef.current != null) && !componentRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const formattedDate = format(new Date(date ?? new Date()), 'dd MMMM yyyy', { locale: es })

  return (
    <div
      ref={componentRef}
      style={{
        position: 'relative',
        width: 'min-content'
      }}>
      <div
        className={styles.container}
        style={style}
        onClick={handleOpen}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center'
        }}>
          <label htmlFor={`input-date_id_${id}`} style={{
            color: getGlobalStyle('--color-neutral-gray-dark')
          }}>
            {label ?? placeholder}
          </label>

          <span className={styles.text_date}>
            {formattedDate}
          </span>
          {showClearButton && <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0
          }} onClick={(e) => {
            e.stopPropagation()
            onCleanValue()
          }}>
            <Icon
              color={getGlobalStyle('--color-icons-black')}
              icon='IconCancel'
            />
          </button>}
          <>
            <Icon
              color={getGlobalStyle(date !== null ? '--color-icons-primary' : '--color-icons-black')}
              icon='IconCalendar'
            />
          </>
        </div>

      </div>
      <div className={styles.input_date}>
        {(!withRange && open) &&
          <Calendar
            dateDisplayFormat='dd MMM yyyy'
            date={value}
            onRangeFocusChange={(focusedRange) => console.log(focusedRange)}
            fixedHeight
            color={getGlobalStyle('--color-icons-primary')}
            onChange={onChangeCalendar}
          />
        }
        {(open && withRange) &&
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            onRangeFocusChange={(focusedRange) => console.log(focusedRange)}
            rangeColors={[getGlobalStyle('--color-icons-primary')]}
            minDate={minDate}
            maxDate={maxDate}
            editableDateInputs={false}
            direction='vertical'
          />
        }
      </div>
    </div>
  )
}
