'use client'

import React, { useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { getGlobalStyle } from '../../../helpers'
import { Icon } from '../Icon'

const checkboxCheck = keyframes`
  0%: {
    width: 0;
    height: 0;
    border-color: #fff;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  33%: {
    width: 0.1.5em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  100%: {
    width: 0.1.5em;
    height: 0.5em;
    border-color: #fff;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
`

const Span = styled.span`
  align-items: center;
  cursor: pointer;
  display: grid;
  position: relative;
`

const zoomIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const CheckboxLabel = styled.label<{ checked: boolean }>`
  align-items: center;
  color: var(--color-base-black);
  display: flex;
  margin: 0.6em 0;
  position: relative;
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
  &&::before {
    align-items: center;
    background: transparent;
    border-radius: 5px;
    box-shadow: 0 0 0 2px var(--color-feedback-success-light) inset;
    content: "";
    cursor: pointer;
    display: flex;
    height: 1.5em;
    justify-content: center;
    margin-right: 1em;
    min-width: 1.5em;
    transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
    width: 1.5em;

    ${(props) =>
    props.checked &&
    css`
        content: "";
        color: #fff;
        cursor: pointer;
        box-shadow: 0 0 0 1em var(--color-feedback-success-light) inset;
        animation: ${checkboxCheck} 200ms cubic-bezier(0.4, 0, 0.23, 1);
      `}
  }
`

const CheckboxAtom = styled.input`
  bottom: 5.5px;
      opacity: 0;
  left: -5.5px;
  position: absolute;
  z-index: var(--z-index-10);
  cursor: pointer;
`

interface CheckboxProps {
  checked: boolean
  className?: string
  disabled?: boolean
  id?: any
  indeterminate?: boolean
  label?: any
  name?: any
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id?: any) => void
}

export const CheckboxCubeToMemo: React.FC<CheckboxProps> = ({
  checked,
  className = '',
  disabled = false,
  id,
  indeterminate = false,
  label,
  name,
  onChange = () => { },
  ...restProps
}) => {
  const inputEl = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    return onChange(event, id)
  }

  const disabledStyles = { color: '#CCC' }
  const CheckboxSvg = styled.div<{ checked: boolean }>`
    animation: ${({ checked }: { checked: boolean }) =>
      checked &&
      css`
        ${zoomIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      `};
    height: 1em;
    left: 4px;
    position: absolute;
    right: 0;
    stroke-width: 2;
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 1em;
    top: 12px;
    z-index: var(--z-index-5);
    cursor: pointer;
  `
  return (
    <Span
      className={className ?? ''}
      id={id}
      style={disabled ? disabledStyles : {}}
      {...restProps}
    >
      {checked && (
        <CheckboxSvg checked={checked}>
          <Icon
            color={getGlobalStyle('--color-icons-white')}
            icon='IconMiniCheck'
            size={15}
          />
        </CheckboxSvg>
      )}
      <CheckboxAtom
        checked={checked}
        disabled={disabled}
        id={`checkbox-${id}`}
        name={name}
        onChange={handleChange}
        ref={inputEl}
        type="checkbox"
      />
      <CheckboxLabel
        className={className ?? ''}
        checked={checked}
        htmlFor={`checkbox-${id}`}
      >
        {label}
      </CheckboxLabel>
    </Span>
  )
}

export const CheckboxCube = React.memo(CheckboxCubeToMemo, (prevProps, nextProps) => {
  return prevProps.checked === nextProps.checked
})
