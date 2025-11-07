import {
    useRef,
    useState,
    useEffect
} from 'react'
import { useHue } from './hooks/useHue'
import { useSaturationValue } from './hooks/useSaturationValue'
import { useHex } from './hooks/useHex'
import styles from './styles.module.css'
import { Icon, Text } from '../../../atoms'
import { getGlobalStyle } from '../../../../helpers'

interface InputColorProps {
    label?: string
    value?: string
    position?: 'top' | 'bottom'
    onChange?: (hex: string) => void
}

export const InputColor: React.FC<InputColorProps> = ({
    position = 'bottom',
    label = 'Color',
    value,
    onChange
}) => {
    const pickerRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    const { hue, update: updateHue, onKey: onHueKey } = useHue()
    const { sv, update: updateSV, onKey: onSVKey } = useSaturationValue()
    const { hex } = useHex(hue, sv, onChange, value)

    // cerrar por fuera
    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
    }, [])

    const positionStyles: Record<'top' | 'bottom', React.CSSProperties> = {
        top: {
            top: '-220px'
        },
        bottom: {
            top: '65px'
        }
    }

    return (
        <div className={styles.container} ref={pickerRef}>
            {label && (
                <Text>
                    {label}
                </Text>
            )}

            <button
                type='button'
                className={styles.preview}
                style={{ backgroundColor: hex }}
                onClick={() => setOpen(!open)}
                aria-label='abrir selector'
            />

            {open && (
                <div
                    className={styles.panel}
                    data-testid='color-panel'
                    style={positionStyles[position]}
                >
                    {/* SV */}
                    <div
                        role='slider'
                        tabIndex={0}
                        className={styles.svBox}
                        style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
                        onMouseDown={e =>
                            updateSV(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())
                        }
                        onMouseMove={e =>
                            e.buttons === 1 &&
                            updateSV(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect())
                        }
                        onKeyDown={e => onSVKey(e.key, e.shiftKey)}
                    >
                        <div
                            className={styles.svCursor}
                            style={{ left: `${sv.s}%`, top: `${100 - sv.v}%` }}
                        />
                    </div>

                    {/* HUE */}
                    <div
                        role='slider'
                        tabIndex={0}
                        className={styles.hueBar}
                        data-testid='hue-bar'
                        onMouseDown={e =>
                            updateHue(e.clientX, e.currentTarget.getBoundingClientRect())
                        }
                        onMouseMove={e =>
                            e.buttons === 1 &&
                            updateHue(e.clientX, e.currentTarget.getBoundingClientRect())
                        }
                        onKeyDown={e => onHueKey(e.key, e.shiftKey)}
                    >
                        <div
                            className={styles.hueCursor}
                            style={{ left: `${(hue / 360) * 100}%` }}
                        />
                    </div>

                    <div className={styles.hexRow}>
                        <input
                            type='text'
                            value={hex}
                            readOnly
                            className={styles.hexInput}
                        />
                        <button
                            className={styles.copyBtn}
                            onClick={() => navigator.clipboard.writeText(hex)}
                            aria-label='copiar'
                            type='button'
                        >
                            <Icon
                                color={getGlobalStyle('--color-icons-black')}
                                icon='IconCopy'
                                size={16}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
