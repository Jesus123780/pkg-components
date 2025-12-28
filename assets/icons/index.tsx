'use-client'

import PropTypes from 'prop-types'
import React from 'react'
import { type IconProps } from '../../stories/assets/public/Icons'
import { getGlobalStyle } from '../../helpers'

export const IconTransfer: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      viewBox="0 0 32 32"
      width={size ?? 800}
      height={size ?? 800}
      fill={color ?? getGlobalStyle('--color-icons-black')}
    >
      <path d="m14.998 24.994 2 .004a1 1 0 0 0 .004-2l-2-.004a1.001 1.001 0 0 0-.004 2Z" />
      <path d="M9 7.065h13.996v11.92l-7.984-.006a1 1 0 0 0-.001 2l7.985.006v4.957a.997.997 0 0 1-1 1H15a1 1 0 0 0 0 2h6.996a3 3 0 0 0 3-3V4.023a3 3 0 0 0-3-3H10a3 3 0 0 0-3 3V12a1 1 0 0 0 2 0V7.065Zm13.996-2V4.023a1 1 0 0 0-1-1H10c-.552.001-1 .448-1 1v1.042h13.996Z" />
      <path d="M6.99 17.006a3.001 3.001 0 0 0 0 6h2a1 1 0 0 1 0 2h-3a1 1 0 0 0 0 2H7v1a1 1 0 0 0 2 0v-1a3 3 0 0 0-.01-6h-2a1 1 0 0 1 0-2h3a1 1 0 0 0 0-2h-1v-1.049a1 1 0 0 0-2 0v1.049Z" />
    </svg>
  )
}
export const IconDollar: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Capa_1"
      x={0}
      y={0}
      viewBox="0 0 48 48"
      width={size ?? 800}
      height={size ?? 800}
    >
      <style>{".st2{fill:#4da34d}"}</style>
      <path
        d="m35.2 29.4-28.8-14c-.5-.3-.7-.9-.4-1.4L12.6.5c.2-.5.8-.7 1.3-.5l28.7 14.1c.5.2.7.8.5 1.3L36.5 29c-.2.5-.8.7-1.3.4z"
        style={{
          fill: "#307730",
        }}
      />
      <path
        d="M38.7 30.9 3.2 17.2c-.5-.2-.8-.8-.6-1.3l4-10.3c.2-.5.8-.8 1.3-.6l35.4 13.7c.5.2.8.8.6 1.3l-4 10.3c-.1.6-.7.8-1.2.6z"
        style={{
          fill: "#3f8e3f",
        }}
      />
      <path
        d="M46 43H2c-.6 0-1-.4-1-1V14c0-.6.4-1 1-1h44c.6 0 1 .4 1 1v28c0 .6-.4 1-1 1z"
        className="st2"
      />
      <path
        d="M38 16H10c0 3.3-2.7 6-6 6v12c3.3 0 6 2.7 6 6h28c0-3.3 2.7-6 6-6V22c-3.3 0-6-2.7-6-6z"
        style={{
          fill: "#9edb9e",
        }}
      />
      <circle cx={24} cy={28} r={7} className="st2" />
    </svg>
  )
}
export const IconMasterCardSimple: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size ?? 800}
      height={size ?? 800}
    >
      <g fill='none' fillRule='evenodd'>
        <circle cx={7} cy={12} r={7} fill='#EA001B' />
        <circle cx={17} cy={12} r={7} fill='#FFA200' fillOpacity={0.8} />
      </g>
    </svg>
  )
}
export const IconVisaSimple: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      viewBox='0 -140 780 780'
      width={size ?? 800}
      height={size ?? 800}
    >
      <path
        fill='#0E4595'
        d='m293.2 348.73 33.359-195.76h53.358l-33.384 195.76H293.2zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v.003zm-363.3-126.41-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-.063 84.004-195.39-56.524-.001'
      />
      <path
        fill='#F2AE14'
        d='M146.92 152.96H60.879l-.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528'
      />
    </svg>
  )
}
export const IconChair: React.FC<IconProps> = ({
  size,
  color = getGlobalStyle('--color-icons-black')
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 800}
    height={size ?? 800}
    viewBox='0 0 24 24'
  >
    <defs>
      <style>
        {
          `.cls-1{fill:none;stroke:${color};stroke-miterlimit:10;stroke-width:1.91px}`
        }
      </style>
    </defs>
    <path
      d='M18.37 9.18a2 2 0 0 0-1.59 2A2.76 2.76 0 0 1 14 13.93h-4a2.76 2.76 0 0 1-2.76-2.76 2 2 0 0 0-1.59-2 1.91 1.91 0 0 0-2.24 1.89 6.7 6.7 0 0 0 6.7 6.69h3.82a6.7 6.7 0 0 0 6.7-6.69 1.91 1.91 0 0 0-2.26-1.88Z'
      className='cls-1'
    />
    <path
      d='M6.26 9.42V7.24a5.74 5.74 0 1 1 11.48 0v2.18M6.26 23.5l.96-6.7M16.78 16.8l.96 6.7'
      className='cls-1'
    />
  </svg>
)

export const IconCalendar: React.FC<IconProps> = ({
  size,
  color
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 20}
    height={size ?? 20}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      stroke={color ?? getGlobalStyle('--color-icons-black')}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 9h18M7 3v2m10-2v2M6 13h2m-2 4h2m3-4h2m-2 4h2m3-4h2m-2 4h2M6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21Z'
    />
  </svg>
)

export const IconExcel: React.FC<IconProps> = ({
  size
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 800}
    height={size ?? 800}
    viewBox='0 0 32 32'
  >
    <defs>
      <linearGradient
        id='a'
        x1={4.494}
        x2={13.832}
        y1={-2092.086}
        y2={-2075.914}
        gradientTransform='translate(0 2100)'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0} stopColor='#18884f' />
        <stop offset={0.5} stopColor='#117e43' />
        <stop offset={1} stopColor='#0b6631' />
      </linearGradient>
    </defs>
    <title>{'file_type_excel'}</title>
    <path
      d='M19.581 15.35 8.512 13.4v14.409A1.192 1.192 0 0 0 9.705 29h19.1A1.192 1.192 0 0 0 30 27.809V22.5Z'
      style={{
        fill: '#185c37'
      }}
    />
    <path
      d='M19.581 3H9.705a1.192 1.192 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z'
      style={{
        fill: '#21a366'
      }}
    />
    <path
      d='M8.512 9.5h11.069V16H8.512Z'
      style={{
        fill: '#107c41'
      }}
    />
    <path
      d='M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2Z'
      style={{
        opacity: 0.10000000149011612,
        isolation: 'isolate'
      }}
    />
    <path
      d='M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z'
      style={{
        opacity: 0.20000000298023224,
        isolation: 'isolate'
      }}
    />
    <path
      d='M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z'
      style={{
        opacity: 0.20000000298023224,
        isolation: 'isolate'
      }}
    />
    <path
      d='M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z'
      style={{
        opacity: 0.20000000298023224,
        isolation: 'isolate'
      }}
    />
    <path
      d='M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.192 1.192 0 0 1 2 21.959V10.041A1.192 1.192 0 0 1 3.194 8.85Z'
      style={{
        fill: 'url(#a)'
      }}
    />
    <path
      d='m5.7 19.873 2.511-3.884-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017c.082-.188.169-.369.26-.546l1.342-2.447h1.7l-2.359 3.84 2.419 3.905h-1.809l-1.45-2.711A2.355 2.355 0 0 1 9.2 16.8h-.024a1.688 1.688 0 0 1-.168.351l-1.493 2.722Z'
      style={{
        fill: '#fff'
      }}
    />
    <path
      d='M28.806 3h-9.225v6.5H30V4.191A1.192 1.192 0 0 0 28.806 3Z'
      style={{
        fill: '#33c481'
      }}
    />
    <path
      d='M19.581 16H30v6.5H19.581Z'
      style={{
        fill: '#107c41'
      }}
    />
  </svg>
)

/**
 * IconBuys component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */
export const IconBuys: React.FC<IconProps> = ({
  style = {},
  size,
  color = 'var(--color-icons-black)',
  ...props
}) => {
  return (
    <svg
      className='icon'
      height={size ?? 800}
      viewBox='0 0 1024 1024'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      style={{ ...style, color }}
    >
      <path
        d='M687.7 833.8h-76.8c-16.6 0-30-13.4-30-30s13.4-30 30-30h76.8c16.6 0 30 13.4 30 30s-13.4 30-30 30zm-207 0H136.8c-16.6 0-30-13.4-30-30s13.4-30 30-30h343.9c16.6 0 30 13.4 30 30s-13.4 30-30 30z'
        fill={color ?? '#3C9'}
      />
      <path
        d='M880.8 931H207.9c-25.3 0-45.9-20.7-45.9-45.9 0-25.3 20.7-45.9 45.9-45.9h672.9c25.3 0 45.9 20.7 45.9 45.9S906 931 880.8 931z'
        fill={color ?? '#FFB89A'}
      />
      <path
        d='M703 122.7c20.9 0 40.6 8.2 55.5 23.2 14.9 14.9 23.2 34.7 23.2 55.5v2.8l.3 2.8 57.7 611.8c-.6 20-8.8 38.7-23.1 53.1-14.9 14.9-34.7 23.2-55.5 23.2H236c-20.9 0-40.6-8.2-55.5-23.2-14.4-14.4-22.6-33.2-23.1-53.2l54.7-612 .2-2.7v-2.7c0-20.9 8.2-40.6 23.2-55.5 14.9-14.9 34.7-23.2 55.5-23.2h412m0-59.9H291c-76.3 0-138.7 62.4-138.7 138.7l-55 615c0 76.3 62.4 138.7 138.7 138.7h525c76.3 0 138.7-62.4 138.7-138.7l-58-615c0-76.3-62.4-138.7-138.7-138.7z'
        fill={color ?? '#45484C'}
      />
      <path
        d='M712.6 228.8c0-24.9-20.1-45-45-45s-45 20.1-45 45c0 13.5 6 25.6 15.4 33.9-.3 1.6-.4 3.3-.4 5v95.9c0 23.5-9.2 45.7-26 62.5-16.8 16.8-39 26-62.5 26h-88.5c-23.5 0-45.7-9.2-62.5-26-16.8-16.8-26-39-26-62.5v-95.9c0-1.7-.1-3.4-.4-5 9.4-8.2 15.4-20.4 15.4-33.9 0-24.9-20.1-45-45-45s-45 20.1-45 45c0 13.5 6 25.6 15.4 33.9-.3 1.6-.4 3.3-.4 5v95.9c0 81.9 66.6 148.6 148.6 148.6h88.5c81.9 0 148.6-66.6 148.6-148.6v-95.9c0-1.7-.1-3.4-.4-5 9.3-8.3 15.2-20.4 15.2-33.9z'
        fill={color ?? '#45484C'}
      />
    </svg>
  )
}

IconBuys.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}

/**
 * IconTime component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */
export const IconTime: React.FC<IconProps> = ({ style = {}, size, color, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size ?? 800}
      viewBox='0 0 24 24'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      style={{ ...style, color }}
    >
      <path
        clipRule='evenodd'
        d='M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12ZM12 7.25a.75.75 0 0 1 .75.75v3.69l2.28 2.28a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V8a.75.75 0 0 1 .75-.75Z'
        fill={color ?? '#1C274C'}
        fillRule='evenodd'
      />
    </svg>
  )
}

IconTime.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}

/**
 * iconHome component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */
export const IconHome: React.FC<IconProps> = ({ style = {}, size, color, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size ?? 800}
      viewBox='0 0 24 24'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      style={{ ...style, color }}
    >
      <path
        d='M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1'
        stroke={color ?? '#1C274C'}
        strokeLinecap='round'
        strokeWidth={1.5}
      />
      <path
        d='M22 12.204v1.521c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725v-1.521c0-2.289 0-3.433.52-4.381.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715'
        stroke={color ?? '#1C274C'}
        strokeLinecap='round'
        strokeWidth={1.5}
      />
    </svg>
  )
}

export const IconInfo: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 48 48"
      width={size ?? 800}
      height={size ?? 800}
      style={{ ...style, color }}
      fill={color ?? getGlobalStyle('--color-icons-black')}
    >
      <path d="M23 37h2V18h-2v19zm1-37C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm0 46C11.869 46 2 36.131 2 24S11.869 2 24 2s22 9.869 22 22-9.869 22-22 22zm0-36c-.857 0-2 1.209-2 2 0 .792 1.143 2 2 2s2-1.146 2-2c0-.854-1.143-2-2-2z" />
    </svg>
  )
}

IconInfo.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

/**
 * IconInformationProduct component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */

export const IconInformationProduct: React.FC<IconProps> = ({
  style = {},
  size,
  color,
}: IconProps) => {
  return (
    <svg
      className='icon'
      height={size ?? 800}
      viewBox='0 0 1024 1024'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      style={{ ...style, color }}
    >
      <path
        d='m533 1024-147.7-84.8-136.4 78.3h-11.3c-17.3 0-34.2-3.4-50.1-10.1-15.3-6.5-29.1-15.7-40.8-27.6-11.7-11.7-21-25.5-27.5-40.8-6.7-15.9-10.1-32.7-10.1-50.1V128.5c0-17.4 3.4-34.2 10.1-50.1 6.5-15.3 15.8-29.1 27.6-40.8 11.7-11.8 25.5-21 40.8-27.5C203.3 3.4 220.2 0 237.5 0h590.9c17.3 0 34.2 3.4 50.1 10.1 15.3 6.5 29.1 15.7 40.8 27.6 11.7 11.7 21 25.5 27.5 40.8 6.7 15.9 10.1 32.7 10.1 50.1V889c0 17.4-3.4 34.2-10.1 50.1-6.5 15.3-15.8 29.1-27.6 40.8-11.7 11.8-25.5 21-40.8 27.5-15.8 6.7-32.7 10.1-50 10.1h-11.3l-136.4-78.3L533 1024zm147.7-182.6 157.2 90.3c2.5-.6 5-1.4 7.5-2.4 5.2-2.2 9.9-5.4 13.9-9.4 4.1-4.1 7.2-8.7 9.4-14 2.3-5.3 3.4-11.1 3.4-17V128.5c0-5.9-1.1-11.7-3.4-17-2.2-5.2-5.4-9.9-9.4-13.9-4.1-4.1-8.7-7.2-13.9-9.4-5.4-2.3-11.1-3.4-17-3.4H237.5c-5.9 0-11.6 1.1-17 3.4-5.2 2.2-9.9 5.4-13.9 9.4-4.1 4.1-7.2 8.7-9.4 14-2.3 5.3-3.4 11.1-3.4 17V889c0 5.9 1.1 11.7 3.4 17 2.2 5.2 5.4 9.9 9.4 13.9 4.1 4.1 8.7 7.2 13.9 9.4 2.4 1 4.9 1.8 7.5 2.4l157.2-90.3L533 926.2l147.7-84.8z'
        fill={color ?? '#3688FF'}
      />
      <path
        d='M490.6 310.9H321c-23.4 0-42.4-19-42.4-42.4s19-42.4 42.4-42.4h169.6c23.4 0 42.4 19 42.4 42.4s-19 42.4-42.4 42.4zm211.9 176.7H321c-23.4 0-42.4-19-42.4-42.4s19-42.4 42.4-42.4h381.6c23.4 0 42.4 19 42.4 42.4-.1 23.4-19 42.4-42.5 42.4z'
        fill={color ?? '#5F6379'}
      />
    </svg>
  )
}

IconInformationProduct.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.object
}

/**
 * IconChart component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */

export const IconChart: React.FC<IconProps> = ({ style = {}, size, color, ...props }) => {
  return (
    <svg
      height={size ?? 800}
      viewBox='0 0 24 24'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      style={{ color }}
      stroke={color}
    >
      <defs>
        <style>
          {
            '.chart{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;fill-rule:evenodd}'
          }
        </style>
      </defs>
      <path className='chart' d='M12 2a10 10 0 1 0 10 10H12Z' />
      <path className='chart' d='M15 9h6.54A10.022 10.022 0 0 0 15 2.46Z' />
    </svg>
  )
}

/**
 * IconCategorie component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */

export const IconCategorie: React.FC<IconProps> = ({
  size,
  color = 'var(--color-icons-black)'
}) => {
  return (
    <svg
      fill='none'
      height={size ?? 800}
      viewBox='0 0 24 24'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      style={{ color }}
    >
      <path
        d='M4 7.657c0-.818 0-1.226.152-1.594.152-.367.442-.657 1.02-1.235l.656-.656c.578-.578.868-.868 1.235-1.02C7.431 3 7.84 3 8.657 3h6.686c.818 0 1.226 0 1.594.152.367.152.656.442 1.235 1.02l.656.656c.579.578.867.868 1.02 1.235.152.368.152.776.152 1.594V17c0 1.886 0 2.828-.586 3.414C18.828 21 17.886 21 16 21H8c-1.886 0-2.828 0-3.414-.586C4 19.828 4 18.886 4 17V7.657Z'
        stroke={color ?? '#33363F'}
        strokeWidth={2}
      />
      <path
        d='M4 7h16M9 11a3 3 0 0 0 6 0'
        stroke={color ?? '#33363F'}
        strokeLinecap='round'
        strokeWidth={2}
      />
    </svg>
  )
}

IconCategorie.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}

/**
 * IconStore component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */

export const IconStore: React.FC<IconProps> = ({ style = {}, size, color }) => {
  return (
    <svg
      fill='none'
      height={size ?? 800}
      stroke={color}
      strokeWidth={3}
      viewBox='0 0 64 64'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
      style={style}
    >
      <path d='M52 27.18v25.58a2.92 2.92 0 0 1-3 2.84H15a2.92 2.92 0 0 1-3-2.84V27.17' />
      <path d='M26.26 55.52V38.45h11.58v17.07M8.44 19.18s-1.1 7.76 6.45 8.94a7.17 7.17 0 0 0 6.1-2A7.43 7.43 0 0 0 32 26a7.4 7.4 0 0 0 5 2.49 11.82 11.82 0 0 0 5.9-2.15 6.66 6.66 0 0 0 4.67 2.15 8 8 0 0 0 7.93-9.3L50.78 9.05a1 1 0 0 0-.94-.65H14a1 1 0 0 0-.94.66ZM8.44 19.18h47.1M21.04 19.18V8.4M32.05 19.18V8.4M43.01 19.18V8.4' />
    </svg>
  )
}

IconStore.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}

export const IconColombia: React.FC<IconProps> = ({ style = {}, size }: IconProps) => {
  return (
    <svg
      height={size}
      id='Capa_1'
      style={style}
      version='1.1'
      viewBox='0 0 450 300'
      width={size}
      x='0px'
      y='0px'
    >
      <rect fill='#CE1126' height='300' width='450' />
      <rect fill='#003893' height='225' width='450' />
      <rect fill='#FCD116' height='150' width='450' />
    </svg>
  )
}

export const IconCircleNumber: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='Capa_1'
      data-name='Capa 1'
      width={size}
      height={size}

      viewBox='0 0 55.98 57.38'
    >
      <defs>
        <style>{'.cls-1{fill:#f6110c}'}</style>
      </defs>
      <circle cx={35.24} cy={36.64} r={20.74} className='cls-1' />
      <path
        d='M31.61 12.42V2.49a2.5 2.5 0 1 0-5 0v9.91a2.5 2.5 0 1 0 5 0ZM13.97 20.49 2.5 19.34a2.51 2.51 0 0 0-2.5 2.5 2.57 2.57 0 0 0 2.5 2.5l11.47 1.15a2.51 2.51 0 0 0 2.5-2.5 2.57 2.57 0 0 0-2.5-2.5ZM20.94 14.07a44.2 44.2 0 0 0-9.56-6.53 2.5 2.5 0 1 0-2.52 4.31 41.73 41.73 0 0 1 4.66 2.73c.36.24.71.49 1.06.74l.52.38.32.24c.26.2 0 0-.12-.09.69.6 1.42 1.15 2.1 1.76a2.503 2.503 0 0 0 3.54-3.54Z'
        className='cls-1'
      />
      <text
        style={{
          fontSize: '18.78px',
          fill: '#fff',
          fontFamily: 'MicrosoftYaHei,Microsoft YaHei'
        }}
        transform='translate(30.37 43.26)'
      >
        {'1'}
      </text>
    </svg>

  )
}
IconColombia.propTypes = {
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconArrowRight: React.FC<IconProps> = ({
  size,
  color
}: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke={color}
        width={size}
        height={size}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='m10 7 5 5-5 5'
      />
    </svg>
  )
}

IconArrowRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any,
  style: PropTypes.object
}
/**
 * IconTicket component
 * @param {Object} props - Component props
 * @param {Object} props.style - Inline styles for the SVG
 * @param {number} props.size - Size of the SVG
 * @param {string} props.color - Color of the SVG
 * @param {Object} props... - Any other SVG attributes
 * @returns {JSX.Element} SVG icon
 */

export const IconTicket: React.FC<IconProps> = ({
  style = {},
  size,
  color
}: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      height={size ?? 800}
      width={size ?? 800}
      viewBox='0 0 20 20'
      style={{
        ...style,
        color
      }}
    >
      <path fill={color ?? 'var(--color-icons-black)'} d='m10.5 19.3-2.6-1.6-2.4 1.4h-.1c-.3 0-.6-.1-.9-.2-.3-.1-.5-.3-.7-.5-.2-.2-.4-.5-.5-.8s-.2-.6-.2-.9V2.6c0-.3.1-.6.2-.9.1-.3.3-.5.5-.8.2-.1.4-.3.7-.4s.6-.2.9-.2h10.3c.3 0 .6.1.9.2s.5.3.7.5.4.5.5.8.2.6.2.9v14.1c0 .3-.1.6-.2.9s-.3.5-.5.8c-.2.2-.4.4-.7.5-.3.1-.6.2-.9.2h-.2l-2.4-1.4-2.6 1.5zm2.9-2.9 3 1.8h.1c.1 0 .2-.1.3-.2.1-.1.1-.2.2-.3 0-.1.1-.2.1-.3V2.5c0-.1 0-.2-.1-.3 0-.1-.1-.2-.2-.3-.1-.1-.2-.1-.3-.2-.1 0-.2-.1-.3-.1H4.9c-.1 0-.2 0-.3.1-.1 0-.2.1-.3.2-.1.1-.1.2-.2.3 0 .1-.1.2-.1.3v14.9c0 .1 0 .2.1.3 0 .1.1.2.2.3.1.1.2.1.3.2h.1l3-1.8 2.8 1.7 2.9-1.7z' />
      <path fill={color ?? 'var(--color-icons-black)'} d='M9.6 6.1H6.3c-.5 0-.8-.3-.8-.6s.4-.6.8-.6h3.3c.5 0 .8.3.8.6s-.4.6-.8.6zm4.1 3.3H6.3c-.5 0-.8-.3-.8-.6s.4-.6.8-.6h7.5c.5 0 .8.3.8.6s-.4.6-.9.6z' />
    </svg>
  )
}

IconTicket.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.object
}

export const IconDost: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'></path>
    </svg>
  )
}

IconDost.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const Google: React.FC<IconProps> = ({ size, ...props }: IconProps) => {
  return (
    <svg
      height={`${size}px`}
      viewBox='0 0 300 100'
      width={`${size}px`}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'
        fill='#EA4335'
      />
      <path
        d='M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'
        fill='#FBBC05'
      />
      <path
        d='M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z'
        fill='#4285F4'
      />
      <path d='M225 3v65h-9.5V3h9.5z' fill='#34A853' />
      <path
        d='m262.02 54.48 7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98 19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z'
        fill='#EA4335'
      />
      <path
        d='M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z'
        fill='#4285F4'
      />
    </svg>
  )
}

Google.propTypes = {
  size: PropTypes.any
}

export const IconLogout: React.FC<IconProps> = ({ size, color }: IconProps) => {
  return (
    <svg
      height={size}
      version='1.1'
      viewBox='0 0 512 512'
      width={size}
    >
      <g>
        <g>
          <path
            d='M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15 c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724 c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262 C276.412,478.129,266.908,468.625,255.15,468.625z'
            fill={color}
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d='M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z'
            fill={color}
          />
        </g>
      </g>
    </svg>
  )
}

IconLogout.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any
}

export const IconMessageMain: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 28 28'
      width={size}
    >
      <path d='M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z'></path>
    </svg>
  )
}

IconMessageMain.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconNotification: React.FC<IconProps> = ({
  size,
  style = {},
  color = getGlobalStyle('--color-icons-black')
}: IconProps) => {
  return (
    <svg
      fill='none'
      height={size ?? 800}
      style={style}
      viewBox='0 0 24 24'
      width={size ?? 800}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 19.25a3 3 0 0 1-6 0M5.581 18.25a2 2 0 0 1-1.57-2.2l1-8.11a7 7 0 0 1 7-5.94v0a7 7 0 0 1 7 5.94l1 8.11a2 2 0 0 1-1.56 2.2 28.132 28.132 0 0 1-12.87 0v0Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
    </svg>
  )
}

IconNotification.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconWallet: React.FC<IconProps> = ({ style = {}, color, size }: IconProps) => {
  return (
    <svg height={size} style={style} viewBox='0 0 54.01 39.97' width={size}>
      <path
        d='M17.38,22.99c0,1.54-0.46,2.7-1.39,3.49s-2.15,1.18-3.65,1.18h-0.02l-0.33,2.61 c-1.09-0.04-1.64-0.1-1.64-0.16l0.31-2.57c-1.09-0.13-2.01-0.29-2.74-0.46L7.47,27l0.29-2.3c1.17,0.16,2.24,0.27,3.23,0.33 l0.49-3.85c-1.52-0.46-2.6-1.01-3.23-1.66c-0.63-0.65-0.95-1.53-0.95-2.66c0-1.46,0.44-2.55,1.33-3.26 c0.89-0.72,2.1-1.07,3.65-1.07h0.29l0.4-3.05h1.64l-0.4,3.19c0.91,0.09,1.76,0.21,2.52,0.35l0.38,0.09l-0.24,2.35 c-1.08-0.12-2.07-0.21-2.99-0.27l-0.44,3.56c1.53,0.49,2.58,1.02,3.13,1.6C17.1,20.93,17.38,21.81,17.38,22.99z M10.23,16.67 c0,0.35,0.11,0.64,0.33,0.86c0.22,0.22,0.65,0.45,1.28,0.69l0.38-3.08C10.9,15.2,10.23,15.71,10.23,16.67z M14.44,23.19 c0-0.35-0.1-0.64-0.3-0.87c-0.2-0.23-0.56-0.45-1.07-0.65l-0.42,3.39C13.84,24.92,14.44,24.3,14.44,23.19z'
        fill={color}
      />
      <path
        d='M38.53,20.14c0,1.77,1.44,3.22,3.22,3.22c1.77,0,3.22-1.44,3.22-3.22c0-1.77-1.44-3.22-3.22-3.22 C39.98,16.92,38.53,18.36,38.53,20.14z M41.75,18.48c0.91,0,1.66,0.74,1.66,1.66c0,0.91-0.74,1.66-1.66,1.66s-1.66-0.74-1.66-1.66 C40.09,19.22,40.84,18.48,41.75,18.48z'
        fill={color}
      />
      <path
        d='M54.01,13.79h-1.84V6.27v-1.1C52.17,2.32,49.85,0,47,0H5.17C2.32,0,0,2.32,0,5.17v1.1v27.89v0.63 c0,2.85,2.32,5.17,5.17,5.17H47c2.85,0,5.17-2.32,5.17-5.17v-0.63v-8.22h1.84V13.79z M1.54,5.17c0-2,1.63-3.64,3.63-3.64H47 c2,0,3.64,1.63,3.64,3.64v1.1H1.54V5.17z M50.63,34.79c0,2-1.63,3.64-3.64,3.64H5.17c-2,0-3.63-1.63-3.63-3.64v-0.63h49.1V34.79z  M50.63,32.63H1.54V7.81h49.1v5.97h-9.39c-3.35,0-6.08,2.73-6.08,6.08s2.73,6.08,6.08,6.08h9.39V32.63z M50.63,15.34v9.04h-9.39 c-2.49,0-4.52-2.03-4.52-4.52s2.03-4.52,4.52-4.52H50.63z M52.46,24.39h-0.29v-9.04h0.29V24.39z'
        fill={color}
      />
    </svg>
  )
}

IconWallet.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconUser: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 12.5C9 12.5 6.5 10 6.5 7S9 1.5 12 1.5 17.5 4 17.5 7 15 12.5 12 12.5zM12 3C9.8 3 8 4.8 8 7s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM17 15.5c1.4 0 2.5 1.1 2.5 2.5v2.5h-15V18c0-1.4 1.1-2.5 2.5-2.5h10m0-1.5H7c-2.2 0-4 1.8-4 4v4h18v-4c0-2.2-1.8-4-4-4z'></path>
    </svg>
  )
}

IconUser.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconHorario: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 23 23'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='11.5'
        cy='11.5'
        fill='none'
        r='10.5'
        stroke={color ?? '#5e5f5f'}
        strokeMiterlimit='10'
        strokeWidth='2px'
      />
      <polyline
        fill={color ?? '#5e5f5f'}
        points='11 7 11 12.57 15.69 12.57'
        stroke={color ?? '#5e5f5f'}
        strokeMiterlimit='10'
      />
    </svg>
  )
}

IconHorario.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconBoxes: React.FC<IconProps> = ({
  style = {},
  size,
  color,
  ...props
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={800}
    height={800}
    viewBox='0 0 32 32'
    {...props}
  >
    <path fill={color} d='M16 8h14v2H16zM16 22h14v2H16zM10 14H4a2.002 2.002 0 0 1-2-2V6a2.002 2.002 0 0 1 2-2h6a2.002 2.002 0 0 1 2 2v6a2.002 2.002 0 0 1-2 2ZM4 6v6h6.001L10 6ZM10 28H4a2.002 2.002 0 0 1-2-2v-6a2.002 2.002 0 0 1 2-2h6a2.002 2.002 0 0 1 2 2v6a2.002 2.002 0 0 1-2 2Zm-6-8v6h6.001L10 20Z' />
    <path
      d='M0 0h32v32H0z'
      data-name='&lt;Transparent Rectangle&gt;'
      style={{
        fill: 'none'
      }}
    />
  </svg>
)

export const IconLogo: React.FC<IconProps> = ({ color, size }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      id='Capa_1'
      data-name='Capa 1'
      viewBox='0 0 312.96 119.31'
      width={size}
      height={size}
    >
      <defs>
        <style>{`.cls-1{fill:${color};stroke-width:0}`}</style>
      </defs>
      <path
        d='M56.55 80.36c2.62 8.92 13.52 12.77 21.36 7.73 4.23-2.72 6.53-2.8 8.15-.29 1.7 2.64.52 5.38-3.41 7.88-8.58 5.48-20.41 4.47-28.09-2.41-8.03-7.19-10.25-18.65-5.46-28.22 4.77-9.54 15.26-14.56 25.91-12.41 10.16 2.05 17.92 10.85 18.64 21.12.33 4.68-1.15 6.24-5.99 6.25-10.08.03-20.16.03-30.24.05-.21 0-.42.13-.87.28Zm27.13-9.21c-1.06-5.67-6.93-10.05-13.34-10.11-6.66-.06-12.54 4.22-13.7 10.11h27.05ZM26.6 82.15c6.07-15.61 11.78-30.33 17.5-45.05.28-.73.54-1.47.86-2.19 1.06-2.42 2.97-3.4 5.45-2.68 2.73.78 3.7 2.91 3 5.53-.63 2.37-1.66 4.63-2.55 6.93C44.28 61.6 37.67 78.5 31.1 95.42c-.84 2.15-2.14 4.18-4.54 3.6-1.64-.39-3.65-1.93-4.26-3.46C14.8 76.85 7.46 58.07.3 39.22c-.63-1.66-.19-4.19.7-5.79.52-.94 3.2-1.5 4.41-1 1.41.58 2.69 2.32 3.3 3.85 4.69 11.76 9.2 23.59 13.77 35.39 1.24 3.21 2.52 6.41 4.13 10.49ZM106.47 56.02c15.55-10.04 35.72.89 34.81 20.28-.27 5.7-.01 11.43-.05 17.15-.03 3.75-1.77 5.84-4.64 5.73-2.76-.11-4.25-2.02-4.27-5.73-.04-6.17.02-12.33-.02-18.5-.05-8.12-5.66-14-13.21-13.91-7.48.08-12.74 5.79-12.77 13.9-.02 6.17.14 12.34-.11 18.49-.07 1.7-.95 3.75-2.16 4.9-.81.77-3.37.87-4.24.16-1.27-1.04-2.36-3.06-2.4-4.69-.22-9.52-.11-19.06-.11-28.58 0-2.24.03-4.48 0-6.73-.04-2.58.14-5.12 3.07-6.06 3.05-.99 4.82.83 6.1 3.59ZM189.81 83.03c3.84-9.18 7.33-17.53 10.83-25.87.35-.83.65-1.67 1.05-2.47 1.21-2.42 3.25-3.09 5.63-2.17 2.46.96 3.37 3.05 2.48 5.49-1.37 3.79-3 7.48-4.56 11.2-6.42 15.4-12.79 30.83-19.38 46.16-.69 1.61-2.5 3.36-4.13 3.8-3.34.9-5.66-2.87-4.18-6.62 2.02-5.1 4.34-10.09 6.24-15.23.55-1.48.63-3.52.05-4.96-4.23-10.61-8.7-21.13-13.07-31.68-1.85-4.47-1.41-6.99 1.35-8.15 2.92-1.23 5.03.27 6.95 4.87 3.45 8.27 6.91 16.52 10.72 25.62Z'
        className='cls-1'
      />
      <path
        d='M144.95 61.25c-4.49-.59-6.41-2.13-6.17-4.86.3-3.43 2.72-4.32 6.17-4.32 0-4.61-.02-9.16.01-13.72 0-1.11-.21-2.64.4-3.24 1.31-1.27 3.03-2.73 4.69-2.88 2.15-.19 3.66 1.6 3.72 3.94.11 4.03.06 8.07.07 12.1v3.6c3.87.87 9.48-1.31 9.46 4.72-.02 5.93-5.58 3.92-9.19 4.67 0 7.79-.21 15.49.1 23.18.14 3.37 2.63 5.3 6.07 5.71.67.08 1.34.11 2.01.19 2.77.33 4.31 1.86 4.18 4.68-.12 2.69-1.81 4.13-4.38 4.13-8.37 0-15.57-2.91-16.72-13.25-.62-5.54-.33-11.19-.42-16.79-.04-2.56 0-5.12 0-7.86ZM293.72 40.89c-.3 1.29-.49 2.97-1.07 4.5-7.8 20.55-15.61 41.11-23.54 61.61-3.08 7.98-8.84 10.4-16.79 7.37-12.76-4.86-25.51-9.75-38.25-14.65-7.99-3.07-10.76-8.75-7.79-16.64 7.74-20.58 15.49-41.15 23.6-61.59 1.11-2.81 3.85-5.57 6.56-7.03 8.77-4.77 17.84-8.99 26.85-13.29 6.07-2.9 15.16-.18 17.76 5.77 4.34 9.91 8.15 20.05 12.12 30.13.41 1.05.35 2.29.55 3.82ZM268.76 7.32c-3.85.02-7.31 3.49-7.35 7.38-.05 4.24 3.38 7.56 7.67 7.41 3.98-.13 7.31-3.61 7.18-7.48-.13-3.73-3.82-7.33-7.5-7.32ZM274.23 106.47c6.75-17.66 13.08-34.25 19.42-50.83.31-.03.61-.07.92-.1.53 2.6 1.13 5.19 1.58 7.8 1.66 9.67 3.28 19.35 4.9 29.03 1.14 6.81-.76 9.53-7.6 10.77-6.02 1.09-12.06 2.09-19.23 3.33ZM306.59 94.6c-1.95-11.39-3.89-22.77-5.83-34.14l1.23-.41c2.17 5.59 4.33 11.17 6.5 16.76 1.2 3.09 2.44 6.16 3.6 9.27 1.97 5.29.83 7.13-5.49 8.53Z'
        className='cls-1'
      />
      <path
        d='M268.76 7.32c3.67-.02 7.37 3.59 7.5 7.32.13 3.87-3.2 7.34-7.18 7.48-4.29.14-7.72-3.17-7.67-7.41.05-3.89 3.51-7.36 7.35-7.38Z'
        style={{
          fill: '#fff',
          strokeWidth: 0
        }}
      />
    </svg>
  )
}

IconLogo.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

IconHome.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconMiniCheck: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 17 14'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        clipRule='evenodd'
        d='M2.59 6.57A1 1 0 0 0 1.19 8l5.16 5.09L16.72 2.36A1 1 0 1 0 15.28.97l-8.96 9.28-3.73-3.68z'
        fillRule='evenodd'
      ></path>
    </svg>
  )
}

IconMiniCheck.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}
export const IconArrowTop = ({ size, style = {}, color, ...props }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      viewBox='0 0 330 330'
      height={size}
      style={style}
      width={size}
    >
      <path d='m325.606 229.393-150.004-150a14.997 14.997 0 0 0-21.213.001l-149.996 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.393 139.397 139.393A14.953 14.953 0 0 0 315 255a14.95 14.95 0 0 0 10.607-4.394c5.857-5.858 5.857-15.355-.001-21.213z' />
    </svg>
  )
}

export const IconArrowBottom = ({ style = {}, color, size }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      viewBox='0 0 330 330'
      color={color}
      height={size}
      width={size}
      style={style}
    >
      <path d='M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z' />
    </svg>
  )
}

IconArrowTop.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconSearch: React.FC<IconProps | any> = ({
  style = {},
  size,
  color
}: IconProps) => {
  return (
    <svg
      height={size}
      style={style}
      viewBox='0 0 16.39 16.23'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='6.91' cy='6.91' fill='none' r='6.41' stroke={color ?? getGlobalStyle('--color-icons-black')} />
      <rect
        fill='none'
        height='0.54'
        rx='0.22'
        stroke={color ?? getGlobalStyle('--color-icons-black')}
        strokeMiterlimit='10'
        transform='translate(45.89 33.02) rotate(42.94)'
        width='5.71'
        x='-39.59'
        y='7.49'
      />
    </svg>
  )
}

IconSearch.propTypes = {
  color: PropTypes.any,
  props: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconRate: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      height={size}
      style={style}
      viewBox='0 0 122.8 116.7'
      width={size}
      x='0px'
      y='0px'
    >
      <polygon
        fill={color}
        points='61.4,0 80.3,38.4 122.8,44.6 92.1,74.5 99.3,116.7 61.4,96.8 23.4,116.7 30.7,74.5 0,44.6 42.4,38.4 '
      />
    </svg>
  )
}

IconRate.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}
export const IconLoading: React.FC<IconProps> = ({ color, size, ...props }: IconProps) => {
  return (
    <svg
      {...props}
      fill={color}
      height={`${size}px`}
      viewBox='0 0 21 21'
      width={`${size}px`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        clipRule='evenodd'
        d='M14.549 20.1045C12.6396 20.8955 10.5384 21.1024 8.51131 20.6992C6.48421 20.296 4.62219 19.3007 3.16073 17.8393C1.69928 16.3778 0.704012 14.5158 0.300797 12.4887C-0.102419 10.4616 0.104527 8.36044 0.89546 6.45095C1.6864 4.54146 3.0258 2.9094 4.74429 1.76114C6.46279 0.612875 8.48319 -5.72205e-06 10.55 -5.72205e-06C11.1419 -5.72205e-06 11.6218 0.479855 11.6218 1.07179C11.6218 1.66372 11.1419 2.14358 10.55 2.14358C8.90715 2.14358 7.30119 2.63074 5.93521 3.54347C4.56923 4.45619 3.50457 5.75347 2.87588 7.27127C2.24719 8.78906 2.08269 10.4592 2.4032 12.0705C2.7237 13.6818 3.51481 15.1618 4.67648 16.3235C5.83815 17.4852 7.31821 18.2763 8.9295 18.5968C10.5408 18.9173 12.2109 18.7528 13.7287 18.1241C15.2465 17.4954 16.5438 16.4308 17.4565 15.0648C18.3692 13.6988 18.8564 12.0928 18.8564 10.45C18.8564 9.85806 19.3363 9.3782 19.9282 9.3782C20.5201 9.3782 21 9.85806 21 10.45C21 12.5168 20.3871 14.5372 19.2389 16.2557C18.0906 17.9742 16.4585 19.3136 14.549 20.1045Z'
        fill={color}
        fillRule='evenodd'
      />
    </svg>
  )
}

IconLoading.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any
}

export const IconNoShow: React.FC<IconProps> = ({ style = {}, size }: IconProps) => {
  return (
    <svg
      height={size}
      style={style}
      viewBox='0 0 512.001 512.001'
      width={size}
      x='0px'
      y='0px'
    >
      <path d='M316.332,195.662c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.944,0,15.083     c12.075,12.075,18.752,28.139,18.752,45.248c0,35.285-28.715,64-64,64c-17.109,0-33.173-6.656-45.248-18.752     c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.139-4.16,10.923,0,15.083c16.085,16.128,37.525,25.003,60.331,25.003     c47.061,0,85.333-38.272,85.333-85.333C341.334,233.187,332.46,211.747,316.332,195.662z' />{' '}
      <path d='M270.87,172.131c-4.843-0.853-9.792-1.472-14.869-1.472c-47.061,0-85.333,38.272-85.333,85.333     c0,5.077,0.619,10.027,1.493,14.869c0.917,5.163,5.419,8.811,10.475,8.811c0.619,0,1.237-0.043,1.877-0.171     c5.781-1.024,9.664-6.571,8.64-12.352c-0.661-3.627-1.152-7.317-1.152-11.157c0-35.285,28.715-64,64-64     c3.84,0,7.531,0.491,11.157,1.131c5.675,1.152,11.328-2.859,12.352-8.64C280.534,178.702,276.652,173.155,270.87,172.131z' />{' '}
      <path d='M509.462,249.102c-2.411-2.859-60.117-70.208-139.712-111.445c-5.163-2.709-11.669-0.661-14.379,4.587     c-2.709,5.227-0.661,11.669,4.587,14.379c61.312,31.744,110.293,81.28,127.04,99.371c-25.429,27.541-125.504,128-230.997,128     c-35.797,0-71.872-8.64-107.264-25.707c-5.248-2.581-11.669-0.341-14.229,4.971c-2.581,5.291-0.341,11.669,4.971,14.229     c38.293,18.496,77.504,27.84,116.523,27.84c131.435,0,248.555-136.619,253.483-142.443     C512.854,258.915,512.833,253.091,509.462,249.102z' />{' '}
      <path d='M325.996,118.947c-24.277-8.171-47.829-12.288-69.995-12.288c-131.435,0-248.555,136.619-253.483,142.443     c-3.115,3.669-3.371,9.003-0.597,12.992c1.472,2.112,36.736,52.181,97.856,92.779c1.813,1.216,3.84,1.792,5.888,1.792     c3.435,0,6.827-1.664,8.875-4.8c3.264-4.885,1.92-11.52-2.987-14.763c-44.885-29.845-75.605-65.877-87.104-80.533     c24.555-26.667,125.291-128.576,231.552-128.576c19.861,0,41.131,3.755,63.189,11.157c5.589,2.005,11.648-1.088,13.504-6.699     C334.572,126.862,331.585,120.825,325.996,118.947z' />{' '}
      <path d='M444.865,67.128c-4.16-4.16-10.923-4.16-15.083,0L67.116,429.795c-4.16,4.16-4.16,10.923,0,15.083 c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.115L444.865,82.211 C449.025,78.051,449.025,71.288,444.865,67.128z' />
    </svg>
  )
}

IconNoShow.propTypes = {
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconShowEye: React.FC<IconProps> = ({ style = {}, size }: IconProps) => {
  return (
    <svg height={size} style={style} viewBox='0 0 512 298.67' width={size}>
      <path
        d='M509.46,249.1c-2.41-2.86-60.11-70.21-139.71-111.44a10.67,10.67,0,1,0-9.79,19C421.27,188.37,470.25,237.9,487,256c-25.43,27.55-125.51,128-231,128-35.8,0-71.87-8.64-107.26-25.7a10.66,10.66,0,0,0-9.26,19.2C177.77,396,217,405.33,256,405.33c131.44,0,248.56-136.62,253.49-142.45A10.67,10.67,0,0,0,509.46,249.1Z'
        transform='translate(0 -106.66)'
      />
      <path
        d='M326,119c-24.28-8.17-47.83-12.29-70-12.29C124.57,106.66,7.45,243.28,2.52,249.1a10.66,10.66,0,0,0-.6,13c1.47,2.12,36.74,52.18,97.86,92.78a10.44,10.44,0,0,0,5.89,1.79,10.68,10.68,0,0,0,5.88-19.56c-44.88-29.84-75.6-65.88-87.1-80.53C49,229.9,149.74,128,256,128c19.86,0,41.13,3.76,63.19,11.16a10.52,10.52,0,0,0,13.5-6.7A10.64,10.64,0,0,0,326,119Z'
        transform='translate(0 -106.66)'
      />
      <ellipse
        cx='256'
        cy='149.08'
        fill='none'
        rx='85.33'
        ry='85.59'
        stroke='#000'
        strokeWidth='19px'
      />
    </svg>
  )
}

IconShowEye.propTypes = {
  size: PropTypes.any,
  style: PropTypes.object
}
export const IconPizza: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      fill='none'
      height={558}
      width={274}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M198.156 264.893c-1.897-17.783-16.96-31.64-35.262-31.64s-33.364 13.857-35.262 31.64h70.524Z'
        fill='#FB8A8A'
      />
      <path
        d='M198.156 264.893c-1.897-17.783-16.96-31.64-35.262-31.64s-33.364 13.857-35.262 31.64h70.524Z'
        fill='#F9CAC6'
      />
      <path
        d='M42.554 232.325a35.338 35.338 0 0 0 22.463 8.011c19.588 0 35.468-15.863 35.468-35.431a35.26 35.26 0 0 0-8.02-22.44l-49.911 49.86Z'
        fill='#FB8A8A'
      />
      <path
        d='M42.554 232.325a35.338 35.338 0 0 0 22.463 8.011c19.588 0 35.468-15.863 35.468-35.431a35.26 35.26 0 0 0-8.02-22.44l-49.911 49.86Z'
        fill='#F9CAC6'
      />
      <path
        d='m135.176 436.436 34.119 34.084c46.402-49.138 75.145-115.084 76.113-187.732h-48.244c-.913 57.554-22.78 111.673-61.988 153.648Z'
        fill='#FFF7F7'
      />
      <path
        d='M124.123 121.009C84.247 81.183 31.978 58.252-24 55.801v214.042l148.552-148.397c-.151-.143-.286-.294-.429-.437ZM189.581 282.787H-18.632l148.44 148.286c37.771-40.54 58.852-92.763 59.773-148.286Z'
        fill='#F9CAC6'
      />
      <path
        d='m19.535 260.926 138.722-138.577c17.15 19.092 30.649 40.69 40.153 64.264 9.528 23.621 14.792 48.598 15.682 74.313H19.535Zm-9.584 3.966h208.214c-.921-55.523-22.002-107.746-59.773-148.286L9.952 264.892Z'
        fill='#fff'
      />
      <path
        d='M99.056 282.785c1.898 17.783 16.961 31.64 35.262 31.64 18.302 0 33.365-13.857 35.263-31.64H99.057Z'
        fill='#FB8A8A'
        opacity={0.55}
      />
      <path
        d='M124.123 436.983c.143-.143.286-.294.429-.437L-24 288.149v214.042c55.978-2.451 108.248-25.382 148.123-65.208Z'
        fill='#F9CAC6'
      />
      <path
        d='M225.756 264.893H274c-.969-72.648-29.72-138.601-76.114-187.731l-34.119 34.083c39.201 41.975 61.068 96.095 61.989 153.648Z'
        fill='#F3B8B3'
        opacity={0.55}
      />
      <path
        d='M-23.841 152.021c19.588 0 35.468-15.864 35.468-35.432 0-19.567-15.88-35.431-35.468-35.431-.056 0-.103 0-.159.008v70.847c.056.008.103.008.159.008ZM44.317 385.617c0 19.568 15.88 35.431 35.468 35.431 8.21 0 15.761-2.792 21.772-7.471l-49.76-49.709a35.225 35.225 0 0 0-7.48 21.749ZM107.013 408.3a35.266 35.266 0 0 0 8.233-22.693c0-19.568-15.88-35.432-35.468-35.432A35.342 35.342 0 0 0 57.06 358.4l49.952 49.9ZM-24 369.388v70.522c17.984-1.713 32.054-16.847 32.054-35.265S-6.016 371.101-24 369.388ZM.964 215.225a35.19 35.19 0 0 0 7.686 22.003l49.816-49.765a35.34 35.34 0 0 0-22.026-7.678c-19.596.008-35.476 15.872-35.476 35.44Z'
        fill='#FB8A8A'
        opacity={0.55}
      />
      <path
        d='M-24 48.21c58.002 2.459 112.186 26.175 153.49 67.437.143.143.286.293.429.436l34.103-34.067C115.603 33.449 49.406 2.586-24 0v48.21ZM129.49 442.345C88.186 483.607 34.002 507.323-24 509.782V558c73.406-2.586 139.603-33.449 188.014-82.024l-34.103-34.067c-.143.143-.278.294-.421.436Z'
        fill='#FFF7F7'
      />
    </svg>
  )
}

IconPizza.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any
}

export const IconShopping: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      fillRule='evenodd'
      height={size}
      style={style}
      viewBox='0 0 18 23'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8.7.2c-1.1 0-2 .3-2.6.9-.6.6-1 1.4-1.2 2.2-.2.6-.3 1.1-.3 1.7H2C.9 5 0 5.9 0 7l.1 13c0 1.7 1.3 3 3 3H15c1.7 0 3-1.3 3-3V7c0-1.1-.9-2-2-2h-3.2c-.1-.6-.1-1.1-.3-1.6-.2-.8-.6-1.7-1.2-2.2-.7-.6-1.5-1-2.6-1zm2.7 6.3v2.6c0 .4.3.7.8.7.4 0 .7-.3.7-.8v-.8-1.8H16c.3 0 .5.2.5.5l-.1 13c0 .8-.7 1.5-1.5 1.5H3.1c-.8 0-1.5-.7-1.5-1.5L1.5 7c0-.3.2-.5.5-.5h2.5v2.6c0 .4.3.8.7.8.4 0 .8-.4.8-.8v-.8-1.8h5.4zM11.3 5c0-.4-.1-.8-.2-1.2-.2-.7-.4-1.2-.8-1.5-.4-.3-.8-.5-1.6-.5s-1.3.2-1.6.5c-.4.3-.6.8-.8 1.5-.1.4-.2.8-.2 1.2h5.2z'></path>
    </svg>
  )
}

IconShopping.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconCarrot: React.FC<IconProps> = ({
  style = {},
  size,
  color,
  ...props
}: IconProps) => {
  return (
    <svg
      fill='none'
      height={size ?? 433}
      width={size ?? 345}
      color={color}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M177.831 337.842c43.554-6.889 72.569-48.628 63.408-92.467-8.053-38.768-44.507-65.553-83.84-61.459-28.094 2.726-50.323 20.064-61.886 43.326-7.333 14.855-17.755 27.745-31.261 37.245l-10.408 7.263c-5.626 4.191-4.245 12.623 2.212 14.328l12.632 4.247c15.713 4.817 29.17 13.564 40.661 25.397 17.094 17.471 42.626 26.533 68.482 22.12Z'
        fill='#F9CAC6'
      />
      <path
        d='M156.831 184.205c-5.897.828-11.521 2.207-17.139 3.597l24.929 151.678c4.214.007 8.422.029 12.918-.803 4.496-.833 8.992-1.665 13.765-3.322l-25.211-150.839c-3.087-.579-5.889-.587-9.262-.311ZM240.949 246.211c-6.673-31.744-32.731-55.966-63.886-60.837l24.375 144.936c29.523-15.35 47.017-49.271 39.511-84.099ZM94.939 227.534c-7.334 14.855-17.755 27.745-31.26 37.244l-10.408 7.263c-5.625 4.19-4.245 12.622 2.212 14.327l12.631 4.247c15.713 4.817 29.168 13.563 40.66 25.395 11.486 11.822 27.481 20.021 44.319 22.88l-24.094-145.78c-14.611 7.25-26.717 19.565-34.06 34.424Z'
        fill='#FAA7A5'
        stroke='#FAA7A5'
        strokeWidth={1.253}
      />
      <path
        d='M271.327 342.598c20.585-38.967 4.979-87.3-35.423-106.518-35.906-17.24-79.184-4.168-100.058 30.021-14.658 24.097-14.438 52.739-2.418 75.512 7.266 14.617 11.721 30.641 10.845 47.2l-.031 12.63c-.302 6.457 7.276 10.415 13.191 6.78l10.968-7.541c12.945-9.222 28.404-14.795 44.7-17.274 23.04-3.016 46.107-17.26 58.226-40.81Z'
        fill='#FFE6E4'
      />
      <path
        d='M135.865 266.106c-3.1 5.048-5.366 10.368-7.337 16.254l135.202 71.722c2.541-3.358 5.066-6.722 7.049-11.203 2.257-3.93 4.23-8.406 5.368-13.18l-134.924-71.161c-1.697 2.241-3.955 4.761-5.358 7.568ZM235.917 236.088c-29.462-14.129-64.299-8.056-87.094 13.772l130.43 69.182c5.415-32.836-11.075-67.416-43.336-82.954ZM133.428 341.625c7.266 14.616 11.721 30.64 10.844 47.198l-.031 12.63c-.301 6.457 7.276 10.415 13.191 6.78l10.969-7.541c12.944-9.222 28.403-14.795 44.699-17.274 16.575-1.918 32.319-9.731 44.704-21.485L125.961 292.75c-2.849 16.838-.644 33.966 7.467 48.875Z'
        fill='#F9CAC6'
      />
      <path
        d='M377.619 181.185c9.837-2.783 19.119-8.089 26.435-15.916 22.81-23.235 22.331-60.868-.364-83.952-22.979-23.656-61.175-24.335-85.093-1.95-7.039 7.004-12.388 14.567-15.216 22.977-6.506 17.954-19.176 33.36-35.764 42.291-4.5 2.233-7.881 5.31-11.808 8.67-18.292 18.195-19.492 48.23-2.684 67.941 18.764 22.238 52.463 23.75 73.01 4.436 3.381-3.077 5.907-6.441 7.886-9.522 10.696-16.536 25.337-29.41 43.598-34.975Z'
        fill='#FFF7F6'
      />
      <path
        d='M320.141 138.915c5.906-6.44 10.425-14.29 12.695-23.822 6.519-27.777-10.262-55.906-37.77-63.287-28.347-7.664-57.315 8.81-65.235 36.582-2.267 8.132-2.288 16.56-1.176 24.426 3.327 16.571.483 33.419-8.535 47.699-2.262 3.92-3.948 7.566-5.085 12.34-5.388 21.608 6.921 44.937 28.242 52.591 24.412 8.217 50.009-5.185 56.795-29.584 1.13-3.358 1.424-7.014 1.429-11.225 1.164-17.414 7.105-33.688 18.64-45.72Z'
        fill='#F9CAC6'
      />
      <path
        d='M295.067 51.804c-.133-.036-.26-.062-.403-.093-12.413 47.983-22.339 78.938-51.104 172.891 1.451.488 3.008 1.241 4.667 2.198 22.83 4.985 45.512-8.191 51.851-30.958 1.129-3.357 1.423-7.013 1.429-11.225 1.169-17.403 7.099-33.672 18.644-45.709 5.907-6.44 10.425-14.29 12.696-23.822 6.519-27.777-10.273-55.901-37.78-63.282Z'
        fill='#F9CAC6'
      />
      <path
        d='M271.26 161.803c-6.791 20.193-32.91 90.556-32.783 90.581'
        stroke='#FFF7F6'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={6}
      />
    </svg>
  )
}

IconCarrot.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.object
}

export const IconFigure: React.FC<IconProps> = ({
  style = {},
  size,
  color,
  ...props
}: IconProps) => {
  return (
    <svg
      viewBox='0 0 675.6 522.55'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      height={size ?? 500}
      width={size ?? 500}
    >
      <defs>
        <style>
          {'.cls-2{fill:#f9cac6;opacity:.5;mix-blend-mode:multiply}'}
        </style>
      </defs>
      <title>{'figure'}</title>
      <g
        style={{
          isolation: 'isolate'
        }}
      >
        <g data-name='Capa 1' id='Capa_1'>
          <path
            className='cls-2'
            d='M-677.16 108.92a22.49 22.49 0 0 0 31.82 0l110-110a22.5 22.5 0 0 1 31.82 0 22.5 22.5 0 0 1 0 31.81l-67.58 67.58a22.5 22.5 0 0 0 0 31.82 22.49 22.49 0 0 0 31.82 0l3.08-3.08a22.5 22.5 0 0 1 31.81 0 22.49 22.49 0 0 1 0 31.82l-8.54 8.55a22.48 22.48 0 0 0 0 31.81 22.48 22.48 0 0 0 31.81 0l226.48-226.47a22.5 22.5 0 0 0 0-31.82 22.51 22.51 0 0 0-31.82 0l-6.17 6.18a22.51 22.51 0 0 1-31.82 0 22.49 22.49 0 0 1 0-31.82l27.73-27.72a22.5 22.5 0 0 0 0-31.82 22.51 22.51 0 0 0-31.82 0l-78.76 78.75a22.49 22.49 0 0 1-31.82 0 22.5 22.5 0 0 1 0-31.81l114.39-114.38a22.51 22.51 0 0 0 0-31.82 22.51 22.51 0 0 0-31.82 0L-506.14-93.91l-21.43 21.42-149.59 149.6a22.5 22.5 0 0 0 0 31.81ZM-494.55-219.89a22.51 22.51 0 0 0-31.82 0l-110 110a22.51 22.51 0 0 1-31.82 0 22.51 22.51 0 0 1 0-31.82l67.58-67.57a22.51 22.51 0 0 0 0-31.83 22.51 22.51 0 0 0-31.82 0l-3.07 3.08a22.49 22.49 0 0 1-31.82 0 22.51 22.51 0 0 1 0-31.82l8.54-8.54a22.49 22.49 0 0 0 0-31.82 22.5 22.5 0 0 0-31.81 0L-917.07-83.73a22.51 22.51 0 0 0 0 31.82 22.49 22.49 0 0 0 31.82 0l6.18-6.17a22.48 22.48 0 0 1 31.81 0 22.48 22.48 0 0 1 0 31.81L-875 1.46a22.49 22.49 0 0 0 0 31.82 22.5 22.5 0 0 0 31.81 0l78.76-78.76a22.49 22.49 0 0 1 31.82 0 22.5 22.5 0 0 1 0 31.81L-847 100.71a22.52 22.52 0 0 0 0 31.83 22.51 22.51 0 0 0 31.82 0l149.59-149.6 21.43-21.42 149.59-149.59a22.49 22.49 0 0 0 .02-31.82Z'
            transform='translate(923.66 316.76)'
          />
          <path
            d='M-589.94 43.39a13.76 13.76 0 0 0-19.45 0l-5.22 5.23a13.75 13.75 0 0 1-19.45 0 13.74 13.74 0 0 1 0-19.45l27.83-27.83a13.77 13.77 0 0 0 0-19.46 13.75 13.75 0 0 0-19.45 0l-67.26 67.27a13.77 13.77 0 0 1-19.46 0 13.75 13.75 0 0 1 0-19.45l27.27-27.27a13.75 13.75 0 0 0 0-19.45 13.77 13.77 0 0 0-19.46 0L-809.13 87.53a13.75 13.75 0 0 0 0 19.45 13.74 13.74 0 0 0 19.45 0l18.48-18.48a13.75 13.75 0 0 1 19.45 0 13.75 13.75 0 0 1 0 19.45l-69.93 69.93a13.77 13.77 0 0 0 0 19.45 13.77 13.77 0 0 0 19.46 0l38.72-38.73a13.75 13.75 0 0 1 19.45 0 13.75 13.75 0 0 1 0 19.45l-3.77 3.78a13.75 13.75 0 0 0 0 19.45 13.75 13.75 0 0 0 19.45 0l138.43-138.43a13.77 13.77 0 0 0 0-19.46Z'
            style={{
              fill: '#faa7a5'
            }}
            transform='translate(923.66 316.76)'
          />
        </g>
      </g>
    </svg>
  )
}

IconFigure.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.object
}

export const IconSales: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size}
      stroke={color ?? 'ff0000'}
      style={style}
      viewBox='0 0 24 24'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.14096 8.00024C6.71925 8.00024 5.49276 8.99817 5.20365 10.3902L3.99972 16.1868C3.48396 18.6701 5.37989 21.0002 7.91614 21.0002H16.0839C18.6201 21.0002 20.516 18.6701 20.0003 16.1868L18.7964 10.3902C18.5073 8.99818 17.2808 8.00024 15.8591 8.00024H8.14096Z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      ></path>
      <path
        d='M15 6V6C15 4.34315 13.6569 3 12 3V3C10.3431 3 9 4.34315 9 6V6'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      ></path>
    </svg>
  )
}

IconSales.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconDelete: React.FC<IconProps> = ({ style = {}, size, color, ...props }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height={size ?? 24}
      viewBox='0 0 24 24'
      width={size ?? 24}
      color={color}
    >
      <path
        fill={color ?? '#FF4242'}
        fillRule='evenodd'
        d='M10.113 1.5A2.53 2.53 0 0 0 7.65 3.454L7.407 4.67a.398.398 0 0 1-.39.319H3.75a1.25 1.25 0 0 0 0 2.5h16.958a1.25 1.25 0 1 0 0-2.5h-3.267a.398.398 0 0 1-.39-.32l-.243-1.215A2.53 2.53 0 0 0 14.345 1.5h-4.232Zm4.453 3.489-.196-.977A.03.03 0 0 0 14.347 4h-4.233a.03.03 0 0 0-.025.012l-.195.977h4.673Zm4.86 3.232a1.25 1.25 0 0 1 1.145 1.347l-.024.296a905.298 905.298 0 0 1-.288 3.432c-.174 2.037-.39 4.445-.55 5.88-.1.905-.446 1.746-1.112 2.365-.67.622-1.539.905-2.465.922-2.623.047-5.252.05-7.878-.005-.916-.019-1.768-.315-2.42-.937-.647-.616-.987-1.447-1.085-2.337-.16-1.449-.376-3.859-.55-5.894a815.2 815.2 0 0 1-.287-3.427l-.024-.295a1.25 1.25 0 0 1 2.492-.2l.024.292a738.821 738.821 0 0 0 .285 3.417c.175 2.039.388 4.418.544 5.832.049.44.194.677.325.803.126.12.344.238.748.247 2.589.054 5.185.051 7.78.005.445-.009.68-.135.81-.255.131-.122.279-.357.329-.808l.544-5.819.31-3.715a1.25 1.25 0 0 1 1.346-1.146Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

IconDelete.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconInvoice: React.FC<IconProps> = ({ style = {}, size }) => {
  return <svg
    fill='none'
    height={size}
    stroke='#000'
    strokeWidth='5px'
    style={style}
    viewBox='0 0 210.91 261.78'
    width={size}
    xmlns='http://www.w3.org/2000/svg'
  ><path
      d='M357,211.55V264a11.74,11.74,0,0,1-11.74,11.74H166.78A11.74,11.74,0,0,1,155,264V34.68a11.74,11.74,0,0,1,11.74-11.74h37.57'
      stroke='#000'
      strokeLinecap='round'
      transform='translate(-150.54 -18.44)'
    /><path d='M218.43,22.94H346.3a10.8,10.8,0,0,1,10.66,11V198.81' transform='translate(-150.54 -18.44)' /><text
      fill='none'
      fontSize='32.32px'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      transform='translate(27.2 51.1)'
    >INVOICE</text><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='132.85'
      x2='173.67'
      y1='76.11'
      y2='76.11'
    /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='110.54'
      x2='171.71'
      y1='89.41'
      y2='89.41'
    /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='33.31'
      x2='170.8'
      y1='135.89'
      y2='135.89'
    /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='33.25'
      x2='170.74'
      y1='166.15'
      y2='166.15'
    /><line
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      x1='138.26'
      x2='138.26'
      y1='193.62'
      y2='111.98'
    /><path
      d='M257.11,251.47c4-9.66,7.55-12.06,10.24-12.13,5.87-.17,7.79,10.72,15.26,11.54,6.72.73,9.49-7.63,17.61-8.61,6.79-.82,13.17,4,18.06,9.2'
      fill='none'
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit='10'
      strokeWidth='5px'
      transform='translate(-150.54 -18.44)'
    /><path d='M237.44,212.07h86.77v-84H180.87v84h22.77' transform='translate(-150.54 -18.44)' /></svg>
}

export const IconInventory: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    viewBox='0 0 512 512'
  >
    <path
      d='M417.133 7.533H92.867L7.533 144.067v358.4h494.934v-358.4z'
      style={{
        fill: getGlobalStyle('--color-base-transparent')
      }}
      transform='translate(1 1)'
    />
    <path
      d='M511 511H-1V141.507L87.747-1H421.4L511 141.507V511zM16.067 493.933h477.867V146.627l-81.92-130.56H97.987l-81.92 130.56v347.306z'
      style={{
        fill: color
      }}
      transform='translate(1 1)'
    />
    <path
      d='M502.467 152.6H7.533c-5.12 0-8.533-3.413-8.533-8.533 0-5.12 3.413-8.533 8.533-8.533h238.933v-128C246.467 2.413 249.88-1 255-1s8.533 3.413 8.533 8.533v128h238.933c5.12 0 8.533 3.413 8.533 8.533.001 5.121-3.412 8.534-8.532 8.534z'
      style={{
        fill: color
      }}
      transform='translate(1 1)'
    />
    <path
      d='M306.2 237.933H203.8c-9.387 0-17.067-7.68-17.067-17.067s7.68-17.067 17.067-17.067h102.4c9.387 0 17.067 7.68 17.067 17.067s-7.68 17.067-17.067 17.067z'
      style={{
        fill: getGlobalStyle('--color-base-transparent')
      }}
      transform='translate(1 1)'
    />
    <path
      d='M306.2 246.467H203.8c-14.507 0-25.6-11.093-25.6-25.6 0-14.507 11.093-25.6 25.6-25.6h102.4c14.507 0 25.6 11.093 25.6 25.6 0 14.506-11.093 25.6-25.6 25.6zm-102.4-34.134c-5.12 0-8.533 3.413-8.533 8.533 0 5.12 3.413 8.533 8.533 8.533h102.4c5.12 0 8.533-3.413 8.533-8.533 0-5.12-3.413-8.533-8.533-8.533H203.8zM323.267 459.8H186.733c-5.12 0-8.533-3.413-8.533-8.533s3.413-8.533 8.533-8.533h136.533c5.12 0 8.533 3.413 8.533 8.533s-3.412 8.533-8.532 8.533zm-25.6-34.133c-5.12 0-8.533-3.413-8.533-8.533v-56.32l-11.093 11.093c-3.413 3.413-8.533 3.413-11.947 0-3.413-3.413-3.413-8.533 0-11.947l25.6-25.6c.853-.853 1.707-1.707 2.56-1.707s1.707-.853 3.413-.853c.853 0 2.56 0 3.413.853.853 0 1.707.853 2.56 1.707l25.6 25.6c3.413 3.413 3.413 8.533 0 11.947-3.413 3.413-8.533 3.413-11.947 0L306.2 360.813v56.32c0 5.12-3.413 8.534-8.533 8.534zm-85.334 0c-5.12 0-8.533-3.413-8.533-8.533v-56.32l-11.093 11.093c-3.413 3.413-8.533 3.413-11.947 0-3.413-3.413-3.413-8.533 0-11.947l25.6-25.6c.853-.853 1.707-1.707 2.56-1.707s1.707-.853 3.413-.853c.853 0 2.56 0 3.413.853.853 0 1.707.853 2.56 1.707l25.6 25.6c3.413 3.413 3.413 8.533 0 11.947-3.413 3.413-8.533 3.413-11.947 0l-11.093-11.093v56.32c.001 5.119-3.413 8.533-8.533 8.533z'
      style={{
        fill: color
      }}
      transform='translate(1 1)'
    />
  </svg>
}

export const IconDownload: React.FC<IconProps> = ({
  style = {},
  size,
  color
}) => {
  return (
    <svg
      fill={color}
      height={size}
      stroke={color}
      style={style}
      viewBox='0 0 329.89 306.05'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M164.93 306c-34.49 0-68.98.04-103.47-.01-30.36-.04-54.81-20.26-60.38-50.06-.86-4.63-.94-9.44-.99-14.17-.13-12.24-.11-24.49-.01-36.74.06-6.42 4.26-11.37 10.02-12.24 5.92-.89 11.39 2.29 13.25 7.97.57 1.73.66 3.67.67 5.52.06 12.37.01 24.74.03 37.11.04 23.06 15.55 38.61 38.53 38.61 68.23.01 136.46.01 204.69 0 22.99 0 38.49-15.54 38.54-38.61.02-12.5-.02-24.99.01-37.49.02-8.06 4.81-13.28 12.04-13.23 6.97.05 11.96 5.38 11.92 13.09-.08 15.49.58 31.05-.67 46.45-2.42 29.89-28.42 53.5-58.47 53.71-35.24.25-70.48.06-105.72.06.01.01.01.02.01.03z'
        fill={color}
        stroke={color}
      />
      <path
        d='M152.93 189.09v-4.07c0-56.73 0-113.46.01-170.19 0-1.62-.09-3.27.17-4.86 1.01-6.05 6.54-10.35 12.63-9.94 5.9.39 10.72 5.21 11.14 11.21.1 1.37.04 2.75.04 4.12v174.81c1.45-1.36 2.4-2.21 3.3-3.1 14.49-14.49 28.94-29.02 43.49-43.45 7.01-6.95 18.13-4.04 20.39 5.26 1.17 4.81-.58 8.73-4.03 12.17-20.09 20.02-40.13 40.1-60.19 60.15-2.03 2.03-4.03 4.1-6.11 6.08-5.55 5.26-12.29 5.35-17.67 0-22.58-22.49-45.1-45.02-67.6-67.59-5.2-5.21-5.36-12.58-.6-17.41 4.87-4.95 12.29-4.77 17.68.59 14.62 14.54 29.18 29.13 43.74 43.74.95.95 1.61 2.2 2.4 3.31.41-.28.81-.56 1.21-.83z'
        fill={color}
        stroke={color}
      />
    </svg>
  )
}

export const IconComment: React.FC<IconProps> = ({
  style = {},
  size,
  color
}: IconProps) => {
  return (
    <svg
      fill='none'
      height={size ?? 16}
      style={{
        cursor: 'pointer',
        ...style
      }}
      width={16}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.667 12.288h2.667L10.3 14.26a.665.665 0 0 0 1.034-.553v-1.42c2 0 3.333-1.334 3.333-3.334v-4c0-2-1.333-3.333-3.333-3.333H4.667c-2 0-3.333 1.333-3.333 3.333v4c0 2 1.333 3.334 3.333 3.334zm1-5.288h4.666M5.667 7h4.666'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
      />
    </svg>
  )
}

IconComment.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.object
}

export const IconCopy: React.FC<IconProps> = ({
  size = 20,
  color = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12.668 10.667C12.668 9.95614 12.668 9.46258 12.6367 9.0791C12.6137 8.79732 12.5758 8.60761 12.5244 8.46387L12.4688 8.33399C12.3148 8.03193 12.0803 7.77885 11.793 7.60254L11.666 7.53125C11.508 7.45087 11.2963 7.39395 10.9209 7.36328C10.5374 7.33197 10.0439 7.33203 9.33301 7.33203H6.5C5.78896 7.33203 5.29563 7.33195 4.91211 7.36328C4.63016 7.38632 4.44065 7.42413 4.29688 7.47559L4.16699 7.53125C3.86488 7.68518 3.61186 7.9196 3.43555 8.20703L3.36524 8.33399C3.28478 8.49198 3.22795 8.70352 3.19727 9.0791C3.16595 9.46259 3.16504 9.95611 3.16504 10.667V13.5C3.16504 14.211 3.16593 14.7044 3.19727 15.0879C3.22797 15.4636 3.28473 15.675 3.36524 15.833L3.43555 15.959C3.61186 16.2466 3.86474 16.4807 4.16699 16.6348L4.29688 16.6914C4.44063 16.7428 4.63025 16.7797 4.91211 16.8027C5.29563 16.8341 5.78896 16.835 6.5 16.835H9.33301C10.0439 16.835 10.5374 16.8341 10.9209 16.8027C11.2965 16.772 11.508 16.7152 11.666 16.6348L11.793 16.5645C12.0804 16.3881 12.3148 16.1351 12.4688 15.833L12.5244 15.7031C12.5759 15.5594 12.6137 15.3698 12.6367 15.0879C12.6681 14.7044 12.668 14.211 12.668 13.5V10.667ZM13.998 12.665C14.4528 12.6634 14.8011 12.6602 15.0879 12.6367C15.4635 12.606 15.675 12.5492 15.833 12.4688L15.959 12.3975C16.2466 12.2211 16.4808 11.9682 16.6348 11.666L16.6914 11.5361C16.7428 11.3924 16.7797 11.2026 16.8027 10.9209C16.8341 10.5374 16.835 10.0439 16.835 9.33301V6.5C16.835 5.78896 16.8341 5.29563 16.8027 4.91211C16.7797 4.63025 16.7428 4.44063 16.6914 4.29688L16.6348 4.16699C16.4807 3.86474 16.2466 3.61186 15.959 3.43555L15.833 3.36524C15.675 3.28473 15.4636 3.22797 15.0879 3.19727C14.7044 3.16593 14.211 3.16504 13.5 3.16504H10.667C9.9561 3.16504 9.46259 3.16595 9.0791 3.19727C8.79739 3.22028 8.6076 3.2572 8.46387 3.30859L8.33399 3.36524C8.03176 3.51923 7.77886 3.75343 7.60254 4.04102L7.53125 4.16699C7.4508 4.32498 7.39397 4.53655 7.36328 4.91211C7.33985 5.19893 7.33562 5.54719 7.33399 6.00195H9.33301C10.022 6.00195 10.5791 6.00131 11.0293 6.03809C11.4873 6.07551 11.8937 6.15471 12.2705 6.34668L12.4883 6.46875C12.984 6.7728 13.3878 7.20854 13.6533 7.72949L13.7197 7.87207C13.8642 8.20859 13.9292 8.56974 13.9619 8.9707C13.9987 9.42092 13.998 9.97799 13.998 10.667V12.665ZM18.165 9.33301C18.165 10.022 18.1657 10.5791 18.1289 11.0293C18.0961 11.4302 18.0311 11.7914 17.8867 12.1279L17.8203 12.2705C17.5549 12.7914 17.1509 13.2272 16.6553 13.5313L16.4365 13.6533C16.0599 13.8452 15.6541 13.9245 15.1963 13.9619C14.8593 13.9895 14.4624 13.9935 13.9951 13.9951C13.9935 14.4624 13.9895 14.8593 13.9619 15.1963C13.9292 15.597 13.864 15.9576 13.7197 16.2939L13.6533 16.4365C13.3878 16.9576 12.9841 17.3941 12.4883 17.6982L12.2705 17.8203C11.8937 18.0123 11.4873 18.0915 11.0293 18.1289C10.5791 18.1657 10.022 18.165 9.33301 18.165H6.5C5.81091 18.165 5.25395 18.1657 4.80371 18.1289C4.40306 18.0962 4.04235 18.031 3.70606 17.8867L3.56348 17.8203C3.04244 17.5548 2.60585 17.151 2.30176 16.6553L2.17969 16.4365C1.98788 16.0599 1.90851 15.6541 1.87109 15.1963C1.83431 14.746 1.83496 14.1891 1.83496 13.5V10.667C1.83496 9.978 1.83432 9.42091 1.87109 8.9707C1.90851 8.5127 1.98772 8.10625 2.17969 7.72949L2.30176 7.51172C2.60586 7.0159 3.04236 6.6122 3.56348 6.34668L3.70606 6.28027C4.04237 6.136 4.40303 6.07083 4.80371 6.03809C5.14051 6.01057 5.53708 6.00551 6.00391 6.00391C6.00551 5.53708 6.01057 5.14051 6.03809 4.80371C6.0755 4.34588 6.15483 3.94012 6.34668 3.56348L6.46875 3.34473C6.77282 2.84912 7.20856 2.44514 7.72949 2.17969L7.87207 2.11328C8.20855 1.96886 8.56979 1.90385 8.9707 1.87109C9.42091 1.83432 9.978 1.83496 10.667 1.83496H13.5C14.1891 1.83496 14.746 1.83431 15.1963 1.87109C15.6541 1.90851 16.0599 1.98788 16.4365 2.17969L16.6553 2.30176C17.151 2.60585 17.5548 3.04244 17.8203 3.56348L17.8867 3.70606C18.031 4.04235 18.0962 4.40306 18.1289 4.80371C18.1657 5.25395 18.165 5.81091 18.165 6.5V9.33301Z'>
      </path>
    </svg>
  )
}

export const IconCancel: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 32 32'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        height={20.36}
        rx={1.13}
        transform='rotate(-45 8 9.6)'
        width={2.26}
        x={8}
        y={9.6}
      />
      <rect
        height={20.36}
        rx={1.13}
        transform='rotate(45 22.4 8)'
        width={2.26}
        x={22.4}
        y={8}
      />
    </svg>
  )
}

IconCancel.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any,
  style: PropTypes.object
}

IconArrowBottom.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconFolder: React.FC<IconProps> = ({ style = {}, size }: IconProps) => {
  return (
    <svg
      height={size}
      style={style}
      viewBox='0 0 254.89 207.69'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M200.4,258.36h82.18l21.32,30.72H414.64s13.49-.61,9,11.35c-.58,1.56,0,28.17,0,28.17h22.11s3.13,2,3.13,5.09a15.74,15.74,0,0,1,0,6.46l-44.8,122.47s.19,4.11-11.35,3.33l-189.2.1s-9.39-.69-9.19-9.3V263.06S196.88,258.36,200.4,258.36Z'
        fill='#e5b911'
        transform='translate(-194.34 -258.36)'
      />
      <path
        d='M423.64,328.6h22.11s3.13,2,3.13,5.09a15.74,15.74,0,0,1,0,6.46l-44.8,122.47s.19,4.11-11.35,3.33l-189.19.1s-5.59-.41-8.06-4.55a8.78,8.78,0,0,1-1.14-4.75c.22-11.24,21.81-58.84,29.36-81.62,2.79-8.43,6.38-16.59,9.13-25a82.53,82.53,0,0,1,7-15.92,29.4,29.4,0,0,1,2.48-4c5.71-6.66,17.73-5.16,26.17-4.35,11.52,1.11,23.18.21,34.68,1.49,6.88.76,23.65,1,57.19,1.36C379.28,328.92,400.47,328.94,423.64,328.6Z'
        fill='#ecce3d'
        transform='translate(-194.34 -258.36)'
      />
    </svg>
  )
}

IconFolder.propTypes = {
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconPlus: React.FC<IconProps> = ({ size = 24, color }: IconProps) => {
  return (
    <svg
      height={size ?? 24}
      viewBox='0 0 24 24'
      width={size ?? 24}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13 11h4.993c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H13v4.993C13 18.55 12.556 19 12 19c-.552 0-1-.45-1-1.007V13H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1H11V6.007C11 5.45 11.444 5 12 5c.552 0 1 .45 1 1.007V11z'
        fill={color ?? getGlobalStyle('--color-icons-primary')}
        fillRule='evenodd'
      ></path>
    </svg>
  )
}
export const IconLinePart: React.FC<IconProps> = ({ size = 2, color, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      {...props}
    >
      <path d='M23 13H1v-2h22z' />
      <path fill='none' d='M0 0h24v24H0z' />
    </svg>
  )
}

IconLinePart.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number
}

IconPlus.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}
export const IconMinus: React.FC<IconProps> = ({
  style = {},
  size = 24,
  color
}) => {
  return (
    <svg
      height={size ?? 24}
      viewBox='0 0 24 24'
      width={size ?? 24}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.993 11c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1h11.986z'
        fill={color ?? getGlobalStyle('--color-icons-primary')}
        fillRule='evenodd'
      >
        {' '}
      </path>
    </svg>
  )
}

IconMinus.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}
export const IconPromo: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 32 32'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M28.2267 12.4802C28.7734 12.4802 29.2267 12.0268 29.2267 11.4802V6.48016C29.2267 5.20016 28.1867 4.16016 26.8934 4.16016H4.9334C3.6534 4.16016 2.6134 5.20016 2.6134 6.48016V18.8535C2.6134 20.1335 3.66674 21.1868 4.94674 21.1868H8.94674V26.8402C8.94674 27.2402 9.1734 27.6002 9.54674 27.7602C9.68007 27.8135 9.8134 27.8402 9.94674 27.8402C10.1867 27.8402 10.4267 27.7468 10.6134 27.5735L17.6401 21.1868H26.9067C28.1867 21.1868 29.2267 20.1468 29.2267 18.8668V17.9335C29.2267 17.3868 28.7734 16.9335 28.2267 16.9335C27.6801 16.9335 27.2267 17.3868 27.2267 17.9335V18.8668C27.2267 19.0402 27.0801 19.1868 26.9067 19.1868H17.2534C17.0001 19.1868 16.7601 19.2802 16.5867 19.4535L10.9467 24.5868V20.2002C10.9467 19.6535 10.4934 19.2002 9.94674 19.2002H4.94674C4.76007 19.2002 4.6134 19.0535 4.6134 18.8668V6.49349C4.6134 6.32016 4.76007 6.17349 4.9334 6.17349H26.8934C27.0667 6.17349 27.2134 6.32016 27.2134 6.49349V11.4802C27.2267 12.0268 27.6667 12.4802 28.2267 12.4802Z'
        fill='red'
        height={size}
        width={size}
      ></path>
      <path d='M11.9334 14.2132C12.6256 14.2132 13.1867 13.6521 13.1867 12.9599C13.1867 12.2677 12.6256 11.7065 11.9334 11.7065C11.2412 11.7065 10.6801 12.2677 10.6801 12.9599C10.6801 13.6521 11.2412 14.2132 11.9334 14.2132Z'></path>
      <path d='M19.9335 14.1862C20.6109 14.1862 21.1601 13.637 21.1601 12.9596C21.1601 12.2821 20.6109 11.7329 19.9335 11.7329C19.256 11.7329 18.7068 12.2821 18.7068 12.9596C18.7068 13.637 19.256 14.1862 19.9335 14.1862Z'></path>
      <path d='M15.9333 14.2532C16.6476 14.2532 17.2267 13.6741 17.2267 12.9598C17.2267 12.2455 16.6476 11.6665 15.9333 11.6665C15.2191 11.6665 14.64 12.2455 14.64 12.9598C14.64 13.6741 15.2191 14.2532 15.9333 14.2532Z'></path>
    </svg>
  )
}

IconPromo.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}
export const IconEdit: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 22 22'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.76 1.24a4.25 4.25 0 0 0-6.012 0l-.487.488L2.658 13.33a.854.854 0 0 0-.188.3c0 .01-.012.01-.012.021L.045 20.904a.83.83 0 0 0 1.052 1.052l7.252-2.413c.01 0 .01-.011.022-.011.11-.045.21-.1.299-.189l3.1-3.1a.835.835 0 0 0 0-1.173.835.835 0 0 0-1.174 0l-2.513 2.513-3.665-3.665 10.43-10.43 1.827 1.827 1.827 1.827-4.23 4.23a.836.836 0 0 0 0 1.173.835.835 0 0 0 1.174 0l4.816-4.816.487-.487a4.23 4.23 0 0 0 1.24-3A4.174 4.174 0 0 0 20.76 1.24zm-1.173 1.174c.487.488.753 1.14.753 1.827 0 .642-.233 1.251-.654 1.727L17.86 4.142l-1.827-1.827a2.591 2.591 0 0 1 3.554.1zM3.61 15.457l2.934 2.934-4.407 1.473 1.473-4.407z'
        fill={color}
      ></path>
    </svg>
  )
}

IconEdit.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconSendMessage: React.FC<IconProps> = ({ size, color }: IconProps) => {
  return (
    <svg
      height={size}
      viewBox='0 0 47.02 39.35'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs></defs>
      <title>Asset 8</title>
      <g data-name='Layer 2' id='Layer_2'>
        <g data-name='Layer 2' id='Layer_2-2'>
          <path
            d='M45.84,1.13,17.26,26.45l12.08,3.14a1,1,0,0,0,1.17-.51L46,1.26A.1.1,0,0,0,45.84,1.13Z'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1px'
          />
          <path
            d='M9.62,23.15l-7.83-2a1,1,0,0,1-.15-2L45.62,1a.06.06,0,0,1,.05.11l-36.05,22,4.86,14.57a1,1,0,0,0,2-.31l.79-11'
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1px'
          />
          <line
            fill='none'
            stroke={color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1px'
            x1='16.06'
            x2='23.65'
            y1='38.35'
            y2='28.11'
          />
        </g>
      </g>
    </svg>
  )
}

IconSendMessage.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any
}
export const IconClose: React.FC<IconProps> = ({ size, color }: IconProps) => {
  return (
    <svg
      fill={color ?? '#717171'}
      height={size}
      viewBox='0 0 32 32'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        height='20.36'
        rx='1.13'
        transform='rotate(-45 8 9.6)'
        width='2.26'
        x='8'
        y='9.6'
      ></rect>
      <rect
        height='20.36'
        rx='1.13'
        transform='rotate(45 22.4 8)'
        width='2.26'
        x='22.4'
        y='8'
      ></rect>
    </svg>
  )
}

IconClose.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any
}

export const IconLocationMap2: React.FC<IconProps> = ({ size, color, ...props }: IconProps) => {
  return (
    <svg
      fill='none'
      height={size ?? 32}
      viewBox='0 0 32 32'
      width={size ?? 32}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16 17.907a4.16 4.16 0 1 0 0-8.32 4.16 4.16 0 0 0 0 8.32Z'
        stroke={color ?? '#282828'}
        strokeWidth={1.5}
      />
      <path
        d='M4.827 11.32C7.453-.227 24.56-.213 27.173 11.333c1.534 6.774-2.68 12.507-6.373 16.054a6.925 6.925 0 0 1-9.613 0c-3.68-3.547-7.894-9.294-6.36-16.067Z'
        stroke={color ?? '#282828'}
        strokeWidth={1.5}
      />
    </svg>
  )
}

IconLocationMap2.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any
}

export const IconGoogleFullColor: React.FC<IconProps> = ({ size }: IconProps) => {
  return (
    <svg height={size} version='1.1' viewBox='0 0 256 262' width={size}>
      <path
        d='M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451'
        fill='#4285F4'
      ></path>
      <path
        d='M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1'
        fill='#34A853'
      ></path>
      <path
        d='M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37'
        fill='#FBBC05'
      ></path>
      <path
        d='M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479'
        fill='#EB4335'
      ></path>
    </svg>
  )
}

IconGoogleFullColor.propTypes = {
  size: PropTypes.any
}

export const IconArrowLeft: React.FC<IconProps> = ({ style = {}, size, color }: IconProps) => {
  return (
    <svg
      height={size}
      style={style}
      viewBox='0 0 22.893 45.908'
      width={size}
      x='0px'
      y='0px'
    >
      <path
        d='M1365.5,348.848l21.837-22.686L1365.5,303.635'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='bevel'
        strokeWidth='5px'
        transform='translate(1388.033 349.194) rotate(180)'
      />
    </svg>
  )
}

IconArrowLeft.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

IconChart.propTypes = {
  color: PropTypes.any,
  size: PropTypes.number,
  style: PropTypes.object
}

export const IconQuestion: React.FC<IconProps> = (props: IconProps) => {
  return (
    <svg
      fill='none'
      height={props.size}
      viewBox='0 0 16 16'
      width={props.size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        clipRule='evenodd'
        d='M7.987 1.333a6.648 6.648 0 0 0-6.654 6.66 6.654 6.654 0 0 0 6.66 6.66 6.646 6.646 0 0 0 5.248-2.558.5.5 0 1 0-.788-.617 5.646 5.646 0 0 1-4.46 2.175c-3.13 0-5.66-2.53-5.66-5.66a5.648 5.648 0 0 1 5.654-5.66c3.13 0 5.66 2.536 5.66 5.66a.5.5 0 0 0 1 0 6.658 6.658 0 0 0-6.66-6.66Zm-.033 3.808a1.16 1.16 0 0 0-1.103.81.535.535 0 0 1-1.022-.317 2.226 2.226 0 1 1 3.15 2.64v.001c-.32.165-.49.43-.49.698v.707a.535.535 0 0 1-1.07 0v-.707c0-.759.482-1.346 1.069-1.648a1.156 1.156 0 0 0-.534-2.184Zm0 6.759a.511.511 0 0 1-.2-.04.522.522 0 0 1-.174-.114.507.507 0 0 1-.16-.38c0-.066.014-.14.04-.206a.581.581 0 0 1 .12-.174.547.547 0 0 1 .753 0 .489.489 0 0 1 .114.174c.033.066.047.14.047.206a.58.58 0 0 1-.16.38.544.544 0 0 1-.38.153Z'
        fill={props.color ?? '#A6A6A6'}
        fillRule='evenodd'
      />
    </svg>
  )
}

IconQuestion.propTypes = {
  color: PropTypes.string,
  size: PropTypes.any
}

export const IconFilter: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 800}
    height={size ?? 800}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      fill={color ?? getGlobalStyle('--color-icons-black')}
      fillRule='evenodd'
      d='M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z'
      clipRule='evenodd'
    />
  </svg>
)

export const IconConfig: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 800}
    height={size ?? 800}
    fill='none'
    viewBox='0 0 48 48'
  >
    <path fill={getGlobalStyle('--color-icons-white')} fillOpacity={0.01} d='M0 0h48v48H0z' />
    <path
      stroke={color ?? getGlobalStyle('--color-icons-black')}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={4}
      d='M41.5 10h-6M27.5 6v8M27.5 10h-22M13.5 24h-8M21.5 20v8M43.5 24h-22M41.5 38h-6M27.5 34v8M27.5 38h-22'
    />
  </svg>
)

export const IconBox: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 800}
    height={size ?? 800}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      stroke={color ?? '#292D32'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM18 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
    />
  </svg>
)

export const IconDrink: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 329.535 329.535"
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
  >
    <path d="M228.608 40.676c-30.678 0-56.571 24.066-60.174 53.944H134.31l-8.37-46.983c-3.48-17.401-15.661-29.582-31.322-34.802L51.116.653c-3.48-1.74-8.701 0-10.441 5.22-1.74 3.48 0 8.701 5.22 10.441l43.503 12.181c10.441 3.48 17.401 10.441 19.141 20.882l8.057 45.243H94.619c-5.22 0-12.181 1.74-15.661 6.96-3.48 3.48-5.22 10.441-5.22 15.661l22.621 179.232c1.74 19.141 19.141 33.062 38.283 33.062h38.283c19.141 0 34.802-13.921 38.283-33.062l16.914-134.042c.157 0 .313.052.487.052 33.062 0 60.904-27.842 60.904-60.904-.001-33.061-27.843-60.903-60.905-60.903zm-12.181 74.825-3.358 26.676c-13.851-5.186-24.188-17.018-27.094-31.897h26.989c1.74 0 3.48 1.74 3.48 1.74-.017 1.741-.017 1.741-.017 3.481zm-125.289-3.48c1.74-1.74 1.74-1.74 3.48-1.74h24.762l16.409 92.226h-33.671l-10.98-87.006c-1.74-1.74 0-3.48 0-3.48zm102.667 182.712c-1.74 10.441-10.441 19.141-20.882 19.141H134.64c-10.441 0-19.141-8.701-20.882-19.141l-9.449-74.825h34.576l6.195 34.802c1.74 3.48 5.22 6.96 8.701 6.96 5.22-1.74 8.701-5.22 8.701-8.701l-5.882-33.062h46.653l-9.448 74.826zm11.642-92.226h-51.942l-16.409-92.226h31.514c3.48 23.109 20.342 42.198 42.267 49.159l-5.43 43.067zm24.883-57.598 3.497-27.668c0-5.22-1.74-10.441-5.22-15.661-3.48-5.22-10.441-6.96-15.661-6.96h-27.163c3.271-20.934 20.847-36.543 42.824-36.543 22.621 0 43.503 19.141 43.503 43.503.001 23.77-18.27 42.424-41.78 43.329z" />
  </svg>
)

export const IconSandwich: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width={size ?? 800}
      height={size ?? 800}
      fill={color ?? getGlobalStyle('--color-icons-black')}
    >
      <path d='M442.514 48.065H69.486C31.171 48.065 0 79.237 0 117.551c0 28.712 18.042 54.83 44.931 64.998v250.039c0 17.285 14.062 31.347 31.347 31.347h359.445c17.285 0 31.347-14.062 31.347-31.347l.034-250.044C493.958 172.381 512 146.263 512 117.551c0-38.314-31.171-69.486-69.486-69.486zm-64.261 134.484v250.039c0 5.762-4.687 10.449-10.449 10.449H76.278c-5.762 0-10.449-4.687-10.449-10.449V182.549c0-8.629-5.44-16.485-13.537-19.55-18.778-7.107-31.394-25.371-31.394-45.448 0-26.791 21.796-48.588 48.588-48.588h305.11c26.792 0 48.588 21.797 48.588 48.588 0 20.077-12.616 38.34-31.395 45.448-8.096 3.065-13.536 10.921-13.536 19.55zm81.454-19.55c-8.096 3.065-13.536 10.921-13.536 19.55v250.039c0 5.762-4.687 10.449-10.449 10.449h-38.369a31.197 31.197 0 0 0 1.797-10.449l.034-250.044c26.854-10.163 44.896-36.281 44.896-64.993 0-18.898-7.593-36.049-19.876-48.588h18.309c26.792 0 48.588 21.797 48.588 48.588.001 20.077-12.615 38.34-31.394 45.448z' />
      <path d='M293.223 183.574c-4.057-4.102-10.675-4.137-14.777-.079l-.096.095c-4.102 4.058-4.138 10.675-.078 14.777a10.415 10.415 0 0 0 7.428 3.1c2.655 0 5.312-1.006 7.349-3.021l.096-.095c4.102-4.059 4.138-10.675.078-14.777zM269.652 207.067c-4.079-4.08-10.693-4.08-14.778 0L150.896 311.044c-4.08 4.08-4.08 10.697 0 14.777 2.042 2.041 4.716 3.06 7.39 3.06s5.348-1.021 7.388-3.06l103.978-103.977c4.08-4.08 4.08-10.696 0-14.777zM293.45 251.805c-4.079-4.079-10.697-4.079-14.777 0L150.63 379.846c-4.08 4.08-4.08 10.697 0 14.777a10.415 10.415 0 0 0 7.388 3.06c2.674 0 5.349-1.021 7.388-3.06L293.45 266.582c4.081-4.081 4.081-10.697 0-14.777z' />
    </svg>
  )
}

export const IconLunch: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    viewBox='0 0 512 512'
  >
    <path d='M476.075 345.745c-16.567-23.6-42.607-37.135-71.442-37.135h-6.897c3.82-9.363 13.012-15.986 23.733-15.986a9.646 9.646 0 0 0 9.647-9.647 9.646 9.646 0 0 0-9.647-9.647c-11.543 0-22.08 4.378-30.046 11.558-5.818-13.068-16.943-23.263-30.627-27.841l5.895-81.511h11.512a9.647 9.647 0 0 0 9.48-11.435l-11.84-62.769a9.649 9.649 0 0 0-9.48-7.859h-43.108l11.722-66.841a8.754 8.754 0 0 1 4.727-6.364 8.76 8.76 0 0 1 7.926-.013l52.54 26.269c4.768 2.383 10.561.451 12.944-4.314 2.383-4.766.451-10.56-4.314-12.942L356.258 3c-8.026-4.013-17.224-3.999-25.238.039s-13.499 11.423-15.049 20.262l-12.306 70.174H112.158a9.648 9.648 0 0 0-9.48 7.859l-11.84 62.769a9.647 9.647 0 0 0 9.48 11.435h11.512l9.303 128.84H81.025c-33.669 0-61.06 27.391-61.06 61.06v13.866c0 3.909 2.328 7.266 5.67 8.783-3.594 5.854-5.67 12.734-5.67 20.091s2.076 14.238 5.67 20.091c-3.342 1.516-5.67 4.874-5.67 8.783v30.408c0 24.547 19.97 44.519 44.518 44.519h116.003c.05 0 .099-.004.148-.004h180.141l-.22-.158c.369-.027.74-.032 1.109-.067a54.526 54.526 0 0 0 13.107-2.884 34.199 34.199 0 0 1 11.416-1.958 34.168 34.168 0 0 1 11.406 1.954c5.919 2.095 12.015 3.138 18.055 3.138 7.409 0 14.734-1.57 21.544-4.692a62.937 62.937 0 0 0 14.042-8.857c.076-.059.149-.121.224-.183a62.656 62.656 0 0 0 18.648-26.728l16.617-45.987c9.801-27.12 5.918-56.207-10.648-79.808zm-99.533-40.084v2.949h-2.951c-17.623 0-31.961-14.337-31.961-31.96v-2.95h2.951c17.624 0 31.961 14.336 31.961 31.961zM120.806 156.24c-.024 0-.049.004-.073.004h-8.777l8.2-43.475h238.208l8.201 43.475h-8.776c-.024 0-.048-.004-.073-.004h-236.91zM39.259 365.438c0-23.03 18.736-41.766 41.766-41.766h82.92c23.03 0 41.766 18.736 41.766 41.766v4.219H39.259v-4.219zM205.712 467.46c0 13.908-11.315 25.225-25.225 25.225H64.484c-13.908-.001-25.225-11.316-25.225-25.225v-20.761h166.453v20.761zm-19.227-40.055H58.486c-10.601 0-19.227-8.626-19.227-19.227s8.626-19.227 19.227-19.227h127.999c10.601 0 19.227 8.626 19.227 19.227s-8.626 19.227-19.227 19.227zm30.661 65.274a44.257 44.257 0 0 0 7.86-25.221V437.05c0-3.909-2.328-7.266-5.67-8.783a38.28 38.28 0 0 0 5.67-20.091 38.276 38.276 0 0 0-5.67-20.091c3.342-1.516 5.67-4.874 5.67-8.783v-13.866c0-33.669-27.391-61.06-61.06-61.06h-23.468l-9.303-128.839h216.172l-5.703 78.868h-9.659a9.646 9.646 0 0 0-9.647 9.647v12.598c0 14.536 6.093 27.667 15.847 37.004-16.688 5.933-31.241 16.931-41.88 32.089-16.567 23.6-20.449 52.689-10.651 79.807l16.62 45.987c2.84 7.86 7.253 15.045 12.854 21.141h-97.982zm251.434-73.684-16.618 45.99a43.42 43.42 0 0 1-12.726 18.355c-.071.055-.138.112-.207.169a43.49 43.49 0 0 1-9.885 6.265c-7.766 3.563-16.684 3.884-25.109.899a54.175 54.175 0 0 0-9.291-2.374 53.586 53.586 0 0 0-26.392 2.371 35.172 35.172 0 0 1-8.47 1.866c-5.777.542-11.533-.417-16.648-2.763-10.711-4.912-18.814-13.717-22.816-24.791l-16.62-45.986c-7.633-21.124-4.607-43.783 8.296-62.166 12.905-18.383 33.187-28.927 55.646-28.927h36.894c22.462 0 42.745 10.543 55.651 28.927 12.902 18.383 15.928 41.042 8.295 62.165z' />
    <path d='M449.757 364.221a55.88 55.88 0 0 0-10.961-11.661c-4.171-3.313-10.24-2.618-13.555 1.554-3.313 4.173-2.617 10.24 1.554 13.555a36.51 36.51 0 0 1 7.17 7.638c6.8 9.688 8.394 21.63 4.372 32.763l-16.616 45.985c-1.81 5.011.783 10.541 5.795 12.352a9.634 9.634 0 0 0 3.279.576 9.652 9.652 0 0 0 9.073-6.371l16.616-45.986c6.187-17.128 3.734-35.501-6.727-50.405z' />
    <circle cx={404.63} cy={350.402} r={9.647} />
  </svg>
}

export const IconDonut: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    viewBox="0 0 1920 1920"
  >
    <style>
      {
        ".st0{fill:#fff}.st1{fill:none;stroke:#231f20;stroke-width:50;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}"
      }
    </style>
    <path
      id="Layer_2"
      d="M1566.4 609c79.2 39.2 130.8 117.8 136.3 205.3-125.2 38.7-35.7 160-114.7 222.8-79.1 62.9-1.9-145.8-131.1-122.7-129.2 23.1-63.6 310.5-171.6 310.5s-52.1-239.1-144.6-239.1S1096.3 1147 960 1147s-52.7-181.5-180-181.5-63.6 197.7-183.2 180.3S496.5 893.2 402 976.1c-153.8 134.9-65.7-65.2-98.4-140.8-29.7-68.7-82.7 10.9-86.6 17 4.1-106.4 63.6-203.7 157.9-254.3 129.6-69.6 306.5-95.8 585.1-95.8 267.1 0 476.6 42.6 606.4 106.8zm-337 77c0-40.8-128.4-74-286.8-74s-286.8 33.1-286.8 74 128.4 74 286.8 74 286.8-33.2 286.8-74z"
      className="st0"
    />
    <path
      id="Layer_3"
      d="M1703.2 829.8v169.9c0 175-119.3 327.9-289.3 369.5-124.2 30.3-280.6 48.6-453.9 48.6-183.1 0-345.4-20.3-471.4-53.8-160.4-42.7-271.8-188.4-271.8-354.4V864c0-3.9.1-7.8.2-11.7 3.9-6.1 56.9-85.7 86.6-17 32.7 75.6-55.4 275.7 98.4 140.8 94.5-82.9 75.2 152.3 194.8 169.7S652.7 965.5 780 965.5c127.3 0 43.8 181.5 180 181.5s88.1-161.3 180.6-161.3 36.6 239.1 144.6 239.1 42.4-287.4 171.6-310.5c129.2-23.1 52 185.6 131.1 122.7 79-62.8-10.5-184.1 114.7-222.8.5 5.2.6 10.4.6 15.6z"
      className="st0"
    />
    <g id="STROKES">
      <path
        d="M217 852.3c-.2 3.9-.2 7.8-.2 11.7v145.5c0 166 111.4 311.7 271.8 354.4 126 33.5 288.3 53.8 471.4 53.8 173.3 0 329.7-18.2 453.9-48.6 170-41.5 289.3-194.4 289.3-369.5V829.8c0-5.2-.2-10.4-.5-15.5-5.5-87.5-57.1-166.1-136.3-205.3-129.8-64.2-339.3-106.8-606.4-106.8-278.6 0-455.5 26.2-585.1 95.8-94.3 50.7-153.8 147.9-157.9 254.3z"
        className="st1"
      />
      <path
        d="M1229.4 686c0 40.9-128.4 74-286.8 74s-286.8-33.1-286.8-74c0-40.8 128.4-74 286.8-74s286.8 33.1 286.8 74zM1703.2 814.1c-.2 0-.3.1-.5.2-125.2 38.7-35.7 160-114.7 222.8-79.1 62.9-1.9-145.8-131.1-122.7-129.2 23.1-63.6 310.5-171.6 310.5s-52.1-239.1-144.6-239.1S1096.3 1147 960 1147s-52.7-181.5-180-181.5-63.6 197.7-183.2 180.3S496.5 893.2 402 976.1c-153.8 134.9-65.7-65.2-98.4-140.8-29.7-68.7-82.7 10.9-86.6 17-.2.2-.2.4-.2.4"
        className="st1"
      />
    </g>
  </svg>
}

export const IconPlatter: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    viewBox='0 0 100 100'
    fill={color ?? getGlobalStyle('--color-icons-black')}
  >
    <path d='M85.6 82.7H71.3c9.4-4.7 15.9-14.4 15.9-25.6v-5.3c0-.8-.7-1.5-1.5-1.5h-71c-.8 0-1.5.7-1.5 1.5v5.3c0 11.2 6.5 20.9 15.9 25.6H14.7c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h71.2c.8 0 1.5-.7 1.5-1.5s-.9-1.5-1.8-1.5zM16.2 57.1v-3.8h68v3.8c0 14.1-11.4 25.5-25.5 25.6H41.6c-14 0-25.4-11.5-25.4-25.6zm70.9-19.5c0-6.5-5.3-11.8-11.8-11.8-3.6 0-6.9 1.6-9.1 4.3-1.9-.4-4-.4-5.9.2-.2-.5-.4-.9-.6-1.4-.5-1-1-2.1-1.4-3.1-2.7-5.8-4.8-10.4-8.1-11.7-1.3-.5-2.8-.4-4.2.3-4 1.9-8.2 8.3-8.9 15.3-3.2-2.2-5.1-6.1-6.8-9.6-2-4.3-4.2-8.7-8.6-7.5-4.8 1.3-9.7 6.9-11.4 13-1.6 5.6-.4 10.9 3.3 15-.2.3-.3.6-.3.9v10.2c0 .8.7 1.5 1.5 1.5h71c.8 0 1.5-.7 1.5-1.5V41.6c0-.4-.2-.7-.4-1 .1-1 .2-2 .2-3zm-11.8-8.8c4.9 0 8.8 4 8.8 8.8 0 .9-.1 1.7-.4 2.5H66.9V40c-.1-.3-.2-.6-.2-1v-.3c0-.4-.1-.8-.1-1.1 0-.5 0-1 .1-1.4.1-.8.4-1.6.7-2.4 0-.1.1-.2.2-.3.2-.3.3-.6.5-.9 1.6-2.4 4.3-3.8 7.2-3.8zm-10.8 4.1s0 .1-.1.2c-.1.3-.2.6-.3.8 0 .1 0 .1-.1.2-.1.3-.2.7-.3 1v.3c-.1.3-.1.6-.1.8v.3c0 .4-.1.7-.1 1.1 0 .4 0 .8.1 1.2 0 .1 0 .3.1.4 0 .3.1.5.1.8v.1h-1.4v-.3c0-.4 0-.8-.1-1.2v-.4c0-.5-.1-1-.2-1.5 0-.1 0-.2-.1-.3-.1-.4-.2-.8-.2-1.3 0-.2-.1-.3-.1-.5-.1-.4-.2-.9-.4-1.3 0-.1 0-.2-.1-.2 1.1-.3 2.2-.3 3.3-.2zM47.2 17.2c1-.4 1.5-.3 1.9-.2 2.2.8 4.2 5.3 6.4 10.1.5 1 .9 2 1.4 3.1.4.8.7 1.6 1 2.5.2.6.4 1.2.5 1.7 0 .1.1.2.1.3.1.5.3 1.1.4 1.6 0 .1 0 .2.1.3.1.5.2 1.1.2 1.6.1.5.1 1.1.1 1.6v.2h-8.1c-1.9-2.8-1.3-5.1-1.3-5.3.2-.8-.2-1.6-1-1.9-.8-.2-1.6.2-1.9 1 0 .1-.8 2.8.7 6.1h-5.4l-.3-.6c-.1-.1-.2-.3-.2-.4-.3-.5-.5-1-.8-1.5-.8-1.7-1.2-3.5-1.2-5.4-.1-6.2 3.9-13.1 7.4-14.8zm-34.1 9.3c1.6-5.7 6-10.1 9.3-10.9 1.9-.5 3 1.4 5.2 5.9 2 4.2 4.4 9.4 9.4 11.8 0 .1 0 .3.1.4 0 .2 0 .4.1.6 0 .3.1.7.2 1 0 .2.1.4.1.6.1.3.2.7.3 1 .1.2.1.3.2.5l.6 1.5.6 1.2H30c-6.3-3-5.2-8.2-5.1-8.5.2-.8-.3-1.6-1.1-1.8-.8-.2-1.6.3-1.8 1.1-.5 2.1-.3 6 2.9 9.2h-7.6c-.4-.4-.8-.8-1.1-1.3-4.3-4.1-4-9-3.1-12.3zm71 23.8h-68v-7.2h68v7.2zM39.3 78.2c-7.7 0-11-6-11.7-9.5-.2-.8.4-1.6 1.2-1.8.8-.2 1.6.4 1.8 1.2.1.3 1.8 8.2 10.6 6.9.8-.1 1.6.5 1.7 1.3s-.5 1.6-1.3 1.7c-.8.2-1.6.2-2.3.2z' />
  </svg>
}

export const IconEgg: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    viewBox='0 0 100 100'
    fill={color ?? getGlobalStyle('--color-icons-black')}

  >
    <path d='M63.5 86.4c-6.9 0-13.4-3.2-17.6-8.7-2.4.9-4.9 1.3-7.5 1.3-12.3 0-22.3-10-22.3-22.3 0-5.5 2-10.7 5.6-14.8-.4-1.7-.6-3.5-.6-5.3 0-12.3 10-22.3 22.3-22.3 6 0 11.7 2.4 15.9 6.7h1.3c12.3 0 22.3 10 22.3 22.3 0 2.6-.5 5.2-1.4 7.7 2.8 3.8 4.2 8.3 4.2 13.1.1 12.3-9.9 22.3-22.2 22.3zm-17.1-12c.5 0 .9.2 1.2.6 3.6 5.2 9.5 8.3 15.9 8.3 10.6 0 19.3-8.6 19.3-19.3 0-4.4-1.4-8.5-4.1-11.9-.3-.4-.4-1-.2-1.5 1-2.3 1.5-4.8 1.5-7.4 0-10.6-8.6-19.3-19.3-19.3-.6 0-1.2 0-1.8.1-.5 0-.9-.1-1.2-.5-3.6-4-8.8-6.3-14.2-6.3-10.6 0-19.3 8.6-19.3 19.3 0 1.8.2 3.5.7 5.3.1.5 0 1.1-.4 1.4-3.5 3.6-5.4 8.3-5.4 13.3 0 10.6 8.6 19.3 19.3 19.3 2.6 0 5.1-.5 7.4-1.5.2.1.4.1.6.1zm9.2-5.6c-8.9 0-16.2-7.3-16.2-16.2 0-8.9 7.3-16.2 16.2-16.2 8.9 0 16.2 7.3 16.2 16.2 0 8.9-7.3 16.2-16.2 16.2zm0-29.4c-7.3 0-13.2 5.9-13.2 13.2 0 7.3 5.9 13.2 13.2 13.2 7.3 0 13.2-5.9 13.2-13.2 0-7.3-5.9-13.2-13.2-13.2zM50 50.9c0-2.3 1.8-4.1 4.1-4.1.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5c-3.9 0-7.1 3.2-7.1 7.1 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5zm-15.6-16c.3-.3.4-.7.4-1.1 0-.4-.2-.8-.4-1.1-.6-.6-1.6-.6-2.1 0-.3.3-.4.7-.4 1.1 0 .4.2.8.4 1.1.3.3.7.4 1.1.4.3 0 .7-.1 1-.4zm9-9c.3-.3.4-.7.4-1.1 0-.4-.2-.8-.4-1.1-.6-.6-1.6-.6-2.1 0-.3.3-.4.7-.4 1.1 0 .4.2.8.4 1.1.3.3.7.4 1.1.4.3 0 .7-.1 1-.4z' />
  </svg>
}
export const IconPancake: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    viewBox='0 0 100 100'
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}

  >
    <path d='M49.5 71.3c-10.9 0-20.8-1.7-26.4-4.5C19.7 65 18 63 18 60.7c0-1.7 1.1-4.3 6.3-6.5.4-.2.8-.2 1.2 0 1 .4 2.1.8 3.3 1.2.6.2 1.1.8 1.1 1.4V60c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1v-2c0-.4.2-.9.5-1.2.3-.3.8-.4 1.2-.3 4.6.9 10 1.4 15.6 1.4 9.6 0 18.6-1.4 24.1-3.7.4-.2.8-.2 1.2 0 5.2 2.2 6.3 4.8 6.3 6.5 0 2.2-1.5 4.1-4.6 5.7-5.4 3-15.8 4.9-26.9 4.9zM24.9 57.2c-2.4 1.1-3.9 2.4-3.9 3.5 0 1 1.3 2.2 3.4 3.3 5.2 2.6 14.8 4.2 25.1 4.2 10.6 0 20.4-1.7 25.5-4.5 1.9-1 3-2.1 3-3.1 0-1.1-1.4-2.4-3.9-3.5-5.8 2.3-15 3.7-24.6 3.7-5.1 0-10-.4-14.4-1.1v.3c0 2.3-1.8 4.1-4.1 4.1s-4.1-1.9-4.1-4.1v-2c-.7-.3-1.4-.5-2-.8zm3.5 1.1c-.1 0-.3 0-.4-.1-1.3-.4-2.6-.8-3.7-1.3-1.2-.5-2.3-1.1-3.2-1.7-2.1-1.4-3.1-3-3.1-4.8 0-2.4 1.9-4.5 5.7-6.3.4-.2.9-.2 1.2 0 1.1.5 2.4 1 3.8 1.4.6.2 1.1.8 1.1 1.4v9.8c0 .5-.2.9-.6 1.2-.2.3-.5.4-.8.4zm-4-11.1c-2.1 1.1-3.4 2.3-3.4 3.3 0 .7.6 1.5 1.8 2.3.7.5 1.6 1 2.6 1.4.4.2.9.4 1.4.6v-6.6c-.8-.4-1.6-.7-2.4-1zM49.5 61c-5.8 0-11.4-.5-16.2-1.4-.7-.1-1.2-.8-1.2-1.5v-9.8c0-.4.2-.9.5-1.2.3-.3.8-.4 1.2-.3 4.7.9 10.1 1.3 15.6 1.3 3.6 0 7.1-.2 10.5-.6.4-.1.9.1 1.2.4s.5.7.5 1.1v2.6c0 1.1.9 2 2 2 1 0 1.9-.8 2-1.9V47.9c0-.7.5-1.3 1.2-1.5 2.9-.6 5.4-1.4 7.3-2.3.4-.2.9-.2 1.3 0 3.8 1.7 5.7 3.9 5.7 6.3 0 1.7-.9 3.2-2.8 4.6-.9.7-2.1 1.3-3.5 1.9C69 59.5 59.6 61 49.5 61zm-14.4-4.2c4.4.7 9.3 1.1 14.4 1.1 9.6 0 18.6-1.4 24.1-3.7 1.2-.5 2.1-1 2.9-1.6.7-.5 1.6-1.4 1.6-2.2 0-1-1.2-2.2-3.4-3.3-1.7.7-3.7 1.4-6.1 1.9v2.8c-.2 2.6-2.3 4.6-4.9 4.6-2.7 0-5-2.2-5-5v-.9c-3 .3-6 .4-9.2.4-5.1 0-10-.4-14.4-1.1v7zM31 64.2c-2.3 0-4.1-1.9-4.1-4.1v-12c-1.1-.4-2.2-.8-3.1-1.2-4.8-2.2-5.8-4.6-5.8-6.3 0-6.2 13.2-9.7 26.3-10.4.4 0 .8.1 1.1.4.3.3.5.7.5 1.1 0 2 1.7 3.6 3.7 3.6s3.6-1.6 3.7-3.6c0-.4.2-.8.5-1.1.3-.3.7-.4 1.1-.4 13.1.7 26.3 4.2 26.3 10.4 0 1.7-1 4.1-5.7 6.3-1.8.8-4.1 1.6-6.7 2.2v2.5c0 2.7-2.2 5-5 5s-5-2.2-5-5v-.9c-3 .3-6 .4-9.2.4-5.1 0-10-.4-14.4-1.1v10c-.1 2.3-1.9 4.2-4.2 4.2zm12.1-30.9c-14.4 1-22.1 4.8-22.1 7.3 0 1.1 1.5 2.4 4 3.6 1.1.5 2.4 1 3.8 1.4.6.2 1.1.8 1.1 1.4v13c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1V48.3c0-.4.2-.9.5-1.2.3-.3.8-.4 1.2-.3 4.7.9 10.1 1.3 15.6 1.3 3.6 0 7.1-.2 10.5-.6.4-.1.9.1 1.2.4s.5.7.5 1.1v2.6c0 1.1.9 2 2 2s2-.9 2-2v-3.7c0-.7.5-1.3 1.2-1.5 2.9-.6 5.4-1.4 7.3-2.3 2.5-1.1 4-2.5 4-3.6 0-2.5-7.7-6.3-22-7.3-.8 2.9-3.4 5-6.5 5s-5.8-2-6.5-4.9zm6.4 5c-3.6 0-6.6-2.9-6.7-6.4v-.3a6.7 6.7 0 0 1 13.4 0v.3c-.1 3.5-3.1 6.4-6.7 6.4zm-3.7-6.7v.1c0 2 1.7 3.6 3.7 3.6s3.6-1.6 3.7-3.6v-.1c0-2-1.7-3.7-3.7-3.7s-3.6 1.7-3.7 3.7zm7.4 0h1.5-1.5zM50 79.2c-21.3 0-43.9-5.3-43.9-15 0-4.7 5.5-8.8 15.5-11.6.4-.1.9 0 1.3.2.7.5 1.6 1 2.6 1.4.6.2.9.8.9 1.4s-.4 1.1-.9 1.4c-2.8 1.2-4.5 2.6-4.5 3.8 0 1 1.3 2.2 3.4 3.3 5.2 2.6 14.8 4.2 25.1 4.2 10.6 0 20.4-1.7 25.5-4.5 1.9-1 3-2.1 3-3.1 0-1.2-1.7-2.6-4.5-3.8-.6-.2-.9-.8-.9-1.4 0-.6.4-1.1.9-1.4 1.2-.5 2.1-1 2.9-1.6.4-.3.8-.4 1.3-.2 10.4 2.8 16.2 7 16.2 11.8 0 9.8-22.6 15.1-43.9 15.1zM21.4 55.8c-7.6 2.3-12.3 5.5-12.3 8.4 0 5.7 16.8 12 40.9 12s40.9-6.3 40.9-12c0-3.1-5.1-6.4-13.3-8.7-.1 0-.1.1-.2.1 2.9 1.8 3.6 3.7 3.6 5.1 0 2.2-1.5 4.1-4.6 5.7-5.5 3-15.8 4.8-26.9 4.8-10.9 0-20.8-1.7-26.4-4.5-3.4-1.7-5.1-3.7-5.1-6 0-1.3.7-3.1 3.4-4.9z' />
  </svg>
}
export const IconPotate: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    viewBox='0 0 100 100'
  >
    <path d='M73.8 86.5H26.2c-.8 0-1.4-.6-1.5-1.4l-5-53.1c0-.4.1-.8.4-1.2.3-.3.7-.5 1.1-.5h10.2c.8 0 1.5.7 1.5 1.5 0 4.6 1.8 8.8 5 12.1l.4.4c2.1 1.9 4.6 3.3 7.3 4h.1c2.3.6 4.9.7 7.2.3.2 0 .4-.1.6-.1 2.7-.6 5.2-1.8 7.3-3.5.1-.1.3-.2.4-.4 3.7-3.3 5.8-8 5.8-12.9 0-.8.7-1.5 1.5-1.5h10.2c.4 0 .8.2 1.1.5.3.3.4.7.4 1.2l-5 53.1c0 .9-.6 1.5-1.4 1.5zm-51-53.1 4.7 50.1h44.9l4.7-50.1H70c-.4 5.2-2.8 10.1-6.8 13.6-.1.1-.3.3-.5.4-2.5 2-5.4 3.5-8.5 4.1-.2.1-.5.1-.8.2-2.7.5-5.7.4-8.4-.3-.1 0-.2 0-.3-.1-3.1-.9-6-2.5-8.4-4.7l-.5-.5c-3.4-3.4-5.4-7.9-5.8-12.7h-7.2zm14 13.1c-.4 0-.8-.2-1.1-.4-3.4-3.4-5.4-7.9-5.8-12.7h-1c-.8 0-1.5-.7-1.5-1.5V15c0-.8.7-1.5 1.5-1.5h7.9c.8 0 1.5.7 1.5 1.5v30c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zm-6.4-16.1h1c.8 0 1.5.7 1.5 1.5 0 3.1.8 6.1 2.4 8.8V16.5h-4.9v13.9zm14.8 20.9c-.1 0-.3 0-.4-.1-3.2-.8-6.1-2.5-8.5-4.7-.3-.3-.5-.7-.5-1.1v-21c0-.8.7-1.5 1.5-1.5h7.9c.8 0 1.5.7 1.5 1.5v25.5c0 .5-.2.9-.6 1.2-.3.1-.6.2-.9.2zm-6.4-6.5c1.5 1.3 3.1 2.3 4.9 3V25.9h-4.9v18.9zm23.5 2.5c-.2 0-.4 0-.6-.1-.5-.2-.9-.8-.9-1.4V15c0-.8.7-1.5 1.5-1.5h7.9c.8 0 1.5.7 1.5 1.5v16.9c0 .8-.7 1.5-1.5 1.5H70c-.4 5.2-2.8 10.1-6.8 13.6-.2.2-.6.3-.9.3zm1.5-30.8V42c2.1-2.9 3.3-6.5 3.3-10.1 0-.8.7-1.5 1.5-1.5h.1V16.5h-4.9zm-9.9 35.1c-.3 0-.7-.1-.9-.3-.4-.3-.6-.7-.6-1.2V24.4c0-.8.7-1.5 1.5-1.5h7.9c.8 0 1.5.7 1.5 1.5v21.9c0 .4-.2.9-.5 1.2-2.5 2-5.4 3.5-8.5 4.1h-.4zm1.5-25.7v22.3c1.8-.6 3.4-1.5 4.9-2.6V25.9h-4.9zM50 52c-1.7 0-3.5-.2-5.1-.7-.7-.2-1.1-.8-1.1-1.5V19.4c0-.8.7-1.5 1.5-1.5h7.9c.8 0 1.5.7 1.5 1.5v30.9c0 .7-.5 1.4-1.2 1.5-1.2.1-2.3.2-3.5.2zm-3.2-3.3c1.6.3 3.3.4 4.9.2v-28h-4.9v27.8zm3 30.4c-5.6 0-10.1-4.5-10.1-10.1s4.5-10.1 10.1-10.1S59.9 63.4 59.9 69s-4.5 10.1-10.1 10.1zm0-17.2c-3.9 0-7.1 3.2-7.1 7.1s3.2 7.1 7.1 7.1 7.1-3.2 7.1-7.1-3.2-7.1-7.1-7.1z' />
  </svg>
}
export const IconBread: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    viewBox='0 0 100 100'
  >
    <path d='M50 69.7c-25.6 0-40.3-5.8-40.3-15.9 0-6.8 6.5-14.5 16.6-19.8 2.9-1.5 6.1-2.8 9.4-3.7 3-.9 6.1-1.5 9.2-1.8 3.2-.3 6.3-.3 9.4 0 3.3.3 6.6.9 9.8 1.8 3.3 1 6.5 2.2 9.4 3.7 9.9 5.2 16.6 13.1 16.6 19.8.2 10.1-14.5 15.9-40.1 15.9zm0-38.4c-1.5 0-3.1.1-4.7.2-2.9.3-5.8.8-8.7 1.7-3.1.9-6.1 2.1-8.8 3.5-8.8 4.6-15 11.6-15 17.1 0 8 14.3 12.9 37.3 12.9s37.3-4.9 37.3-12.9c0-5.5-6.2-12.5-15-17.1-2.8-1.4-5.7-2.6-8.9-3.5-3-.9-6.2-1.4-9.3-1.7-1.5-.2-2.8-.2-4.2-.2zm-.3 15.9c-3.3 0-6.1-2.7-6.1-6.1V30c0-.8.6-1.4 1.4-1.5 3.2-.3 6.3-.3 9.4 0 .8.1 1.4.7 1.4 1.5v11.2c0 3.3-2.8 6-6.1 6zm-3.1-15.8v9.7c0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1v-9.8c-2.1-.1-4.1 0-6.2.1zm21.8 19.1c-3.3 0-6.1-2.7-6.1-6.1V31.7c0-.5.2-.9.6-1.2.4-.3.9-.4 1.3-.2 3.3 1 6.5 2.2 9.4 3.7.5.3.8.8.8 1.3v9.1c0 3.4-2.7 6.1-6 6.1zm-3.1-16.7v10.7c0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1v-8.2c-2-1-4.1-1.8-6.2-2.5zM31.6 50.5c-3.3 0-6.1-2.7-6.1-6.1v-9.1c0-.6.3-1.1.8-1.3 2.9-1.5 6.1-2.8 9.4-3.7.5-.1.9 0 1.3.2.4.3.6.7.6 1.2v12.7c.1 3.4-2.6 6.1-6 6.1zm-3-14.2v8.1c0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V33.8c-2.2.7-4.3 1.5-6.2 2.5zm-1.5 24.2c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5c-5.3.1-8-3.4-8.1-3.6-.5-.7-1.4-.8-2.1-.3-.7.5-.8 1.4-.3 2.1.1.2 3.7 4.8 10.3 4.8h.2z' />
  </svg>
}
export const IconNoodles: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    viewBox='0 0 100 100'
  >
    <path d='M84.3 59.7v-5.4c0-.8-.7-1.5-1.5-1.5H17.3c-.8 0-1.5.7-1.5 1.5v5.4c0 10.2 5.8 18.6 14.6 22.8H17.3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h65.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H69.6c8.9-4.2 14.7-12.6 14.7-22.8zM56.6 82.3H43.4c-14.3 0-24.6-9.5-24.6-22.6v-3.9h62.5v3.9c0 13.1-10.4 22.6-24.7 22.6zm28.7-61.2c-.3-.3-.7-.4-1.1-.4l-64.5 1c-.8 0-1.5.7-1.5 1.5v4.1c0 .8.7 1.5 1.5 1.5l5.5.1c-.1 2.2.4 4.8 2.2 7.4 3 4.2 1.3 8.1.4 9.5H17.3c-.8 0-1.5.7-1.5 1.5v7.2c0 .8.7 1.5 1.5 1.5h65.5c.8 0 1.5-.7 1.5-1.5v-7.2c0-.8-.7-1.5-1.5-1.5H51.2c1.2-2.8 1.6-7-1.3-11.2-1.3-1.9-1.7-3.7-1.7-5.3l36 .6c.4 0 .8-.2 1.1-.4.3-.3.4-.7.4-1.1v-6.1c0-.5-.2-.9-.4-1.2zm-59.5 4.7-4.5-.1v-1.1l5-.1c-.2.5-.3.9-.5 1.3zm14-1.4c.1 0 .1 0 0 0l6.6-.2c-.3.6-.5 1.2-.7 1.9l-6.8-.1c.4-.9.9-1.5.9-1.6zm-10 .1 6.6-.1c-.2.5-.4 1-.6 1.6l-6.8-.1c.3-.7.7-1.2.8-1.4zm.1 10c-1.4-2-1.8-4-1.7-5.6l7 .1c-.1 2.2.5 4.7 2.2 7.2 3 4.2 1.3 8.1.4 9.5h-6.6c1.2-2.8 1.6-7-1.3-11.2zm51.4 18.4H18.8v-4.2h62.5v4.2zm-33.4-7.2h-6.6c1.2-2.8 1.6-7-1.3-11.2-1.4-2-1.8-3.9-1.7-5.4l7 .1c-.1 2.2.5 4.6 2.2 7.1 2.9 4.2 1.2 8 .4 9.4zm34.8-19-33.8-.5c.4-1 .9-1.7 1-1.8.1-.1.1-.2.2-.3l32.7-.5v3.1zM38.2 76.8c-6.5 0-9.2-4.9-9.6-7.5-.1-.8.4-1.6 1.2-1.7.8-.1 1.6.4 1.7 1.2.1.6 1.2 5.4 7.2 5 .8 0 1.5.6 1.6 1.4 0 .8-.6 1.5-1.4 1.6h-.7z' />
  </svg>
}

export const IconDinner: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 157 88"
    width={size ?? 800}
    height={size ?? 800}
  >
    <g clipPath="url(#a)">
      <path
        fill={color ?? getGlobalStyle('--color-icons-black')}
        d="M148.958 79.172c-1.449-.004-2.899 0-4.373 0h-1.43l-.147-.932a117.18 117.18 0 0 1-.384-2.51c-1.777-12.854-5.199-23.896-10.464-33.759-8.581-16.08-21.593-26.473-38.664-30.892-1.763-.46-3.572-.875-5.322-1.279l-1.981-.46c0-.205.006-.404.008-.6.01-.742.02-1.444-.02-2.144-.144-2.482-.744-4.11-1.889-5.124C83.147.458 81.48.064 79.03.217c-2.838.18-5.831.5-9.423 1.012-2.685.382-4.548.887-5.537 2.217-.99 1.33-.94 3.326-.525 6.104-.015.036-.036.076-.057.121a2.652 2.652 0 0 1-.022.048l-.71.164c-.788.18-1.605.37-2.422.563-18.256 4.314-31.332 14.512-38.863 30.31-6.406 13.437-9.4 27.852-11.463 40.249l-1.655.174c-1.83.192-3.661.383-5.49.59a3.002 3.002 0 0 0-2.23 1.163 2.187 2.187 0 0 0-.263 1.874 3.754 3.754 0 0 0 2.441 2.275c1.267.286 2.566.41 3.864.368h.656c13.204-.07 25.132-.138 37.392-.263 7.247-.074 14.493-.161 21.738-.262 12.636-.164 25.703-.333 38.553-.39 9.825-.041 19.821.066 29.487.17 4.878.053 9.756.1 14.635.141 3.507.026 6.757-.405 6.837-3.683a3.19 3.19 0 0 0-.872-2.41c-1.032-1.07-2.984-1.57-6.143-1.58Zm-15.862-.746v.013L17.488 80.69c.03-.22.057-.44.086-.661.103-1.004.28-1.997.532-2.974.443-1.556.881-3.113 1.316-4.67 2.238-7.988 4.551-16.247 7.87-24.04 6.86-16.101 18.49-25.72 35.562-29.404a61.146 61.146 0 0 1 12.93-1.407 59.047 59.047 0 0 1 25.69 5.955c8.692 4.154 15.753 10.942 20.975 20.173 5.382 9.506 8.861 20.47 10.628 33.52.041.413.047.83.019 1.243ZM70.321 8.723a37.42 37.42 0 0 1 8.313-.885c.192.248.367.509.525.78.02.034.043.07.066.105h-8.904Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={getGlobalStyle('--color-icons-white')} d="M.076.004h156.208v87.949H.076z" />
      </clipPath>
    </defs>
  </svg>
}
export const IconSoup: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size ?? 800}
    height={size ?? 800}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    viewBox='0 0 50 50'
  >
    <path d='M11.004 3.986a1 1 0 0 0-.955.703L9.41 6.65c-.755 2.314-.5 4.977.752 6.897.826 1.266 1.086 3.467.525 5.183l-.638 1.96a1 1 0 1 0 1.902.62l.639-1.96c.755-2.314.5-4.977-.752-6.897-.826-1.266-1.086-3.467-.525-5.183l.638-1.96a1 1 0 0 0-.947-1.324zm7 0a1 1 0 0 0-.955.703L16.41 6.65c-.755 2.314-.5 4.977.752 6.897.826 1.266 1.086 3.467.526 5.183l-.64 1.96a1 1 0 1 0 1.903.62l.639-1.96c.755-2.314.5-4.977-.752-6.897-.826-1.266-1.086-3.467-.526-5.183l.64-1.96a1 1 0 0 0-.948-1.324zm7 0a1 1 0 0 0-.955.703L23.41 6.65c-.755 2.314-.5 4.977.752 6.897.826 1.266 1.086 3.467.526 5.183l-.64 1.96a1 1 0 1 0 1.903.62l.639-1.96c.755-2.314.5-4.977-.752-6.897-.826-1.266-1.086-3.467-.526-5.183l.64-1.96a1 1 0 0 0-.948-1.324zm18.601 6.02a3.47 3.47 0 0 0-.671.064c-.884.173-1.7.688-2.223 1.5l.082-.11L28.357 26H4a1 1 0 0 0-1 1v3c0 .202.07.385.078.584a1 1 0 0 0 .14 1.057c.525 4.166 2.842 7.824 5.9 10.488C12.576 45.143 16.845 47 20.5 47h9c3.654 0 7.923-1.857 11.383-4.871C44.343 39.115 47 34.867 47 30v-3a1 1 0 0 0-1-1H35.937l10.268-10.402a1 1 0 0 0 .078-.088c1.186-1.527.852-3.768-.726-4.883a3.386 3.386 0 0 0-1.952-.621zm-.017 1.988c.279.002.563.088.814.266.665.47.795 1.361.305 2.008L33.127 26H30.99l11.323-13.238a1 1 0 0 0 .08-.11 1.414 1.414 0 0 1 1.195-.658zM5 28h23.676a1 1 0 0 0 .28 0h4.448a1 1 0 0 0 .266 0H45v2c0 4.133-2.291 7.885-5.432 10.621C36.428 43.357 32.446 45 29.5 45h-9c-2.946 0-6.928-1.643-10.068-4.379C7.812 38.34 5.87 35.328 5.27 32H41a1 1 0 1 0 0-2H5v-2z' />
  </svg>
}
export const IconFileUpload: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      stroke={color ?? getGlobalStyle('--color-icons-black')}
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 19v-7m0 0-2.25 2.333M12 12l2.25 2.333m-7.65 3.5c-1.988 0-3.6-1.641-3.6-3.666 0-1.669 1.094-3.077 2.592-3.521A.152.152 0 0 0 5.7 10.5C5.7 7.462 8.118 5 11.1 5s5.4 2.462 5.4 5.5a.09.09 0 0 0 .11.089c.254-.058.518-.089.79-.089 1.988 0 3.6 1.642 3.6 3.667s-1.612 3.666-3.6 3.666'
    />
  </svg>
)

export const IconPdf: React.FC<IconProps> = ({ size, color, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 32 32'
    {...props}
  >
    <title>{'file_type_pdf2'}</title>
    <path
      d='m24.1 2.072 5.564 5.8v22.056H8.879V30h20.856V7.945L24.1 2.072'
      style={{
        fill: '#909090'
      }}
    />
    <path
      d='M24.031 2H8.808v27.928h20.856V7.873L24.03 2'
      style={{
        fill: '#f4f4f4'
      }}
    />
    <path
      d='M8.655 3.5h-6.39v6.827h20.1V3.5H8.655'
      style={{
        fill: '#7a7b7c'
      }}
    />
    <path
      d='M22.472 10.211H2.395V3.379h20.077v6.832'
      style={{
        fill: '#dd2025'
      }}
    />
    <path
      d='M9.052 4.534H7.745v4.8h1.028V7.715L9 7.728a2.042 2.042 0 0 0 .647-.117 1.427 1.427 0 0 0 .493-.291 1.224 1.224 0 0 0 .335-.454 2.13 2.13 0 0 0 .105-.908 2.237 2.237 0 0 0-.114-.644 1.173 1.173 0 0 0-.687-.65 2.149 2.149 0 0 0-.409-.104 2.232 2.232 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.193a.57.57 0 0 1 .459.181.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.942.942 0 0 1-.524.114M12.533 4.521c-.111 0-.219.008-.295.011L12 4.538h-.78v4.8h.918a2.677 2.677 0 0 0 1.028-.175 1.71 1.71 0 0 0 .68-.491 1.939 1.939 0 0 0 .373-.749 3.728 3.728 0 0 0 .114-.949 4.416 4.416 0 0 0-.087-1.127 1.777 1.777 0 0 0-.4-.733 1.63 1.63 0 0 0-.535-.4 2.413 2.413 0 0 0-.549-.178 1.282 1.282 0 0 0-.228-.017m-.182 3.937h-.1V5.392h.013a1.062 1.062 0 0 1 .6.107 1.2 1.2 0 0 1 .324.4 1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a2.926 2.926 0 0 1-.033.513 1.756 1.756 0 0 1-.169.5 1.13 1.13 0 0 1-.363.36.673.673 0 0 1-.416.106M17.43 4.538H15v4.8h1.028V7.434h1.3v-.892h-1.3V5.43h1.4v-.892'
      style={{
        fill: '#464648'
      }}
    />
    <path
      d='M21.781 20.255s3.188-.578 3.188.511-1.975.646-3.188-.511Zm-2.357.083a7.543 7.543 0 0 0-1.473.489l.4-.9c.4-.9.815-2.127.815-2.127a14.216 14.216 0 0 0 1.658 2.252 13.033 13.033 0 0 0-1.4.288Zm-1.262-6.5c0-.949.307-1.208.546-1.208s.508.115.517.939a10.787 10.787 0 0 1-.517 2.434 4.426 4.426 0 0 1-.547-2.162Zm-4.649 10.516c-.978-.585 2.051-2.386 2.6-2.444-.003.001-1.576 3.056-2.6 2.444ZM25.9 20.895c-.01-.1-.1-1.207-2.07-1.16a14.228 14.228 0 0 0-2.453.173 12.542 12.542 0 0 1-2.012-2.655 11.76 11.76 0 0 0 .623-3.1c-.029-1.2-.316-1.888-1.236-1.878s-1.054.815-.933 2.013a9.309 9.309 0 0 0 .665 2.338s-.425 1.323-.987 2.639-.946 2.006-.946 2.006a9.622 9.622 0 0 0-2.725 1.4c-.824.767-1.159 1.356-.725 1.945.374.508 1.683.623 2.853-.91a22.549 22.549 0 0 0 1.7-2.492s1.784-.489 2.339-.623 1.226-.24 1.226-.24 1.629 1.639 3.2 1.581 1.495-.939 1.485-1.035'
      style={{
        fill: '#dd2025'
      }}
    />
    <path
      d='M23.954 2.077V7.95h5.633l-5.633-5.873Z'
      style={{
        fill: '#909090'
      }}
    />
    <path
      d='M24.031 2v5.873h5.633L24.031 2Z'
      style={{
        fill: '#f4f4f4'
      }}
    />
    <path
      d='M8.975 4.457H7.668v4.8H8.7V7.639l.228.013a2.042 2.042 0 0 0 .647-.117 1.428 1.428 0 0 0 .493-.291 1.224 1.224 0 0 0 .332-.454 2.13 2.13 0 0 0 .105-.908 2.237 2.237 0 0 0-.114-.644 1.173 1.173 0 0 0-.687-.65 2.149 2.149 0 0 0-.411-.105 2.232 2.232 0 0 0-.319-.026m-.189 2.294h-.089v-1.48h.194a.57.57 0 0 1 .459.181.92.92 0 0 1 .183.558c0 .246 0 .469-.222.626a.942.942 0 0 1-.524.114M12.456 4.444c-.111 0-.219.008-.295.011l-.235.006h-.78v4.8h.918a2.677 2.677 0 0 0 1.028-.175 1.71 1.71 0 0 0 .68-.491 1.939 1.939 0 0 0 .373-.749 3.728 3.728 0 0 0 .114-.949 4.416 4.416 0 0 0-.087-1.127 1.777 1.777 0 0 0-.4-.733 1.63 1.63 0 0 0-.535-.4 2.413 2.413 0 0 0-.549-.178 1.282 1.282 0 0 0-.228-.017m-.182 3.937h-.1V5.315h.013a1.062 1.062 0 0 1 .6.107 1.2 1.2 0 0 1 .324.4 1.3 1.3 0 0 1 .142.526c.009.22 0 .4 0 .549a2.926 2.926 0 0 1-.033.513 1.756 1.756 0 0 1-.169.5 1.13 1.13 0 0 1-.363.36.673.673 0 0 1-.416.106M17.353 4.461h-2.43v4.8h1.028V7.357h1.3v-.892h-1.3V5.353h1.4v-.892'
      style={{
        fill: '#fff'
      }}
    />
  </svg>
)

export const IconLines: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M14 10c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C17 8.398 17 7.932 17 7c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C15.398 4 14.932 4 14 4H6c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C3 5.602 3 6.068 3 7c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C4.602 10 5.068 10 6 10h8ZM18 20c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C21 18.398 21 17.932 21 17c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C19.398 14 18.932 14 18 14H6c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C3 15.602 3 16.068 3 17c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C4.602 20 5.068 20 6 20h12Z'
    />
  </svg>
)
export const IconLinesFilter: React.FC<IconProps> = ({ size, color }) => {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="1.5" rx="0.75" fill={color ?? getGlobalStyle('--color-icons-primary')} y="5.25" x="4">
    </rect>
    <rect y="9.25" width="9" height="1.5" rx="0.75" fill={color ?? getGlobalStyle('--color-icons-primary')} x="4">
    </rect>
    <rect y="13.25" width="7" height="1.5" rx="0.75" fill={color ?? getGlobalStyle('--color-icons-primary')} x="4">
    </rect>
  </svg>
}

export const IconVisa: React.FC<IconProps> = ({ size, color, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    fill='none'
    viewBox='0 -11 70 70'
    {...props}
  >
    <rect
      width={69}
      height={47}
      x={0.5}
      y={0.5}
      fill='#fff'
      stroke='#D9D9D9'
      rx={5.5}
    />
    <path
      fill='#172B85'
      fillRule='evenodd'
      d='M21.25 32.517h-4.24l-3.18-12.132c-.151-.558-.472-1.052-.943-1.284-1.176-.584-2.473-1.05-3.887-1.284v-.467h6.831c.943 0 1.65.701 1.768 1.516l1.65 8.751 4.239-10.267h4.122l-6.36 15.166Zm8.718 0h-4.005L29.26 17.35h4.005l-3.297 15.166Zm8.479-10.966c.118-.816.825-1.284 1.65-1.284 1.296-.117 2.708.118 3.887.7l.707-3.265A10.138 10.138 0 0 0 41.039 17c-3.887 0-6.715 2.1-6.715 5.017 0 2.218 2.003 3.382 3.418 4.084 1.53.7 2.119 1.166 2.001 1.866 0 1.05-1.178 1.517-2.355 1.517-1.414 0-2.828-.35-4.123-.935l-.707 3.268c1.414.582 2.944.817 4.359.817 4.358.115 7.067-1.984 7.067-5.134 0-3.967-5.537-4.2-5.537-5.949ZM58 32.517 54.82 17.35h-3.416c-.707 0-1.414.467-1.65 1.166l-5.888 14h4.123l.823-2.216h5.065l.472 2.216H58Zm-6.006-11.083 1.176 5.716h-3.298l2.122-5.716Z'
      clipRule='evenodd'
    />
  </svg>
)

export const IconMasterCard: React.FC<IconProps> = ({ size, color, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={800}
    height={800}
    fill='none'
    viewBox='0 -11 70 70'
    {...props}
  >
    <rect
      width={69}
      height={47}
      x={0.5}
      y={0.5}
      fill='#fff'
      stroke='#D9D9D9'
      rx={5.5}
    />
    <path
      fill='#ED0006'
      fillRule='evenodd'
      d='M35.395 34.762a13.502 13.502 0 0 1-8.853 3.298c-7.537 0-13.648-6.181-13.648-13.806 0-7.625 6.11-13.806 13.648-13.806 3.378 0 6.47 1.242 8.852 3.298a13.502 13.502 0 0 1 8.853-3.298c7.537 0 13.648 6.181 13.648 13.806 0 7.625-6.11 13.806-13.648 13.806-3.378 0-6.47-1.242-8.852-3.298Z'
      clipRule='evenodd'
    />
    <path
      fill='#F9A000'
      fillRule='evenodd'
      d='M35.395 34.762a13.841 13.841 0 0 0 4.795-10.508 13.84 13.84 0 0 0-4.795-10.508 13.502 13.502 0 0 1 8.852-3.298c7.537 0 13.648 6.181 13.648 13.806 0 7.625-6.11 13.806-13.648 13.806-3.378 0-6.47-1.242-8.852-3.298Z'
      clipRule='evenodd'
    />
    <path
      fill='#FF5E00'
      fillRule='evenodd'
      d='M35.395 13.746a13.841 13.841 0 0 1 4.795 10.508c0 4.208-1.861 7.976-4.795 10.508A13.841 13.841 0 0 1 30.6 24.254c0-4.208 1.86-7.976 4.795-10.508Z'
      clipRule='evenodd'
    />
  </svg>
)

export const IconUpRightArrow: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      className='icon flat-line'
      data-name='Flat Line'
      viewBox='0 0 24 24'
    >
      <path
        d='M18.36 5.64 5 19'
        style={{
          fill: 'none',
          stroke: color ?? getGlobalStyle('--color-icons-black'),
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2
        }}
      />
      <path
        d='M9 5h10v9.9'
        data-name='primary'
        style={{
          fill: 'none',
          stroke: color ?? getGlobalStyle('--color-icons-black'),
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2
        }}
      />
    </svg>
  )
}
export const IconDownRightArrow: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      className='icon multi-color'
      data-name='Multi Color'
      viewBox='0 0 24 24'
    >
      <title
        style={{
          strokeWidth: 2
        }}
      >
        {'down right'}
      </title>
      <path
        d='M19 9v10H9.1m9.26-.64L5 5'
        style={{
          fill: 'none',
          stroke: color ?? getGlobalStyle('--color-icons-black'),
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2
        }}
      />
    </svg>
  )
}

export const IconAside: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 20}
    height={size ?? 20}
    fill={color ?? getGlobalStyle('--color-icons-black')}
    className="icon max-md:hidden"
    viewBox="0 0 20 20"

  >
    <path d="M6.835 4c-.451.004-.82.012-1.137.038-.386.032-.659.085-.876.162l-.2.086c-.44.224-.807.564-1.063.982l-.103.184c-.126.247-.206.562-.248 1.076-.043.523-.043 1.19-.043 2.135v2.664c0 .944 0 1.612.043 2.135.042.515.122.829.248 1.076l.103.184c.256.418.624.758 1.063.982l.2.086c.217.077.49.13.876.162.316.026.685.034 1.136.038L6.835 4Zm11.33 7.327c0 .922 0 1.654-.048 2.243-.043.522-.125.977-.305 1.395l-.082.177a4 4 0 0 1-1.473 1.593l-.276.155c-.465.237-.974.338-1.57.387-.59.048-1.322.048-2.244.048H7.833c-.922 0-1.654 0-2.243-.048-.522-.042-.977-.126-1.395-.305l-.176-.082a4 4 0 0 1-1.594-1.473l-.154-.275c-.238-.466-.34-.975-.388-1.572-.048-.589-.048-1.32-.048-2.243V8.663c0-.922 0-1.654.048-2.243.049-.597.15-1.106.388-1.571l.154-.276a4 4 0 0 1 1.594-1.472l.176-.083c.418-.18.873-.263 1.395-.305.589-.048 1.32-.048 2.243-.048h4.334c.922 0 1.654 0 2.243.048.597.049 1.106.15 1.571.388l.276.154a4 4 0 0 1 1.473 1.594l.082.176c.18.418.262.873.305 1.395.048.589.048 1.32.048 2.243v2.664Zm-10 4.668h4.002c.944 0 1.612 0 2.135-.043.514-.042.829-.122 1.076-.248l.184-.103c.418-.256.758-.624.982-1.063l.086-.2c.077-.217.13-.49.162-.876.043-.523.043-1.19.043-2.135V8.663c0-.944 0-1.612-.043-2.135-.032-.386-.085-.659-.162-.876l-.086-.2a2.668 2.668 0 0 0-.982-1.063l-.184-.103c-.247-.126-.562-.206-1.076-.248-.523-.043-1.19-.043-2.135-.043H8.164L8.165 4v11.995Z" />
  </svg>
}

export const IconGoal: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    viewBox='0 0 24 24'
  >
    <title />
    <g
      fill="none"
      fillRule="evenodd"
      stroke={color ?? getGlobalStyle('--color-icons-black')}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <circle cx={12} cy={12} r={10} />
      <circle cx={12} cy={12} r={5} />
      <path d="M12.004 12H12" />
    </g>
  </svg>
}

export const IconStar: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={color}
  >
    <path d="M29.895 12.52a1.943 1.943 0 0 0-1.549-1.319l-7.309-1.095-3.29-6.984C17.42 2.43 16.751 2 16 2s-1.42.43-1.747 1.122l-3.242 6.959-7.357 1.12c-.72.11-1.313.615-1.549 1.319a2.004 2.004 0 0 0 .465 2.046l5.321 5.446-1.257 7.676a1.984 1.984 0 0 0 .811 1.959 1.89 1.89 0 0 0 2.02.114l6.489-3.624 6.581 3.624a1.893 1.893 0 0 0 2.02-.114 1.982 1.982 0 0 0 .811-1.959l-1.259-7.686 5.323-5.436a2.004 2.004 0 0 0 .465-2.046z" />
  </svg>
}

export const IconHistory: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 25}
    height={size ?? 25}
    viewBox='0 0 25 25'
    fill={color}>
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
}

export const IconPlusUser: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    width={size ?? 24}
    height={size ?? 24}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <defs>
      <style>
        {
          `.a{fill:none;stroke:${color ?? getGlobalStyle('--color-icons-black')};stroke-linecap:round;stroke-width:1.5px;stroke-linejoin:round}`

        }
      </style>
    </defs>
    <path
      d="m3 21.016.79-2.872c1.306-4.752 4.758-7.16 8.21-7.16"
      className="a"
    />
    <circle
      cx={12}
      cy={5.984}
      r={5}
      style={{
        strokeLinejoin: "bevel",
        fill: "none",
        stroke: color ?? getGlobalStyle('--color-icons-black'),
        strokeLinecap: "round",
        strokeWidth: "1.5px",
      }}
    />
    <circle cx={17} cy={18} r={5} className="a" />
    <path d="M15 18h4M17 16v4" className="a" />
  </svg>
}

export const IconListBullet: React.FC<IconProps> = ({ size, color }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
    width={size ?? 24}
    height={size ?? 24}
    fill={color ?? "#212121"}
  >
    <title />
    <g data-name="menu">
      <path d="M29 6H3a1 1 0 0 0 0 2h26a1 1 0 0 0 0-2ZM3 17h13a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2ZM25 24H3a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2Z" />
    </g>
  </svg>
}

export const IconGrid: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 24 24"
    width={size ?? 24}
    height={size ?? 24}
    fill={color ?? "#212121"}
  >
    <path d="M11.25 15.5c0-.729-.29-1.429-.805-1.945A2.755 2.755 0 0 0 8.5 12.75H5c-.729 0-1.429.29-1.945.805A2.755 2.755 0 0 0 2.25 15.5V19c0 .729.29 1.429.805 1.945A2.755 2.755 0 0 0 5 21.75h3.5c.729 0 1.429-.29 1.945-.805A2.755 2.755 0 0 0 11.25 19v-3.5Zm-1.5 0V19a1.252 1.252 0 0 1-1.25 1.25H5A1.252 1.252 0 0 1 3.75 19v-3.5A1.252 1.252 0 0 1 5 14.25h3.5a1.252 1.252 0 0 1 1.25 1.25ZM11.25 5c0-.729-.29-1.429-.805-1.945A2.755 2.755 0 0 0 8.5 2.25H5c-.729 0-1.429.29-1.945.805A2.755 2.755 0 0 0 2.25 5v3.5c0 .729.29 1.429.805 1.945A2.755 2.755 0 0 0 5 11.25h3.5c.729 0 1.429-.29 1.945-.805A2.755 2.755 0 0 0 11.25 8.5V5Zm-1.5 0v3.5A1.252 1.252 0 0 1 8.5 9.75H5A1.252 1.252 0 0 1 3.75 8.5V5A1.252 1.252 0 0 1 5 3.75h3.5A1.252 1.252 0 0 1 9.75 5ZM21.75 15.5c0-.729-.29-1.429-.805-1.945A2.755 2.755 0 0 0 19 12.75h-3.5c-.729 0-1.429.29-1.945.805a2.755 2.755 0 0 0-.805 1.945V19c0 .729.29 1.429.805 1.945a2.755 2.755 0 0 0 1.945.805H19c.729 0 1.429-.29 1.945-.805A2.755 2.755 0 0 0 21.75 19v-3.5Zm-1.5 0V19A1.252 1.252 0 0 1 19 20.25h-3.5A1.252 1.252 0 0 1 14.25 19v-3.5a1.252 1.252 0 0 1 1.25-1.25H19a1.252 1.252 0 0 1 1.25 1.25ZM21.75 5c0-.729-.29-1.429-.805-1.945A2.755 2.755 0 0 0 19 2.25h-3.5c-.729 0-1.429.29-1.945.805A2.755 2.755 0 0 0 12.75 5v3.5c0 .729.29 1.429.805 1.945a2.755 2.755 0 0 0 1.945.805H19c.729 0 1.429-.29 1.945-.805A2.755 2.755 0 0 0 21.75 8.5V5Zm-1.5 0v3.5A1.252 1.252 0 0 1 19 9.75h-3.5a1.252 1.252 0 0 1-1.25-1.25V5a1.252 1.252 0 0 1 1.25-1.25H19A1.252 1.252 0 0 1 20.25 5Z" />
  </svg>
}

export const IconTag: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    viewBox="0 0 24 24"
    fill={color ?? getGlobalStyle('--color-icons-black')}
  >
    <path d="M20 11.5v-4A3.5 3.5 0 0 0 16.5 4h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h5a1.5 1.5 0 0 0 1.5-1.5v-2a3.5 3.5 0 0 1 3.5-3.5h1a1.5 1.5 0 0 0 1.5-1.5Zm-.073 2.053A2.488 2.488 0 0 1 18.5 14h-1a2.5 2.5 0 0 0-2.5 2.5v2c0 .422-.105.82-.29 1.169a7.509 7.509 0 0 0 5.217-6.116ZM7.5 3h9A4.5 4.5 0 0 1 21 7.5v5a8.5 8.5 0 0 1-8.5 8.5h-5A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z" />
  </svg>
}

export const IconPrint: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 512}
    height={size ?? 512}
    viewBox="0 0 512 512"
  >
    <path
      d="M384 368h24a40.12 40.12 0 0 0 40-40V168a40.12 40.12 0 0 0-40-40H104a40.12 40.12 0 0 0-40 40v160a40.12 40.12 0 0 0 40 40h24"
      style={{
        fill: "none",
        stroke: color ?? "#000",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <rect
      width={256}
      height={208}
      x={128}
      y={240}
      rx={24.32}
      ry={24.32}
      style={{
        fill: "none",
        stroke: color ?? "#000",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <path
      d="M384 128v-24a40.12 40.12 0 0 0-40-40H168a40.12 40.12 0 0 0-40 40v24"
      style={{
        fill: "none",
        stroke: color ?? "#000",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <circle cx={392} cy={184} r={24} />
  </svg>
}

export const IconSimpleCalendar: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 278.4 278.4"
    width={size ?? 24}
    height={size ?? 24}
    strokeWidth={30}
    fill={color ?? getGlobalStyle('--color-icons-black')}
  >
    <path d="M234.9 26.1h-34.8v-8.7c0-5.2-3.5-8.7-8.7-8.7s-8.7 3.5-8.7 8.7v8.7h-87v-8.7c0-5.2-3.5-8.7-8.7-8.7-5.2 0-8.7 3.5-8.7 8.7v8.7H43.5C19.1 26.1 0 45.2 0 69.6v156.6c0 24.4 19.1 43.5 43.5 43.5h191.4c24.4 0 43.5-19.1 43.5-43.5V69.6c0-24.4-19.1-43.5-43.5-43.5zM17.4 69.6c0-13.9 12.2-26.1 26.1-26.1H234.9c13.9 0 26.1 12.2 26.1 26.1v26.1H17.4V69.6zM261 226.2c0 13.9-12.2 26.1-26.1 26.1H43.5c-13.9 0-26.1-12.2-26.1-26.1V113.1H261v113.1z" />
    <path d="M71.4 169.8H50.5c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h20.9c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM123.6 169.8h-20.9c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h20.9c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM175.8 169.8h-20.9c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h20.9c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM228 169.8h-21c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h21c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM71.4 221H50.5c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h20.9c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM123.6 221h-20.9c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h20.9c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM175.8 221h-20.9c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h20.9c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9zM228 221h-21c-3.8 0-6.9-3.1-6.9-6.9v-10.5c0-3.8 3.1-6.9 6.9-6.9h21c3.8 0 6.9 3.1 6.9 6.9v10.5c0 3.8-3.1 6.9-6.9 6.9z" />
  </svg>
}

// IconPhone
export const IconPhone: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size ?? 19}
    height={size ?? 32}
    viewBox="0 0 19 32"
  >
    <g fill={color ?? getGlobalStyle('--color-icons-black')}>
      <path d="M1.5 32h16c.827 0 1.5-.673 1.5-1.5v-29c0-.827-.673-1.5-1.5-1.5h-16C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5zM1 1.5a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v29a.5.5 0 0 1-.5.5h-16a.5.5 0 0 1-.5-.5v-29z" />
      <path d="M2.5 27h14a.5.5 0 0 0 .5-.5v-21a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v21a.5.5 0 0 0 .5.5zM3 6h13v20H3V6z" />
      <circle cx={10} cy={29} r={1} />
      <path d="M7.5 4h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1z" />
    </g>
  </svg>
)

// iconFingerPrint
export const IconFingerPrint: React.FC<IconProps> = ({ size, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill={color ?? getGlobalStyle('--color-icons-black')}  >
    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2a.506.506 0 0 1 .2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67a.49.49 0 0 1-.44.28zM3.5 9.72a.499.499 0 0 1-.41-.79c.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25a.5.5 0 0 1-.12.7c-.23.16-.54.11-.7-.12a9.388 9.388 0 0 0-3.39-2.94c-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07a.47.47 0 0 1-.35-.15c-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1a7.297 7.297 0 0 1-2.17-5.22c0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29a11.14 11.14 0 0 1-.73-3.96c0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" />
  </svg>
)

// email
export const IconEmail: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size ?? 512}
    height={size ?? 512}
    viewBox="0 0 512 512"
  >
    <path
      d="M77.045 76.565h357.904v358.87H77.045z"
      style={{
        fill: "#f1f5f7",
      }}
    />
    <path
      d="m256.002 293.738 178.947 141.697v-279.74L256.002 293.738zm0 0"
      style={{
        fill: "#dce6ea",
      }}
    />
    <path
      d="M449.861 76.565h-14.912L256.002 218.26 77.045 76.565H62.134c-24.693 0-44.737 20.094-44.737 44.858v269.152c0 24.759 20.044 44.859 44.737 44.859h14.911v-279.74l178.957 138.014 178.947-138.047v279.773h14.912c24.699 0 44.742-20.101 44.742-44.859V121.424c.001-24.764-20.042-44.859-44.742-44.859zm0 0"
      style={{
        fill: "#f84437",
      }}
    />
  </svg>
)

// success

export const IconSuccess: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 36}
      height={size ?? 36}
      viewBox="0 0 36 36"
      fill={color ?? getGlobalStyle('--color-icons-black')}
    >
      <path
        d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.45 10.63L15.31 25.76 7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78 11.14-11.13a1.4 1.4 0 1 1 2 2Z"
        className="clr-i-solid clr-i-solid-path-1"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  )
}

// warning

export const IconWarning: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size ?? 24}
      height={size ?? 24}
      fill={color ?? getGlobalStyle('--color-icons-black')}
    >
      <path d="M120 144V96a8 8 0 0 1 16 0v48a8 8 0 0 1-16 0Zm116.768 67.981a23.754 23.754 0 0 1-20.791 12.011H40.023a24 24 0 0 1-20.771-36.022l87.977-151.993a24 24 0 0 1 41.543 0l87.976 151.992a23.754 23.754 0 0 1 .02 24.012ZM222.9 195.984 134.924 43.992a8 8 0 0 0-13.848 0L33.1 195.984a8 8 0 0 0 6.923 12.008h175.954a8 8 0 0 0 6.923-12.008ZM128 168a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12Z" />
    </svg>
  )
}

// error

export const IconError: React.FC<IconProps> = ({ size, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size ?? 24} height={size ?? 24} fill={color ?? getGlobalStyle('--color-icons-black')}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M6.056 8.3a7.01 7.01 0 0 1 .199-.3h11.49c.069.098.135.199.199.3l2.02-1.166 1 1.732-2.213 1.278c.162.59.249 1.213.249 1.856v1h3v2h-3a6.96 6.96 0 0 1-.536 2.69l2.5 1.444-1 1.732-2.526-1.458A6.992 6.992 0 0 1 13 21.929V14h-2v7.93a6.992 6.992 0 0 1-4.438-2.522l-2.526 1.458-1-1.732 2.5-1.443A6.979 6.979 0 0 1 5 15H2v-2h3v-1c0-.643.087-1.265.249-1.856L3.036 8.866l1-1.732L6.056 8.3zM8 6a4 4 0 1 1 8 0H8z" />
    </svg>
  )
}

export const IconSun: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size ?? 612}
    height={size ?? 612}
    viewBox="0 0 612 612"
    fill={color ?? getGlobalStyle('--color-icons-black')}
  >
    <path d="M76.5 286.875H19.125C8.568 286.875 0 295.443 0 306s8.568 19.125 19.125 19.125H76.5c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125zM306 95.625c10.557 0 19.125-8.568 19.125-19.125V19.125C325.125 8.568 316.557 0 306 0s-19.125 8.568-19.125 19.125V76.5c0 10.557 8.568 19.125 19.125 19.125zm184.002 53.167 40.182-40.182c7.401-7.401 7.401-19.393 0-26.794s-19.394-7.401-26.795 0l-40.182 40.182c-7.401 7.401-7.401 19.393 0 26.794 7.402 7.402 19.394 7.402 26.795 0zM141.716 443.509l-40.182 40.182c-7.401 7.401-7.401 19.393 0 26.794s19.393 7.401 26.794 0l40.182-40.182c7.401-7.401 7.401-19.393 0-26.794s-19.392-7.402-26.794 0zm-11.513-286.263c7.478 7.478 19.584 7.478 27.042 0 7.459-7.478 7.459-19.584 0-27.042L116.682 89.62c-7.478-7.478-19.584-7.478-27.043 0-7.478 7.478-7.478 19.584 0 27.043l40.564 40.583zM306 516.375c-10.557 0-19.125 8.568-19.125 19.125v57.375c0 10.557 8.568 19.125 19.125 19.125s19.125-8.568 19.125-19.125V535.5c0-10.557-8.568-19.125-19.125-19.125zm175.797-61.621c-7.478-7.478-19.584-7.478-27.043 0-7.478 7.479-7.478 19.584 0 27.043l40.564 40.564c7.478 7.478 19.584 7.478 27.043 0 7.459-7.479 7.478-19.584 0-27.043l-40.564-40.564zm111.078-167.879H535.5c-10.557 0-19.125 8.568-19.125 19.125s8.568 19.125 19.125 19.125h57.375c10.557 0 19.125-8.568 19.125-19.125s-8.568-19.125-19.125-19.125zM306 133.76c-95.128 0-172.24 77.112-172.24 172.24S210.872 478.24 306 478.24 478.24 401.128 478.24 306 401.128 133.76 306 133.76zm0 306.077c-73.918 0-133.837-59.919-133.837-133.837S232.082 172.163 306 172.163 439.837 232.082 439.837 306 379.918 439.837 306 439.837z" />
  </svg>
}
// icon moon
export const IconMoon: React.FC<IconProps> = ({ size, color }) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill="#fff"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.516}
      d="M2.03 12.42c.36 5.15 4.73 9.34 9.96 9.57 3.69.16 6.99-1.56 8.97-4.27.82-1.11.38-1.85-.99-1.6-.67.12-1.36.17-2.08.14C13 16.06 9 11.97 8.98 7.14c-.01-1.3.26-2.53.75-3.65.54-1.24-.11-1.83-1.36-1.3C4.41 3.86 1.7 7.85 2.03 12.42Z"
    />
  </svg>
}