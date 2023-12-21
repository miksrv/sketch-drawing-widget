import React from "react";

import styles from './styles.module.sass'

interface InputProps extends React.ButtonHTMLAttributes<any> {
    children?: string
    variant?: 'primary' | 'default'
}

const Button: React.FC<InputProps> = (props) => (
    <button
        type={'button'}
        className={`
            ${styles.component}
            ${props.disabled ? styles.disabled : undefined}
            ${props.variant  === 'primary' ? styles.primary : styles.default}
        `}
    >
        {props.children}
    </button>
)

export default Button
