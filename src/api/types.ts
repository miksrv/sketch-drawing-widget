import { FormProps } from '../components/sketch-form/types'
import { Point2D } from '../functions/types'

export interface RequestPostSketch {
    title?: string
    sketch?: Point2D[]
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
}

export interface ResponseGetList {
    items?: FormProps[]
}
