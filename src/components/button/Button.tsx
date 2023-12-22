/**
 * Button component for user interaction.
 *
 * @module Button
 */
import React from 'react'

import styles from './styles.module.sass'

/**
 * @typedef {Object} InputProps - Props for the Button component.
 * @property {string} [children] - The content inside the button.
 * @property {'primary' | 'default'} [variant] - The variant style of the button.
 * @property {boolean} [disabled] - Whether the button is disabled.
 */

interface InputProps extends React.ButtonHTMLAttributes<unknown> {
    children?: string
    variant?: 'primary' | 'default'
}

/**
 * Button component that renders a clickable button with specified styles.
 *
 * @param {InputProps} props - Props passed to the Button component.
 * @returns {JSX.Element} Returns the JSX element of the Button component.
 */
const Button: React.FC<InputProps> = (props: InputProps): JSX.Element => (
    <button
        type={'button'}
        className={`
            ${styles.component}
            ${props.disabled ? styles.disabled : ''}
            ${props.variant === 'primary' ? styles.primary : styles.default}
        `}
    >
        {props.children}
    </button>
)

export default Button
