import styled from "styled-components";

export const CustomButton = styled.button`
    width: ${({ width}) => width ? width : 'auto' };
    padding: ${({ padding}) => padding ? padding : 'auto' }
`