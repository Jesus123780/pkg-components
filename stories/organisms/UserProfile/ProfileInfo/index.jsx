import PropTypes from 'prop-types'
import React from 'react'
import Image from 'next/image'
import {
  UserInfo,
  Avatar,
  ProfileSection,
  ReadOnlyText,
  EditButton,
  Title,
  Label,
  Input,
} from '../styled'
import { SkeletonProfile } from '../Skeleton'

export const ProfileInfo = ({
  dataForm = {},
  editingAddress = false,
  asEdited = false,
  editingDataProfile = false,
  editingProfile = false,
  loadingSubmit = false,
  loading = true,
  handleProfileEditClick = () => { return },
  handleAddressEditClick = () => { return },
  handleProfileDataEditClick = () => { return },
  onChange = () => { return }
}) => {
  const label = editingDataProfile ? 'Guardar' : 'Editar'
  const labelProfile = (editingProfile ? 'Guardar' : 'Editar')
  if (loading) return <SkeletonProfile />
  return (
    <div>
      <ProfileSection>
        <div className='profile-secction__avatar'>
          <Avatar>
            <Image
              src='/images/DEFAULTBANNER.png'
              alt='Profile Image'
              width={200}
              height={200}
              objectFit='contain'
            />
          </Avatar>
          <UserInfo>
            <EditButton
              style={(asEdited && editingProfile) ? { backgroundColor: 'var(--color-primary-red)' } : {}}
              disabled={loadingSubmit}
              editing={editingProfile}
              asEdited={asEdited}
              onClick={handleProfileEditClick}
              
            >
              {loadingSubmit ? 'Cargando' : labelProfile}
              <svg width='30' height='30' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M11.6024 3.14982L4.41868 10.7536C4.14743 11.0423 3.88493 11.6111 3.83243 12.0048L3.50868 14.8398C3.39493 15.8636 4.12993 16.5636 5.14493 16.3886L7.96243 15.9073C8.35618 15.8373 8.90743 15.5486 9.17868 15.2511L16.3624 7.64732C17.6049 6.33482 18.1649 4.83857 16.2312 3.00982C14.3062 1.19857 12.8449 1.83732 11.6024 3.14982Z' stroke={editingProfile ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M10.4033 4.41797C10.7796 6.83297 12.7396 8.67922 15.1721 8.92422' stroke={editingProfile ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M2.625 19.25H18.375' stroke={editingProfile ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </EditButton>

            <Label>Username</Label>
            {editingProfile ?
              <Input
                name='username'
                onChange={onChange}
                value={dataForm?.username || ''}
                type='text'
              /> :
              <ReadOnlyText>
                {dataForm?.username}
              </ReadOnlyText>
            }

            <Label>Email</Label>
            <ReadOnlyText>
              {dataForm?.email}
            </ReadOnlyText>
          </UserInfo>
        </div>

      </ProfileSection>

      <ProfileSection>
        <Title>
          Mi perfil
        </Title>
        <Title>
          Información personal
        </Title>
        <EditButton disabled={loadingSubmit} editing={editingDataProfile} onClick={handleProfileDataEditClick}>
          {loadingSubmit ? 'Cargando' : label}
          <svg width='30' height='30' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M11.6024 3.14982L4.41868 10.7536C4.14743 11.0423 3.88493 11.6111 3.83243 12.0048L3.50868 14.8398C3.39493 15.8636 4.12993 16.5636 5.14493 16.3886L7.96243 15.9073C8.35618 15.8373 8.90743 15.5486 9.17868 15.2511L16.3624 7.64732C17.6049 6.33482 18.1649 4.83857 16.2312 3.00982C14.3062 1.19857 12.8449 1.83732 11.6024 3.14982Z' stroke={editingDataProfile ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M10.4033 4.41797C10.7796 6.83297 12.7396 8.67922 15.1721 8.92422' stroke={editingDataProfile ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M2.625 19.25H18.375' stroke={editingDataProfile ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </EditButton>
        <>
          <Label>Primer Nombre</Label>
          {editingDataProfile ? (
            <Input
              name='username'
              onChange={onChange}
              value={dataForm?.username || ''}
              type='text'
            />
          ) : (
            <ReadOnlyText>
              {dataForm?.username}
            </ReadOnlyText>
          )}

          <Label>Apellido</Label>
          {editingDataProfile ? (
            <Input
              name='lastName'
              onChange={onChange}
              type='text'
              value={dataForm?.lastName || ''}
            />
          ) : (
            <ReadOnlyText>
              {dataForm?.lastName}
            </ReadOnlyText>
          )}

          <Label>Teléfono</Label>
          {editingDataProfile ? (
            <Input
              type='tel'
              name='upPhone'
              onChange={onChange}
              title='Número de Teléfono'
              value={dataForm?.upPhone || ''}
            />
          ) : (
            <ReadOnlyText>
              {dataForm?.upPhone}
            </ReadOnlyText>
          )}

          <Label>Email</Label>
          <ReadOnlyText>
            {dataForm?.email}
          </ReadOnlyText>
        </>

      </ProfileSection>

      <ProfileSection>
        <EditButton disabled={loadingSubmit} editing={editingAddress} onClick={handleAddressEditClick}>
          {loadingSubmit ? 'Cargando' : (editingAddress ? 'Guardar' : 'Editar')}
          <svg width='30' height='30' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M11.6024 3.14982L4.41868 10.7536C4.14743 11.0423 3.88493 11.6111 3.83243 12.0048L3.50868 14.8398C3.39493 15.8636 4.12993 16.5636 5.14493 16.3886L7.96243 15.9073C8.35618 15.8373 8.90743 15.5486 9.17868 15.2511L16.3624 7.64732C17.6049 6.33482 18.1649 4.83857 16.2312 3.00982C14.3062 1.19857 12.8449 1.83732 11.6024 3.14982Z' stroke={editingAddress ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M10.4033 4.41797C10.7796 6.83297 12.7396 8.67922 15.1721 8.92422' stroke={editingAddress ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M2.625 19.25H18.375' stroke={editingAddress ? '#ffffff' : '#282828'} strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
          </svg>

        </EditButton>
        {editingAddress ? (
          <>
            <Label>Dirección</Label>
            <Input
              name='upAddress'
              onChange={onChange}
              title='dirección'
              type='text'
              value={dataForm?.upAddress}
            />
            <Label>Ciudad</Label>
            <Input type='text' />
            <Label>País</Label>
            <Input type='text' />
          </>
        ) : (
          <>
            <Label>Dirección</Label>
            <ReadOnlyText></ReadOnlyText>
            <Label>Ciudad</Label>
            <ReadOnlyText></ReadOnlyText>
            <Label>País</Label>
            <ReadOnlyText>Colombia</ReadOnlyText>
          </>
        )}
      </ProfileSection>
    </div>
  )
}

ProfileInfo.propTypes = {
  dataForm: PropTypes.object,
  editingAddress: PropTypes.bool,
  editingDataProfile: PropTypes.bool,
  asEdited: PropTypes.bool,
  editingProfile: PropTypes.bool,
  handleAddressEditClick: PropTypes.func,
  handleProfileDataEditClick: PropTypes.func,
  handleProfileEditClick: PropTypes.func,
  loadingSubmit: PropTypes.bool,
  onChange: PropTypes.func
}
