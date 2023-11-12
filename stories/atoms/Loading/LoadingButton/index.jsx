import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { PColor } from '../../../../assets/colors'
import styles from './Loader.module.css'
export const LoadingButton = ({ color }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} style={{ backgroundColor: color }}></div>
    </div>
  )
}

LoadingButton.propTypes = {
  color: PropTypes.string
}

const ldsEllipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`
const ldsEllipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`
const ldsEllipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`

const EllipsisSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 70px;
  height: 20px;
  & > div {
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ color }) => {
    return color ? color : PColor
  }};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: ${ldsEllipsis1} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${ldsEllipsis2} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${ldsEllipsis2} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${ldsEllipsis3} 0.6s infinite;
  }
`
