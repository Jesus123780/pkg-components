/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
export * from './constanst'
export * from './test/linkRedirect'

export const getGlobalStyle = (token: string) => {
  return `var(${token})`
}

export const validateEmail = (email: string) => {
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
type SupportedCurrency = 'COP' | 'USD' | 'EUR';

export const numberFormat = (
  value: number | string | null | undefined,
  options: {
    currency: SupportedCurrency,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    style?: 'currency',
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact'
  } = {
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      notation: 'standard'
    }
) => {
  if (value === null || value === undefined) return value;

  const locale: Record<SupportedCurrency, string> = {
    COP: 'es-CO',
    USD: 'en-US',
    EUR: 'de-DE'
  }

  let numericValue: number;

  if (typeof value === 'string') {
    // Reemplaza miles (.) y decimales (,) para convertirlo en número JS válido
    numericValue = Number(value.replace(/\./g, '').replace(',', '.'));
  } else {
    numericValue = value;
  }

  if (!Number.isNaN(numericValue)) {
    const settings = {
      ...options,
      style: 'currency'
    } as Intl.NumberFormatOptions;
    const currencyLocale = locale[options.currency] ?? 'es-CO';
    return new Intl.NumberFormat(currencyLocale, settings).format(numericValue);
  }

  return value;
}

/**
 * Valida si un número de teléfono tiene el formato (XXX) XXX-XXXX.
 * El formato esperado es: (123) 456-7890.
 * @param {string} phoneNumber - El número de teléfono a validar.
 * @return {boolean} Retorna true si el número de teléfono es válido, false en caso contrario.
 * @example true or false
 */
export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /^\(\d{3}\) \d{3}-\d{4}$/
  return regex.test(phoneNumber)
}

export const isNull = (dato: string) => {
  return !!(!dato || dato === '')
}

export const isNumeric = (dato: string) => {
  return !!(isNaN(dato as any) && dato !== '' && dato !== undefined && dato !== null)
}
export const isPassword = (dato: string) => {
  const validar = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  if (validar.test(dato)) {
    return false
  }
  return true
}
export const isCC = (dato: string) => {
  const validar = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/gm
  if (validar.test(dato)) {
    return false
  } return true
}

export const valNit = (nit: string) => {
  let nd: RegExpExecArray | null; let add = 0
  // eslint-disable-next-line no-cond-assign
  if ((nd = /^(\d+)-(\d|k)$/i.exec(nit)) != null) {
    const checkDigit = nd[2].toLowerCase() === 'k' ? 10 : Number.parseInt(nd[2], 10);
    for (let i = 0; i < nd[1].length; i++) {
      add += ((((i - nd[1].length) * -1) + 1) * Number(nd[1][i]));
    }
    return ((11 - (add % 11)) % 11) === checkDigit;
  }
  return false;
}
export const onlyLetters = (dato: string) => {
  const validar = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
  if (!validar.test(dato) && dato !== '' && dato !== undefined && dato !== null) {
    return true
  } return false
}

export const rangeLength = (dato: string, min: number, max: number) => {
  if (dato !== undefined && dato !== '' && dato !== null) {
    if ((dato.length < min) || (dato.length > max)) {
      return true
    } return false
  } return false
}

export const Match = (dato1: any, dato2: any) => {
  if (dato1 !== dato2) {
    return true
  } return false
}

export const isEmail = (email: string) => {
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

export const passwordConfirm = (value: string, valueConfirm: string) => { return !(value === valueConfirm) }

export const ROUTES = Object.freeze({
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
  serverError: '/500',
  // NO LAYOUT
  'verify-email': '/verify-email',
  'forgot-password': '/forgot-password',
  'reset-password': '/reset-password',
  merchant: '/merchant',
  login: '/login'

})
