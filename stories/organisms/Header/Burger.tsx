import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PColor } from '../../../assets/colors'

export const Burger = ({
  status = '',
  handleOpenMenu = () => { return }
}) => {

  return (
    <ContainerBurger>
      <div
        className='BurgerMenu__container'
        onClick={() => { return handleOpenMenu() }}
        role='button'
      >
        <span className={status}></span>
        <span className={status}></span>
        <span className={status}></span>
      </div>
    </ContainerBurger>
  )
}

Burger.propTypes = {
  collapsed: PropTypes.any,
  handleOpenMenu: PropTypes.func,
  setCollapsed: PropTypes.any,
  setStatus: PropTypes.any,
  status: PropTypes.any
}

export const ContainerBurger = styled.div`
    width: max-content;
    .BurgerMenu__container {
    display: flex;
    align-items: center;
    flex-direction: column;
    span {
      background-color: ${ PColor };
      width: 30px;
      height: 2px;
      margin: 4px;
      border-radius: 1px;
      transition: all .3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(45deg) translateY(4px) translateX(6px);

    }
    .open:nth-child(2) {
      opacity: 0;
    }
    .open:nth-child(3) {
      transform: rotate(-50deg) translateY(-7px) translateX(9px);
    }
}`