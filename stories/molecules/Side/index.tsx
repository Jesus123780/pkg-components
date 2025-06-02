'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { Portal } from '../../organisms'
import { Overline } from '../../atoms'
import { getGlobalStyle } from '../../../helpers'

interface LateralModalProps {
    open: boolean
    direction?: 'left' | 'right'
    children: React.ReactNode
    style?: React.CSSProperties
    handleClose?: () => void
}

/**
 * @param {boolean} open - Modal visibility.
 * @param {'left' | 'right'} direction - Slide direction.
 * @param {React.ReactNode} children - Modal content.
 */
export const LateralModal: React.FC<LateralModalProps> = ({
    open,
    direction = 'right',
    children,
    style = {},
    handleClose = () => { }
}) => {
    const baseClass = styles.modal
    const isRight = direction === 'right'

    const directionClass = isRight ? styles.fromRight : styles.fromLeft
    const openClass = open ? (isRight ? styles.openRight : styles.openLeft) : ''

    return (
        <>
            <Portal>
                <Overline
                    show={open}
                    bgColor={getGlobalStyle('--color-background-overline')}
                    zIndex={getGlobalStyle('--z-index-9999')}
                    onClick={handleClose}
                />
            </Portal>
            <div className={`${baseClass} ${directionClass} ${openClass}`} style={style}>
                {children}
            </div>
        </>
    )
}

LateralModal.propTypes = {
    open: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.node
}
LateralModal.defaultProps = {
    direction: 'right',
    children: null
}
