import React from 'react'
import styled, { css } from 'styled-components'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

interface Option {
  icon: string
  optionName: string
  action?: () => void
}

interface DropdownMenuProps {
  options?: Option[]
  show: boolean
  position?: { x: number, y: number }
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ options = [], show, position }) => {
  if (!show) return <></>
  return (
    <Container position={position}>
      {options?.map((x, i) => (
        <DropdownItem key={'context_menu_option_' + i} onClick={x?.action ?? (() => true)}>
          {x?.icon !== '' && (
            <Icon color={getGlobalStyle('--color-icons-black')} height={20} width={20} size={20} icon={x.icon ?? 'IconArrowRight'} />
          )}
          {x?.optionName}
        </DropdownItem>
      ))}
    </Container>
  )
}

interface ContainerProps {
  position?: { x: number, y: number }
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 99;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
  border-radius: 0.25rem;
  padding: 0.5rem 0;
  min-width: 10rem;
  background-color: #fff;
  color: #343434;
  ${(props) =>
    props.position &&
    css`
      top: ${props.position.y}px;
      left: ${props.position.x}px;
    `}
  width: auto;
`

export const ContextTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  padding: 6px;
`

export const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.35rem 1.5rem;
  clear: both;
  font-weight: 400;
  font-size: 0.8125rem;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  &&:hover {
    color: #1e2125;
    text-decoration: none;
    background-color: #f8f9fa;
  }
`
