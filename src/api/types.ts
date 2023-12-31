import { SketchData } from 'components/sketch-form/types'
import { Point2D } from 'functions/types'

export interface RequestPostSketch {
    title?: string
    image?: string
    sketch?: Point2D[]
    firstPoint?: string
    lastPoint?: string
    paintSide?: string
}

export interface ResponseGetList {
    items?: SketchData[]
}
