'use client'

import { type FC } from 'react'

import {
  type IconProps,
  IconMiniCheck,
  IconQrCode,
  IconClose,
  IconStrokeLogo,
  IconDragHandle,
  IconUpTrend
} from '../../assets/public/Icons'
import {
  Google,
  IconCopy,
  IconArrowRight,
  IconCategorie,
  IconExcel,
  IconInventory,
  IconBuys,
  IconInvoice,
  IconCalendar,
  IconChart,
  IconColombia,
  IconCircleNumber,
  IconFileUpload,
  IconFilter,
  IconConfig,
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
  IconChair,
  IconSendMessage,
  IconLocationMap2,
  IconGoogleFullColor,
  IconArrowLeft,
  IconQuestion,
  IconStar,
  IconGoal,
  IconVisaSimple,
  IconMasterCardSimple,
  IconDollar,
  IconTransfer,
  IconDrink,
  IconSandwich,
  IconLunch,
  IconDonut,
  IconPlatter,
  IconEgg,
  IconPancake,
  IconPotate,
  IconBread,
  IconNoodles,
  IconDinner,
  IconSoup,
  IconUpRightArrow,
  IconDownRightArrow,
  IconAside,
  IconPlusUser,
  IconHistory,
  IconListBullet,
  IconGrid,
  IconTag,
  IconSimpleCalendar,
  IconPrint
} from '../../../assets'

type IconMap = Record<string, FC<IconProps>>

interface IconPropsComponent {
  icon: IconMap | string
  color?: string
  size?: number
  height?: string | number
  width?: string | number
  style?: React.CSSProperties
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
  IconVisaSimple,
  IconExcel,
  IconChair,
  IconFilter,
  IconConfig,
  IconInformationProduct,
  IconSearch,
  IconChart,
  IconFileUpload,
  IconCategorie,
  IconColombia,
  IconArrowRight,
  IconTicket,
  Google,
  IconLogout,
  IconCopy,
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
  IconCalendar,
  IconComment,
  IconMasterCardSimple,
  IconTransfer,
  IconCancel,
  IconDollar,
  IconArrowBottom,
  IconPlus,
  IconLinePart,
  IconDonut,
  IconFolder,
  IconPromo,
  IconBox,
  IconEdit,
  IconDrink,
  IconPlatter,
  IconEgg,
  IconPancake,
  IconSendMessage,
  IconUpTrend,
  IconInventory,
  IconLocationMap2,
  IconPlusUser,
  IconClose,
  IconStar,
  IconSandwich,
  IconPotate,
  IconBread,
  IconNoodles,
  IconLunch,
  IconSoup,
  IconAside,
  IconDinner,
  IconGoogleFullColor,
  IconArrowLeft,
  IconUpRightArrow,
  IconDownRightArrow,
  IconQuestion,
  IconHistory,
  IconListBullet,
  IconGrid,
  IconTag,
  IconPrint,
  IconGoal,
  IconSimpleCalendar
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
  color,
  style
}: IconPropsComponent) => {
  const Icono = GetIcon(icon)
  if (icon === 'none') return null
  if (Icono === undefined || Icono === null) {
    return <div>No se encontró el ícono</div>
  }
  return (
    <Icono
      size={size ?? 24}
      color={color}
      width={width}
      height={height}
      style={{ cursor: 'pointer', ...style }}
    />
  )
}
