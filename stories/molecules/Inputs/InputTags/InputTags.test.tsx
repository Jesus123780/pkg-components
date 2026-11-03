import React, { useState } from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { InputTags } from './index'

/**
 * Harness that mimics the product consumer (`update` mode):
 * `registerTags` receives the current input value explicitly and returns
 * whether the persistence succeeded.
 */
const CreatePersistHarness: React.FC<{
  register: (value?: string) => boolean | Promise<boolean>
}> = ({ register }) => {
  const [tags, setTags] = useState<string[]>([])

  return (
    <InputTags
      update
      repeatTag={false}
      tags={tags}
      setTags={setTags}
      registerTags={register}
    />
  )
}

const getInput = () =>
  document.querySelector('input[type="text"]') as HTMLInputElement

const getPlusButton = () =>
  document.querySelector('button') as HTMLButtonElement

describe('InputTags - create & persist flow (update mode)', () => {
  test('a single Enter creates and persists the typed tag', async () => {
    const register = jest.fn().mockResolvedValue(true)

    render(<CreatePersistHarness register={register} />)
    const input = getInput()

    fireEvent.change(input, { target: { value: 'postres' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })

    await waitFor(() => expect(register).toHaveBeenCalledTimes(1))
    expect(register).toHaveBeenCalledWith('postres')

    // Input is cleared only after a successful persist.
    await waitFor(() => expect(input.value).toBe(''))
  })

  test('a single click on "+" persists the typed tag', async () => {
    const register = jest.fn().mockResolvedValue(true)

    render(<CreatePersistHarness register={register} />)
    const input = getInput()

    fireEvent.change(input, { target: { value: 'vinos' } })
    await act(async () => {
      fireEvent.click(getPlusButton())
    })

    await waitFor(() => expect(register).toHaveBeenCalledTimes(1))
    expect(register).toHaveBeenCalledWith('vinos')
  })

  test('two consecutive tags are both persisted without losing the first', async () => {
    const register = jest.fn().mockResolvedValue(true)

    render(<CreatePersistHarness register={register} />)
    const input = getInput()

    fireEvent.change(input, { target: { value: 'postres' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })
    await waitFor(() => expect(input.value).toBe(''))

    fireEvent.change(input, { target: { value: 'vinos' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })

    await waitFor(() => expect(register).toHaveBeenCalledTimes(2))
    expect(register).toHaveBeenNthCalledWith(1, 'postres')
    expect(register).toHaveBeenNthCalledWith(2, 'vinos')
  })

  test('an empty value does not trigger a request', async () => {
    const register = jest.fn().mockResolvedValue(true)

    render(<CreatePersistHarness register={register} />)
    const input = getInput()

    fireEvent.change(input, { target: { value: '   ' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })

    expect(register).not.toHaveBeenCalled()
  })

  test('keeps the typed value when persistence fails (recoverable)', async () => {
    const register = jest.fn().mockResolvedValue(false)

    render(<CreatePersistHarness register={register} />)
    const input = getInput()

    fireEvent.change(input, { target: { value: 'oferta' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })

    await waitFor(() => expect(register).toHaveBeenCalledWith('oferta'))
    // Value is preserved so the user can retry without retyping.
    expect(input.value).toBe('oferta')
  })

  test('Enter does not submit the surrounding form', async () => {
    const register = jest.fn().mockResolvedValue(true)
    const onSubmit = jest.fn((e: React.FormEvent) => e.preventDefault())

    render(
      <form onSubmit={onSubmit}>
        <CreatePersistHarness register={register} />
      </form>
    )
    const input = getInput()

    fireEvent.change(input, { target: { value: 'postres' } })
    await act(async () => {
      fireEvent.keyDown(input, { key: 'Enter' })
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
