import React, { type FC } from 'react'

import {
  type IconProps,
  IconMiniCheck,
  IconQrCode,
  IconClose,
  IconStrokeLogo,
  IconDragHandle
} from '../../assets/public/Icons'
import {
  Google,
  IconArrowRight,
  IconBuys,
  IconCategorie,
  IconInvoice,
  IconChart,
  IconColombia,
  IconCircleNumber,
  IconFilter,
  IconDost,
  IconHome,
  IconInfo,
  IconLogout,
  IconInformationProduct,
  IconStore,
  IconTicket,
  IconTime,
  IconMessageMain,
  IconNotification,
  IconWallet,
  IconMasterCard,
  IconVisa,
  IconUser,
  IconHorario,
  IconLogo,
  IconBoxes,
  IconArrowTop,
  IconSearch,
  IconRate,
  IconLoading,
  IconNoShow,
  IconShowEye,
  IconPizza,
  IconShopping,
  IconCarrot,
  IconFigure,
  IconDownload,
  IconSales,
  IconDelete,
  IconComment,
  IconCancel,
  IconArrowBottom,
  IconPdf,
  IconFolder,
  IconPlus,
  IconMinus,
  IconLines,
  IconLinePart,
  IconPromo,
  IconBox,
  IconEdit,
  IconSendMessage,
  IconLocationMap2,
  IconGoogleFullColor,
  IconArrowLeft,
  IconQuestion
} from '../../../assets'

type IconMap = Record<string, FC<IconProps>>

interface IconPropsComponent {
  icon: string
  color?: string
  size?: number
  height?: string | number
  width?: string | number
}

export const Icons: IconMap = {
  MiniCheck: IconMiniCheck,
  IconQrCode,
  time: IconTime,
  home: IconHome,
  IconBuys,
  IconBoxes,
  IconMasterCard,
  IconDragHandle,
  IconVisa,
  IconInfo,
  IconMinus,
  IconDownload,
  IconLines,
  IconInvoice,
  IconPdf,
  IconFilter,
  IconInformationProduct,
  IconChart,
  IconCategorie,
  IconColombia,
  IconArrowRight,
  IconTicket,
  Google,
  IconLogout,
  IconDost,
  IconMessageMain,
  IconCircleNumber,
  IconWallet,
  IconUser,
  IconHorario,
  IconStore,
  IconLogo,
  IconMiniCheck,
  IconArrowTop,
  IconSearch,
  IconRate,
  IconLoading,
  IconNoShow,
  IconShowEye,
  IconPizza,
  IconNotification,
  IconShopping,
  IconCarrot,
  IconFigure,
  IconDelete,
  IconSales,
  IconStrokeLogo,
  IconComment,
  IconCancel,
  IconArrowBottom,
  IconPlus,
  IconLinePart,
  IconFolder,
  IconPromo,
  IconBox,
  IconEdit,
  IconSendMessage,
  IconLocationMap2,
  IconClose,
  IconGoogleFullColor,
  IconArrowLeft,
  IconQuestion
}

const GetIcon = (key: string): FC<IconProps> | null => {
  const Icono = Icons[key]
  return Icono ?? null
}

export const Icon: React.FC<IconPropsComponent> = ({
  icon,
  size,
  width,
  height,
  color
}: IconPropsComponent) => {
  const Icono = GetIcon(icon)
  if (icon === 'none') return null
  if (Icono === undefined || Icono === null) {
    return <div>No se encontró el ícono</div>
  }
  return (
    <Icono size={size ?? 24} color={color} width={width} height={height} />
  )
}
