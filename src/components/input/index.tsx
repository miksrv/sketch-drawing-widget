import React from 'react'

import styles from './styles.module.sass'

/**
 * Props for the Input component.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Optional label text for the input field.
     */
    label?: string
}

/**
 * Input component for text input.
 *
 * @component
 * @param {InputProps} props - The component props.
 * @return {JSX.Element} The Input component.
 */
const Input: React.FC<InputProps> = (props: InputProps): JSX.Element => (
    <div className={styles.component}>
        {props.label && <label className={styles.label}>{props.label}</label>}
        <span className={styles.formField}>
            <input
                {...props}
                className={styles.input}
            />
        </span>
    </div>
)

export default Input
