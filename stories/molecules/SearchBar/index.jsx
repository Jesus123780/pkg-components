import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { IconSearch } from '../../../assets/icons'
import { PColor } from '../../../assets/colors'

const SearchBarContainer = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  display: flex;
  padding: 4px 8px;
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  padding: 8px;
  &:focus {
    outline: none;
  }
`

const SearchIcon = styled.span`
  padding: 8px;
  color: #5f6368;
`

export const SearchBar = ({
  placeholder = 'Search...',
  handleChange = () => { return },
  handleSubmit = () => { return }
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
    <form onSubmit={customHandleSubmit} style={{ padding: '0px 30px 0' }}>
      <SearchBarContainer>
        <SearchIcon>
          <IconSearch size='25px' color={PColor} />
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
  placeholder: PropTypes.string
}

export default SearchBar
