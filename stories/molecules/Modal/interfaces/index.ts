
export type ModalProps = {
  show?: boolean
  state?: boolean
  bgColor?: string
  zIndex?: string | number
  size?: string
  height?: string
  padding?: string
  animationBackdrop?: boolean
  borderRadius?: string
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type WrapperProps = {
  animationBackdrop?: boolean
}

export type ModalHeaderProps = {
  headerColor?: string
}

export type ModalBodyProps = {
  display?: string
  height?: string
  padding?: string
  borderRadius?: string
  backgroundColor?: string
}

export type BtnCloseProps = {
  fixed?: boolean
}

export type ModalFooterProps = {
  backgroundColor?: string
  justifyButtons?: 'end' | 'center' | 'space-between' | 'start-end' | 'start-center' | 'start-space-between' | 'end-center' | 'end-space-between' | 'center-space-between'
}

export type BtnConfirmProps = {
  padding?: string
  border?: boolean
  height?: string
  bgColor?: string
}

export type BtnCancelProps = {
  padding?: string
  border?: boolean
  height?: string
  bgColor?: string
}
