import { CardDevice, ContainerDevices } from './styled'
import { platformIcons } from './PlatformIcons'
import { Skeleton } from '../../molecules/Skeleton'

export const Devices = ({
    data = [],
    deviceId = null,
    loading = false
}) => {
  function getPlatformIcon(platform) {
    return platformIcons[platform]
  }
  if (loading) return (
    <ContainerDevices>
      <Skeleton numberObject={4} height={75} margin={'10px 0'} />
    </ContainerDevices>
  )
  return (
    <ContainerDevices>
      {data?.map(x => {return (
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
