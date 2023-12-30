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
        }

        for (let i = 0; i < allPoints.length - 1; i += 1) {
            ctx.moveTo(allPoints[i].x, allPoints[i].y) // Устанавливаем начальную точку
            ctx.lineTo(allPoints[i + 1].x, allPoints[i + 1].y) // Рисуем линию к следующей точке
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

const calculateNewPoints = (originalPoints: Point2D[]) => {
    // 1. Рассчитать расстояние между каждой точкой
    const distances = []
    for (let i = 0; i < originalPoints.length - 1; i++) {
        const point1 = originalPoints[i]
        const point2 = originalPoints[i + 1]
        const distance = Math.sqrt(
            (point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2
        )
        distances.push(distance)
    }

    // 2. Найти общую длину всех расстояний
    const totalDistance = distances.reduce((acc, curr) => acc + curr, 0)

    // 3. Рассчитать процентное соотношение
    const percentages = distances.map(
        (distance) => (distance / totalDistance) * 100
    )

    // 4. Создать новый массив точек
    const newPoints = [{ x: 50, y: originalPoints[0].y }] // первая точка с x = 50
    let currentDistance = 0

    for (let i = 0; i < originalPoints.length - 1; i++) {
        const percentage = percentages[i]
        const targetDistance = (percentage / 100) * 500
        currentDistance += distances[i]
        const ratio = targetDistance / currentDistance

        const newX = 50 // x остается 50
        const newY =
            originalPoints[i].y +
            (originalPoints[i + 1].y - originalPoints[i].y) * ratio

        newPoints.push({ x: newX, y: newY })
    }

    return newPoints
}

const addShiftedPoints = (originalPoints: Point2D[]) => {
    const shiftedPoints = originalPoints.map((point) => ({
        x: point.x + 300, // увеличиваем x на 300 пикселей
        y: point.y // y остается неизменным
    }))

    return shiftedPoints
}

export default Sketch2DScan
