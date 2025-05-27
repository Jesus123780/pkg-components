'use client'

import React, { useRef } from 'react'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface IEditorImagenProps {
  isActive?: boolean
}
export const EditorImagen: React.FC<IEditorImagenProps> = ({
  isActive = true
}) => {
  const cropperRef = useRef<ReactCropperElement>(null)
  const onCrop = (): void => {
    const cropper = cropperRef.current?.cropper
    if (typeof cropper !== 'undefined') {
      console.log(cropper.getCroppedCanvas().toDataURL())
    }
  }
  if (!isActive) return null
  return (
        <div>
            <Cropper
                src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
                style={{ height: 400, width: '100%' }}
                // Cropper.js options
                initialAspectRatio={16 / 9}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
            />
        </div>
  )
}
