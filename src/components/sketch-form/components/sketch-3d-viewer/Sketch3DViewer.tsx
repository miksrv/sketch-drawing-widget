import * as THREE from 'three'
import { OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'

import { Point2D } from '../../../../functions/types'

interface Sketch3DViewerProps {
    sketch?: Point2D[]
}

const Sketch3DViewer: React.FC<Sketch3DViewerProps> = ({ sketch }) => {
    const ref = useRef<any>()
    const groupRef = useRef<any>()

    const points2D = sketch || []

    const height = 5
    const depth = 100

    // const geometries = create3DModelFrom2D(points2D, height);

    // Вычислите среднюю позицию объектов
    const geometries = points2D.map(({ x, y }) => ({ x, y, z: height }))

    // const averagePosition = calculateAveragePosition(geometries);

    // Находим минимальные и максимальные значения по осям X и Y
    const minX = Math.min(...points2D.map((point) => point.x))
    const maxX = Math.max(...points2D.map((point) => point.x))
    const minY = Math.min(...points2D.map((point) => point.y))
    const maxY = Math.max(...points2D.map((point) => point.y))

    // Находим центр объекта
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    // Находим диагональ объекта
    const diagonal = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2)

    // Вычисляем расстояние камеры от объекта
    const cameraDistance = diagonal / (2 * Math.tan(Math.PI * 0.5 * 0.5))

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

    const rectangles = []
    for (let i = 0; i < points2D.length - 1; i++) {
        const start = new THREE.Vector3(points2D[i].x, points2D[i].y, 0)
        const end = new THREE.Vector3(points2D[i + 1].x, points2D[i + 1].y, 0)

        const length = start.distanceTo(end)

        const quaternion = new THREE.Quaternion()
        const direction = end.clone().sub(start).normalize()
        quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction)

        const geometry = new THREE.BoxGeometry(length, height, depth)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

        const rectangle = (
            <mesh
                key={i}
                position={start.clone().add(end).multiplyScalar(0.5)}
                quaternion={quaternion}
            >
                <bufferGeometry
                    attach='geometry'
                    {...geometry}
                />
                <meshBasicMaterial
                    attach='material'
                    {...material}
                />
                <Text
                    position={[0, 0, height + 50]}
                    // rotation={quaternion}
                    anchorX={'center'}
                    anchorY={'middle'}
                    fontSize={17}
                    color={'#000000'}
                >
                    {`${length.toFixed(0)} mm`}
                </Text>
            </mesh>
        )

        rectangles.push(rectangle)
    }

    return (
        <Canvas
            style={{ height: '403px', width: '500px' }}
            // camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 10 }}
            // camera={{ position: [averagePosition.x, averagePosition.y, averagePosition.z + 5], fov: 75, near: 0.1, far: 10 }}
            camera={{
                far: 1000,
                fov: 75,
                near: 0.1,
                position: [centerX, centerY, cameraDistance]
            }}
        >
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[centerX, centerY, cameraDistance]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-centerX, -centerY, cameraDistance]}
                decay={0}
                intensity={Math.PI}
            />

            {/*{lines}*/}

            <group
                ref={groupRef}
                position={[centerY - 450, centerX - 450, 0]}
            >
                {rectangles}

                {geometries.map((geometry, index) => (
                    <mesh
                        key={index}
                        // @ts-ignore
                        ref={ref}
                        position={[geometry.x, geometry.y, geometry.z - 5]}
                    >
                        <boxGeometry args={[height, height, depth]} />
                        <meshStandardMaterial color='orange' />
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
}

export default Sketch3DViewer
