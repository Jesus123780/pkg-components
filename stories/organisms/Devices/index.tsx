import React from 'react'
import { Skeleton } from '../../molecules/Skeleton'
import { getPlatformIcon, prioritizeCurrentDevice } from './helpers'
import { Divider, Text } from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

/**
 * Device interface aligned with backend GraphQL schema
 */
interface Device {
  dId: string
  deviceId: string
  deviceName: string
  platform: string
  shortName?: string | null
  locationFormat?: string | null
  family?: string | null
  os?: string | null
  model?: string | null
  ip?: string | null
  isBot?: boolean | null
  dState: number
  userId: string
  locationFormation?: string | null
  createdAt: string
  updatedAt: string
}

interface IDevicesProps {
  data: Device[]
  deviceId: string | null
  loading: boolean
}

/**
 * Format date into a human-readable string
 * @param {string} date - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (date: string): string => {
  try {
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(date))
  } catch {
    return date
  }
}

/**
 * DeviceCard component to display a single device
 * @param {Device} device - Device object
 * @param {string | null} currentDeviceId - ID of current device
 * @returns {JSX.Element} Rendered device card
 */
const DeviceCard: React.FC<{ device: Device, currentDeviceId: string | null }> = ({ device, currentDeviceId }) => (
  <li className={styles.cardDevice}>
    <span className={styles.device__icon}>
      {getPlatformIcon(device.platform as 'win32' | 'Tablet' | 'Mobile' | 'Unknown')}
    </span>
    <div className={styles.device__info}>
      <div className={styles['device__description-wrapper']}>
        <Text weight='bold' className={styles.device__description}>
          {device.deviceName} - {device.platform}
        </Text>
        {currentDeviceId === device.deviceId && (
          <Text className={styles.device__current}>Dispositivo actual</Text>
        )}
      </div>

      {/* Device details */}
      {(typeof device.shortName === 'string' && device.shortName.trim() !== '') && (
        <Text as='h2' className={styles.device__localization}>
          {device.shortName}
        </Text>
      )}
      {(typeof device.locationFormat === 'string' && device.locationFormat.trim() !== '') && (
        <Text as='h2' className={styles.device__localization}>
          {device.locationFormat}
        </Text>
      )}
      {(typeof device.family === 'string' && device.family.trim() !== '') && (
        <Text as='h2' className={styles.device__localization}>Familia: {device.family}</Text>
      )}
      {(typeof device.model === 'string' && device.model.trim() !== '') && (
        <Text as='h2' className={styles.device__localization}>Modelo: {device.model}</Text>
      )}
      {(typeof device.os === 'string' && device.os.trim() !== '') && (
        <Text as='h2' className={styles.device__localization}>OS: {device.os}</Text>
      )}
      {(typeof device.ip === 'string' && device.ip.trim() !== '') && (
        <Text as='h2' className={styles.device__localization}>IP: {device.ip}</Text>
      )}
      {device.isBot === true && <Text as='h2' className={styles.device__localization}>🤖 Bot detectado</Text>}

      <Divider marginTop={getGlobalStyle('--spacing-sm')} />
      <Text as='h2' className={styles.device__localization}>{formatDate(device.createdAt)}</Text>
    </div>
  </li>
)

/**
 * Devices component to display a list of devices.
 *
 * @param {Array} data - Array of device objects.
 * @param {string|null} deviceId - ID of the current device.
 * @param {boolean} loading - Loading state for the component.
 * @returns {JSX.Element} Rendered Devices component.
 */
export const Devices: React.FC<IDevicesProps> = ({
  data = [],
  deviceId = null,
  loading = false
}) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <Skeleton height={75} margin='10px 0' />
      </div>
    )
  }

  const prioritizedData = prioritizeCurrentDevice(data, deviceId ?? '')

  return (
    <ul className={styles.container}>
      {prioritizedData.map((device) => (
        <DeviceCard
          key={device.dId}
          device={device as Device}
          currentDeviceId={deviceId}
        />
      ))}
    </ul>
  )
}
