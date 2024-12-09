import PropTypes from 'prop-types'
import React from 'react'
import {
  ButtonDecrement,
  ButtonIncrement,
  ContainerQuantity,
  MarmitaCounter
} from './styled'
import { type QuantityButtonProps } from './types'
import { Icon } from '../../atoms'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  border,
  margin,
  padding,
  label = '',
  quantity = 0,
  disabled = false,
  showNegativeButton = false,
  showPositiveButton = false,
  validationOne = false,
  classNameQuantity = '',
  validationZero = false,
  width,
  handleDecrement = () => {

  },
  handleIncrement = () => {

  },
  ...props
}) => {
  const validateZero = validationZero && quantity >= 0

  return (
    <div {...props}>
      <ContainerQuantity
        border={border}
        margin={margin}
        width={width}
      >
        <MarmitaCounter data-test-id='marmita-counter' padding={padding}>
          {Number(quantity) !== 0 && (
            <ButtonDecrement
              className={styles['btn-icon btn-icon--primary btn-icon--size-m btn-icon--transparent marmita-counter__btn-decrement']}
              disabled={showNegativeButton || validateZero || disabled}
              onClick={() => {
                return validationOne
                  ? () => {

                    }
                  : handleDecrement()
              }}
              type='button'
            >
              <span className={styles['icon-marmita icon-marmita--minus-sign']}>
                <Icon
                  size={24}
                  icon='IconMinus'
                  color={validateZero ? 'transparent' : getGlobalStyle('--color-primary-red')}
                />
              </span>
            </ButtonDecrement>
          )}
          <span className={styles['marmita-counter__value_label']}>{label}</span>
          {Number(quantity) !== 0 && <div className={`${styles['marmita-counter__value']} ${classNameQuantity}`}>{validateZero ? null : quantity}</div>}
          {
            <ButtonIncrement
              disabled={showPositiveButton || disabled}
              onClick={() => {
                return handleIncrement()
              }}
              type='button'
            >
              <span className={styles['icon-marmita icon-marmita--plus-sign']}>
                <Icon icon='IconPlus' />
              </span>
            </ButtonIncrement>
          }
        </MarmitaCounter>
      </ContainerQuantity>
    </div>
  )
}

QuantityButton.propTypes = {
  border: PropTypes.any,
  classNameQuantity: PropTypes.string,
  disabled: PropTypes.bool,
  handleDecrement: PropTypes.func,
  handleIncrement: PropTypes.func,
  label: PropTypes.string,
  margin: PropTypes.any,
  padding: PropTypes.any,
  quantity: PropTypes.number.isRequired,
  showNegativeButton: PropTypes.bool,
  showPositiveButton: PropTypes.bool,
  validationOne: PropTypes.any,
  validationZero: PropTypes.bool,
  width: PropTypes.string
}
