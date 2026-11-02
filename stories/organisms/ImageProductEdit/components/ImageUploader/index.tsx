
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
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>
  handleRemoveImage: () => void
  handleDrop: (
    event: React.DragEvent<HTMLDivElement>
  ) => Promise<void>
}

/**
 * ImageUploader component for selecting and previewing an image file.
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

    if (loading) return

    setDragIn(
      e.type !== 'dragleave' &&
      e.type !== 'drop'
    )
  }

  const handleDropFile = async (
    e: DragEvent<HTMLDivElement>
  ): Promise<void> => {
    e.preventDefault()
    e.stopPropagation()

    setDragIn(false)

    if (loading) return

    await handleDrop(e)
  }

  const handleOpenFilePicker = (): void => {
    if (loading) return

    inputRef.current?.click()
  }

  const handleRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation()

    if (loading) return

    handleRemoveImage()
  }

  const handleSelectClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.stopPropagation()
    handleOpenFilePicker()
  }

  return (
    <div className={styles.container}>
      <div className={styles.labelWrapper}>
        <Text className={styles.label}>
          Imagen del producto
        </Text>

        <Text className={styles.tip}>
          Opcional
        </Text>
      </div>

      <Text
        as='p'
        className={styles.description}
      >
        Aparece en el listado y en los detalles del producto.
      </Text>

      <div
        role='group'
        aria-label='Área para cargar una imagen del producto'
        aria-disabled={loading}
        aria-busy={loading}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDropFile}
        className={[
          styles.dropArea,
          dragIn ? styles.dragActive : '',
          showPreviewImage ? styles.hasPreview : '',
          loading ? styles.isLoading : ''
        ].filter(Boolean).join(' ')}
        onClick={handleOpenFilePicker}
        style={{
          borderColor: dragIn
            ? getGlobalStyle('--color-primary-red')
            : undefined
        }}
      >
        {showPreviewImage ? (
          <div className={styles.placeholder}>
            <img
              src={preview}
              alt='Vista previa del producto'
              className={styles.preview}
            />
          </div>
        ) : (
          <div className={styles.placeholder}>
            <img
              alt='Imagen de referencia'
              className={styles.placeholderImage}
              src='/images/dish-image-placeholder.png'
            />

            <div className={styles.emptyState}>
              <Text
                as='p'
                className={styles.emptyTitle}
                weight={600}
              >
                Arrastra tu imagen aquí
              </Text>

              <Text
                as='p'
                className={styles.emptyDescription}
              >
                o selecciona un archivo desde tu dispositivo
              </Text>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {showPreviewImage && (
            <Button
              primary={true}
              className={styles.button_overlay}
              disabled={loading}
              onClick={handleSelectClick}
            >
              Cambiar imagen
            </Button>
          )}

          {showPreviewImage ? (
            <Button
              iconName='IconDelete'
              iconPosition='left'
              primary={false}
              className={styles.button_overlay}
              disabled={loading}
              onClick={handleRemoveClick}
            >
              Eliminar imagen
            </Button>
          ) : (
            <Button
              primary={true}
              className={styles.button_overlay}
              disabled={loading}
              onClick={handleSelectClick}
            >
              Seleccionar imagen
            </Button>
          )}
        </div>

        <input
          ref={inputRef}
          type='file'
          accept='image/jpeg,image/jpg,image/png'
          hidden
          disabled={loading}
          onChange={async (e) => {
            await onFileChange(e)
          }}
        />

        {loading && (
          <div
            className={styles.overlay}
            role='status'
            aria-live='polite'
          >
            <Column>
              <Text
                align='center'
                color='white'
                weight='medium'
                className={styles.loadingText}
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
          <Text
            weight='semibold'
            className={styles.infoLabel}
          >
            Formatos:
          </Text>

          {' '}{formattedList}
        </Text>

        <Text as='p'>
          <Text
            weight='semibold'
            className={styles.infoLabel}
          >
            Peso máximo:
          </Text>

          {' '}20 MB
        </Text>

        <Text as='p'>
          <Text
            weight='semibold'
            className={styles.infoLabel}
          >
            Resolución mínima:
          </Text>

          {' '}300x275
        </Text>

        {Boolean(error) && (
          <Text
            as='p'
            className={styles.error}
            color='error'
            weight={600}
            role='alert'
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  )
}
