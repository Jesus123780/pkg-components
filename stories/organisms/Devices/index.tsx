import PropTypes from 'prop-types'
import React from 'react'
import { Skeleton } from '../../molecules/Skeleton'
import { getPlatformIcon, prioritizeCurrentDevice } from './helpers'
import { Divider, Text } from '../../atoms'
import { getGlobalStyle } from '../../../utils'
import styles from './styles.module.css'

interface Device {
  dId: string
  deviceName: string
  platform: string
  short_name: string
  deviceId: string
  locationFormat: string
  DatCre: string
}
interface IDevicesProps {
  data: Array<Device>
  deviceId: string | null
  loading: boolean
}
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
  const prioritizedData = prioritizeCurrentDevice(data, deviceId ?? '')

  if (loading) return (
    <div className={styles.container}>
      <Skeleton
        height={75}
        margin={'10px 0'}
        numberObject={4}
      />
    </div>
  )

  return (
    <div className={styles.container}>
      {prioritizedData?.map((x: Device) => {
        return (
          <div className={styles.cardDevice} key={x.dId}>
            <span className={styles.device__icon}>
              {getPlatformIcon(x.platform as "win32" | "Tablet" | "Mobile" | "Unknown")}
            </span>
            <div className={styles.device__info}>
              <div className={styles['device__description-wrapper']}>
                <Text weight='bold' className={styles.device__description}>
                  {x?.deviceName} - {x?.platform}
                </Text>
                {deviceId === x.deviceId && (
                  <Text className={styles.device__current}>
                    Dispositivo actual
                  </Text>
                )}
              </div>
              <Text className={styles.device__localization}>
                {x?.short_name}
              </Text>
              <Text className={styles.device__localization}>
                {x?.locationFormat}
              </Text>
              <Divider marginTop={getGlobalStyle('--spacing-sm')} />
              <Text className={styles.device__localization}>
                {x?.DatCre}
              </Text>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Devices
