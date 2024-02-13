import styled from 'styled-components'

export type ColumnProps = {
  alignItems?: string;
  justifyContent?: string;
};

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
`;
