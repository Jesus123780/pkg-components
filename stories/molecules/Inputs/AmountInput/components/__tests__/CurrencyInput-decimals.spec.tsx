import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AmountInput } from '../index'

describe('<AmountInput/> decimals', () => {
  const onValueChangeSpy = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should allow value with decimals if allowDecimals is true', async () => {
    render(<AmountInput allowDecimals={true} prefix="£" onValueChange={onValueChangeSpy} />)
    await userEvent.type(screen.getByRole('textbox'), '1,234.56')

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.56', undefined, {
      float: 1234.56,
      formatted: '£1,234.56',
      value: '1234.56'
    })

    expect(screen.getByRole('textbox')).toHaveValue('£1,234.56')
  })

  it('should disallow value with decimals if allowDecimals is false', async () => {
    render(<AmountInput allowDecimals={false} prefix="£" onValueChange={onValueChangeSpy} />)
    await userEvent.type(screen.getByRole('textbox'), '1,234.56')

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123456', undefined, {
      float: 123456,
      formatted: '£123,456',
      value: '123456'
    })

    expect(screen.getByRole('textbox')).toHaveValue('£123,456')
  })

  it('should limit decimals to decimalsLimit length', () => {
    render(<AmountInput decimalsLimit={3} prefix="£" onValueChange={onValueChangeSpy} />)
    userEvent.type(screen.getByRole('textbox'), '1,234.56789')

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.567', undefined, {
      float: 1234.567,
      formatted: '£1,234.567',
      value: '1234.567'
    })

    expect(screen.getByRole('textbox')).toHaveValue('£1,234.567')
  })

  it('should be disabled if disabled prop is true', () => {
    render(<AmountInput decimalsLimit={3} disabled={true} onValueChange={onValueChangeSpy} />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('should handle starting with decimal separator', () => {
    render(<AmountInput prefix="$" onValueChange={onValueChangeSpy} />)

    expect(screen.getByRole('textbox')).toHaveValue('')

    userEvent.type(screen.getByRole('textbox'), '.')

    expect(screen.getByRole('textbox')).toHaveValue('.')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: ''
    })

    userEvent.type(screen.getByRole('textbox'), '9')

    expect(screen.getByRole('textbox')).toHaveValue('$0.9')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('.9', undefined, {
      float: 0.9,
      formatted: '$0.9',
      value: '.9'
    })
  })

  it('should handle currencies without decimals', () => {
    render(
      <AmountInput
        intlConfig={{ locale: 'ja-JP', currency: 'JPY' }}
        onValueChange={onValueChangeSpy}
      />
    )

    expect(screen.getByRole('textbox')).toHaveValue('')

    userEvent.type(screen.getByRole('textbox'), '1')

    expect(screen.getByRole('textbox')).toHaveValue('￥1')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1', undefined, {
      float: 1,
      formatted: '￥1',
      value: '1'
    })
  })

  it('should handle currencies without decimals with provided decimalScale', () => {
    render(
      <AmountInput
        decimalScale={0}
        intlConfig={{ locale: 'ja-JP', currency: 'JPY' }}
        onValueChange={onValueChangeSpy}
      />
    )

    expect(screen.getByRole('textbox')).toHaveValue('')

    userEvent.type(screen.getByRole('textbox'), '123')
    userEvent.click(document.body)

    expect(screen.getByRole('textbox')).toHaveValue('￥123')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123', undefined, {
      float: 123,
      formatted: '￥123',
      value: '123'
    })
  })

  it('should handle starting with decimal separator that is non period', () => {
    render(
      <AmountInput
        intlConfig={{ locale: 'de-DE', currency: 'EUR' }}
        onValueChange={onValueChangeSpy}
      />
    )

    expect(screen.getByRole('textbox')).toHaveValue('')

    userEvent.type(screen.getByRole('textbox'), ',')

    expect(screen.getByRole('textbox')).toHaveValue(',')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: ''
    })

    userEvent.type(screen.getByRole('textbox'), '9')

    expect(screen.getByRole('textbox')).toHaveValue('0,9\xa0€')
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(',9', undefined, {
      float: 0.9,
      formatted: '0,9 €',
      value: ',9'
    })
  })
})
