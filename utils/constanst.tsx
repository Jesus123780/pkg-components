export const MAX_PRICE: number = 999999999999.99

export const MAX_LENGTH_AMOUNT: number = MAX_PRICE.toString().length - 2

export const DAYS_STRINGS: Record<string, string> = {
  L: 'Lunes',
  M: 'Martes',
  MI: 'Miércoles',
  J: 'Jueves',
  V: 'Viernes',
  S: 'Sábado',
  D: 'Domingo'
}

export const FULL_DAYS_STRINGS: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
