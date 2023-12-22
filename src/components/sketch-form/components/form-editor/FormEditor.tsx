import React from "react";

import Input from "../../../input";

import styles from './styles.module.sass'
import {FormProps} from "../../types";
import {encodeCoordinates} from "../../../../functions/geometry";

interface FormEditor {
    formState?: FormProps
    onChangeFormState?: (name: keyof FormProps, value: string) => void
}

const FormEditor: React.FC<FormEditor> = (props) => {
    const {formState, onChangeFormState} = props

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
