import styled from 'styled-components'

export interface ColumnProps {
  alignItems?: string
  justifyContent?: string
}

export const Column = styled.div<ColumnProps>`
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
`
