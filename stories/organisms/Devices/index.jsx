import PropTypes from 'prop-types'
import React from 'react'
import { Skeleton } from '../../molecules/Skeleton'
import { platformIcons } from './PlatformIcons'
import { CardDevice, ContainerDevices } from './styled'
/**
 * Function to get the platform icon based on the platform name.
 * @param {string} platform - The platform name.
 * @returns {string} - The platform icon.
 */
const getPlatformIcon = (platform) => {
  return platformIcons[platform] || ''
}

/**
 * Function to prioritize the current device in the data array.
 * @param {Array} data - The array of devices.
 * @param {string} deviceId - The ID of the current device.
 * @returns {Array} - The updated array with the current device at the beginning.
 */
const prioritizeCurrentDevice = (data, deviceId) => {
  if (Array.isArray(data) && deviceId) {
    const newData = [...data] // Create a new array to avoid modifying the original
    const currentDeviceIndex = newData.findIndex(device => {return device?.deviceId === deviceId})

    if (currentDeviceIndex !== -1) {
      const currentDevice = newData[currentDeviceIndex]
      newData?.splice(currentDeviceIndex, 1)
      newData?.unshift(currentDevice)
    }

    return newData
  }
  return data
}

export const Devices = ({
  data = [],
  deviceId = null,
  loading = false
}) => {
  const prioritizedData = prioritizeCurrentDevice(data, deviceId)

  if (loading) return (
    <ContainerDevices>
      <Skeleton
        height={75}
        margin={'10px 0'}
        numberObject={4}
      />
    </ContainerDevices>
  )

  return (
    <ContainerDevices>
      {prioritizedData?.map(x => {return (
        <CardDevice key={x.dId}>
          <span className='device__icon'>
            {getPlatformIcon(x.platform)}
          </span>
          <div className='device__info'>
            <div className='device__description-wrapper'>
              <span className='device__description'> {x?.deviceName} - {x?.platform} </span>
              {deviceId === x.deviceId && <span className='device__current'>Current device </span>}
            </div>
            <span className='device__localization' tabIndex='0'> {x?.short_name}</span>
            <span className='device__localization' tabIndex='0'> {x?.locationFormat}</span>
            <span className='device__localization' tabIndex='0'> {x?.DatCre} </span>
          </div>
        </CardDevice>
      )})}
    </ContainerDevices>
  )
}

// Prop types for the Devices component
Devices.propTypes = {
  data: PropTypes.array,
  deviceId: PropTypes.string,
  loading: PropTypes.bool
}

export default Devices
