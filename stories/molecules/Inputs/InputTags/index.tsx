'use client'

import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
import {
  Button,
  Column,
  Divider,
  Icon,
  Row,
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
  sendNotification = () => { },
  ...props
}) => {
  const refBox = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')

  const removeTags = (indexToRemove: number): boolean => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
    return true
  }

  const tryAddTag = (value: string): void => {
    const trimmed = value.trim()
    if (trimmed === '') return

    const tagExists = tags.includes(trimmed)

    if (!repeatTag && tagExists) {
      return sendNotification({
        description: `  El Tag "${trimmed}" ya existe.`,
        title: 'Error',
        backgroundColor: 'warning'
      })
    }

    const newTags = [...tags, trimmed]
    setTags(newTags)
    if (typeof props?.selectedTags === 'function') {
      props.selectedTags(newTags)
    }

    setInputValue('')
    if (refBox.current) {
      refBox.current.value = ''
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      tryAddTag(inputValue)
      if (typeof registerTags === 'function' && update) {
        registerTags()
      }
    }
  }

  if (!Array.isArray(tags)) return <></>
  const emptyValue = inputValue.trim().length === 0
  return (
    <>
      <Row style={{ width }} className={disabled ? styles.boxDisabled : ''}>
        <div
          role='button'
          className={styles.box}
          onClick={() => refBox.current?.focus()}
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
              placeholder='Presione enter o haga clic en +'
              onKeyDown={handleKeyDown}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </div>
        </div>
      </Row>
      <Button
        disabled={disabled || emptyValue}
        onClick={() => {
          tryAddTag(inputValue)
          if (typeof registerTags === 'function' && update) {
            registerTags()
          }
        }}
        borderRadius={getGlobalStyle('--border-radius-xs')}
        padding={getGlobalStyle('--spacing-xs')}
        primary={true}
      >
        <Icon
          icon='IconPlus'
          color={getGlobalStyle(emptyValue ? '--color-icons-primary' : '--color-text-white')}
        />
      </Button>
      <Divider marginTop={getGlobalStyle('--spacing-sm')} />
    </>
  )
}
