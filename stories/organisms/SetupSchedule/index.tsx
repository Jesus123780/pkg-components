import React from 'react'
import {
  Button,
  Column,
  Divider,
  Icon,
  Row,
  Text
} from '../../atoms'
import {
  CircularProgress,
  DaySelector,
  InputTimeHours
} from '../../molecules'
import { getGlobalStyle } from '../../../helpers'
import type { SetupScheduleProps } from './type'
import styles from './styles.module.css'

export const SetupSchedule: React.FC<SetupScheduleProps> = ({
  days = [],
  selectedDays = [],
  dynamicDays = [],
  times = [],
  hours = 0,
  totalHours = 0,
  handleSelectedDay = () => { },
  handleDeleteSchedule = () => { },
  setOpenModal = () => { },
  onChangeSaveHour = ({ time, name, day }) => {
    return {
      time,
      name,
      day
    }
  },
}) => {
  const disabled = Boolean(Number(totalHours) < 10)

  return (
    <div style={{
      maxWidth: '1090px',
      padding: '0 1.25rem 0',
      margin: 'auto'
    }}>
      <Row>
        <Column>
          <Text as='h1'>
            Horario comercial
          </Text>
          <Text size='sm'>
            Configura tus horarios
          </Text>
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />
          <Text as='h3'>
            Selecciona los días de la semana en que tu tienda funcionará
          </Text>
        </Column>
        <CircularProgress
          progress={hours}
          progressBar={getGlobalStyle('--color-icons-primary')}
          progressBorder='#ddd'
          size={150}
          strokeWidth={15}
        />
      </Row>
      <Divider marginTop={getGlobalStyle('--spacing-xl')} />
      <Row>
        <DaySelector
          days={days?.map((d) => {
            return {
              day: Number(d.day),
              name: `${d.name.slice(0, 1)}`
            }
          })}
          handleDaySelection={(day) => { return handleSelectedDay(day) }}
          selectedDays={selectedDays}
        />
      </Row>
      <Column>
        <Divider marginTop={getGlobalStyle('--spacing-2xl')} />
        {dynamicDays.map((day) => {
          const daySelected = selectedDays.includes(Number(day?.day))
          return (
            <Row
              key={day.day}
              className={styles.content_list}
              justifyContent='space-between'
              alignItems='center'
            >
              <Column style={{
                maxWidth: '200px',
                height: '40px'
              }} >
                <Text weight='bold'>
                  {day?.name}
                </Text>
              </Column>
              <Row style={{
                width: '60%',
                maxWidth: '500px'
              }}
                justifyContent='space-between'
                alignItems='center'
              >
                {daySelected
                  ? (<>
                    <InputTimeHours
                      width='200px'
                      times={times}
                      value={day?.schHoSta}
                      onSelected={(time: string) => {
                        onChangeSaveHour({ time, name: 'schHoSta', day: day?.day })
                      }}
                    />
                    <Icon width={20} height={20} icon='IconLinePart' color={getGlobalStyle('--color-icons-gray')} />
                    <InputTimeHours
                      width='200px'
                      disabled={day?.schHoSta === '' || day?.schHoSta === null}
                      times={times}
                      value={day?.schHoEnd}
                      onSelected={(time: string) => {
                        console.log('Hola')
                        onChangeSaveHour({ time, name: 'schHoEnd', day: day?.day })
                      }}
                    />
                    {daySelected &&
                      <button
                        onClick={() => {
                          return handleDeleteSchedule(day.day)
                        }}
                        style={{
                          backgroundColor: 'transparent'
                        }}>
                        <Icon color={getGlobalStyle('--color-icons-primary')} icon='IconDelete' width={20} height={20} size={20} />
                      </button>
                    }
                  </>)
                  : <Text color='gray'>
                    Tienda cerrada
                  </Text>
                }
              </Row>
              <Row justifyContent='flex-end'>
                {!day.loading
                  ? <Icon icon='IconMiniCheck' size={20} color={selectedDays.includes(Number(day.day)) && day.schId !== '' ? getGlobalStyle('--color-icons-success') : getGlobalStyle('--color-icons-gray')} />
                  : 'Loading'}
              </Row>
            </Row>
          )
        })}
      </Column>
      <Row className={styles.footer} justifyContent='space-between'>
          <Button
            onClick={() => {
              return setOpenModal(false)
            }}
          >
            Volver
          </Button>
          <Button
            primary
            disabled={disabled}
            loading={false}
            onClick={() => {
              return setOpenModal(false)
            }}
          >
            Confirmar
          </Button>
        </Row>
    </div>
  )
}
