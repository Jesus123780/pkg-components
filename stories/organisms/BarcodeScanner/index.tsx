'use client'
import React, { useEffect, useRef, useState } from 'react'
import Quagga from 'quagga'
import styles from './styles.module.css'
import { Text } from '../../atoms'
import { AlertInfo, type AlertInfoProps } from '../../molecules'

interface Icode {
  code: string
  format: string
}

interface IMessagesToast {
  title?: string
  description: string
  backgroundColor: AlertInfoProps['type']
}

export const BarcodeScanner: React.FC = () => {
  const scannerRef = useRef<HTMLDivElement>(null)
  const [scanned, setScanned] = useState<Icode[]>([])
  const [codes, setCodes] = useState<string[]>([])
  const [messagesToast, setMessagesToast] = useState<IMessagesToast | null>(null)

  const addcode = (code: Icode): void => {
    if (!codes.includes(code.code)) {
      setScanned((prev) => [...prev, code])
      setCodes((prev) => [...prev, code.code])
      setMessagesToast({
        title: 'EAN Added',
        description: `Código ${code.code} leído correctamente.`,
        backgroundColor: 'info'
      })
    } else {
      setMessagesToast({
        title: 'Duplicado',
        description: `El código ${code.code} ya fue escaneado.`,
        backgroundColor: 'warning'
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!scannerRef.current) return

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            facingMode: 'environment'
          }
        },
        decoder: {
          readers: ['ean_reader'],
          multiple: false
        },
        locate: true
      },
      (err) => {
        if (err) {
          console.error('Quagga init error:', err)
          return
        }
        Quagga.start()
      }
    )

    Quagga.onDetected((data) => {
      const code = data.codeResult.code
      const format = data.codeResult.format
      if (code !== '') addcode({ code, format })
    })

    return () => {
      Quagga.stop()
      Quagga.offDetected(() => { })
    }
  }, [])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => console.log('✅ Cámara disponible'))
      .catch((err) => console.error('🚫 Error con cámara:', err))
  }, [])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        console.log('✅ Cámara disponible')
      })
      .catch((err) => {
        console.error('🚫 Error con cámara:', err)

        // Detecta si la cámara está en uso por otra app
        if (err.name === 'NotReadableError') {
          setMessagesToast({
            title: 'Cámara en uso',
            description: 'La cámara está siendo utilizada por otra aplicación. Cierra otras apps que usen la cámara e intenta de nuevo.',
            backgroundColor: 'error'
          })
        } else if (err.name === 'NotAllowedError') {
          setMessagesToast({
            title: 'Permiso denegado',
            description: 'No se permitió el acceso a la cámara. Habilita el permiso en el navegador.',
            backgroundColor: 'error'
          })
        } else {
          setMessagesToast({
            title: 'Error de cámara',
            description: 'No se pudo acceder a la cámara. Intenta recargar la página o revisar los permisos.',
            backgroundColor: 'error'
          })
        }
      })
  }, [])

  return (
    <div className={styles.wrapper}>
      <Text as='h2' size='sm'>
        Escáner de Códigos (EAN-13)
      </Text>
      <div ref={scannerRef} className={styles.scanner} />
      <div className={styles.resultList}>
        <h3>Códigos Escaneados:</h3>
        {scanned.map((code, idx) => (
          <div key={idx} className={styles.code}>
            <strong>
              {code.code}
            </strong> <span>({code.format})</span>
          </div>
        ))}
      </div>

      {(messagesToast != null) && (
        <AlertInfo
          message={messagesToast.description ?? ''}
          type={messagesToast.backgroundColor}
        />
      )}
    </div>
  )
}
