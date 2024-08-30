import Dropdown from 'components/dropdown'
import Input from 'components/input'
import { Point2D } from 'functions/types'
import React from 'react'

import { FormProps } from '../../types'
import styles from './styles.module.sass'

/**
 * Props for the FormEditor component.
 */
interface FormEditorProps {
    drawing?: boolean
    /**
     * Current state of the form.
     */
    formState?: FormProps

    formSketch?: Point2D[]

    /**
     * Callback function triggered when the form state changes.
     * @param {keyof FormProps} name - The name of the property being changed.
     * @param {string} value - The new value for the property.
     */
    onChangeFormState?: (name: keyof FormProps, value: string) => void
}

const pointOptions = ['Нет', 'ᓓ', 'ᓗ']
const paintSideOptions = ['Нет', 'Сверху', 'Снизу', 'Двухсторонняя']
const paintColors = [
    'Нет',
    '3',
    '1014 Слоновая кость',
    '1015 Светлая слоновая кость',
    '1018 Желтый цинк',
    '1018 Яркий желтый',
    '3003 Красный рубин',
    '3005 Красное вино',
    '3009 Красная окись',
    '3011 коричнево-красный',
    '5002 Ультрамарин',
    '5021 Синяя вода',
    '6002 Зеленый лист',
    '6005 Зеленый мох',
    '6026 Зеленый опал',
    '6029 Зеленая мята',
    '7004 Сигнальный серый',
    '7005 Мышиный',
    '7024 Серый графит',
    '7024 Серый графит (матовый)',
    '8004 Коричневая медь',
    '8017 Шоколад',
    '8019 Серо-коричневый',
    '9003 Сигнально-белый',
    '9004 Сигнально-черный',
    '9005 Черный темный',
    'Printech',
    'Ral',
    'Белый',
    'В ассортименте',
    'Дымка',
    'Желтый',
    'Зеленая листва',
    'Зеленая мята',
    'Зеленый мох',
    'Зеленый опал',
    'Коррида',
    'Красное вино',
    'Красный кирпич (Printech)',
    'Медь (Printech)',
    'Морская волна',
    'Оцинкованный',
    'Оцинковка',
    'Пепси',
    'Рваный камень (Printech)',
    'Рубин',
    'Светлая слоновая кость',
    'Светло-синий',
    'Светлое дерево (Printech)',
    'Светлый алюминий',
    'Серо-синий',
    'Серо-синий (матовый)',
    'Серый',
    'Слоновая кость',
    'Сосна (Printech)',
    'Темная вишня',
    'Темное дерево (Printech)',
    'Темный шоколад',
    'Шоколад',
    'в ассортименте',
    'на выбор',
    'оцинковка'
]

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
    const { drawing, formState, formSketch, onChangeFormState } = props

    const handleSelect = (name: keyof FormProps, selectedOption: string) => {
        onChangeFormState?.(name, selectedOption)
    }

    return (
        <div className={styles.section}>
            {/* Input for the profile title */}

            <div className={styles.grid}>
                <Input
                    required={true}
                    value={formState?.title || ''}
                    label={'Название профиля'}
                    placeholder={'Введите название профиля'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeFormState?.('title', event.target.value)
                    }}
                />

                <Input
                    required={true}
                    value={formState?.name || ''}
                    label={'Как вас зовут?'}
                    placeholder={'Пожалуйста, укажите ваше имя'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeFormState?.('name', event.target.value)
                    }}
                />
            </div>

            <div className={styles.grid}>
                <Input
                    required={true}
                    value={formState?.email || ''}
                    label={'Ваш email'}
                    placeholder={'Укажите email адрес'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeFormState?.('email', event.target.value)
                    }}
                />

                <Input
                    value={formState?.phone || ''}
                    label={'Телефон'}
                    placeholder={'Укажите номер телефона'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeFormState?.('phone', event.target.value)
                    }}
                />
            </div>

            {/* Input for the encoded profile coordinates */}
            {/*<Input*/}
            {/*    value={formSketch?.length ? encodeCoordinates(formSketch) : ''}*/}
            {/*    label={'Код профиля'}*/}
            {/*    readOnly={true}*/}
            {/*/>*/}

            <div className={styles.grid}>
                <Input
                    required={true}
                    value={formState?.count || ''}
                    label={'Количество заготовок'}
                    placeholder={'Укажите необходимое количество заготовок'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let numericValue = event.target.value.replace(/\D/g, '')

                        numericValue = numericValue.replace(/^0+/, '')

                        if (numericValue && parseInt(numericValue) <= 5000) {
                            onChangeFormState?.('count', numericValue)
                        } else if (numericValue === '') {
                            onChangeFormState?.('count', '')
                        }
                    }}
                />

                <Input
                    required={true}
                    value={formState?.length || ''}
                    label={'Длина в мм (максимум 3000 мм)'}
                    placeholder={'Укажите длину заготовки'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let numericValue = event.target.value.replace(/\D/g, '')

                        numericValue = numericValue.replace(/^0+/, '')

                        if (numericValue && parseInt(numericValue) <= 3000) {
                            onChangeFormState?.('length', numericValue)
                        } else if (numericValue === '') {
                            onChangeFormState?.('length', '')
                        }
                    }}
                />
            </div>

            <div className={styles.grid}>
                <Dropdown
                    name={'firstPoint'}
                    label={'Законцовка в начале'}
                    disabled={drawing || !formSketch?.length}
                    value={formState?.firstPoint || pointOptions[0]}
                    options={pointOptions}
                    onSelect={handleSelect}
                />

                <Dropdown
                    name={'lastPoint'}
                    label={'Законцовка в конце'}
                    disabled={drawing || !formSketch?.length}
                    value={formState?.lastPoint || pointOptions[0]}
                    options={pointOptions}
                    onSelect={handleSelect}
                />
            </div>

            <div className={styles.grid}>
                <Dropdown
                    name={'paintSide'}
                    label={'Сторона покраски'}
                    disabled={drawing}
                    value={formState?.paintSide || paintSideOptions[0]}
                    options={paintSideOptions}
                    onSelect={handleSelect}
                />

                <Dropdown
                    name={'paintColor'}
                    label={'Цвет покраски'}
                    disabled={drawing}
                    value={formState?.paintColor || paintSideOptions[0]}
                    options={paintColors}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    )
}

export default FormEditor
