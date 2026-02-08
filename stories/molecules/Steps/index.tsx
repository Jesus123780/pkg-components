// File: Steps.tsx
import React, { useCallback } from 'react';
import styles from './styled.module.css';
import { Icon } from '../../atoms';
import { getGlobalStyle } from '../../../helpers';

export type StepStatus = 'progress' | 'wait' | 'error' | 'finish';
export type Orientation = 'horizontal' | 'vertical';

export interface StepsComponentProps {
  current?: number; // 0-based index
  status?: StepStatus; // status for the current step
  titles?: string[];
  orientation?: Orientation;
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  onChange?: (index: number) => void;
}

interface StepProps {
  index: number;
  stepNumber: number;
  title: string;
  status: StepStatus;
  orientation: Orientation;
  size: 'sm' | 'md' | 'lg';
  clickable: boolean;
  onClick?: (i: number) => void;
}

const formatNumber = (n: number) => (n > 9 ? `${n}` : `0${n}`);

export const StepsComponent = ({
  current = 0,
  status = 'progress',
  titles = [],
  orientation = 'horizontal',
  size = 'md',
  clickable = false,
  onChange,
}: StepsComponentProps) => {
  const handleChange = useCallback(
    (i: number) => {
      if (!clickable || !onChange) return;
      onChange(i);
    },
    [clickable, onChange]
  );

  return (
    <nav
      className={`${styles.steps} ${orientation === 'vertical' ? styles.vertical : ''} ${styles[size]}`}
      aria-label="Progreso"
    >
      <ol className={styles.list}>
        {titles.map((title, i) => {
          let stepStatus: StepStatus;
          if (i < current) stepStatus = 'finish';
          else if (i === current) stepStatus = status === 'finish' ? 'finish' : status;
          else stepStatus = status === 'finish' ? 'finish' : 'wait';

          return (
            <li key={title || i} className={styles.stepWrapper}>
              <Step
                index={i}
                stepNumber={i + 1}
                title={title}
                status={stepStatus}
                orientation={orientation}
                size={size}
                clickable={clickable}
                onClick={handleChange}
              />

              {/* Tail: the connecting line. It's visually hidden for last element */}
              {i !== titles.length - 1 && (
                <div
                  className={`${styles.tail} ${i < current ? styles.tailFilled : ''} ${
                    orientation === 'vertical' ? styles.tailVertical : ''
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const Step = ({ index, stepNumber, title, status, orientation, size, clickable, onClick }: StepProps) => {
  const isCurrent = status === 'progress';
  const ariaCurrent = isCurrent ? 'step' : undefined;

  const handleKey = (e: React.KeyboardEvent) => {
    if (!clickable || !onClick) return;
    if (e.key === 'Enter' || e.key === ' ') onClick(index);
  };

  return (
    <div className={`${styles.step} ${orientation === 'vertical' ? styles.stepVertical : ''}`}>
      <div className={styles.iconWrapper}>
        <button
          type="button"
          className={`${styles.iconBase} ${styles[status]} ${isCurrent ? styles.current : ''}`}
          onClick={() => clickable && onClick && onClick(index)}
          onKeyDown={handleKey}
          aria-current={ariaCurrent}
          aria-label={`Paso ${stepNumber}: ${title}`}
          disabled={!clickable}
        >
          {status === 'finish' ? (
           <Icon icon="IconMiniCheck" size={20} color={getGlobalStyle('--color-icons-success')} />
          ) : status === 'error' ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden focusable={false}>
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 7v6M12 17h.01" />
            </svg>
          ) : (
            <span className={styles.stepNumber}>{formatNumber(stepNumber)}</span>
          )}
        </button>
      </div>

      <div className={`${styles.content} ${orientation === 'vertical' ? styles.contentVertical : ''}`}>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default StepsComponent;

/*
  File: styled.module.css
  - Este CSS usa variables para que puedas estilizarlo desde el sitio
  - Incluye animaciones nativas: pulse (current), fill (tail), shake (error)
*/
