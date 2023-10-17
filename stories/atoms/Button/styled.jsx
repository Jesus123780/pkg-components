import styled from 'styled-components'

export const CustomButton = styled.button`
    width: ${({ width}) => {return width ? width : 'auto'} };
    cursor: pointer;
    padding: ${({ padding}) => {return padding ? padding : 'auto'} }
`