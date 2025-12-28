import React from 'react'
import Sorter, { buildOrderBy, SortOption } from '../../../../molecules/Sorter'
import { Column, Text } from '../../../../atoms'
import { getGlobalStyle } from '../../../../../helpers'
import { Stepper } from '../../../../molecules'
import { FilterConfigsViewer } from './FilterConfigsViewer'

export type Sort = {
    field: string
    direction: 'asc' | 'desc'
}
interface QueryProps {
    sort: Sort
    setSort: (v: { field: string; direction: 'asc' | 'desc' }) => void
    fields: SortOption[]
    dataFilter?: any[]
    activeFilter?: number
    setActiveFilter: (v: number) => void
}
export const Query: React.FC<QueryProps> = ({
    sort,
    fields,
    dataFilter,
    setSort,
    activeFilter,
    setActiveFilter
}) => {
    return (
        <Column
            style={{
                padding: getGlobalStyle('--spacing-md')
            }}
        >
            <Stepper
                mode='line'
                active={activeFilter ?? 0}
                steps={dataFilter?.map((filter) => filter.id) || []}
                onClick={(status) => {
                    setActiveFilter(status)
                }}
            />
            <Column style={{
                marginTop: 16,
                gap: 8,
                overflowY: 'auto',
                maxHeight: '90%',
                height: '90%'

            }}>
                <FilterConfigsViewer
                    className=''
                    showEmptyMessage={false}
                    error={null}
                    loading={false}
                    tabs={dataFilter || []}
                />
            </Column>
            {/* <Sorter
                options={fields}
                value={sort}
                onChange={(v) => {
                    setSort(v)
                    // build SQL fragment for API/query
                    const orderBy = buildOrderBy(v.field, v.direction)
                    console.log("🚀 ~ Query ~ orderBy:", orderBy)
                    // call API with ?order=orderBy or pass to ORM
                }}
            /> */}
        </Column>
    )
}
