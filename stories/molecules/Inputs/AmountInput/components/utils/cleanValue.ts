// ============================================================
// cleanValue.ts
// ============================================================

import { parseAbbrValue } from './parseAbbrValue'
import { removeSeparators } from './removeSeparators'
import { removeInvalidChars } from './removeInvalidChars'
import { escapeRegExp } from './escapeRegExp'
import { type CurrencyInputProps } from '../CurrencyInputProps'

export type CleanValueOptions = Pick<
CurrencyInputProps,
| 'decimalSeparator'
| 'groupSeparator'
| 'allowDecimals'
| 'decimalsLimit'
| 'allowNegativeValue'
| 'disableAbbreviations'
| 'prefix'
| 'transformRawValue'
> & {
  value: string
}

/**
 * Remove prefix, separators and extra decimals from value.
 */
export const cleanValue = ({
  value,
  groupSeparator = ',',
  decimalSeparator = '.',
  allowDecimals = true,
  decimalsLimit = 2,
  allowNegativeValue = true,
  disableAbbreviations = false,
  prefix = '',
  transformRawValue = (rawValue) => rawValue
}: CleanValueOptions): string => {
  const transformedValue = transformRawValue(value)

  if (transformedValue === '-') {
    return transformedValue
  }

  const abbreviations = disableAbbreviations
    ? []
    : ['k', 'm', 'b']

  const reg = new RegExp(
    `((^|\\D)-\\d)|(-${escapeRegExp(prefix)})`
  )

  const isNegative = reg.test(
    transformedValue
  )

  /**
   * Is there a digit before the prefix?
   *
   * Example:
   * 1$
   */
  const [
    prefixWithValue,
    preValue
  ] =
    RegExp(
      `(\\d+)-?${escapeRegExp(prefix)}`
    ).exec(value) || []

  const withoutPrefix = prefix
    ? prefixWithValue
      ? transformedValue
        .replace(prefixWithValue, '')
        .concat(preValue)
      : transformedValue.replace(
        prefix,
        ''
      )
    : transformedValue

  const withoutSeparators =
    removeSeparators(
      withoutPrefix,
      groupSeparator
    )

  const withoutInvalidChars =
    removeInvalidChars(
      withoutSeparators,
      [
        groupSeparator,
        decimalSeparator,
        ...abbreviations
      ]
    )

  let valueOnly =
    withoutInvalidChars

  /**
   * Process abbreviations only when they are valid.
   *
   * Valid:
   * 50k
   * 50m
   * 50b
   * 1,5m
   *
   * Invalid:
   * 50m000
   * 5k000
   * m50
   */
  if (!disableAbbreviations) {
    const hasAbbreviation =
      /[kmb]/i.test(
        withoutInvalidChars
      )

    if (hasAbbreviation) {
      const parsed =
        parseAbbrValue(
          withoutInvalidChars,
          decimalSeparator
        )

      /**
       * No dejamos que NaN o Infinity
       * siga avanzando en el flujo.
       */
      if (
        parsed === undefined ||
        parsed === null ||
        !Number.isFinite(parsed)
      ) {
        return ''
      }

      valueOnly = String(parsed)
    }
  }

  const includeNegative =
    isNegative &&
    allowNegativeValue
      ? '-'
      : ''

  if (
    decimalSeparator &&
    valueOnly.includes(
      decimalSeparator
    )
  ) {
    const [
      int,
      decimals
    ] =
      valueOnly.split(
        decimalSeparator
      )

    const trimmedDecimals =
      decimalsLimit && decimals
        ? decimals.slice(
          0,
          decimalsLimit
        )
        : decimals

    const includeDecimals =
      allowDecimals
        ? `${decimalSeparator}${trimmedDecimals}`
        : ''

    return `${includeNegative}${int}${includeDecimals}`
  }

  return `${includeNegative}${valueOnly}`
}
