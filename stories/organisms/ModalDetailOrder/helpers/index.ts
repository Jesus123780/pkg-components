interface Sale {
  getAllShoppingCard?: {
    cantProducts?: number
    priceProduct?: number
  }
}

export function calculatePriceTotal (sale: Sale): number {
  const cantProducts = sale?.getAllShoppingCard?.cantProducts ?? 0
  const priceProduct = sale?.getAllShoppingCard?.priceProduct ?? 0

  // Validación para asegurarse de que cantProducts y priceProduct sean números válidos
  if (typeof cantProducts !== 'number' || typeof priceProduct !== 'number') {
    throw new Error('Invalid sale object: cantProducts or priceProduct is not a number.')
  }

  // Validación adicional para asegurarse de que cantProducts y priceProduct sean mayores o iguales a cero
  if (cantProducts < 0 || priceProduct < 0) {
    throw new Error('Invalid sale object: cantProducts or priceProduct is negative.')
  }

  const priceTotal = cantProducts * priceProduct
  return priceTotal
}
