import React from 'react'
import { Range } from '../../molecules'
import { getGlobalStyle } from '../../../helpers'
import { MODAL_SIZES } from '../AwesomeModal/constanst'
import { ImageUploader } from './components/ImageUploader'
import Cropper from 'react-easy-crop'
import { AwesomeModal } from '../AwesomeModal'

export interface IImageProductEdit {
  inputRef: React.RefObject<HTMLInputElement>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  preview: string
  open: boolean
  loading: boolean
  formattedList: string
  imageSrc: string | null
  crop: { x: number, y: number }
  zoom: number
  rotation: number
  setCrop: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
  setZoom: React.Dispatch<React.SetStateAction<number>>
  setRotation: React.Dispatch<React.SetStateAction<number>>
  onCropComplete: (croppedArea: any, croppedPixels: any) => void
  showCroppedImage: () => Promise<void>
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => Promise<void>
  handleClose: () => void
  handleRemoveImage: () => void
  error: string
}

export const ImageProductEdit: React.FC<IImageProductEdit> = ({
  inputRef,
  onFileChange,
  preview,
  open,
  imageSrc,
  crop,
  zoom,
  error,
  rotation,
  formattedList,
  loading,
  setCrop,
  setZoom,
  setRotation,
  handleDrop,
  onCropComplete,
  showCroppedImage,
  handleClose,
  handleRemoveImage
}) => {
  return (
    <div>
      <ImageUploader
        inputRef={inputRef}
        loading={loading}
        onFileChange={onFileChange}
        handleRemoveImage={handleRemoveImage}
        preview={preview}
        formattedList={formattedList}
        error={error}
        handleDrop={handleDrop}
      />
      <AwesomeModal
        borderRadius={getGlobalStyle('--border-radius-xs')}
        btnCancel={true}
        btnConfirm={true}
        customHeight='60vh'
        footer={true}
        height='60vh'
        onCancel={() => { handleClose() }}
        onHide={() => { handleClose() }}
        onConfirm={async () => await showCroppedImage()}
        question={false}
        show={open}
        size={MODAL_SIZES.medium}
        title='Edita la imagen del producto'
      >

        <div style={{ position: 'relative', width: '100%', height: '40vh' }}>
          <Cropper
            image={imageSrc ?? ''}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        {/* <Range min={1} max={100} value={zoom} onChange={setZoom} /> */}
        <div>
          <label>Rotación:</label>
          <input
            type='range'
            min={-180}
            max={180}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </div>
      </AwesomeModal>
    </div>
  )
}
