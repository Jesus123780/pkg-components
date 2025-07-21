import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { getLocaleConfig } from '../utils'
import { AmountInput } from '../index'

jest.mock('../utils/getLocaleConfig', () => ({
  getLocaleConfig: jest.fn().mockReturnValue({ groupSeparator: ',', decimalSeparator: '.' }),
}))

describe('<AmountInput/> no locale', () => {
  it('should have empty string for groupSeparator and decimalSeparator if not passed in and cannot find default locale', () => {
    (getLocaleConfig as jest.Mock).mockReturnValue({ groupSeparator: '', decimalSeparator: '' })
    render(<AmountInput value="123456789" />)
    expect(screen.getByRole('textbox')).toHaveValue('123456789')
  })
})
