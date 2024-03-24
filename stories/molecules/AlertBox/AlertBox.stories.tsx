import React from 'react'
import { AlertBox } from './index'

export default {
  title: 'molecules/AlertBox',
  component: AlertBox
}

const error = {
  color: 'red',
  duration: 5000,
  message: 'This is an error message'
}

export const Default: React.FC = () => { return <AlertBox err={error} /> }
