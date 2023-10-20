import PropTypes from 'prop-types'
import React from 'react'
import { Skeleton } from '../../molecules/Skeleton'
import { getPlatformIcon, prioritizeCurrentDevice } from './helpers'
import { CardDevice, ContainerDevices } from './styled'

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
