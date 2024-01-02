import React from 'react'

import styles from './styles.module.sass'

/**
 * Properties for the Button component.
 */
interface InputProps extends React.ButtonHTMLAttributes<unknown> {
    /**
     * The content inside the button.
     */
    children?: string
    /**
     * The variant style of the button.
     */
    variant?: 'primary' | 'default'
}

/**
 * A button component with optional properties and styling variants.
 *
 * @param {InputProps} props - The properties for the Button component.
 * @returns {JSX.Element} Returns the rendered Button component.
 */
const Button: React.FC<InputProps> = (props: InputProps): JSX.Element => (
    <button
        {...props}
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
