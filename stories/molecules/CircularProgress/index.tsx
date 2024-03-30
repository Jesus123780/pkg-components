import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import styles from './styles.module.css'
import { getGlobalStyle } from '../../../helpers'
import { Icon } from '../../atoms'

interface CircularProgressProps {
  size: number
  strokeWidth: number
  progress: number
  progressBar: string
  progressBorder: string
  progressLimit?: number
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  progressBar,
  progressBorder,
  progressLimit = 100
}: CircularProgressProps) => {
  const progressRef = useRef(null)
  const [offset, setOffset] = useState(0)
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const tooltipRef = useRef(null)
  const handleTooltipPosition = (event: { nativeEvent: { offsetX: any, offsetY: any } }): void => {
    const { offsetX, offsetY } = event.nativeEvent
    setTooltipPosition({ x: offsetX, y: offsetY })
  }

  useEffect(() => {
    const limitedProgress = Math.min(progress, progressLimit) // Limitar el progreso al valor máximo
    const progressOffset = ((100 - limitedProgress) / 100) * circumference
    setOffset(progressOffset)
    progressRef.current.style.transition = 'stroke-dashoffset 0.5s ease-out'
  }, [circumference, progress, progressLimit])

  return (
    <div style={{
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        height: '100%'
      }}>
        {progress >= progressLimit ? <Icon icon='IconMiniCheck' size={20} color={getGlobalStyle('--color-icons-success')} /> : `${progress}%`}
      </div>
      <svg
        className={styles.circle_bg}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onMouseMove={handleTooltipPosition}
        onMouseLeave={() => setTooltipPosition({ x: 0, y: 0 })}
      >
        <circle
          fill="transparent"
          stroke={progressBorder}
          strokeWidth={strokeWidth}
          strokeDasharray="1 3"
          strokeLinecap="round"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          fill="transparent"
          ref={progressRef}
          stroke={progress >= 100 ? getGlobalStyle('--color-icons-success') : progressBar}
          strokeWidth={strokeWidth}
          r={radius}
          cx={center}
          cy={center}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <text
          x={center}
          y={center + 10}
          textAnchor="middle"
          transform={`rotate(90, ${center}, ${center})`}
          className={styles.text}
        >

        </text>
        {tooltipPosition.x !== 0 && tooltipPosition.y !== 0 && (
          <div
            ref={tooltipRef}
            className={styles.tooltip}
            style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
          >
            {progress > progressLimit ? <Icon icon='IconMiniCheck' size={20} color={getGlobalStyle('--color-icons-success')} /> : `${progress}%`}
          </div>
        )}
      </svg>
    </div>
  )
}
