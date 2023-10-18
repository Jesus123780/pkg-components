import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../../assets/colors'
import { IconDelete } from '../../../assets/icons'
import { Placeholder } from './Placeholder'

export const InputImage = ({
  actionCallBack = false,
  imageOnly = false,
  onlyOne = false,
  reset,
  callBack = () => {
    return
  },
  onChange = () => {
    return
  }
}) => {
  const [images, setImages] = useState([])
  const [dragIn, setDragIn] = useState(false)
  const [previewImg, setPreviewImg] = useState([])
  const fileInputRef = useRef(null)

  const onFileInputChange = (event) => {
    const { files } = event.target

    if (imageOnly && !/\.(jpg|png|gif|jpeg)$/i.test(files[0]?.name))
      return console.log({
        message: 'El archivo a adjuntar no es una imagen',
        duration: 20000,
        color: 'red'
      })

    setImages([...images, ...files])
    onChange([...images, ...files], ...previewImg)

    let newFiles = []
    for (const element of files) newFiles = [...newFiles, element]

    let newFilesPreview = []
    for (let i = 0; i < newFiles.length; i++) {
      newFilesPreview = [
        ...newFilesPreview,
        {
          temPath: URL.createObjectURL(files[i]),
          name: files[i]?.name,
          ext: files[i]?.name?.substring(files[i]?.name?.lastIndexOf('.'), files[i]?.name?.length)
        }
      ]
    }
    setPreviewImg([...previewImg, ...newFilesPreview])
    if (actionCallBack) {
      callBack()
    }
  }

  useEffect(() => {
    if (reset) {
      setImages([])
      setPreviewImg([])
    }
  }, [reset])

  const handleDelete = (e, item, index) => {
    e.stopPropagation()
    const newImages = images.filter((x, i) => {return x.name !== item.name && i !== index})
    const previewNewImages = previewImg.filter((x, i) => {return x.temPath !== item.temPath && i !== index})

    setImages(newImages)
    setPreviewImg(previewNewImages)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    setImages([...images, ...files])
    onChange([...images, ...files], ...previewImg)

    let newFiles = []
    for (const element of files) newFiles = [...newFiles, element]

    let newFilesPreview = []
    for (let i = 0; i < newFiles.length; i++) {
      newFilesPreview = [
        ...newFilesPreview,
        {
          temPath: URL.createObjectURL(files[i]),
          name: files[i]?.name,
          ext: files[i]?.name?.substring(files[i]?.name?.lastIndexOf('.'), files[i]?.name?.length)
        }
      ]
    }

    setPreviewImg([...previewImg, ...newFilesPreview])
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragIn(e.type === 'dragenter' || e.type === 'dragover')
  }
  return (
    <>
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{ background: !dragIn ? 'transparent' : '#cccccc12', borderRadius: '20px' }}
      >
        <InputFile
          id='dropZone'
          multiple
          onChange={onFileInputChange}
          ref={fileInputRef}
          type='file'
        />
        <DropZone
          onClick={(e) => {
            e.stopPropagation()
            document.getElementById('dropZone').click()
          }}
        >
          {!previewImg?.length && <Placeholder />}
          {previewImg?.length > 0 && (
            <Preview onlyOne={onlyOne}>
              {!!previewImg?.length &&
                previewImg?.map((x, i) => {return (
                  <Fragment key={i}>
                    <ImgCont onlyOne={onlyOne} title={x.name}>
                      <ButtonDelete onClick={(e) => {return handleDelete(e, x, i)}}>
                        <IconDelete color={PColor} size={20} />
                      </ButtonDelete>
                      {x.ext === '.png' || x.ext === '.svg' || x.ext === '.jpg' || x.ext === '.jpeg' ? <Image src={x?.temPath} /> : x.ext === '.docx' || x.ext === '.docm' || x.ext === '.dotx' || x.ext === '.dotm' ? <i>DocWord</i> : x.ext === '.xlsx' || x.ext === '.xlsm' || x.ext === '.xlsb' || x.ext === '.xltx' || x.ext === '.xls' ? <i>Execl</i> : <i>FILE COMUN</i>}
                      <FileText>{x.name}</FileText>
                    </ImgCont>
                  </Fragment>
                )})}
            </Preview>
          )}
        </DropZone>
      </Box>
    </>
  )
}
const Box = styled.div`
  display: block;
  ${({ width }) =>
  {return width &&
    css`
      width: ${width};
    `}}
  flex-direction: ${({ direction }) => {return (direction ? direction : 'row')}};
  position: relative;
`
const InputFile = styled.input`
  display: none;
`
const DropZone = styled.div`
  min-height: 150px;
  max-height: 300px;
  overflow: hidden auto;
  cursor: pointer;
  background-color: ${({ theme }) => {return theme.TColor}};
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: grid;
`
const Preview = styled.div`
  position: relative;
  display: flex;
  vertical-align: top;
  flex-flow: wrap;
  ${({ onlyOne }) =>
  {return onlyOne
    ? css`
          height: 129px;
        `
    : css``}}
`
const ImgCont = styled.div`
  border-radius: 4px;
  ${({ onlyOne }) =>
  {return onlyOne
    ? css`
          width: 100%;
          height: 100%;
        `
    : css`
          width: 25%;
          height: 25%;
          min-width: 80px;
          min-height: 80px;
        `}}
  position: relative;
  z-index: 10;
  margin: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const FileText = styled.span`
  position: absolute;
  bottom: 0;
  color: #fff;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2px;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const ButtonDelete = styled.button`
  align-items: center;
  justify-content: center;
  background-color: ${BGColor};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 30px;
  outline: none;
  padding: 2px 0;
  position: absolute;
  right: -2px;
  top: 0px;
  width: 30px;
`

InputImage.propTypes = {
  actionCallBack: PropTypes.bool,
  callBack: PropTypes.func,
  imageOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onlyOne: PropTypes.bool,
  reset: PropTypes.bool
}
