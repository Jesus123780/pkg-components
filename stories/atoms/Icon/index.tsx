import React, { FC } from "react";

import {
  IconProps,
  IconMiniCheck,
  IconLogoCMF,
  IconQrCode,
  IconLogoCMFBlue,
  IconClose,
  IconMainLogo,
  IconStrokeLogo,
} from "../../assets/public/Icons";
import { IconTime } from "../../../assets";

interface IconMap {
  [key: string]: FC<IconProps>;
}

interface IconPropsComponent {
  icon: string;
  color?: string;
  size?: number;
  height?: string | number;
  width?: string | number;
}

const Icons: IconMap = {
  MiniCheck: IconMiniCheck,
  LogoCMF: IconLogoCMF,
  IconQrCode: IconQrCode,
  IconLogoCMFBlue: IconLogoCMFBlue,
  IconClose: IconClose,
  logo: IconMainLogo,
  time: IconTime,
  IconStrokeLogo: IconStrokeLogo,
};

const GetIcon = (key: string): FC<IconProps> | null => {
  const Icono = Icons[key];
  return Icono || null;
};

export const Icon = ({ icon, size, width, height, color }: IconPropsComponent) => {
  const Icono = GetIcon(icon);
  if (!Icono) {
    return <div>No se encontró el ícono</div>;
  }
  return <Icono size={size || 24} color={color} width={width} height={height} />
};
