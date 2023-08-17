import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import {
  Container,
  ContainerColumn,
  Text,
  Button
} from './styled'
import { ProfileInfo } from './ProfileInfo'
import { Devices } from '../Devices'

export const UserProfile = ({
  dataForm = {},
  dataDevice = [],
  deviceId = null,
  loading = false,
  loadingSubmit = false,
  handleSubmit = () => { return },
  useFormatDate = () => { return },
  onChange = () => { return }
}) => {
  const formatDate = useFormatDate({ date: dataForm?.upDateBir })
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingDataProfile, setEditingDataProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [currentView, setCurrentView] = useState('profile')

  const handleViewChange = useCallback((tabKey) => {
    setCurrentView(tabKey);
  }, []);

  const handleProfileDataEditClick = () => {
    setEditingDataProfile(!editingDataProfile);
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
    profile: (
      <ProfileInfo
        dataForm={dataForm}
        loadingSubmit={loadingSubmit}
        editingAddress={editingAddress}
        editingDataProfile={editingDataProfile}
        editingProfile={editingProfile}
        handleAddressEditClick={handleAddressEditClick}
        handleProfileDataEditClick={handleProfileDataEditClick}
        handleProfileEditClick={handleProfileEditClick}
        loading={loading}
        onChange={onChange}
      />
    ),
    dispositivos: (
      <div style={{ width: '90%', margin: '0 30px' }}>
      <Text fSize='1.5rem'>
        Mis dispositivos
      </Text>
        <Devices
          data={dataDevice}
          deviceId={deviceId}
          loadingSubmit={loadingSubmit}
          loading={loading}
        />
      </div>
    ),
    'info del restaurante': (
      <></>
    )
  }


  return <div style={{ backgroundColor: '#f6f6f6', padding: '30px' }}>
    <Container>
      <ContainerColumn width='25%'>
        {Object.keys(memoizedComponents).map(view => (
          <Button isActive={view === currentView} key={view} onClick={() => handleViewChange(view)}>
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        ))}
      </ContainerColumn>
      <ContainerColumn width='75%'>
        {memoizedComponents[currentView]}
      </ContainerColumn>
    </Container >
  </div>
}

UserProfile.propTypes = {
  dataForm: PropTypes.shape({
    email: PropTypes.string,
    lastName: PropTypes.string,
    upAddress: PropTypes.any,
    upDateBir: PropTypes.any,
    upPhone: PropTypes.string,
    upZipCode: PropTypes.any,
    username: PropTypes.string
  }),
  handleSubmit: PropTypes.any,
  onChange: PropTypes.any
}

