import React from 'react'
import {
  Column,
  Row,
  Tag,
  Text
} from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

interface ProfileCardProps {
  bgColor: string
  borderColor: string
  color: string
  displayText: string
  eEmail: string
  status: 'INACTIVE' | 'ACTIVE'
  user?: {
    name: string
    email: string
  }
}

const ProfileCardMemo: React.FC<ProfileCardProps> = ({
  bgColor = '',
  borderColor = '',
  eEmail = '',
  color = '',
  displayText = '',
  status = 'INACTIVE',
  user = { name: 'No Name', email: '' }
}) => {
  const bgColorTag = {
    INACTIVE: getGlobalStyle('--color-feedback-warning-light'),
    ACTIVE: getGlobalStyle('--color-feedback-success-light')
  }

  const colorTag = {
    INACTIVE: getGlobalStyle('--color-neutral-white'),
    ACTIVE: getGlobalStyle('--color-neutral-white')
  }

  return (
    <div className={styles['profile-card-wrapper']}>
      <Column>
      <Row style={{ padding: getGlobalStyle('--spacing-xl') }} alignItems="center">
        <div
          className={styles.image_profile}
          style={{
            backgroundColor: bgColor,
            color,
            fontSize: `${Math.round(30 / 100 * 37)}px`,
            boxShadow: '0px 3px 8px rgba(18, 18, 18, 0.04), 0px 1px 1px rgba(18, 18, 18, 0.02)',
            borderColor: `${borderColor}50`,
            borderWidth: 1,
            borderStyle: 'solid',
            marginRight: getGlobalStyle('--spacing-md')
          }}
        >
          {displayText}
        </div>
        <Text weight="semibold" size='md'>
          {user?.name ?? null}
        </Text>
        <Tag
          label={status}
          style={{
            borderRadius: '6px',
            padding: '8px 12px',
            marginLeft: getGlobalStyle('--spacing-md'),
            backgroundColor: bgColorTag[status],
            color: colorTag[status]
          }}
        />
      </Row>
      <Row style={{ padding: '0 16px 16px 40px' }} alignItems="center">
        <Text weight="normal" size='md'>
          {user?.email ?? eEmail}
        </Text>
      </Row>
      </Column>
    </div>
  )
}

export const ProfileCard = React.memo(ProfileCardMemo)
