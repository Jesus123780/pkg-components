/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type DragEvent, useState } from 'react'
import styles from './styles.module.css'
import {
  Button,
  Column,
  LoadingButton,
  Text
} from '../../../../atoms'
import { getGlobalStyle } from '../../../../../helpers'

interface IImageUploaderProps {
  error: string
  formattedList: string
  inputRef: React.RefObject<HTMLInputElement>
  loading: boolean
  preview: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  handleRemoveImage: () => void
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => Promise<void>
}

/**
 * ImageUploader component for selecting and previewing an image file
 * @param {IImageUploaderProps} props
 * @returns {JSX.Element}
 */
export const ImageUploader: React.FC<IImageUploaderProps> = ({
  inputRef,
  onFileChange,
  handleDrop,
  handleRemoveImage,
  preview = '',
  loading = false,
  formattedList = '',
  error
}) => {
  const showPreviewImage = Boolean(preview)
  const [dragIn, setDragIn] = useState(false)

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setDragIn(e.type !== 'dragleave' && e.type !== 'drop')
  }

  return (
        <div className={styles.container}>
            <div className={styles.labelWrapper}>
                <Text className={styles.label}>
                    Imagen del producto
                </Text>
                <Text className={styles.tip}>
                    Se mostrará en el producto actual
                </Text>
            </div>
            <Text as='p' className={styles.description}>
                Aparece en el listado y en los detalles del producto.
            </Text>
            <div
                role='button'
                tabIndex={0}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={async (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  await handleDrop(e)
                }}
                className={styles.dropArea}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    inputRef.current?.click()
                  }
                }}
                style={{
                  borderColor: dragIn ? getGlobalStyle('--color-neutral-gray-silver') : getGlobalStyle('--color-neutral-gray')
                }}
            >
                {showPreviewImage
                  ? (
                        <div className={styles.placeholder}>
                            <img src={preview} alt='Preview' className={styles.preview} />
                        </div>
                    )
                  : (
                        <div className={styles.placeholder}>
                            <img
                                alt='placeholder'
                                className={styles.placeholderImage}
                                src='/images/dish-image-placeholder.png' // Opcional
                            />

                        </div>
                    )}
                {showPreviewImage
                  ? <Button
                        iconName='IconDelete'
                        iconPosition='left'
                        primary={true}
                        className={styles.button_overlay}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveImage()
                        }}
                    >
                        Eliminar imagen
                    </Button>
                  : <Button primary={true} className={styles.button_overlay}>
                        Selecciona una imagen
                    </Button>
                }
                <input
                    ref={inputRef}
                    type='file'
                    accept='image/jpeg,image/jpg,image/png'
                    hidden
                    onChange={async (e) => await onFileChange(e)}
                />
                {loading && (
                    <div className={styles.overlay}>
                        <Column>
                            <Text
                                align='center'
                                color='white'
                                weight='medium'
                            >
                                Cargando...
                            </Text>
                            <LoadingButton />
                        </Column>
                    </div>
                )}
            </div>

            <div className={styles.info}>
                <Text as='p'>
                    <Text weight='semibold'>
                        Formatos:
                    </Text>
                    {formattedList}
                </Text>
                <Text as='p'>
                    <Text weight='semibold'>
                        Peso máximo:
                    </Text>
                    20 MB
                </Text>
                <Text as='p'>
                    <Text weight='semibold'>
                        Resolución mínima:
                    </Text>
                    300x275
                </Text>
                {Boolean(error !== '') &&
                    <Text as='p' className={styles.error}>
                        {error}
                    </Text>
                }
            </div>

        </div>
  )
}
