import { render, fireEvent } from '@testing-library/react'
import { ActiveLink } from './index'
import '@testing-library/jest-dom'

jest.mock('../../../helpers', () => ({
  getGlobalStyle: (varName: string) => {
    if (varName === '--color-icons-primary') return 'blue'
    if (varName === '--color-icons-gray') return 'gray'
    return ''
  }
}))

jest.mock('../Icon', () => ({
  Icon: ({ icon }: { icon: string }) => <div data-testid="icon">{icon}</div>
}))

jest.mock('../Row', () => ({
  Row: ({ children }: { children: React.ReactNode }) => <div data-testid="row">{children}</div>
}))

describe('ActiveLink', () => {
  const defaultProps = {
    activeClassName: 'active-class',
    href: '/home',
    name: 'Home'
  }

  it('renders correctly with default props', () => {
    const { getByText } = render(<ActiveLink {...defaultProps} />)
    expect(getByText('Home')).toBeInTheDocument()
  })


  it('renders with icon when mIcon is provided', () => {
    const { getByTestId } = render(
      <ActiveLink
        {...defaultProps}
        icon={{ '2': 'mock-icon' }}
        mIcon={2}
      />
    )
    expect(getByTestId('icon')).toHaveTextContent('mock-icon')
  })

  it('uses default icon if mIcon key does not exist', () => {
    const { getByTestId } = render(
      <ActiveLink
        {...defaultProps}
        icon={{ '-1': 'default-icon' }}
        mIcon={99}
      />
    )
    expect(getByTestId('icon')).toHaveTextContent('default-icon')
  })

  it('calls onClick and prevents default when action is true', () => {
    const handleClick = jest.fn()
    const preventDefault = jest.fn()

    const { getByRole } = render(
      <ActiveLink
        {...defaultProps}
        onClick={handleClick}
        action={true}
      />
    )

    fireEvent.click(getByRole('link'), { preventDefault })
    expect(handleClick).toHaveBeenCalled()
  })

  it('does not preventDefault when action is false', () => {
    const handleClick = jest.fn()
    const preventDefault = jest.fn()

    const { getByRole } = render(
      <ActiveLink
        {...defaultProps}
        onClick={handleClick}
        action={false}
      />
    )

    fireEvent.click(getByRole('link'), { preventDefault })
    expect(preventDefault).not.toHaveBeenCalled()
    expect(handleClick).not.toHaveBeenCalled() // solo se llama si action === true
  })
})
