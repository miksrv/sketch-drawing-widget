import { API } from 'api/api'
import { addHookPoints } from 'functions/geometry'
import { Point2D } from 'functions/types'
import React, { useEffect, useState } from 'react'
import { update } from 'update'

import packageInfo from '../../../package.json'
import Button from '../button'
import Index, { Tab } from '../tabs'
import FormEditor from './components/form-editor'
import Message from './components/message'
import Sketch2DEditor from './components/sketch-2d-editor'
import Sketch2DScan from './components/sketch-2d-scan'
import Sketch3DViewer from './components/sketch-3d-viewer'
import styles from './styles.module.sass'
import { FormProps } from './types'

const SketchForm: React.FC = () => {
    const [formState, setFormState] = useState<FormProps>()
    const [drawing, setDrawing] = useState<boolean>(false)
    const [firstPoints, setFirstPoints] = useState<Point2D[]>([])
    const [lastPoints, setLastPoints] = useState<Point2D[]>([])

    const [createSketch, { isLoading: submitLoading }] =
        API.useSketchCreateMutation()

    const handleSketchEdit = (sketch?: Point2D[]) => {
        setFormState({ ...formState, sketch: sketch })
    }

    const handleFormChange = (name: keyof FormProps, value: string) => {
        setFormState({ ...formState, [name]: value })
    }

    const handleFormSubmit = () => {
        console.log('111')
        if (formState) {
            createSketch(formState)
        }
    }

    useEffect(() => {
        if (
            formState?.sketch &&
            formState.sketch?.length > 2 &&
            formState.firstPoint
        ) {
            if (formState.firstPoint === 'ᓓ') {
                const firstPoint = addHookPoints(
                    formState.sketch,
                    true,
                    5,
                    true
                )
                const secondPoint = addHookPoints(
                    [firstPoint, ...formState.sketch],
                    true,
                    20,
                    true
                )

                setFirstPoints([secondPoint, firstPoint])
            }

            if (formState.firstPoint === 'ᓗ') {
                const firstPoint = addHookPoints(
                    formState.sketch,
                    false,
                    5,
                    true
                )
                const secondPoint = addHookPoints(
                    [firstPoint, ...formState.sketch],
                    false,
                    20,
                    true
                )

                setFirstPoints([secondPoint, firstPoint])
            }

            if (formState.firstPoint === 'Нет') {
                setFirstPoints([])
            }
        }
    }, [formState?.firstPoint])

    useEffect(() => {
        if (
            formState?.sketch &&
            formState.sketch?.length > 2 &&
            formState.lastPoint
        ) {
            if (formState.lastPoint === 'ᓓ') {
                const firstPoint = addHookPoints(
                    formState.sketch,
                    true,
                    5,
                    false
                )
                const secondPoint = addHookPoints(
                    [...formState.sketch, firstPoint],
                    true,
                    20,
                    false
                )

                setLastPoints([firstPoint, secondPoint])
            }

            if (formState.lastPoint === 'ᓗ') {
                const firstPoint = addHookPoints(
                    formState.sketch,
                    false,
                    5,
                    false
                )
                const secondPoint = addHookPoints(
                    [...formState.sketch, firstPoint],
                    false,
                    20,
                    false
                )

                setLastPoints([firstPoint, secondPoint])
            }

            if (formState.lastPoint === 'Нет') {
                setLastPoints([])
            }
        }
    }, [formState?.lastPoint])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDrawing(false)
            }
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    useEffect(() => {
        setDrawing(true)
    }, [])

    return (
        <div className={styles.section}>
            <Index>
                <Tab label={'Эскиз'}>
                    <Sketch2DEditor
                        drawing={drawing}
                        sketch={formState?.sketch}
                        firstPoints={firstPoints}
                        lastPoints={lastPoints}
                        paintSide={formState?.paintSide}
                        onSketchEdit={handleSketchEdit}
                    />
                </Tab>
                <Tab label={'3D Модель'}>
                    <Sketch3DViewer
                        firstPoints={!!firstPoints?.length}
                        lastPoints={!!lastPoints?.length}
                        sketch={
                            formState?.sketch
                                ? [
                                      ...firstPoints,
                                      ...formState.sketch,
                                      ...lastPoints
                                  ]
                                : []
                        }
                    />
                </Tab>
                <Tab label={'Развертка'}>
                    <Sketch2DScan
                        firstPoints={firstPoints}
                        lastPoints={lastPoints}
                        sketch={formState?.sketch}
                    />
                </Tab>
            </Index>
            <div className={styles.formEditor}>
                <Message
                    content={
                        drawing
                            ? 'Режим редактирования (нажмите ESC)'
                            : 'Режим просмотра'
                    }
                />
                <FormEditor
                    formState={formState}
                    onFormSubmit={handleFormSubmit}
                    onChangeFormState={handleFormChange}
                />
                <div className={styles.buttonsContainer}>
                    <Button
                        variant={'primary'}
                        onClick={handleFormSubmit}
                        disabled={submitLoading}
                    >
                        {'Сохранить'}
                    </Button>
                    <Button disabled={submitLoading}>{'Отмена'}</Button>
                </div>
                <div className={styles.footer}>
                    {'Version:'} {packageInfo.version}
                    {','} {update}
                </div>
            </div>
        </div>
    )
}

export default SketchForm
