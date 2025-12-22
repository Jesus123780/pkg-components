import React from 'react'
import styles from './styles.module.css'
import {
  Column,
  Divider,
  Icon,
  Image,
  Paragraph,
  RippleButton,
  Row,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../utils'

interface Card {
  name: string
  icon: string
}

interface PlanProps {
  paymentMethodCards?: Card[]
  onRedirectTo?: () => void
  storeImage?: string
}

export const Plan: React.FC<PlanProps> = ({
  paymentMethodCards = [],
  storeImage = '',
  onRedirectTo = () => { }
}) => {
  return (
    <div className={styles.container}>
      <Row alignItems='center' justifyContent='center'>
        <Column >
          <Text
            as='h2'
            size='5xl'
            weight='hairline'
          >
            Tu Periodo ha terminado
          </Text>
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />

          <Text
            as='h2'
            size='5xl'
            weight='hairline'
          >
            Continua vendiendo con {process.env.BUSINESS_TITLE}
          </Text>
          <Text
            as='h2'
            size='3xl'
            weight='hairline'
            color='primary'
          >
            en un click
          </Text>
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />
          <Paragraph>
            Con {process.env.BUSINESS_TITLE} puedes seguir vendiendo en un click, sin importar si tienes un restaurante, una tienda o un negocio de servicios.
            ve al checkout realiza el pago y sigue vendiendo.
          </Paragraph>
          <Row>
            {paymentMethodCards?.map((card: Card) => {
              return (
                <div key={card.name} style={{ width: 'min-content', marginLeft: getGlobalStyle('--spacing-xs') }}>
                  <Icon icon={card.icon} size={40} />
                </div>
              )
            })}
          </Row>
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />
          <Divider marginTop={getGlobalStyle('--spacing-xl')} />
          <Column>
            <RippleButton onClick={onRedirectTo} radius='6px'>
              Ir al checkout
            </RippleButton>
          </Column>
        </Column>
        <Column>
          <Image
            width='100%'
            src={storeImage}
            alt=''
          />
        </Column>
      </Row>
    </div>
  )
}
