import React, {
  useEffect,
  useRef,
  Fragment,
  useState
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { IconDelete } from '../../../assets/icons';
import { PColor, BGColor } from '../../../assets/colors';
import { Placeholder } from './Placeholder';

export const InputImage = ({
  actionCallBack = false,
  imageOnly = false,
  onlyOne = false,
  reset,
  callBack = () => { return },
  onChange = () => { return },
}) => {
  const [images, setImages] = useState([]);
  const [dragIn, setDragIn] = useState(false);
  const [previewImg, setPreviewImg] = useState([]);
  const fileInputRef = useRef(null);

  const onFileInputChange = (event) => {
    const { files } = event.target;

    if (imageOnly && !/\.(jpg|png|gif|jpeg)$/i.test(files[0]?.name))
      return console.log({
        message: 'El archivo a adjuntar no es una imagen',
        duration: 20000,
        color: 'red',
      });

    setImages([...images, ...files]);
    onChange([...images, ...files], ...previewImg);


    let newFiles = [];
    for (const element of files) newFiles = [...newFiles, element];

    let newFilesPreview = [];
    for (let i = 0; i < newFiles.length; i++) {
      newFilesPreview = [
        ...newFilesPreview,
        {
          temPath: URL.createObjectURL(files[i]),
          name: files[i]?.name,
          ext: files[i]?.name?.substring(
            files[i]?.name?.lastIndexOf('.'),
            files[i]?.name?.length
          ),
        },
      ];
    }
    setPreviewImg([...previewImg, ...newFilesPreview]);
    if (actionCallBack) {
      callBack()
    }
  };

  useEffect(() => {
    if (reset) {
      setImages([]);
      setPreviewImg([]);
    }
  }, [reset]);

  const handleDelete = (e, item, index) => {
    e.stopPropagation();
    const newImages = images.filter(
      (x, i) => x.name !== item.name && i !== index
    );
    const previewNewImages = previewImg.filter(
      (x, i) => x.temPath !== item.temPath && i !== index
    );

    setImages(newImages);
    setPreviewImg(previewNewImages);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setImages([...images, ...files]);
    onChange([...images, ...files], ...previewImg);

    let newFiles = [];
    for (const element of files) newFiles = [...newFiles, element];

    let newFilesPreview = [];
    for (let i = 0; i < newFiles.length; i++) {
      newFilesPreview = [
        ...newFilesPreview,
        {
          temPath: URL.createObjectURL(files[i]),
          name: files[i]?.name,
          ext: files[i]?.name?.substring(
            files[i]?.name?.lastIndexOf('.'),
            files[i]?.name?.length
          ),
        },
      ];
    }

    setPreviewImg([...previewImg, ...newFilesPreview]);
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragIn(e.type === 'dragenter' || e.type === 'dragover');
  };
  return (
    <>
      <Box
        style={{ background: !dragIn ? 'transparent' : '#cccccc12', borderRadius: '20px' }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <InputFile
          onChange={onFileInputChange}
          ref={fileInputRef}
          id='dropZone'
          type='file'
          multiple
        />
        <DropZone
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById('dropZone').click();
          }}
        >
          {!previewImg?.length && <Placeholder /> }
          {previewImg?.length > 0 && (
            <Preview onlyOne={onlyOne}>
              {!!previewImg?.length &&
                previewImg?.map((x, i) => (
                  <Fragment key={i}>
                    <ImgCont title={x.name} onlyOne={onlyOne}>
                      <ButtonDelete onClick={(e) => handleDelete(e, x, i)}>
                        <IconDelete color={PColor}  size={20} />
                      </ButtonDelete>
                      {x.ext === '.png' ||
                      x.ext === '.svg' ||
                      x.ext === '.jpg' ||
                      x.ext === '.jpeg' ? (
                        <Image src={x?.temPath} />
                      ) : x.ext === '.docx' ||
                        x.ext === '.docm' ||
                        x.ext === '.dotx' ||
                        x.ext === '.dotm' ? (
                        <i>DocWord</i>
                      ) : x.ext === '.xlsx' ||
                        x.ext === '.xlsm' ||
                        x.ext === '.xlsb' ||
                        x.ext === '.xltx' ||
                        x.ext === '.xls' ? (
                        <i>Execl</i>
                      ) : (
                        <i>FILE COMUN</i>
                      )}
                      <FileText>{x.name}</FileText>
                    </ImgCont>
                  </Fragment>
                ))}
            </Preview>
          )}
        </DropZone>
      </Box>
    </>
  );
};
const Box = styled.div`
  display: block;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  position: relative;
`;
const Label = styled.label`
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 40px;
  cursor: pointer;
`;
const InputFile = styled.input`
  display: none;
`;
const DropZone = styled.div`
  min-height: 150px;
  max-height: 300px;
  overflow: hidden auto;
  cursor: pointer;
  background-color: ${({ theme }) => theme.TColor};
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: grid;
`;
const Preview = styled.div`
  position: relative;
  display: flex;
  vertical-align: top;
  flex-flow: wrap;
  ${({ onlyOne }) => onlyOne ? css`
  height: 129px;
  ` : css`
  `}
`;
const ImgCont = styled.div`
  border-radius: 4px;
  ${({ onlyOne }) => onlyOne ? css`
    width: 100%;
    height: 100%;
  ` : css`
    width: 25%;
    height: 25%;
    min-width: 80px;
    min-height: 80px;
  
  `}
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
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
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
`;
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
`;
const Details = styled.div`
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    font-size: 13px;
    min-width: 100%;
    max-width: 100%;
    padding: 2em 1em;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    line-height: 150%;
`
// const Progress = styled.div`
//     background: linear-gradient(to bottom, #666, #444);
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     width: 100%;
// `
// const SpanCont = styled.div`
//     overflow: hidden;
//     text-overflow: ellipsis;
// `
// const Span = styled.span`
//     background-color: rgba(255, 255, 255, 0.4);
//     padding: 0 0.4em;
//     border-radius: 3px;
// `

InputImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};
