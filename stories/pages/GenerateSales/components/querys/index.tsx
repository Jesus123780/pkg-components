import React from 'react'
import Sorter, { buildOrderBy, SortOption } from '../../../../molecules/Sorter'
import { Column, Text } from '../../../../atoms'
import { getGlobalStyle } from '../../../../../helpers'

export type Sort = {
    field: string
    direction: 'asc' | 'desc'
}
interface QueryProps {
    sort: Sort
    setSort: (v: { field: string; direction: 'asc' | 'desc' }) => void
    fields: SortOption[]
}
export const Query: React.FC<QueryProps> = ({
    sort,
    fields,
    setSort
}) => {
    return (
        <Column
            style={{
                padding: getGlobalStyle('--spacing-md')
            }}
        >
            <Text
                as="h4"
                color='primary'
                weight='bold'
            >
                Ordenar por
            </Text>
            <Sorter
                options={fields}
                value={sort}
                onChange={(v) => {
                    setSort(v)
                    // build SQL fragment for API/query
                    const orderBy = buildOrderBy(v.field, v.direction)
                    console.log("🚀 ~ Query ~ orderBy:", orderBy)
                    // call API with ?order=orderBy or pass to ORM
                }}
            />
        </Column>
    )
}
