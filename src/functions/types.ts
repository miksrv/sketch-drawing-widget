/**
 * Represents a two-dimensional point with x and y coordinates.
 */
export interface Point2D {
    /**
     * The x-coordinate of the point.
     */
    x: number

    /**
     * The y-coordinate of the point.
     */
    y: number
}

export interface Line2D {
    end: Point2D
    start: Point2D
}
