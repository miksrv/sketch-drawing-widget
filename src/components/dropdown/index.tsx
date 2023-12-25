import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.sass'

interface DropdownProps {
    options: string[]
    label?: string
    onSelect: (selectedOption: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option: string) => {
        setSelectedOption(option)
        onSelect(option)
        setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={dropdownRef}
            className={styles.component}
        >
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.dropdown}>
                <button onClick={toggleDropdown}>
                    {selectedOption || 'Выберите опцию'}
                </button>
                {isOpen && (
                    <ul className={styles.option}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Dropdown
