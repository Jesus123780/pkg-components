const locale = {
  COP: 'es-CO'
}
// Parse a number into money format, this receives amount in cents.
export function moneyParser (currency, valueInCents, showSymbol) {
  const settings = { style: 'currency', currency, currencyDisplay: 'code' }
  const money = valueInCents / 100
  const moneyFormatted = new Intl.NumberFormat(
    locale[currency],
    settings
  ).format(money)
  return showSymbol === true
    ? appendSymbol(moneyFormatted, currency)
    : moneyFormatted
}

function appendSymbol (numberFormatted, currency) {
  const splittedValue = numberFormatted.includes('-')
    ? numberFormatted.split(`-${currency}`)
    : numberFormatted.split(`${currency}`)
  const negativeSymbol = numberFormatted.includes('-') ? '-' : ''
  return `${negativeSymbol}${currency} $${splittedValue[1].trim()}`
}

export function moneyParserNoCurrency (currency, valueInCents) {
  const moneyParsed = moneyParser(currency, valueInCents, true)
  return moneyParsed.replace(' ', '').replace(currency, '')
}
