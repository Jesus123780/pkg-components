export * from './constanst'
export * from './test/linkRedirect'

export const getGlobalStyle = (token) => {
  return `var(${token})`
}

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
/**
 * Formatea un valor como un número siguiendo el formato de Colombia.
 * Si el valor no es un número válido, lo devuelve tal como está.
 *
 * @param {string|number} value - El valor a formatear.
 * @returns {string} El valor formateado como número o el valor original si no es numérico.
 */
export const numberFormat = value => {
  // Verifica si el valor es nulo o indefinido, devolviendo el mismo valor.
  if (value === null || value === undefined) {
    return value
  }

  // Convierte el valor a string y elimina puntos.
  const stringValue = `${value}`.replace(/\./g, '')

  // Intenta convertir a número y formatear si es posible.
  const numberValue = parseFloat(stringValue)
  if (!isNaN(numberValue)) {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(numberValue)
  }

  // Devuelve el valor original si no es un número.
  return value
}
/**
 * Description
 * @param {any} phoneNumber type number or string
 * @returns {any}
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
  if (validar.test(dato) === true) {
    return false
  }
  return true
  
}
export const isCC = dato => {
  const validar = /^[0-9]{6,10}/g
  if (validar.test(dato) === true) {
    return false
  } return true
}
  
export const valNit = (nit) => {
  let nd; let add = 0
  // eslint-disable-next-line no-cond-assign
  if (nd = /^[0-9]+-[0-9kK]{1}$/i.exec(nit)) {
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
  if (validar.test(dato) === false && dato !== '' && dato !== undefined && dato !== null) {
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
  const validar = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  if (validar.test(email) === false && email !== '' && email !== undefined && email !== null) {
    return true
  } return false
}
  
export const passwordConfirm = (value, valueConfirm) => { return !(value === valueConfirm) }