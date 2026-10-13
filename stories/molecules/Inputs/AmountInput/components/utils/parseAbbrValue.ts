

// ============================================================
// parseAbbrValue.ts
// ============================================================

type Abbreviation = 'k' | 'm' | 'b'

const ABBREVIATION_MULTIPLIERS: Record<
  Abbreviation,
  number
> = {
  k: 1_000,
  m: 1_000_000,
  b: 1_000_000_000
}

/**
 * Parses:
 *
 * 10k
 * 10m
 * 10b
 * 1,5m
 *
 * and returns a numeric value.
 *
 * Invalid examples return undefined:
 *
 * 10m000
 * 10k000
 * m10
 */
export const parseAbbrValue = (
  value: string,
  decimalSeparator = '.'
): number | undefined => {
  if (!value) {
    return undefined
  }

  const normalizedDecimalSeparator =
    decimalSeparator === ''
      ? '.'
      : decimalSeparator

  const escapedSeparator =
    normalizedDecimalSeparator.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    )

  const regex = new RegExp(
    `^(-?(?:\\d+(?:${escapedSeparator}\\d+)?|${escapedSeparator}\\d+))(k|m|b)$`,
    'i'
  )

  const match =
    value.trim().match(regex)

  if (!match) {
    return undefined
  }

  const numericPart =
    match[1].replace(
      new RegExp(
        escapedSeparator,
        'g'
      ),
      '.'
    )

  const abbreviation =
    match[2].toLowerCase() as Abbreviation

  const numericValue =
    Number(numericPart)

  if (
    !Number.isFinite(
      numericValue
    )
  ) {
    return undefined
  }

  const result =
    numericValue *
    ABBREVIATION_MULTIPLIERS[
      abbreviation
    ]

  return Number.isFinite(result)
    ? result
    : undefined
}
