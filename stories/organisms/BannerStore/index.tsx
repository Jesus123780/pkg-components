import PropTypes from 'prop-types'
import { InputFile } from './styled'

import Image from 'next/image'
import React from 'react'
import { getGlobalStyle } from '../../../utils'
import { Skeleton } from '../../molecules/Skeleton'
import { Text } from '../../atoms/Text'
import { Button, Column, Icon, Tag } from '../../atoms'
import styles from './styles.module.css'
interface IBannerStore {
  altLogo?: string
  bnImageFileName?: any
  fileInputRef?: any
  fileInputRefLogo?: any
  handleInputChangeLogo?: () => void
  handleUpdateBanner?: () => void
  isEdit?: boolean
  isTablet: boolean
  isEmtySchedules?: boolean
  isLoading?: boolean
  isMobile?: boolean
  onTargetClick?: (event: React.MouseEvent) => void
  onTargetClickLogo?: (event: React.MouseEvent) => void
  HandleDeleteBanner?: () => void
  handleDeleteLogo: () => void
  handleClose?: () => void
  open?: any
  openNow?: boolean
  path?: string | undefined | null
  src?: string | undefined | null
  srcLogo?: string | undefined | null
  store: {
    Image: string | undefined | null
    storeName: string | undefined | null
    idStore: string | undefined | null
    scheduleOpenAll: string | undefined | null
    scheduleOpen: string | undefined | null
    scheduleClose: string | undefined | null
    scheduleCloseAll: string | undefined | null
    scheduleDay: number | undefined | null
    scheduleId: number | undefined | null
    scheduleStatus: number | undefined | null
    scheduleStatusAll: number | undefined | null
    storeId: number | undefined | null
    banner: string | undefined | null
    storeStatus: number | undefined | null
  }
}
export const BannerStore: React.FC<IBannerStore> = ({
  altLogo = '',
  fileInputRef,
  fileInputRefLogo,
  isEdit = false,
  isEmtySchedules = true,
  isLoading = false,
  isMobile = false,
  isTablet = false,
  open,
  openNow = true,
  src = process.env.DEFAULTBANNER,
  srcLogo = process.env.DEFAULTLOGO,
  store = {
    Image: process.env.DEFAULTLOGO,
    storeName: '',
    banner: process.env.DEFAULTBANNER,
    cateStore: {
      cName: ''
    }
  },
  handleInputChangeLogo = () => { },
  onTargetClickLogo = (event) => { return event },
  handleClose = () => { },
  handleUpdateBanner = () => { },
  HandleDeleteBanner = () => { },
  handleDeleteLogo = () => { },
  onTargetClick = () => { }
}) => {
  const actions = [
    {
      onClick: () => { return HandleDeleteBanner() },
      icon: 'IconDelete',
      actionName: 'Eliminar banner',
      color: getGlobalStyle('--color-icons-primary'),
      size: 20,
      top: isTablet ? 85 : undefined,
      delay: undefined
    },
    {
      onClick: onTargetClick,
      icon: 'IconEdit',
      actionName: 'Editar',
      color: getGlobalStyle('--color-icons-primary'),
      size: 20,
      top: isTablet ? 10 : 60,
      delay: '.1s'
    },
    {
      onClick: onTargetClick,
      icon: 'IconFileUpload',
      actionName: 'Subir',
      color: getGlobalStyle('--color-icons-primary'),
      size: 20,
      top: isTablet ? 50 : 100,
      delay: '.2s'
    }
  ]

  const storeName = store?.storeName !== '' ? store?.storeName : ''
  const bannerTitle = isEmtySchedules
    ? `${store?.cateStore?.cName ?? ''} - ${storeName}`
    : `${store?.cateStore?.cName ?? ''} - ${open}`
  return (
    <div className={styles.seccion}>
      {isEdit &&
        <>

          <InputFile
            accept='.jpg, .png'
            id='iFile'
            onChange={handleUpdateBanner}
            ref={fileInputRef}
            type='file'
          />
          <InputFile
            accept='.jpg, .png'
            id='iFile'
            onChange={handleInputChangeLogo}
            ref={fileInputRefLogo}
            type='file'
          />
        </>

      }
      {isLoading
        ? <Skeleton height={isMobile ? 118 : 250} />
        : <div
          className={`${styles['merchant-banner__status']} ${isEmtySchedules || openNow ? styles.open : styles.closed}`}
          style={{
            backgroundImage: `url(${src})`
          }}
        >
          <span className={styles['merchant-banner__icon-container']}>
            <Icon
              icon='IconStore'
              color={getGlobalStyle('--color-icons-white')}
              size={40}
            />
          </span>
          <div className={styles['merchant-banner__status-description']} data-test-id="merchant-banner-status-description">
            <Text
              as='h2'
              className={styles['merchant-banner__status-title']}
              color='white'
            >
              {bannerTitle}
            </Text>
          </div>
        </div>
      }
      {isEdit &&
        <div className={styles['merchant-banner__actions']}>
          {actions.map((action, index) => {
            const { top, delay } = action
            return (
              <button
                className={`${styles.buttonCard}`}
                style={{ top, transitionDelay: delay }}
                key={index}
                onClick={action.onClick}
              >
                <Icon
                  icon={action.icon}
                  color={action.color}
                  size={action.size}
                />
                <Text className={styles.label_action} color='primary' >
                  {action.actionName}
                </Text>
              </button>
            )
          })}
        </div>
      }
      <div className={styles.banner_merchant_info_container} >
        <Column
          style={{ width: 'min-content' }}
          alignItems='center'
          justifyContent='center'
        >
          <span className={styles.wrapper_logo}>
            <Image
              alt={altLogo ?? ''}
              className={styles.wrapper_logo_image}
              height={70}
              objectFit='contain'
              onClick={(e) => { return isEdit ? onTargetClickLogo(e) : {} }}
              src={`${srcLogo}`}
              width={70}
            />
          </span>
          <Column
            alignItems='center'
            justifyContent='center'
          >
            <Button
              padding='0'
              border='none'
              onClick={() => {
                handleDeleteLogo()
              }}
            >
              <Tag label='ELIMINAR LOGO'
                style={{
                  color: getGlobalStyle('--color-campaigns-red'),
                  backgroundColor: getGlobalStyle('--color-primary-pink-light')
                }}
              />
            </Button>
          </Column>
        </Column>
        <div className='basico_info' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text className={styles['merchant-banner__title_merchant']} as='h2'>
            {String(store?.storeName)}
          </Text>
          <div className='wrapper_details__button' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              border='none'
              className={styles.details__button}
              onClick={handleClose}
            >
              ver más
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
BannerStore.propTypes = {
  altLogo: PropTypes.string,
  bnImageFileName: PropTypes.any,
  fileInputRef: PropTypes.any,
  fileInputRefLogo: PropTypes.any,
  handleInputChangeLogo: PropTypes.func,
  handleUpdateBanner: PropTypes.func,
  isEdit: PropTypes.bool,
  isEmtySchedules: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMobile: PropTypes.bool,
  onTargetClick: PropTypes.func,
  onTargetClickLogo: PropTypes.func,
  HandleDeleteBanner: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.any,
  openNow: PropTypes.bool,
  path: PropTypes.string,
  src: PropTypes.string,
  srcLogo: PropTypes.string
}
