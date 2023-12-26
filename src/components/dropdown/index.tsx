import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.sass'

interface DropdownProps {
    options: string[]
    label?: string
    onSelect?: (selectedOption: string) => void
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
        setIsOpen(false)
        onSelect?.(option)
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

            <div
                className={`${styles.dropdown} ${
                    isOpen ? styles.open : undefined
                }`}
            >
                <button
                    onClick={toggleDropdown}
                    className={selectedOption ? styles.selected : undefined}
                >
                    {selectedOption || 'Выберите опцию'}
                    <span className={styles.arrow}>
                        {isOpen ? (
                            <svg
                                fill={'#6d7885'}
                                height={'12px'}
                                width={'12px'}
                                viewBox={'0 0 330 330'}
                            >
                                <path
                                    d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
                                />
                            </svg>
                        ) : (
                            <svg
                                fill={'#6d7885'}
                                height={'12px'}
                                width={'12px'}
                                viewBox={'0 0 330 330'}
                            >
                                <path
                                    d='M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z'
                                />
                            </svg>
                        )}
                    </span>
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
