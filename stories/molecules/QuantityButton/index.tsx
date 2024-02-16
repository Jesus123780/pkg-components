import PropTypes from 'prop-types'
import React from 'react'
import { 
  ButtonDecrement,
  ButtonIncrement, 
  ContainerQuantity, 
  MarmitaCounter
} from './styled'
import { QuantityButtonProps } from './types'
import styles from './styles.module.css'
import { Icon } from '../../atoms'

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  border,
  margin,
  padding,
  label = '',
  quantity = 0,
  disabled = false,
  showNegativeButton = false,
  showPositiveButton = false,
  validationOne,
  classNameQuantity = '',
  validationZero = false,
  width,
  handleDecrement = () => {
    return
  },
  handleIncrement = () => {
    return
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
          {quantity != 0 && (
            <ButtonDecrement
              className={styles['btn-icon btn-icon--primary btn-icon--size-m btn-icon--transparent marmita-counter__btn-decrement']}
              disabled={showNegativeButton || validateZero || disabled}
              onClick={() => {
                return validationOne
                  ? () => {
                    return
                  }
                  : handleDecrement()
              }}
              type='button'
            >
              <span className={styles['icon-marmita icon-marmita--minus-sign']}>
                <Icon size={24} width={24} height={24} icon='IconMinus' color={validateZero ? 'transparent' : '#EA1D2C'} />
              </span>
            </ButtonDecrement>
          )}
          <span className={styles['marmita-counter__value_label']}>{label}</span>
          {quantity != 0 && <div className={`${styles['marmita-counter__value']} ${classNameQuantity}`}>{validateZero ? null : quantity}</div>}
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
  classNameQuantity: PropTypes.string.isRequired,
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
