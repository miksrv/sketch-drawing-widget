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

        const firstVertical = calculatefirstVertical(sketch)
        const lastVertical = addShiftedPoints(firstVertical)

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Начало отрисовки
        ctx.beginPath()
        ctx.moveTo(firstVertical?.[0].x, firstVertical?.[0].y) // Начинаем с первой точки

        for (let i = 0; i < firstVertical.length - 1; i += 1) {
            const startX = firstVertical[i].x
            const startY = firstVertical[i].y
            const endX = firstVertical[i + 1].x
            const endY = firstVertical[i + 1].y

            // Рисуем линию
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.stroke()

            // Вычисляем длину линии (предполагая, что это ваши координаты в пикселях и 1 единица в пикселях = 1 мм)
            const lengthInPixels = Math.sqrt(
                (sketch[i + 1].x - sketch[i].x) ** 2 +
                    (sketch[i + 1].y - sketch[i].y) ** 2
            )

            // Вычисляем середину линии
            const midX = (startX + endX) / 2
            const midY = (startY + endY) / 2

            // Повернем текст на 90 градусов влево
            ctx.save() // сохраняем текущее состояние контекста
            ctx.translate(midX, midY) // перемещаем начало координат в середину линии
            ctx.rotate(-Math.PI / 2) // поворачиваем на 90 градусов против часовой стрелки

            ctx.fillStyle = 'black' // Цвет текста
            ctx.font = '12px Arial' // Шрифт и размер
            ctx.textAlign = 'center' // Выравнивание по центру
            ctx.fillText(`${Math.round(lengthInPixels)} мм`, 0, -5) // Отображаем текст

            ctx.restore() // восстанавливаем исходное состояние контекста
        }

        for (let i = 0; i < lastVertical.length - 1; i += 1) {
            ctx.moveTo(lastVertical[i].x, lastVertical[i].y) // Устанавливаем начальную точку
            ctx.lineTo(lastVertical[i + 1].x, lastVertical[i + 1].y) // Рисуем линию к следующей точке
            ctx.stroke()
        }

        for (
            let i = 0;
            i < Math.min(firstVertical.length, lastVertical.length);
            i++
        ) {
            // Если это первая или последняя точка, рисуем сплошную линию
            if (
                i === 0 ||
                i === Math.min(firstVertical.length, lastVertical.length) - 1
            ) {
                ctx.setLineDash([]) // Сбросить пунктирный стиль
            } else {
                ctx.setLineDash([4, 4]) // Установить пунктирный стиль
            }

            // Начинаем новый путь
            ctx.beginPath()

            // Рисуем горизонтальную линию между точками
            ctx.moveTo(firstVertical[i].x, firstVertical[i].y) // Начало линии из firstVertical
            ctx.lineTo(lastVertical[i].x, lastVertical[i].y) // Конец линии в lastVertical

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

const calculatefirstVertical = (originalPoints: Point2D[]): Point2D[] => {
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

const addShiftedPoints = (originalPoints: Point2D[]) =>
    originalPoints.map((point) => ({
        x: point.x + 300, // увеличиваем x на 300 пикселей
        y: point.y // y остается неизменным
    }))

export default Sketch2DScan
