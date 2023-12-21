import React from "react";

import styles from './styles.module.sass'

interface MessageProps {
    title?: string
    content?: string
}

const Message: React.FC<MessageProps> = ({title, content}) => (
    <div className={styles.message}>
        {title && (<h4 className={styles.title}>{title}</h4>)}
        {content && (<p className={styles.content}>{content}</p>)}
    </div>
)

export default Message
