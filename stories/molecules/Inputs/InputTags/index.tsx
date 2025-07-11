'use client'

import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { SEGColor, SFVColor } from '../../../../assets/colors'
import { IconCancel } from '../../../../assets/icons'

export const InputTags = ({
  disabled = false,
  setTags,
  tags,
  width,
  ...props
}) => {
  const refBox = useRef()
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => { return index !== indexToRemove })])
  }

  const addTags = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
    event.stopPropagation()
    if (event.target.value !== '') {
      setTags([...tags, event.target.value])
      props.selectedTags([...tags, event.target.value])
      event.target.value = ''
    }
  }
  return (
    <Box
      block={disabled}
      disabled={disabled}
      onClick={() => { return refBox.current.focus() } }
      width={width}
    >
      <InputTag id='tags' width={width}>
        <>
          {tags?.map((tag, index) => {
            return (
            <Tags key={index}>
              <Span>{tag}</Span>
              <IconContent onClick={() => { return !disabled && removeTags(index) }}> <IconCancel size='11px' /> </IconContent>
            </Tags>
            )
          })}
          <InputText
            disabled={disabled}
            onKeyDown={(event) => { return (event.key === 'Enter' ? addTags(event) : null) }}
            placeholder='Press enter to add tags'
            ref={refBox}
            type='text'
          />
        </>
      </InputTag>
    </Box>
  )
}

InputTags.propTypes = {
  disabled: PropTypes.any,
  setTags: PropTypes.func,
  selectedTags: PropTypes.func,
  tags: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func
  }),
  width: PropTypes.any
}
const Tags = styled.div`
  border: .5px solid ${`${SEGColor}69`};
  color: ${SEGColor};
  display: flex;
  place-content: center;
  margin: 0px 2px;
  padding: 0px 2px;
  border-radius: 20px;
  width: fit-content;
  justify-content: center;
  vertical-align: middle;
  align-items: center; 

`
const Box = styled.div`
    display: block;
    flex-direction: ${({ direction }) => { return direction || 'row' }};
    position: relative;
    ${({ width }) => { return width && css`width: ${width};` }}
    box-sizing: border-box;
    margin: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    ${props => {
 return props.block && css`
        background-color: ${SFVColor};
        cursor: no-drop;
    `
}}
 
`
const InputText = styled.input`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0 2px;
    width: fit-content;
    max-width: inherit;
    display: inline-block;
    max-height: 20px;
    font-size: var(--font-size-base);
    &:disabled {
      cursor: no-drop;
      background-color: ${SFVColor};
    }
`
const IconContent = styled.div`
    padding: 2px;
    cursor: pointer;
`
const InputTag = styled.div`
    display: flex;
    padding: 5px;
    flex-wrap: wrap; 
    line-height: 20px;
    flex-direction: row;
    cursor: text;
    align-items: center;
    ${({ maxHeight }) => { return maxHeight && css`max-height: ${maxHeight};` }}


`
const Span = styled.span`
    color: ${SEGColor};
    font-size: 10px;
    font-weight: normal;
    margin: 1px;
    padding: 1px;
    border-radius: 0;
    min-width: max-content;
  
`
