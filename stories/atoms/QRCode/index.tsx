'use client'

import React, { useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react' // <- nuevo import correcto
import { getGlobalStyle } from '../../../utils'
import { Column } from '../Column'
import styles from './styles.module.css'

interface QRCodeProps {
  value: string
  size?: number
}

export const ImageQRCode: React.FC<QRCodeProps> = ({
  value = '',
  size = 100
}): JSX.Element => {
  if (value?.trim() === '') return <></>
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [qrSize, setQrSize] = React.useState<number>(size)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        setQrSize(Math.min(containerWidth, containerHeight, size))
      }
    }

    const resizeObserver = new ResizeObserver(updateSize)
    const currentContainer = containerRef.current

    if (currentContainer) {
      resizeObserver.observe(currentContainer)
    }

    // También reaccionar al cambio de tamaño de la ventana (por si el contenedor no cambia directamente)
    window.addEventListener('resize', updateSize)

    // Llamar una vez inmediatamente
    updateSize()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateSize)
    }
  }, [size])

  return (
    <Column className={styles.container} >
      <QRCodeSVG
        value={value}
        size={qrSize}
        style={{ width: '100%', height: '100%' }}
        level="Q" // Nivel de corrección
        bgColor={getGlobalStyle('--color-base-white')}
        fgColor={getGlobalStyle('--color-base-black')}
      />
    </Column>
  )
}

ImageQRCode.defaultProps = {
  size: 100
}
