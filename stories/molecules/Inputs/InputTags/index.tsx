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

  /**
   * Persists a tag.
   *
   * When `update` is true the component works in "create & persist"
   * mode: a single Enter (or click on "+") creates and persists the tag
   * immediately.
   *
   * The current input value is always passed as the argument so the
   * consumer never depends on React state that has not been flushed yet
   * (this is what caused the "double Enter" / lost tags bug).
   *
   * It may return a boolean (or a promise resolving to a boolean) to tell
   * the input whether the operation succeeded. When it resolves to
   * `false` the input keeps the typed value so the user can retry without
   * retyping.
   */
  registerTags?: (
    value?: string
  ) => void | boolean | Promise<void | boolean>

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

    /**
     * Local-only add (legacy behavior, used when `update` is false).
     *
     * Adds the tag to the chip list held in `tags` and clears the input.
     * No persistence happens here.
     */
    const addToLocalState = (
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
            `El Tag "${trimmed}" ya existe.`,
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

      clearInput()
    }

    /**
     * Clears the input value (state + uncontrolled ref).
     */
    const clearInput = (): void => {
      setInputValue('')

      if (refBox.current) {
        refBox.current.value = ''
      }
    }

    /**
     * Single entry point used by BOTH Enter and the "+" button.
     *
     * Behavior:
     * - Reads the CURRENT input value (never stale React state).
     * - Ignores empty values.
     * - In `update` mode it delegates persistence to `registerTags`,
     *   passing the value explicitly so the consumer does not depend on
     *   an async `setTags`. The input is cleared only when the operation
     *   is accepted (so errors are recoverable).
     * - Without `update` it keeps the legacy local-only add.
     *
     * @param {string} rawValue - Current input value.
     * @returns {Promise<boolean>} Whether a tag was handled/persisted.
     */
    const createAndPersist = async (
      rawValue: string
    ): Promise<boolean> => {
      const trimmed = (rawValue ?? '').trim()

      if (trimmed === '') {
        return false
      }

      // Legacy / local-only mode.
      if (
        !update ||
        typeof registerTags !== 'function'
      ) {
        addToLocalState(trimmed)

        return true
      }

      // Create & persist mode: do NOT rely on setTags being flushed.
      const result = await Promise.resolve(
        registerTags(trimmed)
      )

      // `undefined` (void) is treated as success for backward
      // compatibility; only an explicit `false` keeps the value.
      const succeeded = result !== false

      if (succeeded) {
        clearInput()
      }

      return succeeded
    }

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      /**
       * ==========================================
       * ENTER
       * ==========================================
       *
       * A single Enter creates and persists the tag.
       *
       * We always preventDefault so Enter never submits the
       * surrounding product form by accident.
       */
      if (
        event.key === 'Enter'
      ) {
        event.preventDefault()
        event.stopPropagation()

        const target = event.currentTarget

        void createAndPersist(inputValue).then(
          (succeeded) => {
            /**
             * Only move focus forward when the tag was handled and a
             * tabIndex exists. Give the browser a frame to settle.
             */
            if (
              succeeded &&
              tabIndex !== undefined
            ) {
              window.requestAnimationFrame(
                () => {
                  focusNextByTabIndex(target)
                }
              )
            }
          }
        )

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
          type="button"
          disabled={
            disabled ||
            emptyValue ||
            loading
          }
          onClick={() => {
            void createAndPersist(
              inputValue
            )
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