import React, { useEffect, useRef } from 'react'

import { Point2D } from '../../../../functions/types'

interface Sketch2DScanProps {
    sketch?: Point2D[]
}

const Sketch2DScan: React.FC<Sketch2DScanProps> = ({ sketch }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    sketch = transformArray([
        { x: 94, y: 38 },
        { x: 109, y: 154 },
        { x: 204, y: 152 }
    ])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !sketch?.length) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Находим минимальные и максимальные значения координат
        const minX = Math.min(...sketch.map((coord) => coord.x))
        const minY = Math.min(...sketch.map((coord) => coord.y))

        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Начало отрисовки
        ctx.beginPath()
        ctx.moveTo(sketch?.[0].x - minX, sketch?.[0].y - minY) // Начинаем с первой точки

        for (let i = 0; i < sketch.length - 1; i += 2) {
            ctx.moveTo(sketch[i].x, sketch[i].y) // Устанавливаем начальную точку
            ctx.lineTo(sketch[i + 1].x, sketch[i + 1].y) // Рисуем линию к следующей точке
        }

        for (let i = 0; i < sketch.length - 2; i += 2) {
            ctx.moveTo(sketch[i].x, sketch[i].y) // Устанавливаем начальную четную точку
            ctx.lineTo(sketch[i + 2].x, sketch[i + 2].y) // Рисуем линию к следующей нечетной точке
        }

        for (let i = 1; i < sketch.length - 2; i += 2) {
            ctx.moveTo(sketch[i].x, sketch[i].y) // Устанавливаем начальную нечетную точку
            ctx.lineTo(sketch[i + 2].x, sketch[i + 2].y) // Рисуем линию к следующей четной точке
        }

        // Отображаем линии
        ctx.stroke()
    }, [sketch])

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={400}
        />
    )
}

const transformArray = (arr: Point2D[]) => {
    const transformed = []

    for (let i = 0; i < arr.length; i++) {
        // Добавляем текущую точку в массив
        transformed.push(arr[i])

        // Добавляем новую точку с увеличенным x на 200
        transformed.push({ x: arr[i].x + 200, y: arr[i].y })
    }

    return transformed
}

export default Sketch2DScan
