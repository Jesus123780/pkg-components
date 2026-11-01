'use client'
import React, { useEffect, useRef, useState } from 'react'
import { getGlobalStyle } from '../../../helpers'

interface HorizontalScrollWrapperProps {
  targetId: string
  columns: number
  className?: string
  minimapWidth?: number // px, por defecto 120
  minViewportWidth?: number // px, por defecto 24
  style?: React.CSSProperties
}

export const HorizontalScrollWrapper: React.FC<HorizontalScrollWrapperProps> = ({
  targetId,
  columns,
  className = '',
  minimapWidth = 120,
  minViewportWidth = 24,
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  // estados visibles (UI)
  const [viewportWidthPx, setViewportWidthPx] = useState<number>(minViewportWidth)
  const [viewportLeftPx, setViewportLeftPx] = useState<number>(0)

  // refs para lectura sin esperar rerender
  const ratioRef = useRef<number>(1)
  const viewportLeftRef = useRef<number>(0)
  const viewportWidthRef = useRef<number>(minViewportWidth)
  const mountedRef = useRef<boolean>(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const getTarget = () => document.getElementById(targetId) as HTMLDivElement | null

  // recalc: calcula ratio y viewport (se puede llamar desde observers/resizes/scroll)
  const recalc = () => {
    const t = getTarget()
    if (!t) return

    const fullWidth = Math.max(1, t.scrollWidth) // ancho total del contenido
    const visibleWidth = Math.max(1, t.clientWidth) // area visible

    // ratio map miniatura/real
    const r = minimapWidth / fullWidth
    ratioRef.current = r

    const computedViewportWidth = Math.max(minViewportWidth, visibleWidth * r)
    const computedLeft = t.scrollLeft * r

    // actualizar refs y estado de forma consistente
    viewportWidthRef.current = computedViewportWidth
    viewportLeftRef.current = computedLeft

    if (mountedRef.current) {
      setViewportWidthPx(computedViewportWidth)
      setViewportLeftPx(computedLeft)
    }
  }

  // sincroniza scroll real -> minimap (ejecuta en rAF)
  useEffect(() => {
    const t = getTarget()
    if (!t) return

    // recalc inicial
    recalc()

    let locked = false
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const r = ratioRef.current
        const left = t.scrollLeft * r
        viewportLeftRef.current = left
        if (mountedRef.current) setViewportLeftPx(left)
      })
    }

    // también observamos cambios de tamaño en el target (cuando cambian columnas/children)
    const ro = new ResizeObserver(() => {
      // recalc en rAF para estabilidad visual
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(recalc)
    })
    ro.observe(t)

    window.addEventListener('resize', recalc)
    t.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      t.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recalc)
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // intentionally minimal deps: recalc uses current refs and targetId (if changes, component likely remounts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, minimapWidth, minViewportWidth, columns])

  // mantener refs sincronizados con state
  useEffect(() => {
    viewportLeftRef.current = viewportLeftPx
  }, [viewportLeftPx])

  useEffect(() => {
    viewportWidthRef.current = viewportWidthPx
  }, [viewportWidthPx])

  // pointer dragging — manejadores nativos con refs para evitar re-creating handlers constantemente
  useEffect(() => {
    const viewportEl = viewportRef.current
    if (!viewportEl) return

    let dragging = false
    let startX = 0
    let startLeft = 0

    const onPointerDown = (ev: PointerEvent) => {
      // solo con botón principal
      if (ev.button !== 0) return
      ev.preventDefault()
      dragging = true
      startX = ev.clientX
      startLeft = viewportLeftRef.current

      // asegurar captura del pointer (soporte moderno)
      ;(viewportEl as any).setPointerCapture?.(ev.pointerId)
      viewportEl.style.cursor = 'grabbing'
      // quitar transición para seguimiento inmediato
      viewportEl.style.transition = 'none'
    }

    const onPointerMove = (ev: PointerEvent) => {
      if (!dragging) return
      ev.preventDefault()

      const dx = ev.clientX - startX
      const t = getTarget()
      if (!t) return

      const r = ratioRef.current
      const maxLeft = Math.max(0, minimapWidth - viewportWidthRef.current)

      let newLeft = startLeft + dx
      if (newLeft < 0) newLeft = 0
      if (newLeft > maxLeft) newLeft = maxLeft

      // actualizar ref y estado (state para rerender del viewport)
      viewportLeftRef.current = newLeft
      if (mountedRef.current) setViewportLeftPx(newLeft)

      // actualizar scroll real inversamente proporcional
      // escribir directamente t.scrollLeft evita round-trip de setState
      t.scrollLeft = newLeft / r
    }

    const onPointerUp = (ev: PointerEvent) => {
      if (!dragging) return
      dragging = false
      try {
        ;(viewportEl as any).releasePointerCapture?.(ev.pointerId)
      } catch (e) {
        // algunos navegadores pueden lanzar si no capturó; ignorar
      }
      viewportEl.style.cursor = 'grab'
      // restaurar transición breve para suavizar pequeños saltos posteriores
      viewportEl.style.transition = 'left 0.03s linear'
    }

    viewportEl.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      viewportEl.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
    // deps intencionalmente mínimas: usamos refs internos para estado dinámico
  }, [minimapWidth, targetId])

  // click en minimapa para "teletransportar" el viewport (centra donde clickeas)
  const handleMinimapClick = (ev: React.MouseEvent) => {
    // evitar conflicto si el click viene por arrastre del viewport (mouse down en viewport ya captura)
    if ((ev.target as HTMLElement) === viewportRef.current) return

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ev.clientX - rect.left
    const newLeft = Math.max(0, Math.min(minimapWidth - viewportWidthRef.current, x - viewportWidthRef.current / 2))
    const t = getTarget()
    if (!t) return
    const r = ratioRef.current

    viewportLeftRef.current = newLeft
    if (mountedRef.current) setViewportLeftPx(newLeft)
    t.scrollLeft = newLeft / r
  }

  // UI guard
  if (columns <= 0 && viewportWidthRef.current <= 0 && viewportLeftPx <= 0) return null

  // estilos inline (puedes externalizar)
  return (
    <div
      ref={containerRef}
      className={className}
      onClick={handleMinimapClick}
      style={{
        position: 'fixed',
        right: 20,
        border: `0.1px solid ${getGlobalStyle('--color-neutral-gray')}`,
        bottom: 20,
        width: minimapWidth,
        height: 48,
        padding: 1,
        borderRadius: 10,
        backgroundColor: getGlobalStyle('--color-neutral-white'),
        boxShadow: getGlobalStyle('--box-shadow-lg'),
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        zIndex: 9999,
        ...style
      }}
    >
      <div
        style={{
          position: 'relative',
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          paddingLeft: 6,
          paddingRight: 6,
          boxSizing: 'border-box'
        }}
      >
        {Array.from({ length: Math.max(1, columns) }).map((_, i) => (
          <div
            key={i}
            aria-hidden
            style={{
              flex: 1,
              minWidth: 0,
              height: 28,
              backgroundColor: getGlobalStyle('--color-background-gray'),
              borderRadius: 6,
              flexShrink: 1,
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.02)'
            }}
          />
        ))}

        <div
          ref={viewportRef}
          role="slider"
          aria-label="Board viewport"
          tabIndex={0}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            margin: 'auto',
            left: viewportLeftPx,
            width: viewportWidthPx,
            height: '90%',
            borderRadius: 6,
            border: '2px solid #4c9aff',
            background: 'rgba(76,154,255,0.12)',
            boxSizing: 'border-box',
            cursor: 'grab',
            transition: 'left 0.03s linear'
          }}
        />
      </div>
    </div>
  )
}
