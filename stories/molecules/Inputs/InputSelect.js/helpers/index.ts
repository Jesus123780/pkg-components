/**
 * Renders a value or a combination of values from a data object.
 * If `optionName` is an array, it attempts to fetch multiple values from the data object.
 * If an `accessor` is provided, it accesses the nested object before fetching the value.
 *
 * @param {Object} data - The data object from which to fetch the value.
 * @returns {string} - The rendered value as a string.
 *
 * @example
 * // Assuming accessor is 'details' and optionName is ['first', 'last']
 * const obj = { details: { first: 'John', last: 'Doe' } };
 * renderVal(obj);  // Returns 'John Doe'
 */
export const renderVal = (
  data: Record<string, any>,
  optionName: string | string[],
  accessor?: string
): string => {
  if (data === null) return ''

  if (Array.isArray(optionName)) {
    return optionName
      .map((x) => {
        return (Boolean(accessor)) && (Boolean(data[`${accessor}`])) ? data[`${accessor}`][x] : data[x]
      })
      .join(' ')
  }

  return data[optionName]
}

/**
 * Updates the `valueInput` state and filters the available options based on the input value.
 *
 * @param {Object} params - The parameters for the search function.
 * @param {string} params.value - The value of the input to search.
 * @param {Function} params.setValueInput - State setter for updating the input value.
 * @param {Array<any>} params.options - The list of options to filter.
 * @param {string | string[]} params.optionName - The key(s) to access the option's value.
 * @param {string} [params.accessor] - Optional accessor for nested objects in options.
 * @param {Function} params.setNewOption - State setter for updating the filtered options.
 */
interface ChangeSearchParams {
  value: string
  setValueInput: (value: string) => void
  options: any[]
  optionName: string | string[]
  accessor?: string
  setNewOption: (filteredOptions: any[]) => void
}
export const changeSearch = ({
  value,
  setValueInput,
  options,
  optionName,
  accessor,
  setNewOption
}: ChangeSearchParams): void => {
  // Update the value input state
  setValueInput(value.trim())

  // Normalize the search value to uppercase for case-insensitive matching
  const searchValue = value.trim().toUpperCase()

  // Filter options based on the search input
  const filteredOptions = options.filter((option) => {
    const optionValue = renderVal(option, optionName, accessor)?.toUpperCase() ?? ''
    return optionValue.includes(searchValue)
  })

  // Update the options to display
  setNewOption(filteredOptions)
}
interface ChangeValueProps {
  v: Record<string, any>
  id: string
  optionName?: string
  name: string
  setShowOptions?: (boolean: boolean) => void
  setValueInput?: (string: string) => void
  onChange?: (event: { target: { name: string, value: any } }) => void
}

export const changeValue = ({
  v,
  id,
  name,
  optionName = '',
  setShowOptions = () => null,
  setValueInput = () => null,
  onChange = () => null
}: ChangeValueProps): void => {
  setShowOptions(false)
  setValueInput(v[optionName] as string)
  onChange({ target: { name, value: v[id] } })
}

export const findOptionById = (options: any[], id: string, value: string) => { return (options?.length > 0 && Array.isArray(options)) && options?.find(option => { return option[id] === value }) }
