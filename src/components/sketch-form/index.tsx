import { API } from 'api/api'
import { useAppDispatch, useAppSelector } from 'api/hooks'
import { addHookPoints } from 'functions/geometry'
import { Point2D } from 'functions/types'
import React, { useEffect, useState } from 'react'
import { update } from 'update'

import packageInfo from '../../../package.json'
import { editSketch } from '../../api/applicationSlice'
import Button from '../button'
import Tabs, { Tab } from '../tabs'
import FormEditor from './components/form-editor'
import Message from './components/message'
import Sketch2DEditor from './components/sketch-2d-editor'
import Sketch2DScan from './components/sketch-2d-scan'
import Sketch3DViewer from './components/sketch-3d-viewer'
import styles from './styles.module.sass'
import { FormProps } from './types'

const SketchForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const editableSketch = useAppSelector(
        (state) => state.application.editSketch
    )

    const [formState, setFormState] = useState<FormProps>({})
    const [formSketch, setFormSketch] = useState<Point2D[]>([])
    const [formImage, setFormImage] = useState<string>()
    const [drawing, setDrawing] = useState<boolean>(false)
    const [firstPoints, setFirstPoints] = useState<Point2D[]>([])
    const [lastPoints, setLastPoints] = useState<Point2D[]>([])

    const [createSketch, { isLoading: submitLoading }] =
        API.useSketchCreateMutation()

    const [deleteSketch, { isLoading: deleteLoading }] =
        API.useSketchDeleteMutation()

    const handleSketchEdit = (sketch?: Point2D[]) => {
        setFormSketch(sketch || [])
    }

    const handleFormChange = (name: keyof FormProps, value: string) => {
        setFormState({ ...formState, [name]: value })
    }

    const handleSketchDelete = () => {
        if (editableSketch?.id) {
            deleteSketch(editableSketch?.id)
            clearForm()
        }
    }

    const clearForm = () => {
        dispatch(editSketch(undefined))
        setFormState({})
        setFormSketch([])
        setFirstPoints([])
        setLastPoints([])
        setFormImage('')

        setTimeout(() => {
            setDrawing(true)
        }, 100)
    }

    const handleFormSubmit = () => {
        if (formState && formSketch) {
            clearForm()
            createSketch({ ...formState, image: formImage, sketch: formSketch })
        }
    }

    const handleGetCanvasImage = (image?: string) => {
        setFormImage(image)
    }

    useEffect(() => {
        if (!formState.firstPoint) {
            setFirstPoints([])
            return
        }

        if (formSketch && formSketch?.length > 2 && formState.firstPoint) {
            if (formState.firstPoint === 'ᓓ') {
                const firstPoint = addHookPoints(formSketch, true, 5, true)
                const secondPoint = addHookPoints(
                    [firstPoint, ...formSketch],
                    true,
                    20,
                    true
                )

                setFirstPoints([secondPoint, firstPoint])
            }

            if (formState.firstPoint === 'ᓗ') {
                const firstPoint = addHookPoints(formSketch, false, 5, true)
                const secondPoint = addHookPoints(
                    [firstPoint, ...formSketch],
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
    }, [formSketch, formState?.firstPoint])

    useEffect(() => {
        if (!formState.lastPoint) {
            setLastPoints([])
            return
        }

        if (formSketch && formSketch?.length > 2 && formState.lastPoint) {
            if (formState.lastPoint === 'ᓓ') {
                const firstPoint = addHookPoints(formSketch, true, 5, false)
                const secondPoint = addHookPoints(
                    [...formSketch, firstPoint],
                    true,
                    20,
                    false
                )

                setLastPoints([firstPoint, secondPoint])
            }

            if (formState.lastPoint === 'ᓗ') {
                const firstPoint = addHookPoints(formSketch, false, 5, false)
                const secondPoint = addHookPoints(
                    [...formSketch, firstPoint],
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
    }, [formSketch, formState?.lastPoint])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDrawing(false)
            }
        }

        setDrawing(true)

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    useEffect(() => {
        if (editableSketch && editableSketch?.sketch) {
            setDrawing(false)
            setFormState(editableSketch)
            setFormSketch(editableSketch.sketch)
        }
    }, [editableSketch])

    return (
        <div className={styles.section}>
            <Tabs>
                <Tab label={'Эскиз'}>
                    <Sketch2DEditor
                        drawing={drawing}
                        sketch={formSketch}
                        firstPoints={firstPoints}
                        lastPoints={lastPoints}
                        paintSide={formState?.paintSide}
                        onGetCanvasImage={handleGetCanvasImage}
                        onSketchEdit={handleSketchEdit}
                    />
                </Tab>
                <Tab
                    label={'3D Модель'}
                    disable={!formSketch?.length}
                >
                    <Sketch3DViewer
                        firstPoints={!!firstPoints?.length}
                        lastPoints={!!lastPoints?.length}
                        sketch={
                            formSketch
                                ? [...firstPoints, ...formSketch, ...lastPoints]
                                : []
                        }
                    />
                </Tab>
                <Tab
                    label={'Развертка'}
                    disable={!formSketch?.length}
                >
                    <Sketch2DScan
                        firstPoints={firstPoints}
                        lastPoints={lastPoints}
                        sketch={formSketch}
                    />
                </Tab>
            </Tabs>
            <div className={styles.formEditor}>
                <Message
                    content={
                        drawing
                            ? 'Режим редактирования (нажмите ESC)'
                            : 'Режим просмотра'
                    }
                />
                <FormEditor
                    drawing={drawing}
                    formState={formState}
                    formSketch={formSketch}
                    onChangeFormState={handleFormChange}
                />
                <div className={styles.buttonsContainer}>
                    {editableSketch?.id && (
                        <Button
                            variant={'negative'}
                            disabled={deleteLoading}
                            onClick={handleSketchDelete}
                        >
                            {'Удалить'}
                        </Button>
                    )}
                    <Button
                        variant={'primary'}
                        disabled={submitLoading || drawing}
                        onClick={handleFormSubmit}
                    >
                        {'Сохранить'}
                    </Button>
                    <Button
                        disabled={submitLoading}
                        onClick={clearForm}
                    >
                        {'Отмена'}
                    </Button>
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
