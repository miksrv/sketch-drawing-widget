import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface Point {
    x: number;
    y: number;
}

// Функция проверки пересечения отрезков
function doSegmentsIntersect(seg1Start: Point, seg1End: Point, seg2Start: Point, seg2End: Point): boolean {
    const orientation = (p: Point, q: Point, r: Point): number => {
        const val = (q?.y - p?.y) * (r?.x - q?.x) - (q?.x - p?.x) * (r?.y - q?.y);
        if (val === 0) return 0; // Колинеарные
        return val > 0 ? 1 : 2; // По часовой стрелке или против часовой стрелки
    };

    const onSegment = (p: Point, q: Point, r: Point): boolean => {
        return (
            q.x <= Math.max(p.x, r.x) &&
            q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) &&
            q.y >= Math.min(p.y, r.y)
        );
    };

    const o1 = orientation(seg1Start, seg1End, seg2Start);
    const o2 = orientation(seg1Start, seg1End, seg2End);
    const o3 = orientation(seg2Start, seg2End, seg1Start);
    const o4 = orientation(seg2Start, seg2End, seg1End);

    if (
        (o1 !== o2 && o3 !== o4) ||
        (o1 === 0 && onSegment(seg1Start, seg2Start, seg1End)) ||
        (o2 === 0 && onSegment(seg1Start, seg2End, seg1End)) ||
        (o3 === 0 && onSegment(seg2Start, seg1Start, seg2End)) ||
        (o4 === 0 && onSegment(seg2Start, seg1End, seg2End))
    ) {
        return true;
    }

    return false;
}

// Функция проверки пересечения всех линий в массиве
function doLinesIntersect(lines: Point[]): boolean {
    const numLines = lines.length;

    for (let i = 0; i < numLines - 2; i += 2) {
        const line1Start = lines[i];
        const line1End = lines[i + 1];

        for (let j = i + 2; j < numLines; j += 2) {
            const line2Start = lines[j];
            const line2End = lines[j + 1];

            if (doSegmentsIntersect(line1Start, line1End, line2Start, line2End)) {
                return true;
            }
        }
    }

    return false;
}

const CanvasWidget: React.FC = () => {
    const [drawing, setDrawing] = useState(false);
    const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
    const [tempPoint, setTempPoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

        setDrawing(true);

        const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | any) => {
            const newPoint = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop };

            if (!doLinesIntersect([...points, newPoint])) {
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

        // const handleMouseUp = () => {
        //     setDrawing(false);
        // };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        // canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            // canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [drawing, points, tempPoint]);

    const draw = () => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return
        }

        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        // Draw dashed lines
        const dashLength = 4;
        const dashColor = '#000';
        const lineWidth = 1;

        // Dashed line from the top
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

        if (!points.length) {
            return
        }

        ctx?.beginPath();
        ctx?.moveTo(points[0]?.x, points[0]?.y);

        for (let i = 1; i < points.length; i++) {
            ctx?.lineTo(points[i].x, points[i].y);
        }

        ctx?.lineTo(tempPoint.x, tempPoint.y);

        ctx?.stroke();
    };

    console.log(JSON.stringify(points))

    const drawInfo = () => {
        const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx && !!points.length) {
            const distance = getDistance(points[points.length - 1], tempPoint);

            ctx.font = '14px Arial';
            ctx.fillStyle = '#000';
            ctx.fillText(`Distance: ${distance.toFixed(2)} mm`, tempPoint.x + 10, tempPoint.y - 10);

            if (points.length > 1) {
                const angle = getAngle(points[points.length - 2], points[points.length - 1], tempPoint);
                ctx.fillText(`Angle: ${angle.toFixed(2)} degrees`, tempPoint.x + 10, tempPoint.y + 10);
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

    return <>
        <canvas id={'myCanvas'} width={'500'} height={'500'} style={{border: '1px solid #000', cursor: 'crosshair'}}/>
        <ThreeDObject />
    </>
};

const ThreeDObject = () => {
    // This reference gives us direct access to the THREE.Mesh object
    // const groupRef = useRef<any>();
    const ref = useRef<any>()
    const groupRef = useRef<any>();
    // Hold state for hovered and clicked events

    const points2D = [
        { "x": 84, "y": 113 },
        { "x": 83, "y": 297 },
        { "x": 344, "y": 299 },
        { "x": 407, "y": 200 }
    ];

    const height = 5; // Выберите желаемую высоту
    const depth = 100; // Глубина

    // const geometries = create3DModelFrom2D(points2D, height);

    // Вычислите среднюю позицию объектов

    const geometries = points2D.map(({ x, y }) => ({ x, y, z: height }));

    // const averagePosition = calculateAveragePosition(geometries);

    // Находим минимальные и максимальные значения по осям X и Y
    const minX = Math.min(...points2D.map(point => point.x));
    const maxX = Math.max(...points2D.map(point => point.x));
    const minY = Math.min(...points2D.map(point => point.y));
    const maxY = Math.max(...points2D.map(point => point.y));

    // Находим центр объекта
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Находим диагональ объекта
    const diagonal = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);

    // Вычисляем расстояние камеры от объекта
    const cameraDistance = diagonal / (2 * Math.tan(Math.PI * 0.5 * 0.5));

    // Генерация 3D-сцены
    // const lines = [];
    // for (let i = 0; i < points2D.length - 1; i++) {
    //     const start = new THREE.Vector3(points2D[i].x, points2D[i].y, 0);
    //     const end = new THREE.Vector3(points2D[i + 1].x, points2D[i + 1].y, 0);
    //
    //     const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    //     const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    //
    //     const line = <line key={i}>
    //         <bufferGeometry attach="geometry" {...geometry} />
    //         <lineBasicMaterial attach="material" {...material} />
    //     </line>;
    //
    //     lines.push(line);
    // }

    const rectangles = [];
    for (let i = 0; i < points2D.length - 1; i++) {
        const start = new THREE.Vector3(points2D[i].x, points2D[i].y, 0);
        const end = new THREE.Vector3(points2D[i + 1].x, points2D[i + 1].y, 0);

        const length = start.distanceTo(end);

        const quaternion = new THREE.Quaternion();
        const direction = end.clone().sub(start).normalize();
        quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction);

        const geometry = new THREE.BoxGeometry(length, height, depth);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        const rectangle = (
            <mesh
                key={i}
                position={start.clone().add(end).multiplyScalar(0.5)}
                quaternion={quaternion}
            >
                <bufferGeometry attach="geometry" {...geometry} />
                <meshBasicMaterial attach="material" {...material} />
                <Text
                    position={[0, 0, height + 50]} // Позиция текста над прямоугольником
                    // rotation={quaternion}
                    anchorX="center" // Выравнивание текста по центру
                    anchorY="middle"
                    fontSize={20}
                >
                    {length.toFixed(2)} mm
                </Text>
            </mesh>
        );

        rectangles.push(rectangle);
    }

    return (
        <Canvas
            style={{width: '500px', height: '500px'}}
            // camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 10 }}
            // camera={{ position: [averagePosition.x, averagePosition.y, averagePosition.z + 5], fov: 75, near: 0.1, far: 10 }}
            camera={{position: [centerX, centerY, cameraDistance], fov: 75, near: 0.1, far: 1000}}
        >
            <ambientLight intensity={Math.PI / 2}/>
            <spotLight position={[centerX, centerY, cameraDistance]} angle={0.15} penumbra={1} decay={0}
                       intensity={Math.PI}/>
            <pointLight position={[-centerX, -centerY, cameraDistance]} decay={0} intensity={Math.PI}/>

            {/*{lines}*/}

            <group ref={groupRef} position={[-250, -220, 0]}>
                {rectangles}

                {geometries.map((geometry, index) => (
                    <mesh
                        key={index}
                        // @ts-ignore
                        ref={ref}
                        position={[geometry.x, geometry.y, geometry.z - 5]}
                    >
                        <boxGeometry args={[height, height, depth]}/>
                        <meshStandardMaterial color="orange"/>
                    </mesh>
                ))}
            </group>

            {/*{geometries.map((geometry, index) => (*/}
            {/*    <mesh*/}
            {/*        key={index}*/}
            {/*        // @ts-ignore*/}
            {/*        ref={ref}*/}
            {/*        position={[-1.2, 0, 0]}*/}
            {/*        scale={1}*/}
            {/*    >*/}
            {/*        <bufferGeometry attach="geometry">*/}
            {/*            <bufferAttribute attach="attributes-position" array={geometry.positions} count={geometry.positions.length / 3} itemSize={3} />*/}
            {/*            <bufferAttribute attach="attributes-normal" array={geometry.normals} count={geometry.normals.length / 3} itemSize={3} />*/}
            {/*            <bufferAttribute attach="attributes-color" array={geometry.colors} count={geometry.colors.length / 3} itemSize={3} />*/}
            {/*            <bufferAttribute attach="index" array={geometry.indices} count={geometry.indices.length} itemSize={1} />*/}
            {/*        </bufferGeometry>*/}
            {/*        <meshStandardMaterial vertexColors={true} color={hovered ? 'hotpink' : 'orange'} />*/}
            {/*    </mesh>*/}
            {/*))}*/}

            {/*<mesh*/}
            {/*    // @ts-ignore*/}
            {/*    ref={ref}*/}
            {/*    position={[-1.2, 0, 0]}*/}
            {/*    scale={clicked ? 1.5 : 1}*/}
            {/*    onClick={(event) => click(!clicked)}*/}
            {/*    onPointerOver={(event) => (event.stopPropagation(), hover(true))}*/}
            {/*    onPointerOut={(event) => hover(false)}>*/}
            {/*    <bufferGeometry>*/}
            {/*        <bufferAttribute*/}
            {/*            attach='attributes-position'*/}
            {/*            array={positions}*/}
            {/*            count={positions.length / 3}*/}
            {/*            itemSize={3}*/}
            {/*        />*/}
            {/*        <bufferAttribute*/}
            {/*            attach='attributes-color'*/}
            {/*            array={colors}*/}
            {/*            count={colors.length / 3}*/}
            {/*            itemSize={3}*/}
            {/*        />*/}
            {/*        <bufferAttribute*/}
            {/*            attach='attributes-normal'*/}
            {/*            array={normals}*/}
            {/*            count={normals.length / 3}*/}
            {/*            itemSize={3}*/}
            {/*        />*/}
            {/*        <bufferAttribute*/}
            {/*            attach="index"*/}
            {/*            array={indices}*/}
            {/*            count={indices.length}*/}
            {/*            itemSize={1}*/}
            {/*        />*/}
            {/*    </bufferGeometry>*/}
            {/*    <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>*/}
            {/*</mesh>*/}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.1}
                panSpeed={0.8}
                rotateSpeed={0.5}
                target={new THREE.Vector3(0, 0, 0)} // Устанавливаем центр вращения
            />
        </Canvas>
    )
};

// Функция для вычисления средней позиции объектов
const calculateAveragePosition = (geometries: any) => {
    const totalPoints = geometries.reduce((acc: any, geometry: any) => acc + geometry.positions.length / 3, 0);
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;

    geometries.forEach((geometry: any) => {
        const positions = geometry.positions;

        for (let i = 0; i < positions.length; i += 3) {
            sumX += positions[i];
            sumY += positions[i + 1];
            sumZ += positions[i + 2];
        }
    });

    const averageX = sumX / totalPoints;
    const averageY = sumY / totalPoints;
    const averageZ = sumZ / totalPoints;

    return { x: averageX, y: averageY, z: averageZ };
};

const create3DModelFrom2D = (points: Point[], height: number) => {
    const geometries = [];

    for (let i = 0; i < points.length - 1; i++) {
        const geometry = create3DRectangle(points[i], points[i + 1], height);
        geometries.push(geometry);
    }

    return geometries;
};

const create3DRectangle = (point1: Point, point2: Point, height: number) => {
    const width = getDistance(point1, point2);

    const positions = new Float32Array([
        point1.x, point1.y, 0,
        point1.x, point1.y, height,
        point2.x, point2.y, height,
        point2.x, point2.y, 0,
    ]);

    const normals = new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ]);

    const colors = new Float32Array([
        0, 1, 1, 1,
        1, 0, 1, 1,
        1, 1, 0, 1,
        1, 1, 1, 1,
    ]);

    const indices = new Uint16Array([
        0, 1, 3,
        2, 3, 1,
    ]);

    return {
        positions,
        normals,
        colors,
        indices,
    };
};

const getDistance = (point1: Point, point2: Point) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
};

export default CanvasWidget;
