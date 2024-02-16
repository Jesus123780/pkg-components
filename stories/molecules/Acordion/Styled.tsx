'use-client'

import Link from 'next/link'
import styled, { css } from 'styled-components'

export const Span = styled.span`
  color: ${(props) => {
    return !props.active ? '#3e3e3e' : '#090a0a'
  }};
    cursor: pointer;
    width: 100%;
    word-break: break-word;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--color-text-gray-light);
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 0.875rem;
`
export const LinkOption = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 12px;
  padding: 5px 10px;
  padding-left: 10px;
  text-align: left;
  margin: 0 30px;
`

export const SideBarLeft = styled.div`
  margin-left: ${(props) => {
    return props.menu ? '0' : '-100%'
  }};
  width: 280px;
  max-width: 280px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  transition: 0.3s;

  @media (min-width: 1024px) {
    position: static;
    width: 100%;
    margin-left: 0;
  }
`
export const BoxSideBar = styled.aside`
  width: 100%;
  height: 100%;
  background: red;
  padding: 0.8em 0;
  overflow: auto;
`
export const MenuLeft = styled.button`
  width: 100%;
  height: ${({ height }) => {
    return height || 'auto'
  }}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: none;
  outline: 0;
  position: relative;
  font-family: PFont-Regular;
  border-bottom: 1px solid #52525242;
  padding: 0;
  background: transparent;
  ${(props) => {
    return (
      props.active &&
      css`
        border-bottom: none;
      `
    )
  }};

  align-self: ${({ alignSelf }) => {
    return alignSelf || 'auto'
  }};
  & > div:first-child {
    justify-content: space-between;
    pointer-events: none;
    padding: 10px;
    ${(props) => {
    return props.active && css``
  }};
  }
  transition: 0.4s ease;
  overflow: hidden;
`
export const Row = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 8px 0px;
  position: relative;
  width: 100%;
  z-index: 10;
`
export const OptionMenu = styled.div`
  width: 100%;
  display: block;
  overflow: auto;
  width: 100%;
  overflow: hidden;
  padding: 0;
  ${(props) => {
    return (
      props.active &&
      css`
        background-color: #cccccc;
        border-bottom: none;
      `
    )
  }};
`
export const Box = styled.div``
export const BoxTitleNavBar = styled.div`
  padding: 5px 0 50px;
  text-align: center;
  width: 100%;
  background: blue;
`

export const ContainerBurger = styled.div`
  width: max-content;
  .BurgerMenu__container {
    align-items: center;
    display: flex;
    flex-direction: column;
    div {
      background-color: transparent;
      transition: all 0.3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(-180deg);
    }
  }
`
