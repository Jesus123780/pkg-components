import React, { FC } from "react"

import {
  IconProps,
  IconMiniCheck,
  IconQrCode,
  IconClose,
  IconStrokeLogo,
} from "../../assets/public/Icons"
import {
  Google,
  IconArrowRight,
  IconBuys,
  IconCategorie,
  IconChart,
  IconColombia,
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
  IconUser,
  IconHorario,
  IconLogo,
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
  IconSales,
  IconDelete,
  IconComment,
  IconCancel,
  IconArrowBottom,
  IconFolder,
  IconPlus,
  IconLinePart,
  IconPromo,
  IconEdit,
  IconSendMessage,
  IconLocationMap2,
  IconGoogleFullColor,
  IconArrowLeft,
  IconQuestion,
} from "../../../assets"

interface IconMap {
  [key: string]: FC<IconProps>
}

interface IconPropsComponent {
  icon: string
  color?: string
  size?: number
  height?: string | number
  width?: string | number
}

export const Icons: IconMap = {
  MiniCheck: IconMiniCheck,
  IconQrCode: IconQrCode,
  time: IconTime,
  home: IconHome,
  IconBuys: IconBuys,
  IconInfo: IconInfo,
  IconInformationProduct: IconInformationProduct,
  IconChart: IconChart,
  IconCategorie: IconCategorie,
  IconColombia: IconColombia,
  IconArrowRight: IconArrowRight,
  IconTicket: IconTicket,
  Google: Google,
  IconLogout: IconLogout,
  IconDost: IconDost,
  IconMessageMain: IconMessageMain,
  IconWallet: IconWallet,
  IconUser: IconUser,
  IconHorario: IconHorario,
  IconStore: IconStore,
  IconLogo: IconLogo,
  IconMiniCheck: IconMiniCheck,
  IconArrowTop: IconArrowTop,
  IconSearch: IconSearch,
  IconRate: IconRate,
  IconLoading: IconLoading,
  IconNoShow: IconNoShow,
  IconShowEye: IconShowEye,
  IconPizza: IconPizza,
  IconNotification: IconNotification,
  IconShopping: IconShopping,
  IconCarrot: IconCarrot,
  IconFigure: IconFigure,
  IconDelete: IconDelete,
  IconSales: IconSales,
  IconStrokeLogo: IconStrokeLogo,
  IconComment: IconComment,
  IconCancel: IconCancel,
  IconArrowBottom: IconArrowBottom,
  IconPlus: IconPlus,
  IconLinePart: IconLinePart,
  IconFolder: IconFolder,
  IconPromo: IconPromo,
  IconEdit: IconEdit,
  IconSendMessage: IconSendMessage,
  IconLocationMap2: IconLocationMap2,
  IconClose: IconClose,
  IconGoogleFullColor: IconGoogleFullColor,
  IconArrowLeft: IconArrowLeft,
  IconQuestion: IconQuestion,
}

const GetIcon = (key: string): FC<IconProps> | null => {
  const Icono = Icons[key]
  return Icono || null
}

export const Icon = ({
  icon,
  size,
  width,
  height,
  color,
}: IconPropsComponent) => {
  const Icono = GetIcon(icon)
  if (!Icono) {
    return <div>No se encontró el ícono</div>
  }
  return (
    <Icono size={size || 24} color={color} width={width} height={height} />
  )
}
