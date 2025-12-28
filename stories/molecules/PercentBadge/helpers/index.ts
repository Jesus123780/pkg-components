// decimalUtils.ts
/**
 * Small decimal helpers using BigInt to compute percent exactly (to given precision).
 * Handles numeric strings and numbers. Avoids floating point rounding issues.
 */

/**
 * Parse a numeric input into {int: bigint, scale: number}
 * e.g. "12.34" -> { int: 1234n, scale: 2 }
 *
 * @param {string|number} input
 */
export const parseDecimal = (input: string | number) => {
    if (input === null || input === undefined) {
        throw new Error('parseDecimal: input is null or undefined')
    }

    // expand exponential notation to a fixed decimal string when necessary
    let s = String(input).trim()

    // try to expand scientific notation like "1e-7" using toFixed with safe digits
    if (/[eE]/.test(s)) {
        const num = Number(s)
        if (!Number.isFinite(num)) throw new Error('parseDecimal: invalid number')
        // 18 decimals should be safe for typical currency/percent usage
        s = num.toFixed(18).replace(/(?:\.0+|(\.\d+?)0+)$/, '$1')
    }

    const negative = s.startsWith('-')
    if (negative) s = s.slice(1)

    if (!/^\d+(\.\d+)?$/.test(s)) throw new Error(`parseDecimal: invalid numeric string "${input}"`)

    if (s.indexOf('.') === -1) {
        return { int: BigInt(s) * (negative ? -1n : 1n), scale: 0 }
    }

    const [whole, frac] = s.split('.')
    const scale = frac.length
    const intStr = whole + frac
    const int = BigInt(intStr) * (negative ? -1n : 1n)
    return { int, scale }
}

/**
 * Compute percentage change: ((newVal - oldVal) / oldVal) * 100
 * Returns string formatted with given precision (number of decimal places).
 *
 * Uses integer arithmetic with BigInt to avoid typical floating point errors.
 *
 * @param {string|number} oldVal
 * @param {string|number} newVal
 * @param {number} precision - number of decimals in result (default 0)
 * @returns {string} formatted percent (e.g. "-28" or "12.34")
 */
export const percentChange = (oldVal: string | number, newVal: string | number, precision = 0): string => {
    const parsedOld = parseDecimal(oldVal)
    const parsedNew = parseDecimal(newVal)

    // division by zero
    if (parsedOld.int === 0n) {
        // if both zero, return 0
        if (parsedNew.int === 0n) return (0).toFixed(precision)
        // otherwise undefined/infinite change
        throw new Error('percentChange: division by zero (oldVal is zero)')
    }

    // Align scales: numerator = n_int * 10^s_o - o_int * 10^s_n
    const pow10 = (n: number) => 10n ** BigInt(n)
    const nAligned = parsedNew.int * pow10(parsedOld.scale)
    const oAligned = parsedOld.int * pow10(parsedNew.scale)
    const numerator = nAligned - oAligned // bigint
    const denominator = parsedOld.int * pow10(parsedNew.scale) // bigint

    // percent_scaled = (numerator * 100 * 10^precision) / denominator  (we'll round)
    const scaleFactor = 10n ** BigInt(precision)
    const numeratorScaled = numerator * 100n * scaleFactor

    const sign = numeratorScaled >= 0n ? 1n : -1n
    const absNum = numeratorScaled >= 0n ? numeratorScaled : -numeratorScaled
    const absDen = denominator >= 0n ? denominator : -denominator

    const quotient = absNum / absDen
    const remainder = absNum % absDen

    // Round to nearest integer (ties go up)
    const shouldRoundUp = remainder * 2n >= absDen
    const rounded = (quotient + (shouldRoundUp ? 1n : 0n)) * sign

    // Insert decimal point according to precision
    const roundedStr = rounded.toString().replace('-', '')
    const isNeg = rounded < 0n

    if (precision === 0) {
        return (isNeg ? '-' : '') + roundedStr
    }

    const padded = roundedStr.padStart(precision + 1, '0')
    const intPart = padded.slice(0, -precision)
    const fracPart = padded.slice(-precision)
    return `${isNeg ? '-' : ''}${intPart}.${fracPart}`
}
