import { useState } from 'react'
import stylesInitial from './styles.module.css'
import stylesSimple from './simpleStyles.module.css'

interface StepperProps {
  mode?: 'initial' | 'simple'
  active: number
  steps: string[] | JSX.Element[]
  style?: React.CSSProperties
  onClick: (step: number) => void
}

export const Stepper: React.FC<StepperProps> = ({
  mode = 'initial',
  active,
  steps = [''],
  style,
  onClick
}) => {
  const styles = {
    initial: stylesInitial,
    simple: stylesSimple
  }[mode]

  const stepCount = steps.length

  // <-- nuevo estado para hover
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  // calcula left en base al hover (si hay) o al active
  const currentIndex = hoverIndex ?? active

  return (
    <div
      className={styles.container}
      style={{ ...style, '--step-count': String(stepCount) } as React.CSSProperties}
    >
      {steps.map((title, index) => (
        <div
          key={typeof title === 'string' ? title : index}
          className={`${styles.tabs} ${index === active ? 'active' : ''}`}
          role="button"
          onClick={() => onClick(index)}
          onMouseEnter={() => setHoverIndex(index)}    /* <-- */
          onMouseLeave={() => setHoverIndex(null)}     /* <-- */
        >
          <span
            className={`${styles.text} ${currentIndex === index ? styles.activeText : ''}`}
            style={{ userSelect: 'none' }}
          >
            {title}
          </span>
        </div>
      ))}

      <span
        className={styles.slider}
        style={{
          left: `calc(${currentIndex} * ((100% - 8px) / ${stepCount}) + 4px)`,
          width: `calc((100% - 8px) / ${stepCount})`
        }}
      />
    </div>
  )
}
