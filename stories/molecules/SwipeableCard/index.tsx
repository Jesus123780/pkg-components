import React, {
    useEffect,
    useRef,
    useState
} from 'react'
import styles from './styles.module.css'

interface SwipeableCardProps {
    children: React.ReactNode
    rightActions?: React.ReactNode
    swipeWidth?: number
    autoClose?: boolean
    sticky?: boolean
    shake?: boolean
    onDelete?: () => void
}

/**
 * 💫 SwipeableCard
 *
 * Deslizable con animación fluida, rebote, bloqueo de selección
 * y eliminación solo con arrastre largo.
 */
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
    children,
    rightActions,
    swipeWidth = 100,
    autoClose = false,
    sticky = false,
    shake = false,
    onDelete = () => {
        // Acción por defecto vacía
        return
    }
}) => {
    const [offsetX, setOffsetX] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [deleteReady, setDeleteReady] = useState(false)
    const [isShake, setIsShake] = useState(false)
    const startX = useRef<number | null>(null)
    const startOffset = useRef<number>(0)

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        startX.current = e.clientX
        startOffset.current = offsetX
        setIsSwiping(true)
        setIsTransitioning(false)
        setDeleteReady(false)
        document.body.style.userSelect = 'none'
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isSwiping || startX.current === null) return

        const diff = e.clientX - startX.current
        let newOffset = startOffset.current + diff

        if (newOffset > 0) newOffset = 0

        // ⚡ Umbral más estricto para considerar eliminar
        const deleteThreshold = swipeWidth * 1.6
        const visualThreshold = deleteThreshold * 0.85
        // Marca como listo para eliminar visualmente
        if (newOffset < -visualThreshold && !deleteReady) {
            setDeleteReady(true)
            setIsShake(true)
            setTimeout(() => setIsShake(false), 300)
        } else {
            setDeleteReady(false)
        }

        // Rebote visual si supera el máximo permitido
        if (newOffset < -swipeWidth * 1.3) {
            const overflow = -swipeWidth * 1.3 - newOffset
            newOffset = -swipeWidth * 1.3 - overflow * 0.25
        }

        setOffsetX(newOffset)
    }

    const handlePointerUp = () => {
        if (!isSwiping) return
        setIsSwiping(false)
        document.body.style.userSelect = ''

        setIsTransitioning(true)

        // Ejecuta eliminación solo si fue un deslizamiento largo
        if (offsetX < -swipeWidth * 1.6) {
            setOffsetX(-swipeWidth * 2)
            setTimeout(() => {
                onDelete?.()
                setOffsetX(0)
                setDeleteReady(false)
            }, 200)
            return
        }

        // Si no llegó al límite, solo abre/cierra normalmente
        const shouldOpen = Math.abs(offsetX) > swipeWidth / 2
        if (shouldOpen) {
            setOffsetX(-swipeWidth - 8)
            setTimeout(() => setOffsetX(-swipeWidth), 120)
        } else {
            setOffsetX(0)
        }
    }

    useEffect(() => {
        if (offsetX === -swipeWidth && autoClose) {
            const timer = setTimeout(() => setOffsetX(0), 3000)
            return () => clearTimeout(timer)
        }
    }, [offsetX])
    // 🎨 Gradiente de color dinámico (gris → rojo)
    const progress = Math.min(Math.abs(offsetX) / swipeWidth, 1) // ajustamos para que llegue antes

    const startColor = { r: 80, g: 167, b: 115 } // verde inicial
    const endColor = { r: 255, g: 0, b: 0 } // rojo final

    const red = Math.round(startColor.r + (endColor.r - startColor.r) * progress)
    const green = Math.round(startColor.g + (endColor.g - startColor.g) * progress)
    const blue = Math.round(startColor.b + (endColor.b - startColor.b) * progress)

    const backgroundColor = `rgb(${red}, ${green}, ${blue})`

    const transition = isTransitioning
                            ? 'transform 0.4s cubic-bezier(0.25, 1.3, 0.5, 1)'
                            : 'transform 0.3s ease'
    return (
        <div
            className={`${styles.swipeWrapper} ${(shake && isShake) ? styles.shake : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
                transition: deleteReady ? `cubic-bezier(0.25, 1.25, 0.5, 1) 0.35s` : 'none'
            }}
        >
            {/* Fondo rojo progresivo con intensidad según el arrastre */}
            <div
                className={styles.hiddenActions}
                style={{
                    background: backgroundColor,
                    transition: 'background 0.25s ease',
                    width: sticky ? `${Math.max(swipeWidth, Math.abs(offsetX))}px` : swipeWidth, // 👈 asegura que el área roja crezca y el botón quede visible
                }}
            >
                {rightActions}
            </div>

            {/* Contenido principal */}
            <div
                className={styles.frontContent}
                style={{
                    transform: `translateX(${offsetX}px)`,
                    transition: isSwiping
                        ? 'none'
                        : transition
                }}
            >
                {children}
            </div>
        </div>
    )
}
