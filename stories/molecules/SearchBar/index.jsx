import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { PColor } from '../../../assets/colors'
import { IconSearch } from '../../../assets/icons'

const SearchBarContainer = styled.div`
  align-items: center;
  background-color: var(--color-base-white);
  border-radius: 4px;
  border: 1px solid ${({ border = '#f2f2f2' }) => {return border}};
  display: flex;
  padding: ${({ padding = '10px 8px' }) => {return padding}};
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  padding: ${({ padding = '10px 8px' }) => {return padding}};
  &:focus {
    outline: none;
  }
`

const SearchIcon = styled.span`
  padding: 0px;
  color: #5f6368;
`

export const SearchBar = ({
  placeholder = 'Search...',
  width = '100%',
  padding = '0px 30px 0',
  border,
  margin = '0',
  handleChange = () => {
    return
  },
  handleSubmit = () => {
    return
  }
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    if (handleChange) handleChange(event)
  }

  const customHandleSubmit = (event) => {
    event.preventDefault()
    if (handleSubmit) handleSubmit(event)
  }

  return (
    <form onSubmit={customHandleSubmit} style={{ padding: padding, margin: margin, width }}>
      <SearchBarContainer border={border} padding={padding}>
        <SearchIcon>
          <IconSearch color={PColor} size='25px' />
          <i className='fas fa-search' />
        </SearchIcon>
        <SearchInput
          onChange={handleSearch}
          placeholder={placeholder}
          type='text'
          value={searchQuery}
        />
      </SearchBarContainer>
    </form>
  )
}

SearchBar.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  margin: PropTypes.string,
  border: PropTypes.string,
  padding: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string
}
