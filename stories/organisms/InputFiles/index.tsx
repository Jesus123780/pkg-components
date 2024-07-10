import React, {
  type ChangeEvent,
  type DragEvent,
  Fragment,
  type MouseEvent,
  useRef,
  useState
} from 'react'
import { Placeholder } from './Placeholder'
import {
  Column,
  Divider,
  Icon,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

interface InputFilesProps {
  actionCallBack?: boolean
  imageOnly?: boolean
  onlyOne?: boolean
  reset?: boolean
  limit?: number
  callBack?: () => void
  onChange?: (images: File[], previewImg: PreviewImage[]) => void
  sendNotification?: (notification: NotificationProps) => void
}

interface PreviewImage {
  temPath: string
  name: string
  ext: string
}

interface NotificationProps {
  message: string
  duration: number
  color: string
}

/**
 * InputFiles component to handle file uploads with drag-and-drop support.
 * @param {InputFilesProps} props - The properties for the component.
 * @returns {React.FC<InputFilesProps>}
 */
export const InputFiles: React.FC<InputFilesProps> = ({
  actionCallBack = false,
  imageOnly = false,
  limit = 0,
  callBack = () => { },
  onChange = () => { },
  sendNotification = () => { }
}) => {
  const [images, setImages] = useState<File[]>([])
  const [dragIn, setDragIn] = useState(false)
  const [previewImg, setPreviewImg] = useState<PreviewImage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileIconMap = {
    '.png': <img src='' alt='' />, // Placeholder, will be replaced dynamically
    '.svg': <img src='' alt='' />, // Placeholder, will be replaced dynamically
    '.jpg': <img src='' alt='' />, // Placeholder, will be replaced dynamically
    '.jpeg': <img src='' alt='' />, // Placeholder, will be replaced dynamically
    '.docx': <i>DocWord</i>,
    '.docm': <i>DocWord</i>,
    '.dotx': <i>DocWord</i>,
    '.dotm': <i>DocWord</i>,
    '.xlsx': <Icon icon='IconExcel' size={50} />,
    '.xlsm': <Icon icon='IconExcel' size={50} />,
    '.xlsb': <Icon icon='IconExcel' size={50} />,
    '.xltx': <Icon icon='IconExcel' size={50} />,
    '.xls': <Icon icon='IconExcel' size={50} />,
    default: <i>FILE COMUN</i>
  }

  const resetFileInput = (): void => {
    if (fileInputRef.current != null) {
      fileInputRef.current.value = ''
    }
  }

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target

    if (imageOnly && files !== null && !/\.(jpg|png|gif|jpeg)$/i.test(files[0]?.name)) {
      sendNotification({
        message: 'El archivo a adjuntar no es una imagen',
        duration: 20000,
        color: 'red'
      })
      resetFileInput()
      return
    }

    const newFiles = files !== null ? Array.from(files) : []
    setImages([...images, ...newFiles])
    onChange([...images, ...newFiles], [...previewImg])

    const newFilesPreview = newFiles.map(file => ({
      temPath: URL.createObjectURL(file),
      name: file.name,
      ext: file.name.substring(file.name.lastIndexOf('.'))
    }))

    setPreviewImg([...previewImg, ...newFilesPreview])
    if (actionCallBack) {
      callBack()
    }
    resetFileInput()
  }

  const handleRemove = (): void => {
    setImages([])
    setPreviewImg([])
    resetFileInput()
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, item: PreviewImage, index: number): void => {
    e.stopPropagation()
    const newImages = images.filter((_, i) => i !== index)
    const previewNewImages = previewImg.filter((_, i) => i !== index)

    setImages(newImages)
    setPreviewImg(previewNewImages)
    resetFileInput()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const files = event.dataTransfer.files
    const newFiles = Array.from(files)

    setImages([...images, ...newFiles])
    onChange([...images, ...newFiles], [...previewImg])

    const newFilesPreview = newFiles.map(file => ({
      temPath: URL.createObjectURL(file),
      name: file.name,
      ext: file.name.substring(file.name.lastIndexOf('.'))
    }))

    setPreviewImg([...previewImg, ...newFilesPreview])
    resetFileInput()
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setDragIn(e.type === 'dragenter' || e.type === 'dragover')
  }

  return (
    <div
      className={styles.container_box}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{
        borderRadius: getGlobalStyle('--border-radius-lg')
      }}
    >
      <input
        id='dropZone'
        multiple
        onChange={onFileInputChange}
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
      />
      <div
        className={styles.dropZone}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
          document.getElementById('dropZone')?.click()
        }}
        style={{
          borderWidth: !dragIn ? '3px' : '2px',
          borderColor: dragIn ? getGlobalStyle('--color-neutral-gray-silver') : getGlobalStyle('--color-neutral-gray')
        }}
      >
        {(previewImg.length === 0) && <Placeholder />}
        {previewImg.length > 0 && (
          <div className={styles.preview}>
            {previewImg.map((x, i) => (
              <Fragment key={i}>
                <div
                  className={styles.container_image}
                  title={x.name}
                >
                  {React.cloneElement(fileIconMap[x.ext] ?? fileIconMap.default, { src: x.temPath })}
                  {x.ext !== '.jpg' && x.ext !== '.png' &&
                    <Text
                      size='lg'
                      weight='bold'
                      className={styles.file_name}
                    >
                      {x.name}
                    </Text>
                  }
                  <button className={styles.button_remove} onClick={(e) => handleDelete(e, x, i)}>
                    <Icon icon='IconDelete' size={20} />
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
      <Column justifyContent='flex-end' alignItems='flex-end'>
        <Divider marginTop={getGlobalStyle('--spacing-xl')} />
        <button
          onClick={handleRemove}
          style={{
            color: getGlobalStyle('--color-primary-red'),
            textDecoration: 'underline',
            width: '150px',
            opacity: previewImg.length === 0 ? '50%' : '100%'
          }}
          className={styles.button}
        >
          Eliminar todo
        </button>
      </Column>
    </div>
  )
}
