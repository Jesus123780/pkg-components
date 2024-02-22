import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  }
})

interface ColumnProps {
  children: React.ReactNode
  style?: object
  title?: string
}

export const Column: React.FC<ColumnProps> = ({ children, title = '', style }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <View id={title} style={[styles.column, style]}>{children}</View>
)

interface RowProps {
  children: React.ReactNode
  style?: object
  title?: string
}

export const Row: React.FC<RowProps> = ({ children, style }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <View style={[styles.row, style]}>{children}</View>
)
