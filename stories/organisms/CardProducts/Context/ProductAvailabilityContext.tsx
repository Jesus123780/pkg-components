
'use client'

import React from 'react'

interface ProductAvailabilityContextValue {
  activeAvailabilityId: string | null
  openAvailability: (id: string) => void
  closeAvailability: (id?: string) => void
  closeAvailabilityExcept: (id: string) => void
  toggleAvailability: (id: string) => void
}

const ProductAvailabilityContext =
  React.createContext<ProductAvailabilityContextValue | null>(null)

interface ProductAvailabilityProviderProps {
  children: React.ReactNode
}

export const ProductAvailabilityProvider: React.FC<
  ProductAvailabilityProviderProps
> = ({ children }) => {
  const [activeAvailabilityId, setActiveAvailabilityId] =
    React.useState<string | null>(null)

  const openAvailability = React.useCallback((id: string) => {
    setActiveAvailabilityId(id)
  }, [])

  const closeAvailability = React.useCallback((id?: string) => {
    setActiveAvailabilityId(current => {
      if (id === undefined || current === id) {
        return null
      }

      return current
    })
  }, [])

  /*
   * Cierra cualquier otro producto,
   * pero conserva el panel de este producto
   * si ya estaba abierto.
   */
  const closeAvailabilityExcept = React.useCallback((id: string) => {
    setActiveAvailabilityId(current => {
      return current !== null && current !== id
        ? null
        : current
    })
  }, [])

  /*
   * Alterna la disponibilidad de un producto.
   * Nunca permite dos paneles abiertos.
   */
  const toggleAvailability = React.useCallback((id: string) => {
    setActiveAvailabilityId(current => {
      return current === id ? null : id
    })
  }, [])

  const value = React.useMemo<ProductAvailabilityContextValue>(
    () => ({
      activeAvailabilityId,
      openAvailability,
      closeAvailability,
      closeAvailabilityExcept,
      toggleAvailability
    }),
    [
      activeAvailabilityId,
      openAvailability,
      closeAvailability,
      closeAvailabilityExcept,
      toggleAvailability
    ]
  )

  return (
    <ProductAvailabilityContext.Provider value={value}>
      {children}
    </ProductAvailabilityContext.Provider>
  )
}

export const useProductAvailability = () => {
  return React.useContext(ProductAvailabilityContext)
}
