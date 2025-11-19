import React, { useEffect, useRef, useState } from "react"
import styles from "./style.module.css"
import { Icon, Text } from "../../atoms"
import { getGlobalStyle } from "../../../helpers"

type Layout = "list" | "columns"

interface LayoutSwitcherProps {
    setLayout: (layout: Layout) => void
    layout: Layout
}

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
    setLayout,
    layout = "list"
}: {
    setLayout: (layout: Layout) => void
    layout: Layout
}) => {
    const toolbarRef = useRef<HTMLDivElement | null>(null)
    const buttonsRef = useRef<Array<HTMLButtonElement | null>>([])
    const [sliderStyle, setSliderStyle] = useState<{ left: number, width: number }>({ left: 0, width: 0 })

    // set refs length = number of buttons (2)
    const buttonCount = 2

    useEffect(() => {
        // create array slots if empty
        if (buttonsRef.current.length !== buttonCount) {
            buttonsRef.current = Array(buttonCount).fill(null)
        }

        const compute = () => {
            const toolbar = toolbarRef.current
            if (!toolbar) return

            // find active button index
            const index = layout === "list" ? 0 : 1
            const btn = buttonsRef.current[index]
            if (!btn) return

            const toolbarRect = toolbar.getBoundingClientRect()
            const btnRect = btn.getBoundingClientRect()

            // calculate left relative to toolbar
            const left = Math.round(btnRect.left - toolbarRect.left + toolbar.scrollLeft)
            const width = Math.round(btnRect.width)

            setSliderStyle({ left, width })
        }

        compute()

        // responsive: ResizeObserver preferred
        let ro: ResizeObserver | null = null
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(() => compute())
            ro.observe(document.documentElement)
            // also observe toolbar for layout changes
            if (toolbarRef.current) ro.observe(toolbarRef.current)
        } else {
            window.addEventListener("resize", compute)
        }

        // cleanup
        return () => {
            if (ro) ro.disconnect()
            else window.removeEventListener("resize", compute)
        }
    }, [layout])

    return (
        <>
            <div className={styles.toolbar} ref={toolbarRef} role="tablist" aria-label="Layout switcher">
                <div
                    aria-hidden
                    className={styles.slider}
                    style={{
                        left: sliderStyle.left,
                        width: sliderStyle.width,
                    }}
                />
                <button
                    ref={(el) => { buttonsRef.current[0] = el }}
                    onClick={() => setLayout("list")}
                    aria-pressed={layout === "list"}
                    role="tab"
                    className={layout === "list" ? styles.activeButton : ""}
                >
                    <Icon
                        icon="IconListBullet"
                        size={20}
                        color={getGlobalStyle('--color-icons-primary')}
                    />
                    <Text>
                        Lista
                    </Text>
                </button>

                <button
                    ref={(el) => { buttonsRef.current[1] = el }}
                    onClick={() => setLayout("columns")}
                    aria-pressed={layout === "columns"}
                    role="tab"
                    className={layout === "columns" ? styles.activeButton : ""}
                >
                    <Icon
                        icon="IconGrid"
                        size={20}
                        color={getGlobalStyle('--color-icons-primary')}
                    />
                    <Text>
                        Columnas
                    </Text>
                </button>
            </div>
        </>
    )
}
