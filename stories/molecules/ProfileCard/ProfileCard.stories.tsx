import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './index'

const meta: Meta<typeof ProfileCard> = {
  component: ProfileCard,
  title: 'molecules/ProfileCard'
}

export default meta
type Story = StoryObj<typeof ProfileCard>

export const Primary: Story = {
  args: {
    eId: 'aa949453-b4c2-40b8-98c0-f9155d6eee2b',
    idStore: 'bea21f6e-f5f9-bb91-ce2a-6b5225a34b56',
    idRole: '746ab220-4b8e-49b9-bcaf-0d372a8f21c6',
    eEmail: 'email@email.com',
    eState: 1,
    status: 'INACTIVE',
    user: {
      __typename: 'User',
      id: 'c1a56246-73c3-6c1c-fb75-2dd171cb751f',
      name: 'USUARIO INVITADO',
      username: 'USUARIO INVITADO',
      lastName: '687743',
      email: 'email@email.com',
      avatar: null,
      uToken: null,
      uPhoNum: null,
      ULocation: null,
      upLat: null,
      uState: '1',
      upLon: null,
      upIdeDoc: null,
      siteWeb: null,
      description: null,
      createAt: '2024-08-31T22:43:44.876Z',
      associateStore: null
    },
    roles: {
      __typename: 'Roles',
      idRole: '746ab220-4b8e-49b9-bcaf-0d372a8f21c6',
      name: 'sfgsdfgsd',
      priority: 5,
      description: null,
      permissions: [
        {
          action: 'dashboard/update',
          subject: 'products'
        }
      ],
      createdAt: '2024-08-31T22:44:26.291Z',
      updatedAt: '2024-09-01T05:29:12.741Z'
    }
  }
}
