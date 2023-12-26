import { doLinesIntersect } from 'functions/geometry'
import { Line2D, Point2D } from 'functions/types'
import React, { useEffect, useState } from 'react'

import styles from './styles.module.sass'

interface Sketch2DEditorProps {
    drawing?: boolean
    sketch?: Point2D[]
    paintSide?: string
    onSketchEdit?: (sketch?: Point2D[]) => void
}

const interpolatePoints = (points: Point2D[]): Point2D[] => {
    // Находим минимальные и максимальные значения x и y
    let minX = points[0].x
    let minY = points[0].y
    let maxX = points[0].x
    let maxY = points[0].y

    for (const point of points) {
        minX = Math.min(minX, point.x)
        minY = Math.min(minY, point.y)
        maxX = Math.max(maxX, point.x)
        maxY = Math.max(maxY, point.y)
    }

    // Вычисляем новые границы с отступами
    const canvasWidth = 500
    const canvasHeight = 400
    const padding = 50

    const newMinX = padding
    const newMinY = padding
    const newMaxX = canvasWidth - padding
    const newMaxY = canvasHeight - padding

    // Вычисляем коэффициенты масштабирования для x и y
    const scaleX = (newMaxX - newMinX) / (maxX - minX)
    const scaleY = (newMaxY - newMinY) / (maxY - minY)

    // Вычисляем новые координаты точек
    const newPoints = points.map((point) => ({
        x: newMinX + (point.x - minX) * scaleX,
        y: newMinY + (point.y - minY) * scaleY
    }))

    return newPoints
}

const Sketch2DEditor: React.FC<Sketch2DEditorProps> = (props) => {
    const { drawing, sketch, paintSide, onSketchEdit } = props

    const [points, setPoints] = useState<Point2D[]>(sketch || [])
    const [tempPoint, setTempPoint] = useState<Point2D>({ x: 0, y: 0 })

    useEffect(() => {
        if (sketch) {
            setPoints(sketch)
            draw()
            drawInfo()
        }
    }, [])

    useEffect(() => {
        const canvas = document.getElementById(
            'Sketch2DEditor'
        ) as HTMLCanvasElement

        const handleMouseDown = (
            e: React.MouseEvent<HTMLCanvasElement> | any
        ) => {
            const newPoint = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            }

            if (!doLinesIntersect([...points, newPoint]) && drawing) {
                setPoints([...points, newPoint])
                draw()
                drawInfo()
            }
        }

        const handleMouseMove = (
            e: React.MouseEvent<HTMLCanvasElement> | any
        ) => {
            const newPoint = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            }

            if (!doLinesIntersect([...points, newPoint])) {
                setTempPoint(newPoint)
                draw()
                drawInfo()
            }
        }

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
        }
    }, [points, tempPoint])

    useEffect(() => {
        draw()
        drawInfo()
    }, [paintSide])

    useEffect(() => {
        if (!drawing && points.length) {
            setPoints(interpolatePoints(points))
        }
    }, [drawing])

    const draw = () => {
        const canvas = document.getElementById(
            'Sketch2DEditor'
        ) as HTMLCanvasElement
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw dashed lines
        const dashLength = 4
        const dashColor = '#000'
        const lineWidth = 1

        // Dashed line from the top
        if (drawing) {
            ctx.beginPath()
            ctx.setLineDash([dashLength, dashLength])
            ctx.strokeStyle = dashColor
            ctx.lineWidth = lineWidth
            ctx.moveTo(tempPoint.x, 0)
            ctx.lineTo(tempPoint.x, tempPoint.y - dashLength)
            ctx.stroke()

            // Dashed line from the left
            ctx.beginPath()
            ctx.setLineDash([dashLength, dashLength])
            ctx.strokeStyle = dashColor
            ctx.lineWidth = lineWidth
            ctx.moveTo(0, tempPoint.y)
            ctx.lineTo(tempPoint.x - dashLength, tempPoint.y)
            ctx.stroke()

            // Reset line dash
            ctx.setLineDash([])
        } else {
            ctx.setLineDash([])
        }

        if (!points.length) {
            return
        }

        ctx?.beginPath()
        ctx?.moveTo(points[0]?.x, points[0]?.y)

        for (let i = 1; i < points.length; i++) {
            ctx.lineWidth = 2
            ctx?.lineTo(points[i].x, points[i].y)
        }

        if (drawing) {
            ctx.lineWidth = 2
            ctx?.lineTo(tempPoint.x, tempPoint.y)
        }

        ctx?.stroke()

        // Рисование пунктирных линий с внешней стороны
        if (
            paintSide &&
            ['Снизу', 'Сверху', 'Двухсторонняя'].includes(paintSide)
        ) {
            ctx.beginPath()
            ctx.setLineDash([dashLength, dashLength])
            ctx.strokeStyle = 'red' // красный цвет
            ctx.lineWidth = lineWidth

            for (let i = 0; i < points.length - 1; i++) {
                const startPoint = points[i]
                const endPoint = points[i + 1]

                const dx = endPoint.x - startPoint.x
                const dy = endPoint.y - startPoint.y

                // Вычисляем точки для пунктирной линии с внешней стороны
                const offset = 3 // расстояние от основной линии
                const offsetX = (dy / Math.sqrt(dx * dx + dy * dy)) * offset
                const offsetY = (dx / Math.sqrt(dx * dx + dy * dy)) * offset

                // Внутренняя сторона
                if (paintSide === 'Снизу' || paintSide === 'Двухсторонняя') {
                    ctx.moveTo(startPoint.x - offsetX, startPoint.y + offsetY)
                    ctx.lineTo(endPoint.x - offsetX, endPoint.y + offsetY)
                    ctx.stroke()
                }

                // Внешняя сторона
                if (paintSide === 'Сверху' || paintSide === 'Двухсторонняя') {
                    ctx.moveTo(startPoint.x + offsetX, startPoint.y - offsetY)
                    ctx.lineTo(endPoint.x + offsetX, endPoint.y - offsetY)
                    ctx.stroke()
                }
            }

            ctx.setLineDash([]) // сброс пунктирного стиля
            ctx.strokeStyle = 'black' // черный цвет
        }

        onSketchEdit?.(points)
    }

    const drawInfo = () => {
        const canvas = document.getElementById(
            'Sketch2DEditor'
        ) as HTMLCanvasElement
        const ctx = canvas.getContext('2d')

        if (ctx && !!points.length) {
            if (drawing) {
                const distance = getDistance(
                    points[points.length - 1],
                    tempPoint
                )

                ctx.font = '14px Arial'
                ctx.fillStyle = '#000'
                ctx.fillText(
                    `Длина: ${distance.toFixed(0)} мм`,
                    tempPoint.x + 10,
                    tempPoint.y - 10
                )

                if (points.length > 1) {
                    const angle = getAngle(
                        points[points.length - 2],
                        points[points.length - 1],
                        tempPoint
                    )
                    ctx.fillText(
                        `Угол: ${angle.toFixed(0)}°`,
                        tempPoint.x + 10,
                        tempPoint.y + 10
                    )
                }
            }

            for (let i = 1; i < points.length; i++) {
                const startPoint = points[i - 1]
                const endPoint = points[i]

                // Длина линии
                const length = getDistance(startPoint, endPoint)
                const midPoint = {
                    x: (startPoint.x + endPoint.x) / 2,
                    y: (startPoint.y + endPoint.y) / 2
                }

                // Рассчитываем угол наклона между двумя точками
                const textAngle = Math.atan2(
                    startPoint.y - endPoint.y,
                    startPoint.x - endPoint.x
                )

                ctx.font = '12px Arial'
                ctx.fillStyle = '#000'

                ctx.save() // Сохраняем текущее состояние контекста
                ctx.translate(midPoint.x, midPoint.y) // Перемещаем начало координат в точку
                ctx.rotate(textAngle) // Поворачиваем контекст рисования на рассчитанный угол
                ctx.fillText(`${length.toFixed(0)} мм`, -20, -5)
                ctx.restore() // Восстанавливаем сохраненное состояние контекста

                if (i > 1 && i < points.length) {
                    // Угол между двумя прямыми
                    const prevLine: Line2D = {
                        end: startPoint,
                        start: points[i - 2]
                    }

                    const currentLine: Line2D = {
                        end: endPoint,
                        start: startPoint
                    }

                    const angle = getAngleBetweenLines(prevLine, currentLine)

                    ctx.fillText(
                        `${angle.toFixed(0)}°`,
                        startPoint.x + 5,
                        startPoint.y + 5
                    )
                }
            }
        }
    }

    const getAngleBetweenLines = (line1: Line2D, line2: Line2D) => {
        const angle1 = Math.atan2(
            line1.end.y - line1.start.y,
            line1.end.x - line1.start.x
        )
        const angle2 = Math.atan2(
            line2.end.y - line2.start.y,
            line2.end.x - line2.start.x
        )
        const angle = (angle2 - angle1) * (180 / Math.PI)
        return angle < 0 ? angle + 360 : angle
    }

    const getDistance = (
        point1: { x: number; y: number },
        point2: { x: number; y: number }
    ) => {
        const dx = point2.x - point1.x
        const dy = point2.y - point1.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    const getAngle = (
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        p3: { x: number; y: number }
    ) => {
        const angle1 = Math.atan2(p2.y - p1.y, p2.x - p1.x)
        const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x)
        let angle = (angle2 - angle1) * (180 / Math.PI)
        angle = angle < 0 ? angle + 360 : angle
        return angle
    }

    return (
        <canvas
            className={drawing ? styles.draw : styles.view}
            id={'Sketch2DEditor'}
            height={400}
            width={500}
        />
    )
}

export default Sketch2DEditor
