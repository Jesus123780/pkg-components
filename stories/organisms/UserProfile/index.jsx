import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { Devices } from '../Devices'
import { ProfileInfo } from './ProfileInfo'
import { RestaurantInfo } from './RestaurantInfo'
import {
  Button,
  Container,
  ContainerColumn,
  Text
} from './styled'

export const UserProfile = ({
  dataForm = {},
  dataStore = {},
  dataDevice = [],
  deviceId = null,
  loading = false,
  loadingSubmit = false,
  handleSubmit = () => { return },
  onChange = () => { return }
}) => {
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingDataProfile, setEditingDataProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [currentView, setCurrentView] = useState('Perfil')

  const handleViewChange = useCallback((tabKey) => {
    setCurrentView(tabKey)
  }, [])

  const handleProfileDataEditClick = () => {
    setEditingDataProfile(!editingDataProfile)
    if (editingDataProfile) {
      handleSubmit()
    }
  }

  const handleProfileEditClick = () => {
    setEditingProfile(!editingProfile)
    if (editingProfile) {
      handleSubmit()
    }
  }

  const handleAddressEditClick = () => {
    setEditingAddress(!editingAddress)
    if (editingAddress) {
      handleSubmit()
    }
  }
  const memoizedComponents = {
    Perfil: (
      <ProfileInfo
        dataForm={dataForm}
        editingAddress={editingAddress}
        editingDataProfile={editingDataProfile}
        editingProfile={editingProfile}
        handleAddressEditClick={handleAddressEditClick}
        handleProfileDataEditClick={handleProfileDataEditClick}
        handleProfileEditClick={handleProfileEditClick}
        loading={loading}
        loadingSubmit={loadingSubmit}
        onChange={onChange}
      />
    ),
    Dispositivos: (
      <div style={{ width: '90%', margin: '0 30px' }}>
        <Text fSize='1.5rem'>
        Mis dispositivos
        </Text>
        <Devices
          data={dataDevice}
          deviceId={deviceId}
          loading={loading}
          loadingSubmit={loadingSubmit}
        />
      </div>
    ),
    Restaurante: (
      <RestaurantInfo data={dataStore} />
    )
  }


  return <div style={{ backgroundColor: '#f6f6f6', padding: '30px' }}>
    <Container>
      <ContainerColumn width='25%'>
        {Object.keys(memoizedComponents).map(view => {return (
          <Button
            isActive={view === currentView}
            key={view}
            onClick={() => {return handleViewChange(view)}}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        )})}
      </ContainerColumn>
      <ContainerColumn width='75%'>
        {memoizedComponents[currentView]}
      </ContainerColumn>
    </Container >
  </div>
}

UserProfile.propTypes = {
  dataDevice: PropTypes.array,
  dataForm: PropTypes.shape({
    email: PropTypes.string,
    lastName: PropTypes.string,
    upAddress: PropTypes.any,
    upDateBir: PropTypes.any,
    upPhone: PropTypes.string,
    upZipCode: PropTypes.any,
    username: PropTypes.string
  }),
  dataStore: PropTypes.object,
  deviceId: PropTypes.any,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
  loadingSubmit: PropTypes.bool,
  onChange: PropTypes.func,
  useFormatDate: PropTypes.func
}

