import Dropdown from 'components/dropdown'
import Input from 'components/input'
import { encodeCoordinates } from 'functions/geometry'
import React from 'react'

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

    onFormSubmit?: () => void

    /**
     * Callback function triggered when the form state changes.
     * @param {keyof FormProps} name - The name of the property being changed.
     * @param {string} value - The new value for the property.
     */
    onChangeFormState?: (name: keyof FormProps, value: string) => void
}

const pointOptions = ['Нет', 'ᓓ', 'ᓗ']
const paintSideOptions = ['Нет', 'Сверху', 'Снизу', 'Двухсторонняя']

/**
 * Component for editing form details.
 *
 * @component
 * @param {FormEditorProps} props - The component props.
 * @return {JSX.Element} The FormEditor component.
 */
const FormEditor: React.FC<FormEditorProps> = (
    props: FormEditorProps
): JSX.Element => {
    const { formState, onFormSubmit, onChangeFormState } = props

    const handleSelect = (name: keyof FormProps, selectedOption: string) => {
        onChangeFormState?.(name, selectedOption)
    }

    return (
        <form
            className={styles.section}
            onSubmit={onFormSubmit}
        >
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
                name={'firstPoint'}
                label={'Законцовка в начале'}
                options={pointOptions}
                onSelect={handleSelect}
            />

            <Dropdown
                name={'lastPoint'}
                label={'Законцовка в конце'}
                options={pointOptions}
                onSelect={handleSelect}
            />

            <Dropdown
                name={'paintSide'}
                label={'Сторона покраски'}
                options={paintSideOptions}
                onSelect={handleSelect}
            />
        </form>
    )
}

export default FormEditor
