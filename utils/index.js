/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
export * from './constanst'
export * from './test/linkRedirect'

export const getGlobalStyle = (token) => {
  return `var(${token})`
}

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const locale = {
  COP: 'es-CO'
}

/**
 * Format a number or string into currency using Intl.NumberFormat
 * @param {number|string|null|undefined} value - The value to format
 * @param {Object} options - Formatting options
 * @returns {string|number|null|undefined}
 */
export const numberFormat = (value, options = {
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  notation: 'standard'
}) => {
  if (value === null || value === undefined) return value

  const locale = {
    COP: 'es-CO',
    USD: 'en-US',
    EUR: 'de-DE'
  }

  let numericValue = value

  if (typeof value === 'string') {
    // Reemplaza miles (.) y decimales (,) para convertirlo en número JS válido
    numericValue = Number(value.replace(/\./g, '').replace(',', '.'))
  }

  if (!isNaN(numericValue)) {
    const settings = { ...options }
    const currencyLocale = typeof locale[options.currency] === 'string' ? locale[options.currency] : 'es-CO'
    return new Intl.NumberFormat(currencyLocale, settings).format(numericValue)
  }

  return value
}

/**
 * Valida si un número de teléfono tiene el formato (XXX) XXX-XXXX.
 * El formato esperado es: (123) 456-7890.
 * @param {string} phoneNumber - El número de teléfono a validar.
 * @return {boolean} Retorna true si el número de teléfono es válido, false en caso contrario.
 * @example true or false
 */
export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\(\d{3}\) \d{3}-\d{4}$/
  return regex.test(phoneNumber)
}

export const isNull = dato => {
  return !!(!dato || dato === '')
}

export const isNumeric = dato => {
  return !!(isNaN(dato) && dato !== '' && dato !== undefined && dato !== null)
}
export const isPassword = dato => {
  const validar = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  if (validar.test(dato)) {
    return false
  }
  return true
}
export const isCC = dato => {
  const validar = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/gm
  if (validar.test(dato)) {
    return false
  } return true
}

export const valNit = (nit) => {
  let nd; let add = 0
  // eslint-disable-next-line no-cond-assign
  if ((nd = /^[0-9]+-[0-9kK]{1}$/i.exec(nit)) != null) {
    nd[2] = (nd[2].toLowerCase() == 'k') ? 10 : parseInt(nd[2])
    for (let i = 0; i < nd[1].length; i++) {
      add += ((((i - nd[1].length) * -1) + 1) * nd[1][i])
    }
    return ((11 - (add % 11)) % 11) == nd[2]
  }
  return false
}
export const onlyLetters = dato => {
  const validar = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
  if (!validar.test(dato) && dato !== '' && dato !== undefined && dato !== null) {
    return true
  } return false
}

export const rangeLength = (dato, min, max) => {
  if (dato !== undefined && dato !== '' && dato !== null) {
    if ((dato.length < min) || (dato.length > max)) {
      return true
    } return false
  } return false
}

export const Match = (dato1, dato2) => {
  if (dato1 !== dato2) {
    return true
  } return false
}

export const isEmail = email => {
  const validar = /^[-\w.%+]{1,64}@[a-z0-9-]{1,63}\.[a-z]{2,63}$/
  if (
    !validar.test(email) &&
    email !== '' &&
    email !== undefined &&
    email !== null
  ) {
    return true
  }
  return email !== email.toLowerCase()
}

export const passwordConfirm = (value, valueConfirm) => { return !(value === valueConfirm) }

export const ROUTES = Object.freeze({
  login: '/login',
  index: '/',
  home: '/home',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/profile',
  categories: '/categories',
  configuration: '/configuration',
  orders: '/orders',
  products: '/products',
  notFound: '/404',
  serverError: '/500'

})
