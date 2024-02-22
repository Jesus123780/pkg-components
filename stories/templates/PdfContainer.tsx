import React from 'react'
import {
  Document,
  Page,
  PDFViewer
} from '@react-pdf/renderer'

interface PdfContainerProps {
  children: React.ReactNode
  pageSize?: string | undefined
}

export const PdfContainer: React.FC<PdfContainerProps> = ({ children }) => {
  return (
    <PDFViewer
      style={{
        width: '100%',
        height: '90vh'
      }}
    >
      {children}
    </PDFViewer>
  )
}
export const PdfContainerDownload: React.FC<PdfContainerProps> = ({ children, pageSize }) => {
  return (
      <Document>
        <Page
          size={'A4'}
          style={{
            margin: 20,
            paddingRight: 40
          }}
        >
          {children}
        </Page>
      </Document>
  )
}
