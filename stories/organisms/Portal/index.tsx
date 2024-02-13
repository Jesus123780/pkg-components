import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

/**
 * Portal component for rendering children into a specified DOM element.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the portal.
 * @param {string} [props.selector='portal'] - The selector for the target DOM element.
 * @returns {null} - The React Portal or null if the target DOM element is not found.
 */
export const Portal = ({ children, selector = 'portal' }) => {
  const [dom, setDom] = useState(undefined)
  useEffect(() => {
    const targetDom = window.document.getElementById(selector)
    if (!targetDom) {
      return
    }
    setDom(targetDom)
  }, [dom, selector])

  if (dom) {
    if (selector === undefined) {
      return null
    }
    return ReactDOM.createPortal(children, dom || 'portal')
  }
  return null
}

Portal.propTypes = {
  children: PropTypes.any,
  selector: PropTypes.string
}

