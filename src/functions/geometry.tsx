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

    return (
        (o1 !== o2 && o3 !== o4) ||
        (o1 === 0 && onSegment(seg1Start, seg2Start, seg1End)) ||
        (o2 === 0 && onSegment(seg1Start, seg2End, seg1End)) ||
        (o3 === 0 && onSegment(seg2Start, seg1Start, seg2End)) ||
        (o4 === 0 && onSegment(seg2Start, seg1End, seg2End))
    )
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

export const addHookPoints = (
    points: Point2D[],
    positive?: boolean,
    size?: number,
    isFirst?: boolean
): Point2D => {
    // Выбор точек для которых создается крючок
    const referencePoint = isFirst ? points[0] : points[points.length - 1]

    // Найдем вектор от выбранной точки до следующей
    const vectorX = points[isFirst ? 1 : points.length - 2].x - referencePoint.x
    const vectorY = points[isFirst ? 1 : points.length - 2].y - referencePoint.y

    // Нормализуем вектор
    const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY)
    const normalizedVectorX = vectorX / length
    const normalizedVectorY = vectorY / length

    // Повернем нормализованный вектор на 90 градусов
    const rotatedVectorX = positive ? normalizedVectorY : -normalizedVectorY
    const rotatedVectorY = positive ? -normalizedVectorX : normalizedVectorX

    // Умножим повернутый вектор на заданный размер, чтобы получить координаты новой точки крючка
    return {
        x: referencePoint.x + (size ?? 10) * rotatedVectorX,
        y: referencePoint.y + (size ?? 10) * rotatedVectorY
    }
}

export const calculateFirstVertical = (
    originalPoints: Point2D[]
): Point2D[] => {
    // 1. Рассчитать расстояние между каждой точкой в исходном массиве
    const distances: number[] = []
    for (let i = 0; i < originalPoints.length - 1; i++) {
        const distance = Math.sqrt(
            (originalPoints[i + 1].x - originalPoints[i].x) ** 2 +
                (originalPoints[i + 1].y - originalPoints[i].y) ** 2
        )
        distances.push(distance)
    }

    // 2. Найти общую длину всех расстояний
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0)

    // 3. Рассчитать процентное соотношение
    const percentages = distances.map(
        (distance) => (distance / totalDistance) * 100
    )

    // 4. Создать новый массив точек с учетом пропорций
    const firstVertical: Point2D[] = [{ x: 100, y: 50 }]

    const numbersFrom350 = percentages.map((percent) => percent * 3)

    for (let i = 0; i < numbersFrom350.length; i++) {
        const newY = firstVertical[i].y + numbersFrom350[i] // рассчитываем новую координату y
        firstVertical.push({ x: 100, y: newY }) // добавляем новую точку в массив
    }

    return firstVertical
}

export const addShiftedPoints = (originalPoints: Point2D[]) =>
    originalPoints.map((point) => ({
        x: point.x + 300, // увеличиваем x на 300 пикселей
        y: point.y // y остается неизменным
    }))
