import React, { useCallback, useState } from 'react'
import { Devices } from '../Devices'
import { Text } from '../../atoms'
import { ProfileInfo } from './ProfileInfo'
import { RestaurantInfo } from './RestaurantInfo'
import {
  Button,
  Container,
  ContainerColumn
} from './styled'

interface UserProfileProps {
  dataForm?: {
    email: string
    lastName: string
    upAddress: any
    upDateBir: any
    upPhone: string
    upZipCode: any
    username: string
  }
  dataStore?: object
  dataDevice?: any[]
  deviceId?: any
  loading?: boolean
  asEdited?: boolean
  loadingSubmit?: boolean
  handleSubmit?: () => void
  onChange?: () => void
  useFormatDate?: () => void
}

export const UserProfile: React.FC<UserProfileProps> = ({
  dataForm = {},
  dataStore = {},
  dataDevice = [],
  deviceId = null,
  loading = false,
  asEdited = false,
  loadingSubmit = false,
  handleSubmit = () => { },
  onChange = () => { }
}) => {
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingDataProfile, setEditingDataProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [currentView, setCurrentView] = useState('Perfil')

  const handleViewChange = useCallback((tabKey: string) => {
    setCurrentView(tabKey)
  }, [])

  const handleProfileDataEditClick = (): void => {
    setEditingDataProfile(!editingDataProfile)
    if (editingDataProfile) {
      handleSubmit()
    }
  }

  const handleProfileEditClick = (): void => {
    setEditingProfile(!editingProfile)
    if (editingProfile) {
      handleSubmit()
    }
  }

  const handleAddressEditClick = (): void => {
    setEditingAddress(!editingAddress)
    if (editingAddress) {
      handleSubmit()
    }
  }
  const memoizedComponents = {
    Perfil: (
      <ProfileInfo
        asEdited={asEdited}
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
        <Text>
        Mis dispositivos
        </Text>
        <Devices
          data={dataDevice}
          deviceId={deviceId}
          loading={loading}
        />
      </div>
    ),
    Restaurante: (
      <RestaurantInfo data={dataStore} />
    )
  }

  return <div style={{ backgroundColor: '#f6f6f6', padding: '30px' }}>
    <Container>
      <ContainerColumn style={{ width: '100%' }}>
        {Object.keys(memoizedComponents).map(view => {
          return (
          <Button
            isActive={view === currentView}
            key={view}
            onClick={() => { return handleViewChange(view) }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
          )
        })}
      </ContainerColumn>
      <ContainerColumn style={{ width: '75%' }}>
        {memoizedComponents[currentView]}
      </ContainerColumn>
    </Container >
  </div>
}
