'use client'
import './styles.css'

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable consistent-return */
import React, { Fragment, useEffect, useRef, useState } from 'react'

function ___$insertStyle(css: string): void {
  if (!css || typeof window === 'undefined') {
    return
  }
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerHTML = css
  document.head.appendChild(style)
  return css
}

// Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

const React__default = /* #__PURE__ */ _interopDefaultLegacy(React)

let __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (let s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}

___$insertStyle(
  // eslint-disable-next-line max-len
  '.marquee-container {\n  display: flex !important;\n  flex-direction: row !important;\n  position: relative;\n  width: 100%;\n}\n.marquee-container:hover div {\n  animation-play-state: let(--pause-on-hover);\n}\n.marquee-container:active div {\n  animation-play-state: let(--pause-on-click);\n}\n\n.overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.overlay::before, .overlay::after {\n  background: linear-gradient(to right, let(--gradient-color));\n  content: "";\n  height: 100%;\n  position: absolute;\n  width: let(--gradient-width);\n  z-index: 2;\n}\n.overlay::after {\n  right: 0;\n  top: 0;\n  transform: rotateZ(180deg);\n}\n.overlay::before {\n  left: 0;\n  top: 0;\n}\n\n.marquee {\n  flex: 0 0 auto;\n  min-width: 100%;\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  animation: scroll let(--duration) linear let(--delay) let(--iteration-count);\n  animation-play-state: let(--play);\n  animation-delay: let(--delay);\n  animation-direction: let(--direction);\n}\n@keyframes scroll {\n  0% {\n    transform: translateX(0%);\n  }\n  100% {\n    transform: translateX(-100%);\n  }\n}'
)

export const Marquee = function (_a: { style: any, className: any, play: any, pauseOnHover: any, pauseOnClick: any, direction: any, speed: any, delay: any, loop: any, gradient: any, gradientColor: any, gradientWidth: any, onFinish: any, onCycleComplete: any, children: any }) {
  let _b; let _c; let _d; let _e
  const _f = _a.style
  const style = _f === void 0 ? {} : _f
  const _g = _a.className
  const className = _g === void 0 ? '' : _g
  const _h = _a.play
  const play = _h === void 0 ? true : _h
  const _j = _a.pauseOnHover
  const pauseOnHover = _j === void 0 ? false : _j
  const _k = _a.pauseOnClick
  const pauseOnClick = _k === void 0 ? false : _k
  const _l = _a.direction
  const direction = _l === void 0 ? 'left' : _l
  const _m = _a.speed
  const speed = _m === void 0 ? 20 : _m
  const _o = _a.delay
  const delay = _o === void 0 ? 0 : _o
  const _p = _a.loop
  const loop = _p === void 0 ? 0 : _p
  const _q = _a.gradient
  const gradient = _q === void 0 ? true : _q
  const _r = _a.gradientColor
  const gradientColor = _r === void 0 ? [255, 255, 255] : _r
  const _s = _a.gradientWidth
  const gradientWidth = _s === void 0 ? 200 : _s
  const onFinish = _a.onFinish
  const onCycleComplete = _a.onCycleComplete
  const children = _a.children
  // React Hooks
  const _t = useState(0)
  const containerWidth = _t[0]
  const setContainerWidth = _t[1]
  const _u = useState(0)
  const marqueeWidth = _u[0]
  const setMarqueeWidth = _u[1]
  const _v = useState(false)
  const isMounted = _v[0]
  const setIsMounted = _v[1]
  const containerRef = useRef(null)
  const marqueeRef = useRef(null)
  useEffect(
    function () {
      if (!isMounted) return
      const calculateWidth = function () {
        // Find width of container and width of marquee
        if (marqueeRef.current && containerRef.current) {
          setContainerWidth(containerRef.current.getBoundingClientRect().width)
          setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width)
        }
      }
      calculateWidth()
      // Rerender on window resize
      window.addEventListener('resize', calculateWidth)
      return function () {
        window.removeEventListener('resize', calculateWidth)
      }
    },
    [isMounted]
  )
  useEffect(function () {
    setIsMounted(true)
  }, [])
  // Gradient color in an unfinished rgba format
  const rgbaGradientColor = 'rgba(' + gradientColor[0] + ', ' + gradientColor[1] + ', ' + gradientColor[2]
  // Animation duration
  const duration = marqueeWidth < containerWidth ? containerWidth / speed : marqueeWidth / speed
  return React__default.default.createElement(
    Fragment,
    null,
    !isMounted
      ? null
      : React__default.default.createElement(
        'div',
        { ref: containerRef, style: __assign(__assign({}, style), ((_b = {}), (_b['--pause-on-hover'] = !play || pauseOnHover ? 'paused' : 'running'), (_b['--pause-on-click'] = !play || (pauseOnHover && !pauseOnClick) || pauseOnClick ? 'paused' : 'running'), _b)), className: className + ' marquee-container' },
        gradient && React__default.default.createElement('div', { style: ((_c = {}), (_c['--gradient-color'] = rgbaGradientColor + ', 1), ' + rgbaGradientColor + ', 0)'), (_c['--gradient-width'] = typeof gradientWidth === 'number' ? gradientWidth + 'px' : gradientWidth), _c), className: 'overlay' }),
        React__default.default.createElement('div', { ref: marqueeRef, style: ((_d = {}), (_d['--play'] = play ? 'running' : 'paused'), (_d['--direction'] = direction === 'left' ? 'normal' : 'reverse'), (_d['--duration'] = duration + 's'), (_d['--delay'] = delay + 's'), (_d['--iteration-count'] = loop ? '' + loop : 'infinite'), _d), className: 'marquee', onAnimationIteration: onCycleComplete, onAnimationEnd: onFinish }, children),
        React__default.default.createElement('div', { style: ((_e = {}), (_e['--play'] = play ? 'running' : 'paused'), (_e['--direction'] = direction === 'left' ? 'normal' : 'reverse'), (_e['--duration'] = duration + 's'), (_e['--delay'] = delay + 's'), (_e['--iteration-count'] = loop ? '' + loop : 'infinite'), _e), className: 'marquee', 'aria-hidden': 'true' }, children)
      )
  )
}
