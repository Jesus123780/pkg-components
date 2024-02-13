import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { validateEmail } from '../../../utils/index'
import { Tag } from '../../atoms'
// import "./App.module.css";

export const TagsInput = ({
  label,
  id,
  name,
  placeholder,
  error,
  onChange,
  defaultTags,
  emailValidation
}) => {
  const [value, setValue] = useState('')
  const [tags, setTags] = useState(defaultTags ? defaultTags : [])
  const [isActive, setIsActive] = useState(false)

  const changeHandler = (e) => {
    setValue(e.target.value)
    onChange(name, tags)
  }

  const removeTag = (tag) => {
    const arr = tags.filter((t) => {return t !== tag})
    setTags(arr)
    onChange(name, arr)
  }

  const updateTagsHandler = (e) => {
    e.preventDefault()

    // Add tags if input is not empty and if input value is not comma
    if (e.target.value !== '' && e.target.value !== ',') {
      if (e.key === ',') {
        const newTag = value.trim().split(',')[0]
        if (emailValidation) {
          if (
            !tags.includes(newTag) &&
            newTag !== '' &&
            validateEmail(newTag)
          ) {
            const arr = [...tags, newTag]
            setTags(arr)
            onChange(name, arr)
          }
        } else {
          if (!tags.includes(newTag) && newTag !== '') {
            const arr = [...tags, newTag]
            setTags(arr)
            onChange(name, arr)
          }
        }
        setValue('')
      } else if (e.key === 'Enter') {
        const newTag = value.trim()
        if (emailValidation) {
          if (
            !tags.includes(newTag) &&
            newTag !== '' &&
            validateEmail(newTag)
          ) {
            const arr = [...tags, newTag]
            setTags(arr)
            onChange(name, arr)
          }
        } else {
          if (!tags.includes(newTag) && newTag !== '') {
            const arr = [...tags, newTag]
            setTags(arr)
            onChange(name, arr)
          }
        }
        setValue('')
      }
    }

    // Remove tags if backspace is pressed
    if (e.key === 'Backspace' && tags.length > 0 && value === '') {
      const copyOfTags = [...tags]
      copyOfTags.pop()
      setTags(copyOfTags)
      onChange(name, copyOfTags)
    }
  }

  const focusHandler = () => {
    setIsActive(true)
  }

  const blurHandler = () => {
    setIsActive(false)
  }

  return (
    <div className={!isActive ? 'tags-input' : 'tags-input active'}>
      {label && <label htmlFor={id ? id : name}>{label}</label>}
      <div className='tags-input__wrapper'>
        <div className='tags-input__tags'>
          {tags.map((tag) => {return (
            <Tag
              className='tag'
              key={tag}
              label={tag}
            >
              <span onClick={() => {return removeTag(tag)}}>
                <i className='fas'>X</i>
              </span>
            </Tag>
          )})}
          <input
            autoComplete='off'
            id={id ? id : name}
            name={name}
            onBlur={blurHandler}
            onChange={changeHandler}
            onFocus={focusHandler}
            onKeyDown={(e) => {return e.key === 'Enter' && e.preventDefault()}}
            onKeyPress={(e) => {return e.key === 'Enter' && e.preventDefault()}}
            onKeyUp={updateTagsHandler}
            placeholder={placeholder}
            type='text'
            value={value}
          />
        </div>
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

TagsInput.propTypes = {
  defaultTags: PropTypes.any,
  emailValidation: PropTypes.any,
  error: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.any
}
