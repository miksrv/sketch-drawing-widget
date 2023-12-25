import React from 'react'

import styles from './styles.module.sass'

/**
 * Props for the Message component.
 */
interface MessageProps {
    /**
     * The title of the message.
     */
    title?: string

    /**
     * The content/body of the message.
     */
    content?: string
}

/**
 * Component to display a simple message with an optional title and content.
 *
 * @component
 * @param {MessageProps} props - The component props.
 * @return {JSX.Element} The Message component.
 */
const Message: React.FC<MessageProps> = ({
    title,
    content
}: MessageProps): JSX.Element => (
    <div className={styles.message}>
        {/* Display the title if provided */}
        {title && <h4 className={styles.title}>{title}</h4>}

        {/* Display the content if provided */}
        {content && <p className={styles.content}>{content}</p>}
    </div>
)

export default Message
