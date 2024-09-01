import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import { orderColumn } from './orderColumn'
import { Icon } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'
import styles from './styles.module.css'

export { Section } from './Section'

interface TableTitleColumn {
  name: string
  key?: string
  justify: 'flex-start' | 'flex-end' | 'center'
  width: string
  arrow?: boolean
  render?: () => JSX.Element | null
}

interface TableProps {
  titles: TableTitleColumn[]
  bgRow?: string
  data?: any
  pointer: boolean
  loading?: boolean
  checkbox?: boolean
  pagination?: {
    currentPage: number
    totalPages: number
  }
  renderBody: (data: any, titles: TableTitleColumn[], indexFirstElem: number) => JSX.Element[]
  handleCheckedAll?: (check: boolean) => void
}

export const Table: React.FC<TableProps> = ({
  titles = [],
  bgRow,
  data,
  pointer,
  renderBody = []
}) => {
  type CurrentColumnState = Record<string, number>

  const [currentColumn, setCurrentColumn] = useState<CurrentColumnState>({})
  const [properties, setProperties] = useState({
    currentPage: 1,
    entriesValue: 100,
    pages: [],
    indexFirstElem: '',
    indexLastElem: ''
  })
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const allPages = Math.ceil(data?.length / properties.entriesValue)
    setPages([])
    for (let i = 0; i < allPages; i++) {
      setPages((s: number[]) => { return [...s, i] })
    }
    const indexLastElem = properties.currentPage * properties.entriesValue
    const indexFirstElem = indexLastElem - properties.entriesValue
    setProperties({ ...properties, indexLastElem: indexLastElem.toString(), indexFirstElem: indexFirstElem.toString() })
  }, [properties.entriesValue, properties.currentPage, data])

  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>, key: string | undefined): void => {
    const { name, checked } = e.target
    setCurrentColumn({ [name]: (checked) ? 0 : 1, key })
  }
  const fileInputRef = useRef({
    current: null,
    click: () => { }
  })

  const onTargetClick = (e: React.MouseEvent): null => {
    e.preventDefault()
    fileInputRef?.current?.click()
    return null
  }
  const gridColumnStyles = titles.length > 0
    ? {
        gridTemplateColumns: titles.map((x) => x.width).join(' ')
      }
    : { gridTemplateColumns: '1fr' }
  return (
    <>
      <div style={{
        overflow: 'auto hidden'
      }}>
        <div style={{
          minWidth: 'max-content',
          width: '100%',
          border: `.1px solid ${getGlobalStyle('--color-neutral-gray')}`,
          borderRadius: getGlobalStyle('--border-radius-2xs')
        }}>
          <div className={styles.section} style={{ ...gridColumnStyles, borderBottom: `1px solid ${getGlobalStyle('--color-neutral-gray')}` }}>
            {titles?.map((x, i) => {
              return <div className={styles.section__content}
                style={{
                  justifyContent: x.justify ?? 'flex-start',
                  backgroundColor: bgRow,
                  cursor: pointer ? 'pointer' : 'default'
                }} key={i}>
                {(x.render != null)
                  ? x.render()
                  : <label htmlFor={x.key}>
                  <span onClick={onTargetClick} className={styles.title}>
                    {x.name}
                  </span>
                </label>}
                {Boolean(x.arrow) && <label className={styles.arrow_label} htmlFor={x.key}>
                  <input
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      top: -1,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer'
                    }}
                    id={x.key}
                    name={x.key}
                    onChange={(e) => { return handleColumn(e, x.key) }}
                    ref={fileInputRef as any}
                    type='checkbox'
                  />
                  <button
                    onClick={onTargetClick}
                    style={{
                      height: getGlobalStyle('--spacing-lg'),
                      backgroundColor: getGlobalStyle('--color-base-transparent')
                    }}>
                    <Icon
                      icon='IconArrowTop'
                      color={currentColumn?.[`${x.key}`] === 0 ? getGlobalStyle('--color-icons-black') : getGlobalStyle('--color-icons-gray')}
                      size={15}
                    />
                  </button>
                  <button
                    onClick={onTargetClick}
                    style={{
                      height: getGlobalStyle('--spacing-lg'),
                      backgroundColor: getGlobalStyle('--color-base-transparent')
                    }}>
                    <Icon
                      icon='IconArrowBottom'
                      color={currentColumn?.[`${x.key}`] === 1 ? getGlobalStyle('--color-icons-black') : getGlobalStyle('--color-icons-gray')}
                      size={15}
                    />
                  </button>
                </label>
                }
              </div>
            })}
          </div>
          {renderBody(data?.filter((x, i) => { return ((i >= properties.indexFirstElem) && i < properties.indexLastElem) })?.sort((prev, post) => { return orderColumn(prev, post, currentColumn) }), titles, properties.indexFirstElem)}
        </div>
      </div>
    </>
  )
}
