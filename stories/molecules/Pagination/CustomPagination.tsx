import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Pagination } from '.'

/**
 * CustomPagination component.
 *
 * @param {Object} props - Properties for the CustomPagination component.
 * @param {boolean} props.isLoadingPage - Flag to indicate loading state.
 * @param {Object} props.propsNavigation - Additional props to be spread into Pagination component.
 * @returns {React.ReactElement} CustomPagination component.
 */
export const CustomPagination = ({ isLoadingPage, ...propsNavigation }) => {
  const router = useRouter()
  const path = router?.asPath?.replace(/\?.*/, '')

  // useMemo to memoize urlParams for optimization.
  const urlParams = useMemo(() => {
    const ignoreKeys = ['page']
    const entriesData = Object.entries(router?.query || {})
    return (
      entriesData?.length > 0 &&
      entriesData
        .map(([key, value]) => {
          if (ignoreKeys.includes(key)) return null
          return `${key}=${value}`
        })
        .filter((item) => {return item !== null})
        .join('&')
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(router?.query)])

  if (isLoadingPage) {
    return <div>Loading...</div>
  }

  const handleNextPage = () => {
    console.log('Clicked next')
  }

  const handlePrevPage = () => {
    console.log('Clicked previous')
  }

  const handleOnClick = (number) => {
    console.log(`Clicked ${number}`)
  }

  return (
    <div>
      <Pagination
        handleNextPage={handleNextPage}
        handleOnClick={handleOnClick}
        handlePrevPage={handlePrevPage}
        linkWrapper={Link}
        path={path}
        urlParams={urlParams}
        {...propsNavigation}
      />
    </div>
  )
}

CustomPagination.propTypes = {
  isLoadingPage: PropTypes.any
}
