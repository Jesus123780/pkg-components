'use client'

import React, { useRef } from 'react'
import styles from './styles.module.css'
import {
  Button,
  Column,
  Divider,
  Icon,
  Text
} from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'
import { type NotificationProps } from '../../../../types/global'

export interface InputTagsProps {
  update?: boolean
  disabled?: boolean
  loading?: boolean
  repeatTag?: boolean
  tags: string[]
  width?: string
  setTags: (tags: string[]) => void
  selectedTags?: (tags: string[]) => void
  registerTags?: () => void
  sendNotification?: (notification: NotificationProps) => void
}

export const InputTags: React.FC<InputTagsProps> = ({
  disabled = false,
  update = false,
  loading = false,
  repeatTag = true,
  tags,
  width,
  setTags,
  registerTags,
  sendNotification = () => {},
  ...props
}) => {
  const refBox = useRef<HTMLInputElement>(null)

  const removeTags = (indexToRemove: number): boolean => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
    return true
  }

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      const input = event.target as HTMLInputElement
      const value = input.value.trim()

      if (value === '') return

      const tagExists = tags.includes(value)

      if (!repeatTag && tagExists) {
        return sendNotification({
          description: `  El Tag "${value}" ya existe.`,
          title: 'Error',
          backgroundColor: 'warning'
        })
      }

      const newTags = [...tags, value]
      setTags(newTags)
      if (typeof props?.selectedTags === 'function') {
        props.selectedTags(newTags)
      }
      input.value = ''
    }
  }

  if (!Array.isArray(tags)) return <></>

  return (
    <>
      <Column
        className={`${styles.box} ${disabled ? styles.boxDisabled : ''}`}
        onClick={() => refBox.current?.focus()}
        style={{ width }}
      >
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <div key={index} className={styles.tags}>
              <Text size='md'>{tag}</Text>
              <Column
                style={{ cursor: 'pointer' }}
                onClick={() => !disabled && removeTags(index)}
              >
                <Icon icon='IconCancel' size={15} />
              </Column>
            </div>
          ))}
          <input
            ref={refBox}
            className={styles.input}
            disabled={disabled}
            type='text'
            placeholder='Press enter to add tags'
            onKeyDown={addTags}
          />
        </div>
      </Column>
      <Divider marginTop={getGlobalStyle('--spacing-sm')} />
      {update &&
        <Button
          borderRadius={getGlobalStyle('--border-radius-xs')}
          primary={true}
          disabled={tags?.length === 0}
          width='100%'
          loading={loading}
          onClick={registerTags}
        >
          Guardar
        </Button>
      }
    </>
  )
}
