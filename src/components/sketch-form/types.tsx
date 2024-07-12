import { Point2D } from 'functions/types'

export interface FormProps {
    id?: string
    title?: string
    name?: string
    email?: string
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
}

export interface SketchData {
    id?: string
    title?: string
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
    sketch?: Point2D[]
}
