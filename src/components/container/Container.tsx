import React from "react";

import styles from './styles.module.sass'

interface ContainerProps {
    children?: React.ReactNode;
    title?: string
}

const Container: React.FC<ContainerProps> = ({ title, children }) => (
    <div className={styles.section}>
        {title && (
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>{title}</h2>
                <hr className={styles.divider} />
            </div>
        )}
        {children && (
            <div className={styles.content}>
                {children}
            </div>
        )}
    </div>
)

export default Container
