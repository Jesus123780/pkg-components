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
 * Formatea un valor como un número siguiendo el formato de Colombia.
 * Si el valor no es un número válido, lo devuelve tal como está.
 *
 * @param {string|number} value - El valor a formatear.
 * @param {string} [currency='COP'] - La moneda a utilizar (opcional).
 * @returns {string} El valor formateado como número o el valor original si no es numérico.
 */
export const numberFormat = (value, options = {
  currency: 'COP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency',
  notation: 'standard'
}) => {
  // Verifica si el valor es nulo o indefinido, devolviendo el mismo valor.
  if (value === null || value === undefined) {
    return value
  }

  // Verifica si el valor es numérico
  if (!isNaN(value)) {
    const settings = { ...options }
    // Si el número es muy alto, agrega K o M
    return new Intl.NumberFormat(locale[options.currency], settings).format(value)
  }

  // Devuelve el valor original si no es un número.
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
