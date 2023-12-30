import { Point2D } from 'functions/types'
import React, { useEffect, useRef } from 'react'

interface Sketch2DScanProps {
    sketch?: Point2D[]
}

const Sketch2DScan: React.FC<Sketch2DScanProps> = ({ sketch }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !sketch?.length) return

        const newPoints = calculateNewPoints(sketch)
        const allPoints = addShiftedPoints(newPoints)

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Начало отрисовки
        ctx.beginPath()
        ctx.moveTo(newPoints?.[0].x, newPoints?.[0].y) // Начинаем с первой точки

        for (let i = 0; i < newPoints.length - 1; i += 1) {
            ctx.moveTo(newPoints[i].x, newPoints[i].y) // Устанавливаем начальную точку
            ctx.lineTo(newPoints[i + 1].x, newPoints[i + 1].y) // Рисуем линию к следующей точке
            ctx.stroke()
        }

        for (let i = 0; i < allPoints.length - 1; i += 1) {
            ctx.moveTo(allPoints[i].x, allPoints[i].y) // Устанавливаем начальную точку
            ctx.lineTo(allPoints[i + 1].x, allPoints[i + 1].y) // Рисуем линию к следующей точке
            ctx.stroke()
        }

        for (let i = 0; i < Math.min(newPoints.length, allPoints.length); i++) {
            // Если это первая или последняя точка, рисуем сплошную линию
            if (
                i === 0 ||
                i === Math.min(newPoints.length, allPoints.length) - 1
            ) {
                ctx.setLineDash([]) // Сбросить пунктирный стиль
            } else {
                ctx.setLineDash([5, 5]) // Установить пунктирный стиль
            }

            // Начинаем новый путь
            ctx.beginPath()

            // Рисуем горизонтальную линию между точками
            ctx.moveTo(newPoints[i].x, newPoints[i].y) // Начало линии из newPoints
            ctx.lineTo(allPoints[i].x, allPoints[i].y) // Конец линии в allPoints

            // Заканчиваем путь и рисуем текущую линию
            ctx.stroke()
        }

        // Восстановите стандартный стиль линии, если это необходимо
        ctx.setLineDash([])
    }, [sketch])

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={400}
        />
    )
}

const calculateNewPoints = (originalPoints: Point2D[]): Point2D[] => {
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
    const newPoints: Point2D[] = [{ x: 100, y: 50 }]

    const numbersFrom350 = percentages.map((percent) => percent * 3)

    for (let i = 0; i < numbersFrom350.length; i++) {
        const newY = newPoints[i].y + numbersFrom350[i] // рассчитываем новую координату y
        newPoints.push({ x: 100, y: newY }) // добавляем новую точку в массив
    }

    return newPoints
}

const addShiftedPoints = (originalPoints: Point2D[]) =>
    originalPoints.map((point) => ({
        x: point.x + 300, // увеличиваем x на 300 пикселей
        y: point.y // y остается неизменным
    }))

export default Sketch2DScan
