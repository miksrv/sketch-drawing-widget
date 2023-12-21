import React, {useEffect, useState} from "react";
import Sketch2DEditor from "./components/sketch-2d-editor";
import Sketch3DViewer from "./components/sketch-3d-viewer";
import FormEditor from "./components/form-editor";
import Message from "./components/message";
import Tabs, {Tab} from "../tabs/Tabs";

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
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDrawing(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        setDrawing(true)
    }, []);

    return (
        <div className={styles.section}>
            <Tabs>
                <Tab label={'Эскиз'}>
                    <Sketch2DEditor
                        drawing={drawing}
                        sketch={formState?.sketch}
                        onSketchEdit={handleSketchEdit}
                    />
                </Tab>
                <Tab label={'3D Модель'}>
                    <Sketch3DViewer
                        sketch={formState?.sketch}
                    />
                </Tab>
                <Tab label={'Развертка'} disable={true}>

                </Tab>
            </Tabs>
            <div style={{ width: '100%' }}>
                <Message content={drawing ? 'Режим редактирования (нажмите ESC)' : 'Режим просмотра'}/>
                <FormEditor
                    formState={formState}
                    onChangeFormState={handleFormChange}
                />
            </div>
        </div>
    )
}

export default SketchForm
