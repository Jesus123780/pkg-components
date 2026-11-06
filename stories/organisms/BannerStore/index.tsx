import { InputFile } from './styled'

import Image from 'next/image'
import React from 'react'

import { getGlobalStyle } from '../../../utils'

import { Skeleton } from '../../molecules/Skeleton'
import { Text } from '../../atoms/Text'
import { Button, Column, Icon, Tag } from '../../atoms'

import styles from './styles.module.css'

// --------------------------------------------------
// STORE INTERFACE
// --------------------------------------------------

export interface IStoreInterface {
  Image?: string | null
  storeName?: string | null
  idStore?: string | null

  scheduleOpenAll?: boolean | string | null
  scheduleOpen?: string | null
  scheduleClose?: string | null
  scheduleCloseAll?: string | null
  scheduleDay?: number | null
  scheduleId?: number | null
  scheduleStatus?: number | null
  scheduleStatusAll?: number | null

  storeId?: number | null
  banner?: string | null
  storeStatus?: number | null

  cateStore?: {
    cName?: string | null
  } | null
}

// --------------------------------------------------
// COMPONENT PROPS
// --------------------------------------------------

interface IBannerStore {
  altLogo?: string

  bnImageFileName?: string

  fileInputRef?: React.RefObject<HTMLInputElement>
  fileInputRefLogo?: React.RefObject<HTMLInputElement>

  handleInputChangeLogo?: React.ChangeEventHandler<HTMLInputElement>
  handleUpdateBanner?: React.ChangeEventHandler<HTMLInputElement>

  isEdit?: boolean
  isTablet: boolean
  isEmtySchedules?: boolean
  isLoading?: boolean
  isMobile?: boolean

  onTargetClick?: (event: React.MouseEvent) => void
  onTargetClickLogo?: (event: React.MouseEvent) => void

  HandleDeleteBanner?: () => void
  handleDeleteLogo?: () => void
  handleClose?: () => void

  open?: string
  openNow?: boolean

  path?: string | null

  src?: string | null
  srcLogo?: string | null

  store?: IStoreInterface
}

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

export const BannerStore: React.FC<IBannerStore> = ({
  altLogo = '',

  fileInputRef,
  fileInputRefLogo,

  isEdit = false,
  isTablet = false,
  isEmtySchedules = true,
  isLoading = false,
  isMobile = false,

  open,
  openNow = true,

  src = process.env.DEFAULTBANNER,
  srcLogo = process.env.DEFAULTLOGO,

  store = {},

  handleInputChangeLogo = () => {},
  handleUpdateBanner = () => {},

  onTargetClickLogo = () => {},
  onTargetClick = () => {},

  handleClose = () => {},
  handleDeleteLogo = () => {},
  HandleDeleteBanner = () => {}
}) => {
  // --------------------------------------------------
  // IMAGE SOURCES
  // --------------------------------------------------

  /**
   * src ya viene preparado desde Banner:
   *
   * /api/images/{store.banner}
   *
   * También puede ser una vista previa de una imagen
   * que el usuario acaba de seleccionar.
   */
  const bannerBackground = src
    ? `url("${src}")`
    : 'none'

  const logoSource = srcLogo || process.env.DEFAULTLOGO || ''

  // --------------------------------------------------
  // ACTIONS
  // --------------------------------------------------

  const actions = [
    {
      onClick: () => HandleDeleteBanner(),
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

  // --------------------------------------------------
  // BANNER TITLE
  // --------------------------------------------------

  const storeName = store?.storeName || ''

  const categoryName = store?.cateStore?.cName || ''

  const bannerTitle = isEmtySchedules
    ? `${categoryName} - ${storeName}`
    : `${categoryName} - ${open || ''}`

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className={styles.seccion}>

      {/* FILE INPUTS */}
      {isEdit && (
        <>
          <InputFile
            accept='image/*'
            id='iFile'
            onChange={handleUpdateBanner}
            ref={fileInputRef}
            type='file'
          />

          <InputFile
            accept='image/*'
            id='iFileLogo'
            onChange={handleInputChangeLogo}
            ref={fileInputRefLogo}
            type='file'
          />
        </>
      )}

      {/* BANNER */}
      {isLoading ? (
        <Skeleton height={isMobile ? 118 : 250} />
      ) : (
        <div
          className={`
            ${styles['merchant-banner__status']}
            ${isEmtySchedules || openNow
              ? styles.open
              : styles.closed}
          `}
          style={{
            backgroundImage: bannerBackground
          }}
        >
          <span className={styles['merchant-banner__icon-container']}>
            <Icon
              icon='IconStore'
              color={getGlobalStyle('--color-icons-white')}
              size={40}
            />
          </span>

          <div
            className={styles['merchant-banner__status-description']}
            data-test-id='merchant-banner-status-description'
          >
            <Text
              as='h2'
              className={styles['merchant-banner__status-title']}
              color='white'
            >
              {bannerTitle}
            </Text>
          </div>
        </div>
      )}

      {/* BANNER ACTIONS */}
      {isEdit && (
        <div className={styles['merchant-banner__actions']}>
          {actions.map((action, index) => {
            const { top, delay } = action

            return (
              <button
                className={styles.buttonCard}
                style={{
                  top,
                  transitionDelay: delay
                }}
                key={index}
                onClick={action.onClick}
                type='button'
              >
                <Icon
                  icon={action.icon}
                  color={action.color}
                  size={action.size}
                />

                <Text
                  className={styles.label_action}
                  color='primary'
                >
                  {action.actionName}
                </Text>
              </button>
            )
          })}
        </div>
      )}

      {/* MERCHANT INFORMATION */}
      <div className={styles.banner_merchant_info_container}>

        {/* STORE LOGO */}
        <Column
          style={{ width: 'min-content' }}
          alignItems='center'
          justifyContent='center'
        >
          <span className={styles.wrapper_logo}>
            {logoSource && (
              <Image
                alt={altLogo}
                className={styles.wrapper_logo_image}
                height={70}
                objectFit='contain'
                onClick={(event) => {
                  if (isEdit) {
                    onTargetClickLogo(event)
                  }
                }}
                src={logoSource}
                width={70}
              />
            )}
          </span>

          {isEdit && (
            <Column
              alignItems='center'
              justifyContent='center'
            >
              <Button
                padding='0'
                border='none'
                onClick={handleDeleteLogo}
              >
                <Tag
                  label='ELIMINAR LOGO'
                  style={{
                    color: getGlobalStyle('--color-campaigns-red'),
                    backgroundColor: getGlobalStyle('--color-primary-pink-light')
                  }}
                />
              </Button>
            </Column>
          )}
        </Column>

        {/* STORE NAME AND DETAILS */}
        <div
          className='basico_info'
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Text
            className={styles['merchant-banner__title_merchant']}
            as='h2'
          >
            {String(store?.storeName || '')}
          </Text>

          <div
            className='wrapper_details__button'
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
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