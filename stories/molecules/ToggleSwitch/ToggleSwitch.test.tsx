import { render } from '@testing-library/react'
import { ToggleSwitch } from './index'
import '@testing-library/jest-dom'

describe('ToggleSwitch', () => {
  it('should render correctly with default props', () => {
    const { getByTestId } = render(
      <ToggleSwitch checked={false} onChange={() => { }} successColor="green" />
    )
    expect(getByTestId('toggle-switch-container')).toBeInTheDocument()
    expect(getByTestId('toggle-switch-input')).not.toBeChecked()
    expect(getByTestId('toggle-switch-slider')).toBeInTheDocument()
  })

  it('should render with label when provided', () => {
    const label = 'Enable notifications'
    const { getByTestId } = render(
      <ToggleSwitch checked={true} onChange={() => { }} successColor="red" label={label} />
    )
    expect(getByTestId('toggle-switch-label')).toHaveTextContent(label)
  })

})
