import React, {useEffect, useState} from "react";
import {doLinesIntersect} from "../../../../functions/geometry";
import styles from './styles.module.sass'
import {Point2D} from "../../../../functions/types";

interface Sketch2DEditorProps {
    drawing?: boolean
    onSketchEdit?: (sketch?: Point2D[]) => void
}

const Sketch2DEditor: React.FC<Sketch2DEditorProps> = (props) => {
    const {drawing, onSketchEdit} = props

    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const [tempPoint, setTempPoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = document.getElementById('Sketch2DEditor') as HTMLCanvasElement;

        const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | any) => {
            const newPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop };

            if (!doLinesIntersect([...points, newPoint]) && drawing) {
                setPoints([...points, newPoint]);
                draw();
                drawInfo();
            }
        };

        const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | any) => {
            const newPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop };

            if (!doLinesIntersect([...points, newPoint])) {
                setTempPoint(newPoint);
                draw();
                drawInfo();
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };
    }, [points, tempPoint]);

    const draw = () => {
        const canvas = document.getElementById('Sketch2DEditor') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw dashed lines
        const dashLength = 4;
        const dashColor = '#000';
        const lineWidth = 1;

        // Dashed line from the top
        if (drawing) {
            ctx.beginPath();
            ctx.setLineDash([dashLength, dashLength]);
            ctx.strokeStyle = dashColor;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(tempPoint.x, 0);
            ctx.lineTo(tempPoint.x, tempPoint.y - dashLength);
            ctx.stroke();

            // Dashed line from the left
            ctx.beginPath();
            ctx.setLineDash([dashLength, dashLength]);
            ctx.strokeStyle = dashColor;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(0, tempPoint.y);
            ctx.lineTo(tempPoint.x - dashLength, tempPoint.y);
            ctx.stroke();

            // Reset line dash
            ctx.setLineDash([]);
        } else {
            ctx.setLineDash([]);
        }

        if (!points.length) {
            return
        }

        ctx?.beginPath();
        ctx?.moveTo(points[0]?.x, points[0]?.y);

        for (let i = 1; i < points.length; i++) {
            ctx?.lineTo(points[i].x, points[i].y);
        }

        if (drawing) {
            ctx?.lineTo(tempPoint.x, tempPoint.y);
        }

        ctx?.stroke();

        onSketchEdit?.(points)
    };

    const drawInfo = () => {
        const canvas = document.getElementById('Sketch2DEditor') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx && !!points.length) {
            if (drawing) {
                const distance = getDistance(points[points.length - 1], tempPoint);

                ctx.font = '14px Arial';
                ctx.fillStyle = '#000';
                ctx.fillText(`Distance: ${distance.toFixed(2)} mm`, tempPoint.x + 10, tempPoint.y - 10);

                if (points.length > 1) {
                    const angle = getAngle(points[points.length - 2], points[points.length - 1], tempPoint);
                    ctx.fillText(`Angle: ${angle.toFixed(2)} degrees`, tempPoint.x + 10, tempPoint.y + 10);
                }
            }

            for (let i = 1; i < points.length; i++) {
                const startPoint = points[i - 1];
                const endPoint = points[i];

                // Длина линии
                const length = getDistance(startPoint, endPoint);
                const midPoint = { x: (startPoint.x + endPoint.x) / 2, y: (startPoint.y + endPoint.y) / 2 };

                ctx.font = '12px Arial';
                ctx.fillStyle = '#000';
                ctx.fillText(`${length.toFixed(2)} mm`, midPoint.x, midPoint.y);

                if (i > 1 && i < points.length) {
                    // Угол между двумя прямыми
                    const prevLine = { start: points[i - 2], end: startPoint };
                    const currentLine = { start: startPoint, end: endPoint };
                    const angle = getAngleBetweenLines(prevLine, currentLine);

                    ctx.fillText(`${angle.toFixed(2)} degrees`, startPoint.x + 10, startPoint.y + 10);
                }
            }
        }
    };

    const getAngleBetweenLines = (line1: any, line2: any) => {
        const angle1 = Math.atan2(line1.end.y - line1.start.y, line1.end.x - line1.start.x);
        const angle2 = Math.atan2(line2.end.y - line2.start.y, line2.end.x - line2.start.x);
        let angle = (angle2 - angle1) * (180 / Math.PI);
        return angle < 0 ? angle + 360 : angle;
    };


    const getDistance = (point1: { x: number; y: number }, point2: { x: number; y: number }) => {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const getAngle = (
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        p3: { x: number; y: number }
    ) => {
        const angle1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const angle2 = Math.atan2(p3.y - p2.y, p3.x - p2.x);
        let angle = (angle2 - angle1) * (180 / Math.PI);
        angle = angle < 0 ? angle + 360 : angle;
        return angle;
    };

    return (
        <canvas
            className={styles.section}
            id={'Sketch2DEditor'}
            height={400}
            width={500}
        />
    )
}

export default Sketch2DEditor
