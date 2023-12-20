import React, {useEffect, useState} from "react";
import Sketch2DEditor from "./components/sketch-2d-editor";
import Sketch3DViewer from "./components/sketch-3d-viewer";
import FormEditor from "./components/form-editor";

import {FormProps} from "./types";

import styles from './styles.module.sass'
import {Point2D} from "../../functions/types";

const SketchForm: React.FC = () => {
    const [formState, setFormState] = useState<FormProps>()
    const [drawing, setDrawing] = useState<boolean>(false);

    const handleSketchEdit = (sketch?: Point2D[]) => {
        setFormState({ ...formState, sketch: sketch})
    }

    const handleFormChange = (name: keyof FormProps, value: string) => {
        setFormState({ ...formState, [name]: value})
    }

    useEffect(() => {
        // Функция-обработчик для отслеживания нажатия на клавишу
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDrawing(false); // устанавливаем drawing в false при нажатии на ESC
            }
        };

        // Добавляем событие для прослушивания клавиатуры при монтировании компонента
        window.addEventListener('keydown', handleKeyPress);

        // Убираем слушатель события при размонтировании компонента
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []); // Пустой массив зависимостей означает, что useEffect будет вызван один раз при монтировании компонента

    useEffect(() => {
        setDrawing(true)
    }, []);

    return (
        <div className={styles.section}>
            <Sketch2DEditor
                drawing={drawing}
                onSketchEdit={handleSketchEdit}
            />
            <FormEditor
                formState={formState}
                onChangeFormState={handleFormChange}
            />
        </div>
    )
}

export default SketchForm
