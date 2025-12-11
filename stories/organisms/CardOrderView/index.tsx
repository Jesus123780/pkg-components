import { useState } from 'react'
import styles from './styles.module.css'
import {
  Column,
  Icon,
  Image,
  Row,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import { CardOptionsPanel } from './helpers/CardOptionsPanel'

export const CardOrderView: React.FC<any> = (props) => {
  const {
    title,
    company,
    amount,
    date,
    comments,
    avatars,
    logo,
    onPrint
  } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleOptions = () => setIsOpen(!isOpen)

  return (
    <div className={styles.wrapper}>
      <CardOptionsPanel
        isOpen={isOpen}
        actions={[
          { label: 'Imprimir', icon: 'IconTicket', onClick: onPrint }
        ]}
      />

      <div className={styles.droppable}>
        <Column className={`${styles.card} ${isOpen ? styles.cardShifted : ''}`}>
          {/* HEADER */}
          <Row className={styles.header}>
            <Row style={{ alignItems: 'flex-start', gap: '12px' }}>
              {logo && (
                <Image
                  alt={`${company} logo`}
                  className={styles.logo}
                  src={logo}
                />
              )}

              <Column>
                <Text as='h3' className={styles.title}>
                  {(() => {
                    const [first, ...rest] = (title || '')?.trim().split(/\s+/)
                    return (
                      <>
                        <span style={{ fontSize: '0.9em', opacity: 0.7 }}>
                          {first}
                        </span>
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


          </div>
          <Column>
            <Row justifyContent='space-between'>
              <Icon
                icon='IconCalendar'
                size={20}
                color={getGlobalStyle('--color-icons-black')}
              />
              <span className={styles.date}>
                {date}
              </span>
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
            </Row>
          </Column>
        </Column>
      </div>

    </div>
  )
}
