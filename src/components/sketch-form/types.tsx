import { Point2D } from 'functions/types'

export interface FormProps {
    id?: string
    title?: string
    name?: string
    email?: string
    phone?: string
    count?: string
    length?: string
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
    paintColor?: string
}

export interface SketchData {
    id?: string
    title?: string
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
    sketch?: Point2D[]
}
