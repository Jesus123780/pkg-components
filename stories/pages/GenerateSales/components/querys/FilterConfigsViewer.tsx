// FilterConfigsViewer.tsx
import React, { memo, useState, useMemo } from 'react'
import styles from './styles.module.css'

/**
 * Props for the viewer component
 */
export type FilterConfigsViewerProps = {
    className?: string
    showEmptyMessage?: boolean
    error?: any
    loading?: boolean
    tabs?: Array<{
        id: string
        name: string
        filterGroups: Array<{
            id: string
            description: string
            values: Array<{
                id?: string
                description: string
                value?: string | number | boolean
                imageUrn?: string
            }>
        }>
    }>
    refetch?: () => void
}

/**
 * Simple renderers to keep main component tidy
 */
const renderValue = (v: any) => (
    <li key={v.id ?? `${v.description}-${Math.random()}`} className={styles.valueItem} title={String(v.value ?? '')}>
        {v.imageUrn && <img src={v.imageUrn} alt={v.description} className={styles.valueImage} />}
        <span className={styles.valueText}>{v.description}</span>
        {typeof v.value !== 'undefined' && v.value !== null && <small className={styles.valueBadge}>{String(v.value)}</small>}
    </li>
)

const renderGroup = (g: any) => (
    <section key={g.id} className={styles.group}>
        <h4 className={styles.groupTitle}>{g.description}</h4>
        <ul className={styles.valuesList}>
            {g.values && g.values.length > 0 ? g.values.map(renderValue) : <li className={styles.noValues}>No values</li>}
        </ul>
    </section>
)

/**
 * FilterConfigsViewer
 * Displays dynamic tabs → groups → values using CSS modules.
 *
 * @param {FilterConfigsViewerProps} props
 */
export const FilterConfigsViewer = memo(({
    className = '',
    showEmptyMessage = true,
    error = true,
    loading = true,
    tabs = [],
    refetch = () => { },
}: FilterConfigsViewerProps) => {

    const [activeTab, setActiveTab] = useState<string | null>(() => (tabs[0]?.id ?? null))

    // keep activeTab in sync if tabs change
    React.useEffect(() => {
        if (!tabs || tabs.length === 0) {
            setActiveTab(null)
        } else if (!tabs.find(t => t.id === activeTab)) {
            setActiveTab(tabs[0].id)
        }
    }, [tabs, activeTab])

    const activeGroups = useMemo(() => tabs.find(t => t.id === activeTab)?.filterGroups ?? [], [tabs, activeTab])

    if (loading) return <div className={`${styles.root} ${className}`}>Loading filters…</div>

    if (error) return (
        <div className={`${styles.root} ${className}`}>
            <div className={styles.error}>Error loading filters: {error.message}</div>
            <button className={styles.retryBtn} onClick={() => void refetch()}>Retry</button>
        </div>
    )

    if (!tabs || tabs.length === 0) {
        return <div className={`${styles.root} ${className}`}>{showEmptyMessage ? <div>No filters configured.</div> : null}</div>
    }

    return (
        <div className={`${styles.root} ${className}`} role="region" aria-label="Filter configurations">
            <nav className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tabBtn} ${tab.id === activeTab ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        aria-pressed={tab.id === activeTab}
                    >
                        {tab.name}
                    </button>
                ))}
            </nav>

            <div className={styles.groups}>
                {activeGroups.length > 0 ? activeGroups.map(renderGroup) : <div className={styles.noGroups}>Sin grupos</div>}
            </div>
        </div>
    )
})

