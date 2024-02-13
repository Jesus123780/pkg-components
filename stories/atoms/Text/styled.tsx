import styled from "styled-components"
import { TextFont } from ".";

const fontFamilies: Record<TextFont, string> = {
    regular: 'PFont-Regular',
    medium: 'PFont-Medium',
    bold: 'PFont-Bold',
    light: 'PFont-Light'
}

export const CustomText = styled.span<{ font?: TextFont }>`
  color: ${(props) => props.color};
  font-family: ${(props) => {
    const selectedFont = props.font || '';
    return fontFamilies[selectedFont as TextFont] || '';
  }};
`;
