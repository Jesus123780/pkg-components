import React from 'react'
import styles from './styles.module.css'
import { Text } from '../../../../atoms'

interface IImageUploaderProps {
  inputRef: React.RefObject<HTMLInputElement>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  preview: string | null
  error: string
}

/**
 * ImageUploader component for selecting and previewing an image file
 * @param {IImageUploaderProps} props
 * @returns {JSX.Element}
 */
export const ImageUploader: React.FC<IImageUploaderProps> = ({
  inputRef,
  onFileChange,
  preview,
  error
}) => {
  return (
        <div className={styles.container}>
            <div className={styles.labelWrapper}>
                <Text className={styles.label}>Imagen del producto</Text>
                <Text className={styles.tip}>Se mostrará en el producto actual</Text>
            </div>
            <Text as='p' className={styles.description}>
                Aparece en el listado y en los detalles del producto.
            </Text>

            <div
                className={styles.dropArea}
                onClick={() => inputRef.current?.click()}
            >
                {preview ? (
                    <img src={preview} alt='Preview' className={styles.preview} />
                ) : (
                    <div className={styles.placeholder}>
                        <img
                            alt='placeholder'
                            className={styles.placeholderImage}
                            src='/images/image-placeholder.svg' // Opcional
                        />
                        <button className={styles.button}>Selecciona una imagen</button>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type='file'
                    accept='image/jpeg,image/jpg,image/png,image/heic'
                    hidden
                    onChange={onFileChange}
                />
            </div>

            <div className={styles.info}>
                <Text as='p'><strong>Formatos:</strong> JPEG, JPG, PNG e HEIC</Text>
                <Text as='p'><strong>Peso máximo:</strong> 20 MB</Text>
                <Text as='p'><strong>Resolución mínima:</strong> 300x275</Text>
                {error && <Text as='p' className={styles.error}>{error}</Text>}
            </div>
        </div>
  )
}
