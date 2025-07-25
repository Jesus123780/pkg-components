/**
 * Formats extra and optional data into a single formatted string.
 * @param {Array} dataExtra - Array of extra products, each with an `extraPrice` and `extraName`.
 * @param {Array} dataOptional - Array of optional products, each containing `ExtProductFoodsSubOptionalAll`.
 * @returns {string} - Formatted string combining extra and optional product data.
 */
export const formatProductData = (
  dataExtra: Array<{ extraPrice: number, extraName: string }>,
  dataOptional: Array<{ ExtProductFoodsSubOptionalAll: Array<{ OptionalSubProName: string }> }>,
  numberFormat: (value: number) => string = (value: number) => value.toLocaleString('es')
): string => {
  // Create formatters
  const conjunctionFormatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })
  const unitFormatter = new Intl.ListFormat('es', { style: 'narrow', type: 'unit' })

  // Format extra data
  const formattedExtraData = dataExtra
    .slice(0, 4)
    .map(product => `${numberFormat(product?.extraPrice)}, ${product.extraName}`)
    .filter(item => !(item === null))

  const finalExtraFormat = formattedExtraData.length > 0
    ? conjunctionFormatter.format(formattedExtraData)
    : ''

  // Format optional data
  const formattedOptionalData = dataOptional
    .slice(0, 4)
    .map(product => product?.ExtProductFoodsSubOptionalAll
      ?.map(subProduct => subProduct.OptionalSubProName)
      .join(', '))
    .filter(item => item !== null && item !== undefined && item !== '')

  const finalOptionalFormat = formattedOptionalData.length > 0
    ? unitFormatter.format(formattedOptionalData)
    : ''

  return [finalExtraFormat, finalOptionalFormat].filter(Boolean).join(', ')
}
