import React from 'react'
import { Text as CustomText, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333333',
    marginBottom: 5
  }
})

interface TextProps {
  children: string
  style?: object
}
export const Text: React.FC<TextProps> = ({ children, style }) => (
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
  <CustomText style={[styles.text, style]}>{children}</CustomText>
)
