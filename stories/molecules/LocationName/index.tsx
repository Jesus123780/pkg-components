'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import styled from 'styled-components'

interface SearchProps {
  Text?: string
  children?: React.ReactNode
}

export const LocationName: React.FC<SearchProps> = ({ Text = '', children }) => {
  const location = useRouter()
  const name = location?.pathname
  const position = name?.indexOf('/')
  return <Search Text={Text || name?.substring(position + 1 || name?.length)} children={children} />
}

const Search: React.FC<SearchProps> = ({ children, Text }) => {
  return (
    <ContainerSearch>
      <Link> Buscado por</Link>
      {/* <span style={{ fontFamily: 'PFont-Regular', fontSize: '1.5625rem', color: PColor }}>
        &nbsp;
        {Text}
      </span> */}
      <div>{children}</div>
    </ContainerSearch>
  )
}

Search.propTypes = {
  Text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

const ContainerSearch = styled.div`
  text-align: start;
  margin-bottom: 30px;
  width: 100%;
  margin: 40px 0;
  border-bottom: 0.0625em solid #e6e6e6;
  padding-bottom: 10px;
  @media only screen and (max-width: 960px) {
    display: none;
  }
`

const Link = styled.span`
  font-size: 1.5625rem;
  color: black;
  font-family: PFont-Regular;
`
