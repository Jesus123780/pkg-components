export interface NewSelectProps {
  accessor?: string
  action?: boolean
  beforeLabel?: string
  border?: any
  disabled?: boolean
  error?: boolean
  fullName?: any
  heightBody?: any
  icon?: boolean
  id?: string
  loading?: boolean
  margin?: string
  minWidth?: string
  name?: string
  noLabel?: boolean
  optionName?: string
  options?: any[]
  overLine?: boolean
  padding?: string
  required?: boolean
  search?: boolean
  sideLabel?: string
  title?: string
  topTitle?: string
  value?: string
  width?: string
  handleClickAction?: () => void
  onChange?: (e: { target: { name: string, value: any } }) => void
}
