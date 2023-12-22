import React from 'react'

import { encodeCoordinates } from '../../../../functions/geometry'
import Input from '../../../input'
import { FormProps } from '../../types'
import styles from './styles.module.sass'

interface FormEditor {
    formState?: FormProps
    onChangeFormState?: (name: keyof FormProps, value: string) => void
}

const FormEditor: React.FC<FormEditor> = (props) => {
    const { formState, onChangeFormState } = props

    return (
        <div className={styles.section}>
            <Input
                value={formState?.title}
                label={'Название профиля'}
                placeholder={'Введите название профиля'}
                onChange={(event: React.ChangeEvent<any>) => {
                    onChangeFormState?.('title', event.target.value)
                }}
            />
            <Input
                value={encodeCoordinates(formState?.sketch || [])}
                label={'Код профиля'}
                readOnly={true}
            />
        </div>
    )
}

export default FormEditor
