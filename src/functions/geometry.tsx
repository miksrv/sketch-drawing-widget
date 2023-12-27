import { Point2D } from './types'

/**
 * Checks if lines intersect in two-dimensional space.
 *
 * @param {Point2D[]} lines - Array of points representing lines in the format [x1, y1, x2, y2, ...].
 * @returns {boolean} Returns true if at least two lines intersect; otherwise, returns false.
 */
export const doLinesIntersect = (lines: Point2D[]): boolean => {
    const numLines = lines.length

    for (let i = 0; i < numLines - 2; i += 2) {
        const line1Start = lines[i]
        const line1End = lines[i + 1]

        for (let j = i + 2; j < numLines; j += 2) {
            const line2Start = lines[j]
            const line2End = lines[j + 1]

            if (
                doSegmentsIntersect(line1Start, line1End, line2Start, line2End)
            ) {
                return true
            }
        }
    }

    return false
}

/**
 * Checks if two line segments intersect.
 *
 * @param {Point2D} seg1Start - Starting point of the first line segment.
 * @param {Point2D} seg1End - Ending point of the first line segment.
 * @param {Point2D} seg2Start - Starting point of the second line segment.
 * @param {Point2D} seg2End - Ending point of the second line segment.
 * @returns {boolean} Returns true if the line segments intersect; otherwise, returns false.
 */
export const doSegmentsIntersect = (
    seg1Start: Point2D,
    seg1End: Point2D,
    seg2Start: Point2D,
    seg2End: Point2D
): boolean => {
    const orientation = (p: Point2D, q: Point2D, r: Point2D): number => {
        const val =
            (q?.y - p?.y) * (r?.x - q?.x) - (q?.x - p?.x) * (r?.y - q?.y)
        if (val === 0) return 0 // Collinear
        return val > 0 ? 1 : 2 // Clockwise or counterclockwise
    }

    const onSegment = (p: Point2D, q: Point2D, r: Point2D): boolean => {
        return (
            q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)
        )
    }

    const o1 = orientation(seg1Start, seg1End, seg2Start)
    const o2 = orientation(seg1Start, seg1End, seg2End)
    const o3 = orientation(seg2Start, seg2End, seg1Start)
    const o4 = orientation(seg2Start, seg2End, seg1End)

    if (
        (o1 !== o2 && o3 !== o4) ||
        (o1 === 0 && onSegment(seg1Start, seg2Start, seg1End)) ||
        (o2 === 0 && onSegment(seg1Start, seg2End, seg1End)) ||
        (o3 === 0 && onSegment(seg2Start, seg1Start, seg2End)) ||
        (o4 === 0 && onSegment(seg2Start, seg1End, seg2End))
    ) {
        return true
    }

    return false
}

export const encodeCoordinates = (coordinates: Point2D[]): string =>
    coordinates?.map((coord) => `${coord.x},${coord.y}`).join(',')

export const decodeCoordinates = (encodedString: string): Point2D[] => {
    const parts = encodedString.split(',')
    const coordinates = []
    for (let i = 0; i < parts.length; i += 2) {
        coordinates.push({
            x: parseFloat(parts[i]),
            y: parseFloat(parts[i + 1])
        })
    }

    return coordinates
}

export const transformPoints = (points: Point2D[]) => {
    const transformed = []

    // Устанавливаем начальную точку
    transformed.push({ x: 10, y: points[0].y })

    for (let i = 0; i < points.length - 1; i++) {
        // Вычисляем разницу x между текущим и следующим элементами
        const diffX = Math.abs(points[i].x - points[i + 1].x)

        // Добавляем новый объект в массив с этой разницей и текущей y координатой
        transformed.push({ x: diffX, y: points[i].y })

        // Добавляем новый объект с x увеличенным на 300 и текущей y координатой
        transformed.push({
            x: transformed[transformed.length - 1].x + 300,
            y: points[i].y
        })
    }

    return transformed
}

export const addHookPoints = (points: Point2D[]): Point2D => {
    // Найдем вектор между первой и второй точкой
    const vectorX = points[1].x - points[0].x
    const vectorY = points[1].y - points[0].y

    // Нормализуем вектор
    const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY)
    const normalizedVectorX = vectorX / length
    const normalizedVectorY = vectorY / length

    // Повернем нормализованный вектор на 90 градусов
    const rotatedVectorX = -normalizedVectorY // 90 градусов против часовой стрелки
    // Умножим повернутый вектор на 10 пикселей, чтобы получить координаты новой точки
    return {
        x: points[0].x + 10 * rotatedVectorX,
        y: points[0].y + 10 * normalizedVectorX
    }
}
