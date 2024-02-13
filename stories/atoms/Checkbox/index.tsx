import React, { useRef } from "react"
import styled, { css, keyframes } from "styled-components"
import { IconMiniCheck } from "../../assets/public/Icons"

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
    box-shadow: 0 0 0 2px #53a600 inset;
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
        box-shadow: 0 0 0 1em #53a600 inset;
        animation: ${checkboxCheck} 200ms cubic-bezier(0.4, 0, 0.23, 1);
      `}
  }
`

const CheckboxAtom = styled.input`
  width: 0;
  height: 0;
`

type CheckboxProps = {
  checked: boolean
  className?: string
  disabled?: boolean
  id?: any
  indeterminate?: boolean
  label?: any
  name?: any
  onChange: (event: React.ChangeEvent<HTMLInputElement>, id?: any) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  className = "",
  disabled = false,
  id,
  indeterminate = false,
  label,
  name,
  onChange = () => {},
  ...restProps
}) => {
  const inputEl = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event, id)
  }

  const disabledStyles = { color: "#CCC" }
  const CheckboxSvg = styled.div<{ checked: boolean }>`
    animation: ${({ checked }: { checked: boolean }) =>
      checked &&
      css`
        ${zoomIn} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      `};
    height: 1em;
    left: 8px;
    position: absolute;
    right: 0;
    stroke-width: 2;
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 1em;
    top: 10px;
    z-index: 99;
  `
  return (
    <Span
      className={className || ""}
      id={id}
      style={disabled ? disabledStyles : {}}
      {...restProps}
    >
      {checked && (
        <CheckboxSvg checked={checked}>
          <IconMiniCheck size={10} color="#ffffff" />
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
      <CheckboxLabel checked={checked} htmlFor={`checkbox-${id}`}>
        {label}
      </CheckboxLabel>
    </Span>
  )
}
