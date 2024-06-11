import PropTypes from 'prop-types'
import React from 'react'

export interface IconProps {
  style?: React.CSSProperties
  size?: number | string
  color?: string
  width?: number | string
  height?: number | string
}

export const IconDragHandle: React.FC<IconProps> = ({
  style = {},
  size = 24,
  color
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    style={style}
  >
    <path
      fill={color ?? '#0F0F0F'}
      d="M16.192 5.657a1 1 0 0 0 0-1.414l-2.828-2.829a2 2 0 0 0-2.829 0L7.708 4.243a1 1 0 1 0 1.414 1.414L11 3.778v7.272H3.728l1.879-1.878a1 1 0 0 0-1.415-1.415l-2.828 2.829a2 2 0 0 0 0 2.828l2.828 2.829a1 1 0 1 0 1.415-1.415L3.828 13.05H11v7.172l-1.879-1.879a1 1 0 1 0-1.414 1.414l2.829 2.829a2 2 0 0 0 2.828 0l2.828-2.829a1 1 0 0 0-1.414-1.414L13 20.121v-7.07h7.071l-1.778 1.777a1 1 0 0 0 1.414 1.415l2.828-2.829a2 2 0 0 0 0-2.828l-2.828-2.829a1 1 0 1 0-1.414 1.415l1.879 1.878H13V3.88l1.778 1.778a1 1 0 0 0 1.414 0Z"
    />
  </svg>
)

export const IconMiniCheck = ({
  style = {},
  size,
  color
}: IconProps) => {
  return <svg
      fill={color}
      height={size}
      style={style}
      viewBox='0 0 17 14'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    ><path
        clipRule='evenodd'
        d='M2.59 6.57A1 1 0 0 0 1.19 8l5.16 5.09L16.72 2.36A1 1 0 1 0 15.28.97l-8.96 9.28-3.73-3.68z'
        fillRule='evenodd'
    ></path></svg>
}

IconMiniCheck.propTypes = {
  color: PropTypes.any,
  size: PropTypes.any,
  style: PropTypes.object
}

export const IconLogoCMF = ({
  style = {},
  size,
  color
}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={534.489}
    height={137.3}
    style={style}
    color={color}
    viewBox='0 0 534.489 137.3'
>
    <path
      fill='#fff'
      d='M116.524 63.598c0-11.861 8.9-20.23 21.42-20.23 7.706 0 13.851 3.18 16.894 9.188l-7.121 4.155a11.2 11.2 0 0 0-9.852-5.482c-6.828 0-12.017 4.741-12.017 12.388s5.189 12.388 12.017 12.388a11.174 11.174 0 0 0 9.852-5.482l7.121 4.155c-3.044 5.931-9.188 9.267-16.894 9.267-12.524 0-21.42-8.447-21.42-20.308Z'
      data-name='Trazado 4478'
    />
    <path
      fill='#fff'
      d='M187.242 43.368v8.818a11.08 11.08 0 0 0-2.143-.215c-7.042 0-11.49 4.155-11.49 12.232v19.2h-9.27V43.817h8.818v5.774c2.672-4.153 7.491-6.223 14.085-6.223Z'
      data-name='Trazado 4479'
    />
    <path
      fill='#fff'
      d='m226.531 71.753 4.9 5.716c-3.492 4.233-9.052 6.457-15.86 6.457-13.266 0-21.869-8.525-21.869-20.308s8.6-20.23 20.386-20.23c11.042 0 19.937 7.413 20.015 19.781L203.787 69.1c1.931 4.526 6.223 6.964 12.017 6.964a14.3 14.3 0 0 0 10.749-4.292Zm-23.859-8.681v.076l22.377-4.29c-1.268-4.819-5.4-8.076-10.964-8.076-6.75 0-11.412 4.741-11.412 12.31Z'
      data-name='Trazado 4480'
    />
    <path
      fill='#fff'
      d='M283.242 28.386V83.38h-8.9v-5.111c-3.121 3.785-7.706 5.638-13.129 5.638-11.49 0-20.016-8-20.016-20.308s8.525-20.23 20.016-20.23c5.111 0 9.637 1.7 12.758 5.345V28.406h9.266Zm-9.11 35.212c0-7.569-5.111-12.388-11.783-12.388s-11.787 4.819-11.787 12.388 5.111 12.388 11.783 12.388 11.787-4.818 11.787-12.388Z'
      data-name='Trazado 4481'
    />
    <path
      fill='#fff'
      d='M295.63 31.722a5.637 5.637 0 0 1 5.931-5.56c3.414 0 5.93 2.3 5.93 5.345a5.681 5.681 0 0 1-5.93 5.774 5.592 5.592 0 0 1-5.931-5.559Zm1.268 12.076h9.266V83.38h-9.266Z'
      data-name='Trazado 4482'
    />
    <path
      fill='#fff'
      d='M385.993 60.711v22.688h-9.266v-21.5c0-7.042-3.258-10.456-8.9-10.456-6.087 0-10.3 4-10.3 11.861v20.095h-9.266v-21.5c0-7.042-3.258-10.456-8.9-10.456-6.145 0-10.3 4-10.3 11.861v20.095h-9.26V43.817h8.818v5.033c2.965-3.551 7.569-5.482 12.973-5.482 5.774 0 10.593 2.146 13.344 6.594 3.18-4.077 8.525-6.594 14.826-6.594 9.559 0 16.231 5.4 16.231 17.343Z'
      data-name='Trazado 4483'
    />
    <path
      fill='#fff'
      d='M396.078 63.598c0-11.861 8.9-20.23 21.049-20.23s21.128 8.369 21.128 20.23-8.818 20.308-21.128 20.308-21.049-8.447-21.049-20.308Zm32.832 0c0-7.569-5.033-12.388-11.783-12.388s-11.705 4.819-11.705 12.388 5.033 12.388 11.705 12.388 11.783-4.817 11.783-12.388Zm-8.076-35.349h10.886l-12.895 10.164h-8Z'
      data-name='Trazado 4484'
    />
    <path
      fill='#fff'
      d='M485.699 43.798 468.726 83.38h-9.559l-16.971-39.582h9.637l12.31 29.36 12.683-29.36h8.9Z'
      data-name='Trazado 4485'
    />
    <path
      fill='#fff'
      d='M491.708 31.722a5.637 5.637 0 0 1 5.93-5.56c3.414 0 5.931 2.3 5.931 5.345a5.681 5.681 0 0 1-5.931 5.774 5.592 5.592 0 0 1-5.93-5.559Zm1.268 12.076h9.266V83.38h-9.266Z'
      data-name='Trazado 4486'
    />
    <path
      fill='#fff'
      d='M515.878 71.012V28.386h9.266v41.943c0 3.863 1.853 5.931 5.56 5.931a8.193 8.193 0 0 0 3.336-.741l.449 7.413a16.031 16.031 0 0 1-5.56.956c-8.232 0-13.051-4.662-13.051-12.895Z'
      data-name='Trazado 4487'
    />
    <path
      fill='#93d500'
      d='m55.307 70.192 43.075-44.591a9.521 9.521 0 0 0-.234-13.461l-1.58-1.522a37.813 37.813 0 0 0-53.472.936L10.614 45.183a37.789 37.789 0 0 0 .936 53.453l4.584 4.428 24.367 23.546a38.107 38.107 0 0 0 53.862-.936l2.263-2.341a9.521 9.521 0 0 0-.234-13.461l-41.085-39.66'
      data-name='Trazado 4488'
    />
    <path
      fill='#5eb130'
      d='M66.951 137.301a38 38 0 0 1-24.6-8.993 33.158 33.158 0 0 1-8.424-18.986 31.938 31.938 0 0 1-.176-3.355 33.187 33.187 0 0 1 9.344-23.137l12.193-12.618 39.719 38.353 1.366 1.307.059.059a9.52 9.52 0 0 1 .176 13.4l-2.263 2.341a37.907 37.907 0 0 1-27.394 11.629'
      data-name='Trazado 4489'
    />
    <path
      fill='#7fba27'
      d='M42.354 128.288c-.624-.546-1.249-1.092-1.853-1.678l-24.366-23.527-4.366-4.234a38.1 38.1 0 0 1-.956-53.843l8.9-9.208 35.614 34.394-12.192 12.622a33.222 33.222 0 0 0-9.345 23.135 32.217 32.217 0 0 0 .176 3.355 33.158 33.158 0 0 0 8.428 18.982'
      data-name='Trazado 4490'
    />
  </svg>
)

export const IconQrCode = ({
  style = {},
  size = 68.056,
  color
}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size || 68.056}
    height={size || 68.056}
    style={style}
    color={color}
    viewBox='0 0 68.056 68.056'
  >
    <g data-name='Grupo 12613'>
      <g data-name='Grupo 1970'>
        <g fill='#fff' data-name='Grupo 1969'>
          <path
            d='M5.671 6.805v9.074a1.134 1.134 0 0 0 1.134 1.134h9.074a1.134 1.134 0 0 0 1.134-1.134V6.805a1.134 1.134 0 0 0-1.134-1.134H6.805a1.134 1.134 0 0 0-1.134 1.134ZM7.94 7.939h6.806v6.806H7.94Z'
            data-name='Trazado 2206'
          />
          <path
            d='M52.176 17.014h9.074a1.134 1.134 0 0 0 1.134-1.134V6.805a1.134 1.134 0 0 0-1.134-1.134h-9.074a1.134 1.134 0 0 0-1.134 1.134v9.074a1.134 1.134 0 0 0 1.134 1.135ZM53.31 7.94h6.806v6.806H53.31Z'
            data-name='Trazado 2207'
          />
          <path
            d='M15.879 51.042H6.805a1.134 1.134 0 0 0-1.134 1.134v9.074a1.134 1.134 0 0 0 1.134 1.134h9.074a1.134 1.134 0 0 0 1.134-1.134v-9.074a1.134 1.134 0 0 0-1.134-1.134Zm-1.134 9.074H7.94v-6.805h6.806Z'
            data-name='Trazado 2208'
          />
          <path
            d='M10.025 10.22h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 801'
          />
          <path
            d='M2.269 2.269h9.074V0H1.134A1.134 1.134 0 0 0 0 1.134v10.209h2.269Z'
            data-name='Trazado 2209'
          />
          <path
            d='M2.269 56.713H0v10.208a1.134 1.134 0 0 0 1.134 1.134h10.209v-2.268H2.269Z'
            data-name='Trazado 2210'
          />
          <path
            d='M66.921 0H56.713v2.269h9.074v9.074h2.268V1.134A1.134 1.134 0 0 0 66.921 0Z'
            data-name='Trazado 2211'
          />
          <path
            d='M65.787 65.787h-6.805v2.268h7.94a1.134 1.134 0 0 0 1.134-1.134V56.713h-2.269Z'
            data-name='Trazado 2212'
          />
          <path
            d='M55.522 10.22h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 802'
          />
          <path
            d='M10.025 55.717h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 803'
          />
          <path
            d='M19.279 10.22h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 804'
          />
          <path
            d='M35.473 10.22h1.542v2.313h-1.542z'
            data-name='Rect\xE1ngulo 805'
          />
          <path
            d='M39.699 10.208v4.537h4.537v-2.268h-2.268v-2.269Z'
            data-name='Trazado 2213'
          />
          <path
            d='M23.819 10.208v2.269h2.269V7.94h18.148v2.269h2.269V5.671H21.551V7.94h2.268Z'
            data-name='Trazado 2214'
          />
          <path
            d='M19.279 14.847h2.313v4.627h-2.313z'
            data-name='Rect\xE1ngulo 806'
          />
          <path
            d='M21.592 19.474h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 807'
          />
          <path
            d='M23.819 14.745v2.269h2.269v2.269h4.537v-4.538h1.134v-2.268h1.134v-2.269h-4.537v2.269h1.134v2.269Z'
            data-name='Trazado 2215'
          />
          <path
            d='M33.159 17.16h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 808'
          />
          <path
            d='M45.37 28.356h2.269v-2.269h2.269v-2.268H45.37Z'
            data-name='Trazado 2216'
          />
          <path
            d='M35.473 14.847h1.542v2.313h-1.542z'
            data-name='Rect\xE1ngulo 809'
          />
          <path
            d='M28.356 53.31v-2.268h-2.268v-2.269h-2.269v4.537Z'
            data-name='Trazado 2217'
          />
          <path
            d='M46.269 12.533h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 810'
          />
          <path
            d='M45.497 17.16h4.627v4.627h-4.627z'
            data-name='Rect\xE1ngulo 811'
          />
          <path
            d='M5.671 46.505H7.94v-9.074h2.269v-2.269H5.671Z'
            data-name='Trazado 2218'
          />
          <path
            d='M5.398 19.474h11.567v2.313H5.398z'
            data-name='Rect\xE1ngulo 812'
          />
          <path
            d='M10.208 23.819H5.671v6.806H7.94v-2.269h2.269Z'
            data-name='Trazado 2219'
          />
          <path
            d='M28.356 35.162v-2.268h2.269v-4.537h2.269v-2.269h2.268v-2.269h-2.268v-2.268h-2.269v4.537h-2.269v-2.269h-4.537v4.537h2.269v6.806Z'
            data-name='Trazado 2220'
          />
          <path
            d='M19.282 62.385h2.269v-2.269h3.4v2.269h2.269v-2.269h1.134v-2.268h-6.806v-2.269h-2.266Z'
            data-name='Trazado 2221'
          />
          <path
            d='M43.102 38.565v-2.269h2.268v-2.268h2.269v-4.537h-6.806v4.537h-2.268v2.268h2.269v2.269Z'
            data-name='Trazado 2222'
          />
          <path
            d='M39.7 24.954h2.268v-2.269H39.7v-2.268h-2.269v6.806H39.7Z'
            data-name='Trazado 2223'
          />
          <path
            d='M12.338 23.329h4.627v2.313h-4.627z'
            data-name='Rect\xE1ngulo 813'
          />
          <path
            d='M19.279 23.329h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 814'
          />
          <path
            d='M12.338 34.896h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 815'
          />
          <path
            d='M19.279 37.21h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 816'
          />
          <path
            d='M21.592 34.896h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 817'
          />
          <path
            d='M21.592 53.404h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 818'
          />
          <path
            d='M10.025 31.041h2.313v1.542h-2.313z'
            data-name='Rect\xE1ngulo 819'
          />
          <path
            d='M12.338 28.727h4.627v2.313h-4.627z'
            data-name='Rect\xE1ngulo 820'
          />
          <path
            d='M16.965 31.041h2.313v1.542h-2.313z'
            data-name='Rect\xE1ngulo 821'
          />
          <path
            d='M35.473 29.498h1.542v2.313h-1.542z'
            data-name='Rect\xE1ngulo 822'
          />
          <path
            d='M33.159 31.812h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 823'
          />
          <path
            d='M36.244 37.21h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 824'
          />
          <path
            d='M50.895 34.896h4.627v2.313h-4.627z'
            data-name='Rect\xE1ngulo 825'
          />
          <path
            d='M55.522 37.21h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 826'
          />
          <path
            d='M31.617 37.21h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 827'
          />
          <path
            d='M30.625 37.431h-4.537V39.7h-2.269v2.268h4.537V39.7h2.269Z'
            data-name='Trazado 2224'
          />
          <path
            d='M32.894 60.116h-2.269v2.268h4.537v-2.268h2.269v-2.269h-4.537Z'
            data-name='Trazado 2225'
          />
          <path
            d='M44.237 57.847v2.269h-2.269v2.268h4.537v-2.268h2.269v-2.269Z'
            data-name='Trazado 2226'
          />
          <path
            d='M54.444 23.819V21.55h2.269v-2.268h-4.537v2.269h-2.269v2.269Z'
            data-name='Trazado 2227'
          />
          <path
            d='M33.93 44.921h2.313v3.085H33.93z'
            data-name='Rect\xE1ngulo 828'
          />
          <path
            d='M33.93 50.319h2.313v2.313H33.93z'
            data-name='Rect\xE1ngulo 829'
          />
          <path
            d='M30.846 55.717h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 830'
          />
          <path
            d='M31.759 45.37v-2.268h-2.268v4.537h2.268Z'
            data-name='Trazado 2228'
          />
          <path
            d='M36.244 52.633h2.313v1.542h-2.313z'
            data-name='Rect\xE1ngulo 831'
          />
          <path
            d='M53.31 60.116h-4.537v2.268h6.806v-4.537H53.31Z'
            data-name='Trazado 2229'
          />
          <path
            d='M53.209 53.404h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 832'
          />
          <path
            d='M48.582 53.404h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 833'
          />
          <path
            d='M44.726 53.404h1.542v2.313h-1.542z'
            data-name='Rect\xE1ngulo 834'
          />
          <path
            d='M46.269 51.09h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 835'
          />
          <path
            d='M39.328 58.031h3.085v2.313h-3.085z'
            data-name='Rect\xE1ngulo 836'
          />
          <path
            d='M19.279 32.583h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 837'
          />
          <path
            d='M60.116 62.385h2.269v-6.806h-4.538v2.268h2.268Z'
            data-name='Trazado 2230'
          />
          <path
            d='M57.836 51.09h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 838'
          />
          <path
            d='M62.384 41.968h-2.269v4.537h-2.268v2.269h4.537Z'
            data-name='Trazado 2231'
          />
          <path
            d='M60.149 37.21h2.313v2.313h-2.313z'
            data-name='Rect\xE1ngulo 839'
          />
          <path
            d='M62.385 19.282h-2.269V29.49h-4.537v-2.268h-4.537v4.537h9.074v3.4h2.269Z'
            data-name='Trazado 2232'
          />
          <path
            d='M45.37 49.907V45.37h-2.268v-4.537h-6.806v4.537h2.269v4.537Z'
            data-name='Trazado 2233'
          />
          <path
            d='M19.282 39.699h-9.074v9.074h4.537v-2.268h-2.268v-2.269h4.537v6.806h2.269v-2.268h4.537v-2.268h-2.269v-2.269h2.269v-2.268h-4.538Z'
            data-name='Trazado 2234'
          />
          <path
            d='M57.847 41.968H53.31v-2.269h-4.537v4.537h2.269v6.806h2.268v-2.268h2.269v-4.537h2.268Z'
            data-name='Trazado 2235'
          />
        </g>
      </g>
      <g data-name='codigo-qr'>
        <g data-name='Grupo 1970'>
          <g fill='#fff' data-name='Grupo 1969'>
            <path
              d='M6.708 62.287h9.074a1.134 1.134 0 0 0 1.134-1.134v-9.074a1.134 1.134 0 0 0-1.134-1.134H6.708a1.134 1.134 0 0 0-1.134 1.134v9.074a1.134 1.134 0 0 0 1.134 1.134Zm1.135-2.269v-6.805h6.805v6.805Z'
              data-name='Trazado 2206'
            />
            <path
              d='M16.917 15.782V6.708a1.134 1.134 0 0 0-1.134-1.134H6.708a1.134 1.134 0 0 0-1.134 1.134v9.074a1.134 1.134 0 0 0 1.134 1.134h9.074a1.134 1.134 0 0 0 1.135-1.134Zm-9.074-1.135V7.842h6.805v6.805Z'
              data-name='Trazado 2207'
            />
            <path
              d='M50.944 52.079v9.074a1.134 1.134 0 0 0 1.134 1.134h9.074a1.134 1.134 0 0 0 1.134-1.134v-9.074a1.134 1.134 0 0 0-1.134-1.134h-9.074a1.134 1.134 0 0 0-1.134 1.134Zm9.074 1.134v6.805h-6.805v-6.805Z'
              data-name='Trazado 2208'
            />
            <path
              d='M10.123 57.933V55.62h2.313v2.313z'
              data-name='Rect\xE1ngulo 801'
            />
            <path
              d='M10.123 12.436v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 802'
            />
            <path
              d='M55.62 57.933V55.62h2.313v2.313z'
              data-name='Rect\xE1ngulo 803'
            />
            <path
              d='M10.123 48.679v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 804'
            />
            <path
              d='M10.123 32.485v-1.542h2.313v1.542z'
              data-name='Rect\xE1ngulo 805'
            />
            <path
              d='M10.111 28.259h4.537v-4.537H12.38v2.268h-2.269Z'
              data-name='Trazado 2213'
            />
            <path
              d='M10.111 44.138h2.269V41.87H7.843V23.722h2.268v-2.269H5.574v24.954h2.269v-2.269Z'
              data-name='Trazado 2214'
            />
            <path
              d='M14.749 48.679v-2.313h4.627v2.313z'
              data-name='Rect\xE1ngulo 806'
            />
            <path
              d='M19.376 46.366v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 807'
            />
            <path
              d='M14.648 44.139h2.269V41.87h2.268v-4.537h-4.537v-1.134H12.38v-1.134h-2.269v4.537h2.269v-1.134h2.268Z'
              data-name='Trazado 2215'
            />
            <path
              d='M17.063 34.799v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 808'
            />
            <path
              d='M28.259 22.588v-2.269h-2.268v-2.268h-2.269v4.537Z'
              data-name='Trazado 2216'
            />
            <path
              d='M14.749 32.485v-1.542h2.313v1.542z'
              data-name='Rect\xE1ngulo 809'
            />
            <path
              d='M53.213 39.602h-2.268v2.268h-2.269v2.269h4.537Z'
              data-name='Trazado 2217'
            />
            <path
              d='M12.436 21.689v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 810'
            />
            <path
              d='M17.063 22.461v-4.627h4.627v4.627z'
              data-name='Rect\xE1ngulo 811'
            />
            <path
              d='M46.408 62.287v-2.269h-9.074V57.75h-2.269v4.537Z'
              data-name='Trazado 2218'
            />
            <path
              d='M19.376 62.56V50.993h2.313V62.56z'
              data-name='Rect\xE1ngulo 812'
            />
            <path
              d='M23.722 57.75v4.537h6.806v-2.269h-2.269V57.75Z'
              data-name='Trazado 2219'
            />
            <path
              d='M35.065 39.602h-2.268v-2.269H28.26v-2.268h-2.269v-2.269h-2.268v2.269h-2.269v2.268h4.537v2.269h-2.268v4.537h4.537V41.87h6.806Z'
              data-name='Trazado 2220'
            />
            <path
              d='M62.287 48.676v-2.269h-2.269v-3.4h2.269v-2.271h-2.269v-1.134H57.75v6.805h-2.269v2.269Z'
              data-name='Trazado 2221'
            />
            <path
              d='M38.467 24.856h-2.268v-2.269H33.93v-2.268h-4.537v6.805h4.537v2.269h2.269v-2.269h2.268Z'
              data-name='Trazado 2222'
            />
            <path
              d='M24.856 28.258V25.99h-2.268v2.268h-2.269v2.269h6.806v-2.269Z'
              data-name='Trazado 2223'
            />
            <path
              d='M23.232 55.62v-4.627h2.313v4.627z'
              data-name='Rect\xE1ngulo 813'
            />
            <path
              d='M23.232 48.679v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 814'
            />
            <path
              d='M34.799 55.62v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 815'
            />
            <path
              d='M37.113 48.679v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 816'
            />
            <path
              d='M34.799 46.366v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 817'
            />
            <path
              d='M53.307 46.366v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 818'
            />
            <path
              d='M30.943 57.933V55.62h1.542v2.313z'
              data-name='Rect\xE1ngulo 819'
            />
            <path
              d='M28.63 55.62v-4.627h2.313v4.627z'
              data-name='Rect\xE1ngulo 820'
            />
            <path
              d='M30.943 50.993V48.68h1.542v2.313z'
              data-name='Rect\xE1ngulo 821'
            />
            <path
              d='M29.401 32.485v-1.542h2.313v1.542z'
              data-name='Rect\xE1ngulo 822'
            />
            <path
              d='M31.715 34.799v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 823'
            />
            <path
              d='M37.113 31.714v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 824'
            />
            <path
              d='M34.799 17.063v-4.627h2.313v4.627z'
              data-name='Rect\xE1ngulo 825'
            />
            <path
              d='M37.113 12.436v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 826'
            />
            <path
              d='M37.113 36.341v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 827'
            />
            <path
              d='M37.333 37.333v4.537h2.269v2.269h2.268v-4.537h-2.268v-2.269Z'
              data-name='Trazado 2224'
            />
            <path
              d='M60.019 35.064v2.269h2.268v-4.537h-2.268v-2.269H57.75v4.537Z'
              data-name='Trazado 2225'
            />
            <path
              d='M57.75 23.721h2.269v2.269h2.268v-4.537h-2.268v-2.269H57.75Z'
              data-name='Trazado 2226'
            />
            <path
              d='M23.722 13.514h-2.268v-2.269h-2.269v4.537h2.269v2.269h2.268Z'
              data-name='Trazado 2227'
            />
            <path
              d='M44.824 34.028v-2.313h3.085v2.313z'
              data-name='Rect\xE1ngulo 828'
            />
            <path
              d='M50.222 34.028v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 829'
            />
            <path
              d='M55.62 37.112v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 830'
            />
            <path
              d='M45.274 36.199h-2.269v2.268h4.537v-2.268Z'
              data-name='Trazado 2228'
            />
            <path
              d='M52.535 31.714v-2.313h1.542v2.313z'
              data-name='Rect\xE1ngulo 831'
            />
            <path
              d='M60.019 14.648v4.537h2.268v-6.806H57.75v2.269Z'
              data-name='Trazado 2229'
            />
            <path
              d='M53.307 14.749v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 832'
            />
            <path
              d='M53.307 19.376v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 833'
            />
            <path
              d='M53.307 23.232V21.69h2.313v1.542z'
              data-name='Rect\xE1ngulo 834'
            />
            <path
              d='M50.993 21.689v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 835'
            />
            <path
              d='M57.934 28.63v-3.085h2.313v3.085z'
              data-name='Rect\xE1ngulo 836'
            />
            <path
              d='M32.486 48.679v-2.313h2.313v2.313z'
              data-name='Rect\xE1ngulo 837'
            />
            <path
              d='M62.287 7.842V5.574h-6.806v4.537h2.269V7.842Z'
              data-name='Trazado 2230'
            />
            <path
              d='M50.993 10.122V7.809h2.313v2.313z'
              data-name='Rect\xE1ngulo 838'
            />
            <path
              d='M41.87 5.574v2.268h4.537v2.269h2.269V5.574Z'
              data-name='Trazado 2231'
            />
            <path
              d='M37.113 7.809V5.496h2.313v2.313z'
              data-name='Rect\xE1ngulo 839'
            />
            <path
              d='M19.185 5.573v2.269h10.208v4.537h-2.268v4.537h4.537V7.842h3.4V5.573Z'
              data-name='Trazado 2232'
            />
            <path
              d='M49.81 22.588h-4.537v2.268h-4.537v6.806h4.537v-2.269h4.537Z'
              data-name='Trazado 2233'
            />
            <path
              d='M39.602 48.676v9.074h9.074v-4.537h-2.268v2.268h-2.269v-4.537h6.806v-2.268h-2.269v-4.537h-2.268v2.268h-2.269v-2.269h-2.268v4.538Z'
              data-name='Trazado 2234'
            />
            <path
              d='M41.871 10.111v4.537h-2.269v4.537h4.537v-2.269h6.806v-2.268h-2.269v-2.269h-4.537v-2.268Z'
              data-name='Trazado 2235'
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export const IconLogoCMFBlue = ({
  width = 138.426,
  height = 35.559,
  ...props

}: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 138.426 35.559'
    {...props}
  >
    <path
      fill='#011e41'
      d='M30.178 16.471c0-3.072 2.3-5.239 5.548-5.239a4.61 4.61 0 0 1 4.375 2.38l-1.844 1.076a2.9 2.9 0 0 0-2.551-1.42 3.01 3.01 0 0 0-3.112 3.208 3.01 3.01 0 0 0 3.112 3.208 2.894 2.894 0 0 0 2.551-1.42l1.844 1.076a4.66 4.66 0 0 1-4.375 2.4 5.2 5.2 0 0 1-5.548-5.26Z'
      data-name='Trazado 4478'
    />
    <path
      fill='#011e41'
      d='M48.493 11.232v2.284a2.869 2.869 0 0 0-.556-.056c-1.824 0-2.976 1.076-2.976 3.168v4.974h-2.4V11.348h2.284v1.5a4.034 4.034 0 0 1 3.648-1.616Z'
      data-name='Trazado 4479'
    />
    <path
      fill='#011e41'
      d='m58.668 18.583 1.268 1.48a5.128 5.128 0 0 1-4.108 1.672c-3.436 0-5.664-2.208-5.664-5.26a5.083 5.083 0 0 1 5.28-5.239 4.942 4.942 0 0 1 5.184 5.123l-7.853 1.538a3.122 3.122 0 0 0 3.112 1.8 3.7 3.7 0 0 0 2.784-1.112Zm-6.179-2.248v.02l5.8-1.112a2.8 2.8 0 0 0-2.839-2.092 2.9 2.9 0 0 0-2.956 3.188Z'
      data-name='Trazado 4480'
    />
    <path
      fill='#011e41'
      d='M73.356 7.352v14.243h-2.3v-1.324a4.228 4.228 0 0 1-3.4 1.46 4.988 4.988 0 0 1-5.184-5.26 4.971 4.971 0 0 1 5.184-5.239 4.2 4.2 0 0 1 3.3 1.384v-5.26h2.4Zm-2.359 9.12a3.055 3.055 0 1 0-6.1 0 3.055 3.055 0 1 0 6.1 0Z'
      data-name='Trazado 4481'
    />
    <path
      fill='#011e41'
      d='M76.564 8.216a1.46 1.46 0 0 1 1.536-1.44 1.429 1.429 0 0 1 1.536 1.384 1.471 1.471 0 0 1-1.536 1.5 1.448 1.448 0 0 1-1.536-1.444Zm.328 3.127h2.4v10.252h-2.4Z'
      data-name='Trazado 4482'
    />
    <path
      fill='#011e41'
      d='M99.967 15.724v5.878h-2.4v-5.57c0-1.824-.844-2.708-2.3-2.708-1.576 0-2.668 1.036-2.668 3.072v5.2h-2.4v-5.564c0-1.824-.844-2.708-2.3-2.708-1.592 0-2.668 1.036-2.668 3.072v5.2h-2.4V11.348h2.284v1.3a4.255 4.255 0 0 1 3.36-1.42 3.844 3.844 0 0 1 3.456 1.708 4.782 4.782 0 0 1 3.84-1.708c2.476 0 4.2 1.4 4.2 4.492Z'
      data-name='Trazado 4483'
    />
    <path
      fill='#011e41'
      d='M102.579 16.472a5.466 5.466 0 1 1 5.452 5.26 5.159 5.159 0 0 1-5.452-5.26Zm8.5 0a3.046 3.046 0 1 0-6.083 0 3.046 3.046 0 1 0 6.083 0Zm-2.092-9.155h2.819l-3.34 2.632h-2.067Z'
      data-name='Trazado 4484'
    />
    <path
      fill='#011e41'
      d='m125.79 11.343-4.4 10.251h-2.476l-4.4-10.251h2.5l3.188 7.6 3.284-7.6h2.3Z'
      data-name='Trazado 4485'
    />
    <path
      fill='#011e41'
      d='M127.346 8.216a1.46 1.46 0 0 1 1.536-1.44 1.429 1.429 0 0 1 1.536 1.384 1.471 1.471 0 0 1-1.536 1.5 1.448 1.448 0 0 1-1.536-1.444Zm.328 3.127h2.4v10.252h-2.4Z'
      data-name='Trazado 4486'
    />
    <path
      fill='#011e41'
      d='M133.606 18.392V7.352h2.4v10.863c0 1 .48 1.536 1.44 1.536a2.122 2.122 0 0 0 .864-.192l.116 1.92a4.152 4.152 0 0 1-1.44.248 3.061 3.061 0 0 1-3.38-3.34Z'
      data-name='Trazado 4487'
    />
    <path
      fill='#93d500'
      d='m14.323 18.179 11.156-11.55a2.466 2.466 0 0 0-.061-3.486l-.409-.394a9.793 9.793 0 0 0-13.849.243l-8.412 8.709a9.787 9.787 0 0 0 .243 13.844l1.187 1.147 6.31 6.1a9.869 9.869 0 0 0 13.95-.243l.586-.606a2.466 2.466 0 0 0-.061-3.486l-10.64-10.273'
      data-name='Trazado 4488'
    />
    <path
      fill='#5eb130'
      d='M17.34 35.559a9.843 9.843 0 0 1-6.371-2.329 8.587 8.587 0 0 1-2.183-4.916 8.272 8.272 0 0 1-.045-.869 8.6 8.6 0 0 1 2.42-5.992l3.158-3.269 10.287 9.933.354.339.015.015a2.466 2.466 0 0 1 .045 3.471l-.586.606a9.817 9.817 0 0 1-7.094 3.011'
      data-name='Trazado 4489'
    />
    <path
      fill='#7fba27'
      d='M10.965 33.222a12.156 12.156 0 0 1-.48-.435l-6.31-6.093-1.132-1.1a9.868 9.868 0 0 1-.248-13.945l2.3-2.385 9.226 8.907-3.158 3.269a8.6 8.6 0 0 0-2.42 5.992 8.344 8.344 0 0 0 .045.869 8.587 8.587 0 0 0 2.191 4.921'
      data-name='Trazado 4490'
    />
  </svg>
)

export const IconClose = ({
  width = 56.923,
  height = 56.923,
  size,
  color,
  ...props
}: IconProps) => (
  <svg
  viewBox='0 0 56.923 56.923'
    xmlns='http://www.w3.org/2000/svg'
    width={size || width}
    height={size || height}
    data-name='cancel_black_24dp (1)'
    {...props}
  >
    <path
      fill='none'
      d='M0 0h56.923v56.923H0Z'
      data-name='Trazado 4378'
      opacity={0.87}
    />
    <path
      fill={color || '#666b76'}
      d='M28.462 4.744A23.718 23.718 0 1 0 52.18 28.462 23.7 23.7 0 0 0 28.462 4.744Zm10.2 33.917a2.362 2.362 0 0 1-3.344 0l-6.854-6.854-6.854 6.854a2.365 2.365 0 0 1-3.344-3.344l6.854-6.854-6.854-6.854a2.365 2.365 0 0 1 3.344-3.344l6.854 6.854 6.854-6.854a2.365 2.365 0 1 1 3.344 3.344l-6.854 6.854 6.854 6.854a2.406 2.406 0 0 1 0 3.344Z'
      data-name='Trazado 4379'
    />
  </svg>
)

IconClose.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  size: PropTypes.any,
  width: PropTypes.number
}

export const IconMainLogo = ({
  size,
  height = 53.181,
  width = 40.828,
  ...props
}: IconProps) => (
  <svg
  viewBox="0 0 40.828 53.181"
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    data-name="Grupo 8159"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path
          fill="none"
          d="M0 0h13.431v13.751H0z"
          data-name="Rect\xE1ngulo 2857"
        />
      </clipPath>
      <clipPath id="b">
        <path
          fill="none"
          d="M0 0h11.307v18.961H0z"
          data-name="Rect\xE1ngulo 2859"
        />
      </clipPath>
    </defs>
    <path
      fill="#fff"
      d="M23.045 19.089c-6.583 0-11.585 5.181-11.585 12.014s5 12.135 11.585 12.135a15.34 15.34 0 0 0 9.487-3.95 1.582 1.582 0 0 1 2.2.1l4.409 4.74a1.574 1.574 0 0 1-.078 2.226 25.449 25.449 0 0 1-16.624 6.825C9.572 53.179 0 43.785 0 31.222S9.818 9.635 22.865 9.635a24.7 24.7 0 0 1 16.186 6.266 1.577 1.577 0 0 1 .137 2.167l-4.379 5.249a1.56 1.56 0 0 1-2.29.13 14.056 14.056 0 0 0-9.473-4.362"
      data-name="Trazado 4340"
    />
    <path
      fill="#93d500"
      d="m29.342 14.388-8.825-9.143a1.951 1.951 0 0 1 .048-2.759l.324-.312a7.747 7.747 0 0 1 10.955.193l6.659 6.9a7.748 7.748 0 0 1-.193 10.957l-.937.9-4.993 4.826a7.809 7.809 0 0 1-11.039-.193l-.465-.48a1.951 1.951 0 0 1 .048-2.759l8.421-8.129Z"
      data-name="Trazado 4344"
    />
    <g
      data-name="Grupo 8151"
      opacity={0.8}
      style={{
        mixBlendMode: 'multiply',
        isolation: 'isolate'
      }}
    >
      <g data-name="Grupo 8150">
        <g
          clipPath="url(#a)"
          data-name="Grupo 8149"
          transform="translate(20.329 14.494)"
        >
          <g data-name="Grupo 8148">
            <g clipPath="url(#a)" data-name="Grupo 8147">
              <path
                fill="#93d500"
                d="m1.013 11.37-.464-.48a1.95 1.95 0 0 1 .047-2.759L9.017.002l2.5 2.586a6.827 6.827 0 0 1 .153 9.319 7.8 7.8 0 0 1-10.656-.54"
                data-name="Trazado 4345"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
    <g
      data-name="Grupo 8156"
      opacity={0.4}
      style={{
        mixBlendMode: 'multiply',
        isolation: 'isolate'
      }}
    >
      <g data-name="Grupo 8155">
        <g
          clipPath="url(#b)"
          data-name="Grupo 8154"
          transform="translate(29.521 7.336)"
        >
          <g data-name="Grupo 8153">
            <g clipPath="url(#b)" data-name="Grupo 8152">
              <path
                fill="#93d500"
                d="m7.299 0 1.818 1.887a7.811 7.811 0 0 1-.193 11.04l-.9.865-4.994 4.825a5.65 5.65 0 0 1-.384.344 6.825 6.825 0 0 0-.153-9.318L0 7.055 7.3.003Z"
                data-name="Trazado 4346"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export const IconStrokeLogo = ({
  size,
  height,
  width,
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    id="Grupo_8249"
    style={{
      height: 'fit-content',
      width: '100px',
      position: 'absolute',
      bottom: '-15px'
    }}
    viewBox="0 0 300 300"
    {...props}
  >
    <style>
      {
        '.st3{stroke:#fff;stroke-width:4;stroke-miterlimit:20}.st3,.st6{fill:none}'
      }
    </style>
    <g id="Grupo_8208">
      <defs>
        <path id="SVGID_1_" d="M0 1.5h220v360H0z" />
      </defs>
      <clipPath id="SVGID_00000100346351545699900740000011948262669616435874_">
        <use
          xlinkHref="#SVGID_1_"
          style={{
            overflow: 'visible'
          }}
        />
      </clipPath>
      <g
        id="Enmascarar_grupo_5"
        style={{
          clipPath:
            'url(#SVGID_00000100346351545699900740000011948262669616435874_)'
        }}
      >
        <g id="Grupo_8169" transform="translate(-65.258 722.844)">
          <defs>
            <path
              id="SVGID_00000143603540551519589340000006006100239887967362_"
              d="M0-718.5h280.2v380.8H0z"
            />
          </defs>
          <clipPath id="SVGID_00000109708651981263900830000007838405873673531778_">
            <use
              xlinkHref="#SVGID_00000143603540551519589340000006006100239887967362_"
              style={{
                overflow: 'visible'
              }}
            />
          </clipPath>
          <g
            id="Grupo_8168"
            style={{
              clipPath:
                'url(#SVGID_00000109708651981263900830000007838405873673531778_)'
            }}
          >
            <g id="Grupo_8167">
              <defs>
                <path
                  id="SVGID_00000175303297583066302120000011722304236356822707_"
                  d="M0-718.5h280.2v380.8H0z"
                />
              </defs>
              <clipPath id="SVGID_00000139269977908429801710000000728549993598244488_">
                <use
                  xlinkHref="#SVGID_00000175303297583066302120000011722304236356822707_"
                  style={{
                    overflow: 'visible'
                  }}
                />
              </clipPath>
              <g
                id="Grupo_8166"
                style={{
                  clipPath:
                    'url(#SVGID_00000139269977908429801710000000728549993598244488_)'
                }}
              >
                <path
                  id="Trazado_4364"
                  d="M126.8-523.8 7.4-647.5c-10.1-10.5-9.8-27.2.6-37.3l4.4-4.2c41.7-40.2 108-39.1 148.2 2.6l90.1 93.3c40.2 41.7 39.1 108-2.6 148.3l-12.7 12.2-67.4 65.3c-42 40.5-108.9 39.4-149.4-2.6l-6.3-6.5c-10.1-10.5-9.9-27.2.6-37.3l113.9-110.1z"
                  className="st3"
                />
                <g
                  id="Grupo_8165"
                  style={{
                    opacity: 0.4
                  }}
                  transform="translate(126.894 99.279)"
                >
                  <g id="Grupo_8164">
                    <defs>
                      <path
                        id="SVGID_00000172421797323369743630000013436532405955903378_"
                        d="M0-718.5h153v256.6H0z"
                      />
                    </defs>
                    <clipPath id="SVGID_00000030463056819404080830000015000140169798954633_">
                      <use
                        xlinkHref="#SVGID_00000172421797323369743630000013436532405955903378_"
                        style={{
                          overflow: 'visible'
                        }}
                      />
                    </clipPath>
                    <g
                      id="Grupo_8163"
                      style={{
                        clipPath:
                          'url(#SVGID_00000030463056819404080830000015000140169798954633_)'
                      }}
                    >
                      <path
                        id="Trazado_4366_00000178888529785809284640000017280975131914816935_"
                        d="M33.8-588 0-623"
                        className="st6"
                      />
                      <path
                        id="Trazado_4366"
                        d="m0-623 98.8-95.4v-.1l24.6 25.5c40.5 42 39.4 108.9-2.6 149.4l-12.1 11.7-67.6 65.3c-1.7 1.6-3.4 3.2-5.2 4.7"
                        className="st6"
                      />
                    </g>
                  </g>
                </g>
                <path
                  d="M121-529.8c-5.8-6.4-7.4-7.8-7.5-7.7-.8.7 86 71 74.8 132.6-3.3 17.9-14.1 31.1-23.1 39.7"
                  className="st3"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
IconStrokeLogo.propTypes = {
  height: PropTypes.any,
  size: PropTypes.any,
  width: PropTypes.any
}
