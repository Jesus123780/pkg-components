'use client'

import React, {
  useRef,
  useState
} from 'react'

import styles from './styles.module.css'

import {
  Button,
  Column,
  Divider,
  Icon,
  Row,
  Text
} from '../../../atoms'

import {
  getGlobalStyle
} from '../../../../helpers'

import {
  type NotificationProps
} from '../../../../types/global'

/**
 * Focus next element according to tabIndex.
 *
 * Example:
 *
 * 1 -> 2 -> 3 -> 4
 *
 * Enter on tabIndex=1
 * focuses tabIndex=2.
 */
const focusNextByTabIndex = (
  currentElement: HTMLElement
): void => {
  const currentTabIndex =
    currentElement.tabIndex

  if (
    currentTabIndex < 0
  ) {
    return
  }

  const focusableElements =
    Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          'input:not([disabled])',
          'textarea:not([disabled])',
          'button:not([disabled])',
          'select:not([disabled])',
          'a[href]',
          '[tabindex]:not([tabindex="-1"])',
          '[contenteditable="true"]'
        ].join(',')
      )
    )
      .filter(
        (
          element
        ) => {
          /**
           * Ignore current element.
           */
          if (
            element ===
            currentElement
          ) {
            return false
          }

          /**
           * Ignore hidden elements.
           */
          if (
            element.hidden ||
            element.getAttribute(
              'aria-hidden'
            ) === 'true'
          ) {
            return false
          }

          /**
           * Ignore elements that are not visible.
           */
          if (
            element.getClientRects()
              .length === 0
          ) {
            return false
          }

          /**
           * Ignore elements with tabIndex
           * lower or equal to current.
           */
          return (
            element.tabIndex >
            currentTabIndex
          )
        }
      )
      .sort(
        (a, b) =>
          a.tabIndex -
          b.tabIndex
      )

  const nextElement =
    focusableElements[0]

  if (
    !nextElement
  ) {
    return
  }

  nextElement.focus()

  /**
   * When the next element is an input/textarea,
   * put the caret at the end.
   */
  if (
    nextElement instanceof
      HTMLInputElement ||
    nextElement instanceof
      HTMLTextAreaElement
  ) {
    try {
      const length =
        nextElement.value.length

      nextElement.setSelectionRange(
        length,
        length
      )
    } catch {
      /**
       * Some input types do not support
       * setSelectionRange().
       */
    }
  }
}

export interface InputTagsProps {
  update?: boolean
  disabled?: boolean
  loading?: boolean
  repeatTag?: boolean
  tags: string[]
  width?: string

  /**
   * Keyboard navigation order.
   *
   * Enter -> next element with greater tabIndex.
   */
  tabIndex?: number

  setTags: (
    tags: string[]
  ) => void

  selectedTags?: (
    tags: string[]
  ) => void

  registerTags?: () => void

  sendNotification?: (
    notification: NotificationProps
  ) => void
}

export const InputTags:
  React.FC<InputTagsProps> = ({
    disabled = false,
    update = false,
    loading = false,
    repeatTag = true,
    tags,
    width,
    tabIndex,
    setTags,
    registerTags,
    sendNotification = () => {},
    ...props
  }) => {
    const refBox =
      useRef<HTMLInputElement>(
        null
      )

    const [
      inputValue,
      setInputValue
    ] = useState('')

    const removeTags = (
      indexToRemove: number
    ): boolean => {
      setTags(
        tags.filter(
          (_, index) =>
            index !==
            indexToRemove
        )
      )

      return true
    }

    const tryAddTag = (
      value: string
    ): void => {
      const trimmed =
        value.trim()

      if (
        trimmed === ''
      ) {
        return
      }

      const tagExists =
        tags.includes(
          trimmed
        )

      if (
        !repeatTag &&
        tagExists
      ) {
        sendNotification({
          description:
            `  El Tag "${trimmed}" ya existe.`,
          title: 'Error',
          backgroundColor:
            'warning'
        })

        return
      }

      const newTags = [
        ...tags,
        trimmed
      ]

      setTags(
        newTags
      )

      if (
        typeof props?.selectedTags ===
        'function'
      ) {
        props.selectedTags(
          newTags
        )
      }

      setInputValue(
        ''
      )

      if (
        refBox.current
      ) {
        refBox.current.value =
          ''
      }
    }

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      /**
       * ==========================================
       * ENTER
       * ==========================================
       *
       * Preserve current behavior:
       *
       * 1. Add tag.
       * 2. Register tags when update=true.
       * 3. If tabIndex exists, move focus to
       *    the next element.
       */
      if (
        event.key === 'Enter'
      ) {
        event.preventDefault()

        tryAddTag(
          inputValue
        )

        if (
          typeof registerTags ===
            'function' &&
          update
        ) {
          registerTags()
        }

        /**
         * Give React/browser an opportunity to
         * process the current event before changing
         * focus.
         */
        if (
          tabIndex !== undefined
        ) {
          window.requestAnimationFrame(
            () => {
              focusNextByTabIndex(
                event.currentTarget
              )
            }
          )
        }

        return
      }

      /**
       * ==========================================
       * TAB
       * ==========================================
       *
       * Completely native.
       *
       * We intentionally do not call
       * preventDefault().
       */
      if (
        event.key === 'Tab'
      ) {
        return
      }
    }

    if (
      !Array.isArray(tags)
    ) {
      return <></>
    }

    const emptyValue =
      inputValue.trim().length ===
      0

    return (
      <>
        <Row
          style={{
            width
          }}
          className={
            disabled
              ? styles.boxDisabled
              : ''
          }
        >
          <div
            role="button"
            className={
              styles.box
            }
            onClick={() =>
              refBox.current?.focus()
            }
          >
            <div
              className={
                styles.tagsContainer
              }
            >
              {tags.map(
                (
                  tag,
                  index
                ) => (
                  <div
                    key={index}
                    className={
                      styles.tags
                    }
                  >
                    <Text size="md">
                      {tag}
                    </Text>

                    <Column
                      style={{
                        cursor:
                          'pointer'
                      }}
                      onClick={() =>
                        !disabled &&
                        removeTags(
                          index
                        )
                      }
                    >
                      <Icon
                        icon="IconCancel"
                        size={15}
                      />
                    </Column>
                  </div>
                )
              )}

              <input
                ref={refBox}
                className={
                  styles.input
                }

                /**
                 * NEW
                 */
                tabIndex={
                  tabIndex
                }

                disabled={
                  disabled
                }

                type="text"
                placeholder="Presione enter o haga clic en +"
                onKeyDown={
                  handleKeyDown
                }
                onChange={(e) =>
                  setInputValue(
                    e.target.value
                  )
                }
                value={
                  inputValue
                }
              />
            </div>
          </div>
        </Row>

        <Button
          disabled={
            disabled ||
            emptyValue ||
            loading
          }
          onClick={() => {
            tryAddTag(
              inputValue
            )

            if (
              typeof registerTags ===
                'function' &&
              update
            ) {
              registerTags()
            }
          }}
          borderRadius={getGlobalStyle(
            '--border-radius-xs'
          )}
          padding={getGlobalStyle(
            '--spacing-xs'
          )}
          primary={true}
        >
          <Icon
            icon="IconPlus"
            color={getGlobalStyle(
              emptyValue
                ? '--color-icons-primary'
                : '--color-text-white'
            )}
          />
        </Button>

        <Divider
          marginTop={getGlobalStyle(
            '--spacing-sm'
          )}
        />
      </>
    )
  }