'use client'

// main styles
import './stories/assets/public/styles.css'
import './stories/assets/public/global.css'

// swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// calendar
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'

// gridstack styles
import 'gridstack/dist/gridstack.css'
import 'gridstack/dist/gridstack.min.css'

// styles grid layout
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export * from 'react-grid-layout'

// UI components
export * from './stories/atoms'
export * from './stories/molecules'
export * from './stories/organisms'
export * from './stories/templates'
export * from './stories/skeletons'
export * from './utils'
export * from './stories/pages'
export * from './assets'
export * from './hooks'

// dev tools
export * from 'framer-motion'
export * from '@dnd-kit/core'

// colors choices
export * from './scripts/tokens/choices'
export { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
export type { DropResult } from 'react-beautiful-dnd'
export type { GridStackOptions, GridStackWidget } from 'gridstack'
export { GridStack } from 'gridstack'

export const ROUTES = Object.freeze({
  index: '/',
  home: '/home',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/profile',
  categories: '/categories',
  configuration: '/configuration',
  orders: '/orders',
  products: '/products',
  notFound: '/404',
  serverError: '/500',
  // NO LAYOUT
  'verify-email': '/verify-email',
  'forgot-password': '/forgot-password',
  'reset-password': '/reset-password',
  merchant: '/merchant',
  login: '/login'

})
