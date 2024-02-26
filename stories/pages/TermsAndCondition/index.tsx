import React from 'react'
import { Button, Checkbox, Column, Paragraph, Row, Text } from '../../atoms'
import { CreditMobilLayout } from '../../Layout/CreditMobilLayout'
import { textTerms } from './helpers'
import styles from './TermsAndCondition.module.css'

interface TermsAndConditionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}
export const TermsAndCondition: React.FC<TermsAndConditionProps> = ({
  onChange = () => {

  },
  checked = false
}) => {
  return (
    <CreditMobilLayout>
      <div className={styles.container}>
        <div className={styles['col-1']}>
          <Column>
            <Text
              customSize="4.0625rem"
              weight="medium"
              color="blue"
              styles={{ marginBottom: '1.5rem' }}
            >
              Firma el contrato de credimóvil
            </Text>
            <div className={styles.container_terms}>
              <Paragraph>
               {textTerms}
              </Paragraph>
            </div>
            <Row className={styles.container_action}>
              <Checkbox
                id="termsAndCondition"
                name="termsAndCondition"
                label="Acepto los términos y condiciones"
                checked={checked}
                onChange={onChange}
              />
              <div className={styles.content_button}>
                <Button padding="20px 50px" primary>Firmar contrato</Button>
              </div>
            </Row>
          </Column>
        </div>
      </div>
    </CreditMobilLayout>
  )
}
