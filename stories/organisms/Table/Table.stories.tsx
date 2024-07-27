import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Section, Table } from './index'
import { getGlobalStyle } from '../../../helpers'

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'organisms/Table',
  args: {}
}

export default meta

type Story = StoryObj<typeof Table>

const data = [
  {
    id: '1',
    name: 'John Doe Juvinao Perez Jesus David y Maria de los Angeles y los Santos Inocentes y los Pecadores ',
    email: '',
    role: 'Admin',
    status: true
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: '',
    role: 'User',
    status: false
  },
  {
    id: '3',
    name: 'John Doe',
    email: '',
    role: 'User',
    status: true
  }
]

const titles = [
  {
    name: 'Nombre',
    width: '1fr',
    justify: 'flex-start',
    key: 'name'
  },
  {
    name: 'Rol',
    width: '1fr',
    justify: 'flex-start',
    key: 'role'
  },
  {
    name: 'Estado',
    width: '1fr',
    justify: 'flex-start',
    key: 'status'
  },
  {
    name: 'Acciones',
    width: '1fr',
    justify: 'flex-start',
    key: 'actions'
  }
]

export const TablePrimary: Story = {
  args: {
    entryPerView: true,
    renderBody: (dataB, titles) => {
      console.log(titles)
      return dataB?.map((item, index) => (
        <Section
          columnWidth={titles}
          key={index}
          odd
          padding='10px 0'
        >
          <div style={{ flex: titles[0].width }}>
            <span>{item.name}</span>
          </div>
          <div style={{ flex: titles[1].width }}>
            <span>{item.role}</span>
          </div>
          <div style={{ flex: titles[1].width }}>
            <span>{item.role}</span>
          </div>
          <div style={{ flex: titles[1].width }}>
            <span>{item.role}</span>
          </div>
        </Section>
      ))
    },
    data,
    titles
  }
}

export const TableWithOutRows: Story = {
  args: {
    entryPerView: true,
    renderBody: (dataB, titles) => {
      console.log(titles)
      return dataB?.map((item, index) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: index === dataB.length - 1 ? 'none' : `.5px solid ${getGlobalStyle('--color-neutral-gray')}`
          }}
          key={item.id}
        >
          <div style={{ flex: titles[0].width }}>
            <span>{item.name}</span>
          </div>
          <div style={{ flex: titles[1].width }}>
            <span>{item.role}</span>
          </div>
          <div style={{ flex: titles[1].width }}>
            <span>{item.role}</span>
          </div>
          <div style={{ flex: titles[1].width }}>
            <span>{item.role}</span>
          </div>
        </div>
      ))
    },
    data,
    titles
  }
}
