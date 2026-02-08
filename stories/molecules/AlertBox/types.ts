export interface AlertContentProps {
  err: {
    color?: string
    duration?: number
    message: string
  }
  closed: boolean
}

export interface ContainerToastProps {
  error?: boolean
  closed?: string | true | undefined
  color?: string
  duration?: number
  message: string
}
