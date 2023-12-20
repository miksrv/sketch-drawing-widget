import React from "react";

import styles from './styles.module.sass'

interface InputProps extends React.InputHTMLAttributes<any> {
    label?: string
}

const Input: React.FC<InputProps> = (props) => (
    <div className={styles.component}>
        {props.label && (
            <label className={styles.label}>
                {props.label}
            </label>
        )}
        <span className={styles.formField}>
            <input
                {...props}
                className={styles.input}
            />
        </span>
    </div>
)

export default Input
