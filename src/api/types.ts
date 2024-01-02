import { Point2D } from '../functions/types'

export interface RequestPostSketch {
    title?: string
    sketch?: Point2D[]
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
}
