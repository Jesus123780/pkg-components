import PropTypes from 'prop-types'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import styled, { css, keyframes } from 'styled-components'
import { PColor } from '../../../../assets/colors'
import { getGlobalStyle } from '../../../../utils'

export const Checkbox = ({
  checked,
  className = '',
  disabled = false,
  id,
  indeterminate = false,
  label,
  name,
  onChange = (event, id) => {
    return {
      event,
      id
    }
  },
  ...restProps
}) => {
  const inputEl = useRef(null)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const clickThreshold = 1000 // Umbral de tiempo en milisegundos

  const syncIndeterminateState = useCallback(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.indeterminate = indeterminate
    }
  }, [inputEl, indeterminate])

  useEffect(() => {
    syncIndeterminateState()
  }, [indeterminate, syncIndeterminateState])

  const handleChange = event => {
    if (indeterminate) {
      syncIndeterminateState()
    }

    const now = Date.now()

    if (now - lastClickTime < clickThreshold) {
      setClickCount(prevClickCount => {return prevClickCount + 1})
    } else {
      setClickCount(1)
    }

    if (clickCount >= 7) {
      // alert('¡Vas a quemar el teclado! Por favor, no hagas clic tan rápido.')
      setClickCount(0)
    }

    setLastClickTime(now)
    onChange(event, id)
  }

  const disabledStyles = { color: getGlobalStyle('--color-text-inactive') }

  return (
    <Span
      className={className || ''}
      id={id}
      style={disabled ? disabledStyles : {}}
      {...restProps}
    >
      <CheckboxAtom
        checked={checked}
        disabled={disabled}
        id={`checkbox-${id}`}
        name={name}
        onChange={handleChange}
        ref={inputEl}
        type='checkbox'
      />
      <CheckboxLabel checked={checked} htmlFor={`checkbox-${id}`}>
        {label}
      </CheckboxLabel>
    </Span>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.any,
  indeterminate: PropTypes.bool,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.func
}
const checkboxCheck = keyframes`
  0%: {
    width: 0;
    height: 0;
    border-color: #fff;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  33%: {
    width: 0.2em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  100%: {
    width: 0.2em;
    height: 0.5em;
    border-color: #fff;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
`
const Span = styled.span`
  align-items: center;
  cursor: pointer;
  display: grid;
`
const CheckboxLabel = styled.label`
  align-items: center;
  color: #9e9e9e;
  display: flex;
  margin: 0.6em 0;
  position: relative;
  transition: color 250ms cubic-bezier(0.4,0,0.23,1);
  &&::before {
    align-items: center;
    background: transparent;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #9e9e9e inset;
    content: "";
    cursor: pointer;
    display: flex;
    height: 2em;
    justify-content: center;
    margin-right: 1em;
    min-width: 2em;
    transition: all 250ms cubic-bezier(0.4,0,0.23,1);
    width: 2em;
}
${props => {
    return props.checked && css`
  &&::before {
    content: "";
    cursor: pointer;
    box-shadow: 0 0 0 0.5em ${PColor} inset;
    animation: ${checkboxCheck} 200ms cubic-bezier(0.4, 0, 0.23, 1);
  }
  `}}

`
const CheckboxAtom = styled.input`
  width: 0;
  height: 0;
`

