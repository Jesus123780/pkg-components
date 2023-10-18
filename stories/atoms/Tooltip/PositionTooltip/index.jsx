import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
// import './Tooltip.css';  // Archivo CSS para estilos

export const PositionTooltip = ({ text, position }) => {
  const [tooltipPosition, setTooltipPosition] = useState(position)
  const tooltipRef = useRef(null)

  useEffect(() => {
    // Función para calcular y ajustar la posición del tooltip
    const calculatePosition = () => {
      const tooltipHeight = tooltipRef.current.clientHeight
      const windowHeight = window.innerHeight
      const offset = 10

      // Si la posición es 'top' y no hay suficiente espacio en la parte superior, cambia a 'bottom'
      if (position === 'top' && tooltipHeight + offset > tooltipRef.current.getBoundingClientRect().top) {
        setTooltipPosition('bottom')
      }

      // Si la posición es 'bottom' y no hay suficiente espacio en la parte inferior, cambia a 'top'
      if (position === 'bottom' && tooltipHeight + offset > windowHeight - tooltipRef.current.getBoundingClientRect().bottom) {
        setTooltipPosition('top')
      }
    }

    // Llamada a la función para calcular la posición inicial
    calculatePosition()

    // Vuelve a calcular la posición cuando se redimensiona la ventana
    window.addEventListener('resize', calculatePosition)
    return () => {
      window.removeEventListener('resize', calculatePosition)
    }
  }, [position])

  return (
    <div className={`tooltip tooltip-${tooltipPosition}`} ref={tooltipRef}>
      {text}
    </div>
  )
}

PositionTooltip.propTypes = {
  position: PropTypes.string,
  text: PropTypes.any
}

