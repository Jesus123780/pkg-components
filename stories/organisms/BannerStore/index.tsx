import PropTypes from 'prop-types'
import {
  ActionName,
  InputFile,
  MerchantInfo,
  MerchantInfoTitle,
  Section
} from './styled'

import Image from 'next/image'
import React from 'react'
import { getGlobalStyle } from '../../../utils'
import { Skeleton } from '../../molecules/Skeleton'
import { Text } from '../../atoms/Text'
import { Icon } from '../../atoms'
import styles from './styles.module.css'

interface IBannerStore {
  altLogo?: string
  bnImageFileName?: any
  fileInputRef?: any
  fileInputRefLogo?: any
  handleInputChangeLogo?: () => void
  handleUpdateBanner?: () => void
  isEdit?: boolean
  isEmtySchedules?: boolean
  isLoading?: boolean
  isMobile?: boolean
  onTargetClick?: (event: React.MouseEvent) => void
  onTargetClickLogo?: (event: React.MouseEvent) => void
  HandleDeleteBanner?: () => void
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
    storeStatus: number | undefined | null
  }
}
export const BannerStore: React.FC<IBannerStore> = ({
  altLogo = '',
  bnImageFileName,
  fileInputRef,
  fileInputRefLogo,
  isEdit = false,
  isEmtySchedules = true,
  isLoading = false,
  isMobile = false,
  open,
  openNow = true,
  path = '/images/DEFAULTBANNER.png',
  src = '/images/DEFAULTBANNER.png',
  srcLogo = '/images/DEFAULTBANNER.png',
  store = {
    Image: '/images/DEFAULTBANNER.png',
    storeName: ''
  },
  handleInputChangeLogo = () => { },
  onTargetClickLogo = (event) => { return event },
  handleClose = () => { },
  handleUpdateBanner = () => { },
  HandleDeleteBanner = () => { },
  onTargetClick = () => { }
}) => {
  const actions = [
    {
      onClick: () => { return path !== '' && (Boolean(bnImageFileName)) && HandleDeleteBanner() },
      icon: 'IconDelete',
      actionName: 'Eliminar',
      color: getGlobalStyle('--color-icons-primary'),
      size: 20,
      top: undefined,
      delay: undefined
    },
    {
      onClick: onTargetClick,
      icon: 'IconEdit',
      actionName: 'Editar',
      color: getGlobalStyle('--color-icons-primary'),
      size: 20,
      top: '60px',
      delay: '.1s'
    },
    {
      onClick: onTargetClick,
      icon: 'IconPromo',
      actionName: 'Subir',
      color: getGlobalStyle('--color-icons-primary'),
      size: 20,
      top: '100px',
      delay: '.2s'
    }
  ]

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
        style={{ backgroundImage: `url(${path ?? src ?? '/images/DEFAULTBANNER.png'})` }}
      >
        <span className={styles['merchant-banner__icon-container']}>
          <Icon icon='IconStore' color={getGlobalStyle('--color-icons-white')} size={40} />
        </span>
        <div className={styles['merchant-banner__status-description']} data-test-id="merchant-banner-status-description">
          <Text as='h2' className={styles['merchant-banner__status-title']} color='white'>
            {isEmtySchedules ? `${store?.cateStore?.cName ?? ''} - ${store?.storeName !== '' ? store?.storeName : ''}` : `${store?.cateStore?.cName ?? ''} - ${open}`}
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
                <Icon icon={action.icon} color={action.color} size={action.size} />
                <ActionName>{action.actionName}</ActionName>
              </button>
            )
          })}
        </div>
      }
      <MerchantInfo >
        {store?.Image !== ''
          ? <span className={styles.wrapper_logo}>
            <Image
              alt={altLogo}
              height={70}
              objectFit='contain'
              onClick={(e) => { return isEdit ? onTargetClickLogo(e) : {} }}
              src={store?.Image ?? '/images/DEFAULTBANNER.png'}
              width={70}
            />
          </span>
          : <span className={styles.wrapper_logo}>
          <Image
            alt={altLogo ?? 'logo'}
            blurDataURL='/images/DEFAULTBANNER.png'
            height={70}
            objectFit='contain'
            onClick={(e) => { return isEdit ? onTargetClickLogo(e) : {} }}
            placeholder='blur'
            src={srcLogo ?? '/images/DEFAULTBANNER.png'}
            width={70}
            />
            </span>
        }
        <div className='basico_info' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MerchantInfoTitle >
            {store?.storeName}
          </MerchantInfoTitle>
          <div className='wrapper_details__button' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className='details__button' onClick={handleClose} >
              ver más
            </button>
          </div>
        </div>
      </MerchantInfo>
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
