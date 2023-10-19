import styled from 'styled-components'

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: -5px;
  bottom: 0;
  position: absolute;
`
export const CustomButton = styled.button`
  width: ${({ width }) => {
    return width ? width : 'auto'
  }};
  cursor: pointer;
  position: relative;
  padding: ${({ padding }) => {
    return padding ? padding : 'auto'
  }};
`
