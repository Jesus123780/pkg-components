import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd'
import styles from './styles.module.css'
import { Column, Icon, Image, Row, Text } from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import { CardOptionsPanel } from './helpers/CardOptionsPanel'

export const CardOrderView: React.FC<any> = (props) => {
  const { title, company, amount, date, comments, avatars, logo, onPrint, onDuplicate } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleOptions = () => setIsOpen(!isOpen)

  /** Detecta movimiento horizontal (swipe left/right) */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const offset = result.destination.index - result.source.index
    if (offset > 0) setIsOpen(false)
    if (offset < 0) setIsOpen(true)
  }

  return (
    <div className={styles.wrapper}>
      <CardOptionsPanel
        isOpen={isOpen}
        actions={[
          { label: 'Imprimir', icon: 'IconPrinter', onClick: onPrint },
          { label: 'Duplicar', icon: 'IconCopy', onClick: onDuplicate }
        ]}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={styles.droppable}>
              <Draggable draggableId='card' index={0}>
                {(provided, snapshot) => (
                  <Column
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${styles.card} ${isOpen ? styles.cardShifted : ''}`}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging
                        ? `translateX(${Math.min(0, provided.draggableProps.style?.transform?.replace(/[^\d.-]/g, '') || 0)}px)`
                        : provided.draggableProps.style?.transform,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {/* HEADER */}
                    <Row className={styles.header}>
                      <Row style={{ alignItems: 'flex-start', gap: '12px' }}>
                        {logo && <Image alt={`${company} logo`} className={styles.logo} src={logo} />}
                        <Column>
                          <Text as='h3' className={styles.title}>
                            {(() => {
                              const [first, ...rest] = (title || '').trim().split(/\s+/)
                              return (
                                <>
                                  <span style={{ fontSize: '0.9em', opacity: 0.7 }}>{first}</span>
                                  {rest.length ? ` ${rest.join(' ')}` : ''}
                                </>
                              )
                            })()}
                          </Text>
                          <Text as='h3' className={styles.company}>
                            {company}
                          </Text>
                        </Column>
                      </Row>

                      <button
                        className={styles.optionsButton}
                        onClick={toggleOptions}
                        aria-label='Opciones'
                      >
                        <Icon
                          icon='IconDost'
                          size={20}
                          color={getGlobalStyle('--color-icons-black')}
                        />
                      </button>
                    </Row>

                    <Text className={styles.amount}>{amount}</Text>

                    <div className={styles.footer}>
                      <Row className={styles.avatars}>
                        {avatars?.slice(0, 3).map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt='User avatar'
                            className={styles.avatar}
                          />
                        ))}
                      </Row>

                      <Row
                        className={styles.stats}
                        style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
                      >
                        {comments}
                        <Icon
                          color={getGlobalStyle('--color-icons-black')}
                          icon='IconComment'
                          size={20}
                        />
                      </Row>
                    </div>

                    <span className={styles.date}>{date}</span>
                  </Column>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
