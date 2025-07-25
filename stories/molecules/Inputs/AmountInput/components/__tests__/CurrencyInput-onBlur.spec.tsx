import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AmountInput } from '../index'


const name = 'inputName';

describe('<AmountInput/> onBlur', () => {
  const onBlurSpy = jest.fn();
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onBlur and onValueChange', () => {
    render(
      <AmountInput
        name={name}
        prefix="$"
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpy}
        decimalScale={2}
      />
    );

    userEvent.type(screen.getByRole('textbox'), '123');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toHaveBeenCalled();

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123.00', name, {
      float: 123,
      formatted: '$123.00',
      value: '123.00',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$123.00');
  });

  it('should call onBlur, but not onValueChange', () => {
    render(
      <AmountInput
        name={name}
        prefix="$"
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpy}
        formatValueOnBlur={false}
        decimalScale={2}
      />
    );

    userEvent.type(screen.getByRole('textbox'), '123');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toHaveBeenCalled();

    expect(onValueChangeSpy).toHaveBeenCalledTimes(3);
    expect(screen.getByRole('textbox')).toHaveValue('$123.00');
  });

  it('should call onBlur for 0', () => {
    render(<AmountInput name={name} prefix="$" onBlur={onBlurSpy} />);

    userEvent.type(screen.getByRole('textbox'), '0');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toHaveBeenCalled();

    expect(screen.getByRole('textbox')).toHaveValue('$0');
  });

  it('should call onBlur for empty value', () => {
    render(<AmountInput name={name} prefix="$" onBlur={onBlurSpy} />);

    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toHaveBeenCalled();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should call onBlur for "-" char', () => {
    render(<AmountInput name={name} prefix="$" onBlur={onBlurSpy} />);

    userEvent.type(screen.getByRole('textbox'), '-');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toHaveBeenCalled();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
