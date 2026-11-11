import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Column,
  Text
} from '../../atoms'
import { AmountInput } from '../../molecules/Inputs/AmountInput'
import { AwesomeModal } from '../../organisms/AwesomeModal'
import { getGlobalStyle } from '../../../utils'
import { MODAL_SIZES } from '../AwesomeModal/constanst'
import styles from './GoalModal.module.css'

interface GoalModalProps {
  isOpen?: boolean
  handleGoalChange?: (value: string) => void
  dailyGoal?: string
  loading?: boolean
  setGoalOpen?: () => void
  upsertGoal?: (dailyGoal: string) => void
}

export const GoalModal: React.FC<GoalModalProps> = ({
  isOpen = false,
  handleGoalChange = (value) => {
    return value
  },
  dailyGoal = '',
  loading = false,
  setGoalOpen = () => {
  },
  upsertGoal = (dailyGoal) => {
    return dailyGoal
  }
}) => {
  const isInvalid = !dailyGoal || dailyGoal === '0'

  return (
    <div>
      <AwesomeModal
        btnCancel={false}
        btnConfirm={false}
        customHeight='auto'
        footer={false}
        header={true}
        height='auto'
        onCancel={() => {
          return setGoalOpen()
        }}
        onHide={() => {
          return setGoalOpen()
        }}
        padding={30}
        show={isOpen}
        size={MODAL_SIZES.small}
        title='Metas del día'
        zIndex={getGlobalStyle('--z-index-99999')}
      >
        <div className={styles.content}>
          <Column>
            <Text className={styles.paragraph}>
              Define la meta de ventas del día para tu comercio. Te ayuda a
              medir el progreso de tus ventas frente al objetivo propuesto.
            </Text>
            <Text className={styles.label}>
              Meta de ventas del día
            </Text>
            <div className={styles.container_input}>
              <AmountInput
                allowDecimals
                allowNegativeValue={false}
                decimalSeparator=','
                decimalsLimit={2}
                groupSeparator='.'
                name='dailyGoal'
                placeholder='$0,00'
                prefix='$'
                value={dailyGoal}
                onValueChange={(value) => {
                  return handleGoalChange(value != null ? String(value) : '')
                }}
             onKeyDown={(event) => {
               if (event.key !== 'Enter') return

               const rawValue = event.currentTarget.value

               // Convierte $110.000,50 → 110000.50
               const numericValue = Number(
                 rawValue
                   .replace(/[^\d,.-]/g, '')
                   .replace(/\./g, '')
                   .replace(',', '.')
               )

               if (!Number.isFinite(numericValue)) return

               handleGoalChange(rawValue)

               upsertGoal(numericValue)
             }}
              />
            </div>
          </Column>
          <Column className={styles.actions}>
            <Button
              disabled={loading || isInvalid}
              loading={loading}
              onClick={() => {
                if (isInvalid) {
                  return null
                }
                setGoalOpen()
                return upsertGoal(dailyGoal)
              }}
              primary
            >
              Guardar
            </Button>
            <Button
              onClick={() => {
                return setGoalOpen()
              }}
            >
              Cancelar
            </Button>
          </Column>
        </div>
      </AwesomeModal>
    </div>
  )
}

GoalModal.propTypes = {
  dailyGoal: PropTypes.string,
  handleGoalChange: PropTypes.func,
  isOpen: PropTypes.bool,
  loading: PropTypes.bool,
  setGoalOpen: PropTypes.func,
  upsertGoal: PropTypes.func
}
