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
export const renderVal = (data, optionName, accessor) => {
  if (!data) return ''

  if (Array.isArray(optionName)) {
    return optionName
      .map((x) => {
        return accessor && data[accessor] ? data[accessor][x] : data[x]
      })
      .join(' ')
  }

  return data[optionName]
}

/**
 * Updates the `valueInput` state and filters the available options based on the input value.
 *
 * @param {Object} event - Event object from the input change.
 * @property {string} event.target.value - The value of the input.
 */
export const changeSearch = ({ value, setValueInput, options, optionName, accessor, setNewOption }) => {
  setValueInput(value)

  const searchValue = value.toUpperCase()
  const fil = options.filter((x) => {
    return renderVal(x, optionName, accessor)?.toUpperCase().includes(searchValue)
  })

  setNewOption(fil)
}

export const changeValue = ({
  v,
  id,
  name,
  refSelect,
  setSelect = () => {
    return
  },
  onChange = () => {
    return
  }
}) => {
  setSelect(false)
  onChange({ target: { name, value: v[id] } }, !v[id], refSelect)
}

export const findOptionById = (options, id, value) => {return options?.find(option => {return option[id] === value})}
