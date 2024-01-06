import PropTypes from 'prop-types'
import {
  ActionName,
  ButtonCard,
  InputFile,
  MerchantBannerWrapperInfo,
  MerchantInfo,
  MerchantInfoTitle,
  Section
} from './styled'

import Image from 'next/image'
import { PColor } from '../../../assets/colors'
import {
  IconDelete,
  IconEdit,
  IconPromo,
  IconStore
} from '../../../assets/icons'
import { Skeleton } from '../../molecules/Skeleton'

export const BannerStore = ({
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
  path = '',
  src = '/images/DEFAULTBANNER.png',
  srcLogo = '/images/DEFAULTBANNER.png',
  store = {},
  handleInputChangeLogo = () => { return },
  onTargetClickLogo = () => { return },
  handleUpdateBanner = () => { return },
  HandleDeleteBanner = () => { return },
  onTargetClick = () => { return }
}) => {
  return (
    <Section>
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
        : <MerchantBannerWrapperInfo Open={isEmtySchedules ? true : openNow} bannerImage={(path || src) ? `url(${path || src})` : `url('/images/DEFAULTBANNER.png')`} >
          <span>
          <IconStore />
          </span>
          <div className='merchant-banner__status-description' data-test-id='merchant-banner-status-description'>
            <h2 className='merchant-banner__status-title'>{isEmtySchedules ? `Restaurante ${store?.storeName || ''}` : `Restaurante  ${open}`}</h2>
          </div>
        </MerchantBannerWrapperInfo>
      }
      {isEdit &&
        <>
          <ButtonCard onClick={() => { return path && bnImageFileName && HandleDeleteBanner() }}>
            <IconDelete color={PColor} size={20} />
            <ActionName >
              Eliminar
            </ActionName>
          </ButtonCard>
          <ButtonCard
            color={1}
            delay='.1s'
            onClick={onTargetClick}
            top={'60px'}
          >
            <IconEdit color={PColor} size={20} />
            <ActionName>
              Editar
            </ActionName>
          </ButtonCard>
          <ButtonCard
            delay='.2s'
            onClick={onTargetClick}
            top={'100px'}
          >
            <IconPromo color={PColor} size={20} />
            <ActionName>
              Subir
            </ActionName>
          </ButtonCard>
        </>
      }
      <MerchantInfo >
        {store?.Image ?
          <Image
            alt={altLogo}
            className='logo'
            height={70}
            objectFit='contain'
            onClick={(e) => { return isEdit ? onTargetClickLogo(e) : {} }}
            src={store?.Image ?? '/images/DEFAULTBANNER.png'}
            width={70}
          />
          :
          <Image
            alt={altLogo || 'logo'}
            blurDataURL='/images/DEFAULTBANNER.png'
            className='logo'
            height={70}
            objectFit='contain'
            onClick={(e) => { return isEdit ? onTargetClickLogo(e) : {} }}
            placeholder='blur'
            src={srcLogo ?? '/images/DEFAULTBANNER.png'}
            width={70}
          />}
        <MerchantInfoTitle >
          {store?.storeName}
        </MerchantInfoTitle>
      </MerchantInfo>
    </Section>
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
  open: PropTypes.any,
  openNow: PropTypes.bool,
  path: PropTypes.string,
  src: PropTypes.string,
  srcLogo: PropTypes.string,
  store: PropTypes.object
}
