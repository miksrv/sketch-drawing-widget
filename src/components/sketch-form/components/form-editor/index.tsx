import Input from 'components/input'
import { encodeCoordinates } from 'functions/geometry'
import React from 'react'

import Dropdown from '../../../dropdown'
import { FormProps } from '../../types'
import styles from './styles.module.sass'

/**
 * Props for the FormEditor component.
 */
interface FormEditorProps {
    /**
     * Current state of the form.
     */
    formState?: FormProps

    /**
     * Callback function triggered when the form state changes.
     * @param {keyof FormProps} name - The name of the property being changed.
     * @param {string} value - The new value for the property.
     */
    onChangeFormState?: (name: keyof FormProps, value: string) => void
}

/**
 * Component for editing form details.
 *
 * @component
 * @param {FormEditorProps} props - The component props.
 * @return {JSX.Element} The FormEditor component.
 */
const FormEditor: React.FC<FormEditorProps> = (props) => {
    const { formState, onChangeFormState } = props

    const options = ['Нет', 'Опция 1', 'Опция 2']

    const handleSelect = (selectedOption: string) => {
        console.log('Выбранная опция:', selectedOption)
    }

    return (
        <div className={styles.section}>
            {/* Input for the profile title */}
            <Input
                value={formState?.title}
                label={'Название профиля'}
                placeholder={'Введите название профиля'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeFormState?.('title', event.target.value)
                }}
            />

            {/* Input for the encoded profile coordinates */}
            <Input
                value={encodeCoordinates(formState?.sketch || [])}
                label={'Код профиля'}
                readOnly={true}
            />

            <Dropdown
                label={'Подгиб слева'}
                options={options}
                onSelect={handleSelect}
            />

            <Dropdown
                label={'Подгиб справа'}
                options={options}
                onSelect={handleSelect}
            />

            <Dropdown
                label={'Сторона покраски'}
                options={options}
                onSelect={handleSelect}
            />
        </div>
    )
}

export default FormEditor
