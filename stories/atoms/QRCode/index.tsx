import React from 'react'
import QRCode from 'react-qr-code'
import { Column } from '../Column'
import { getGlobalStyle } from '../../../utils'

interface QRCodeProps {
  value: string
  size?: number
}

export const ImageQRCode: React.FC<QRCodeProps> = ({
  value = '',
  size = 100
}): JSX.Element => {
  return (
      <Column>
        {String(value)?.trim() !== '' && value !== null &&
          <QRCode
            size={size}
            value={value}
            level="Q"
            bgColor={getGlobalStyle('--color-base-white')}
          />
        }
      </Column>
  )
}

ImageQRCode.defaultProps = {
  size: 100
}
